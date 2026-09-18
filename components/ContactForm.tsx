"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [msg, setMsg] = useState("");
  const [st, setSt] = useState<"idle" | "verifying" | "sending" | "ok" | "err">("idle");

  const hapticCommit = () => {
    try { navigator.vibrate?.(12); } catch {}
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSt("verifying");

    const w = 500,
      h = 600;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    const popup = window.open(
      "about:blank",
      "Auth",
      `width=${w},height=${h},top=${top},left=${left}`,
    );

    if (!popup) {
      setSt("err");
      return;
    }

    const handleAuth = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === "auth_success") {
        window.removeEventListener("message", handleAuth);
        setSt("sending");

        const { data: sess } = await authClient.getSession();

        if (sess?.user) {
          const res = await fetch("/api/mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ msg }),
          });

          setSt(res.ok ? "ok" : "err");
          if (res.ok) {
            hapticCommit();
            setMsg("");
            setTimeout(() => setSt("idle"), 4000);
          }

          await authClient.signOut();
        }
      }
    };

    window.addEventListener("message", handleAuth);

    try {
      const authRes = await authClient.signIn.social({
        provider: "google",
        disableRedirect: true,
        callbackURL: "/auth/success",
      });

      if (!authRes.data?.url) {
        popup.close();
        setSt("err");
        return;
      }

      popup.location.href = authRes.data.url;

      const timer = setInterval(async () => {
        if (popup.closed) {
          clearInterval(timer);
          setSt((prev) => (prev === "verifying" ? "idle" : prev));
          return;
        }

        const { data: sess } = await authClient.getSession();

        if (sess?.user) {
          clearInterval(timer);
          popup.close();
          setSt("sending");

          const res = await fetch("/api/mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ msg }),
          });

          setSt(res.ok ? "ok" : "err");
          if (res.ok) {
            hapticCommit();
            setMsg("");
            setTimeout(() => setSt("idle"), 4000);
          }

          await authClient.signOut();
        }
      }, 1500);
    } catch {
      popup.close();
      setSt("err");
    }
  };

  return (
    <div className="bezel">
      <div className="bezel-core relative p-6 sm:p-8 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[rgba(22,19,14,0.25)] to-transparent pointer-events-none" />

      <div className="mb-6">
        <h3 className="type-heading text-xl sm:text-2xl mb-2 tracking-tight" style={{ color: "var(--text)" }}>
          Ready to collaborate?
        </h3>
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Skip the noise. Reach me directly. <br />
          Verified. Delivered. Done.
        </p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4 font-sans">
        <div className="relative">
          <label htmlFor="contact-msg" className="sr-only">
            Your message
          </label>
          <textarea
            id="contact-msg"
            required
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
              if (st === "err") setSt("idle");
            }}
            placeholder="What's worth building together?"
            rows={5}
            className="w-full rounded-xl sm:rounded-2xl bg-[#FFFDF7] border border-[rgba(22,19,14,0.14)] p-4 text-[#000000] placeholder-[#6E6A61] outline-hidden focus:border-[#000000] transition-[border-color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] resize-none text-sm leading-relaxed shadow-inner"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <p
            role="status"
            aria-live="polite"
            className="code-text text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {st === "verifying" && "Verifying you..."}
            {st === "sending" && "Sending it straight to Mahir..."}
            {st === "ok" && "Delivered. You're in."}
            {st === "err" && "That didn't go through. Try again."}
            {st === "idle" && "Verified • Direct • Spam protected"}
          </p>

          <button
            type="submit"
            disabled={st === "verifying" || st === "sending" || !msg.trim()}
            className="btn-primary group flex items-center gap-2 py-2 pl-6 pr-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>
              {st === "verifying"
                ? "Verifying..."
                : st === "sending"
                  ? "Sending..."
                  : st === "ok"
                    ? "Sent!"
                    : "Send Message"}
            </span>
            <span className="btn-circle size-7!">
              {st === "verifying" && <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />}
              {st === "sending" && <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />}
              {st === "ok" && <CheckCircle2 size={14} strokeWidth={1.5} className="text-[#F3F0E9]" />}
              {st === "err" && <AlertCircle size={14} strokeWidth={1.5} />}
              {st === "idle" && <Send size={14} strokeWidth={1.5} />}
            </span>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
