"use server";

import { Resend } from "resend";

// Sends the contact form to CONTACT_TO_EMAIL through Resend. Without a verified
// domain, Resend only delivers from onboarding@resend.dev to the account's own email.

export type ContactField = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    message: text(formData, "message"),
  };

  // Hidden field that people never see; bots fill it. Pretend it worked.
  if (text(formData, "company")) return { status: "success", message: "Thanks, your message is on its way." };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  else if (values.name.length > 100) errors.name = "Keep the name under 100 characters.";
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > 200) errors.email = "Please enter a valid email address.";
  if (values.message.length < 10) errors.message = "Tell me a little more (at least 10 characters).";
  else if (values.message.length > 5000) errors.message = "Keep the message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL.");
    return {
      status: "error",
      message: "The contact form isn't set up yet. Please reach me on LinkedIn for now.",
      values,
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: values.email,
    subject: `Portfolio message from ${values.name}`,
    text: `${values.message}\n\n— ${values.name} <${values.email}>`,
  });

  if (error) {
    console.error("Resend failed:", error);
    return { status: "error", message: "Sending failed. Please try again in a minute.", values };
  }

  return { status: "success", message: "Thanks, your message is on its way. I'll reply by email." };
}
