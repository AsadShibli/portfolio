"use client";

import { useActionState, useState } from "react";
import { sendContact, type ContactField, type ContactState } from "@/app/actions/contact";
import { CheckIcon, SendIcon } from "./icons";

const initialState: ContactState = { status: "idle" };
const MAX_MESSAGE = 5000;

const fieldClass =
  "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-subtle transition outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  // Controlled fields so a failed send keeps what was typed.
  const [values, setValues] = useState<Record<ContactField, string>>({ name: "", email: "", message: "" });
  const [dismissed, setDismissed] = useState<ContactState | null>(null);

  const showSuccess = state.status === "success" && dismissed !== state;
  const failed = state.status === "error";
  const errors = failed ? state.errors ?? {} : {};

  const update = (field: ContactField) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  if (showSuccess) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-line bg-surface p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Message sent</h3>
        <p className="mt-2 max-w-sm text-muted" role="status">
          {state.message}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", message: "" });
            setDismissed(state);
          }}
          className="mt-6 rounded-full border border-line px-4 py-2 text-sm transition hover:border-line-strong"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} id="contact-name">
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field label="Email" error={errors.email} id="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" error={errors.message} id="contact-message">
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            maxLength={MAX_MESSAGE}
            placeholder="What are you building, and how can I help?"
            value={values.message}
            onChange={update("message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${fieldClass} resize-y`}
          />
        </Field>
        <p className="mt-1.5 text-right font-mono text-xs text-subtle">
          {values.message.length} / {MAX_MESSAGE}
        </p>
      </div>

      {/* Honeypot: hidden from people and screen readers, filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          className={`text-sm ${failed ? "text-danger" : "text-subtle"}`}
        >
          {failed ? state.message : "Messages go straight to my inbox."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sending…
            </>
          ) : (
            <>
              Send message <SendIcon />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  id,
  children,
}: {
  label: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
