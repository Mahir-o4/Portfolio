"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [msg, setMsg] = useState("");
  const [st, setSt] = useState<"idle" | "verifying" | "sending" | "ok" | "err">("idle");

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
    <div className="relative rounded-2xl sm:rounded-3xl bg-[#06070a] border border-white/[0.08] p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.95)] overflow-hidden">
      {/* Sleek top ambient hairline */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="mb-6">
        <h3 className="type-heading text-xl sm:text-2xl text-[#f8fafc] mb-2 tracking-tight">
          Ready to <span className="text-[var(--accent)]">collaborate</span>?
        </h3>
        <p className="text-[#94a3b8] font-sans text-sm leading-relaxed">
          Send a direct message. Verified via Google OAuth, delivered directly to my inbox.
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
            placeholder="Tell me about your project, team, or opportunity..."
            rows={5}
            className="w-full rounded-xl sm:rounded-2xl bg-[#0a0c11] border border-white/[0.08] p-4 text-[#f8fafc] placeholder-[#94a3b8] outline-none focus:border-[var(--accent)] focus:bg-[#0d1017] transition-all resize-none text-sm leading-relaxed shadow-inner"
          />
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <p role="status" aria-live="polite" className="code-text text-xs text-[#64748b]">
            {st === "verifying" && "Authenticating with Google..."}
            {st === "sending" && "Dispatching message to Mahir..."}
            {st === "ok" && "Delivered successfully! I will reply soon."}
            {st === "err" && "Send failed — popup blocked or network error. Allow popups and try again."}
            {st === "idle" && "Google 1-click verified • Anti-spam protected"}
          </p>

          <button
            type="submit"
            disabled={st === "verifying" || st === "sending" || !msg.trim()}
            className="btn-primary flex items-center gap-2 py-3 px-6 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(61,252,202,0.25)] hover:shadow-[0_6px_28px_rgba(61,252,202,0.4)]"
          >
            {st === "verifying" && <Loader2 size={16} className="animate-spin" />}
            {st === "sending" && <Loader2 size={16} className="animate-spin" />}
            {st === "ok" && <CheckCircle2 size={16} className="text-[#08090d]" />}
            {st === "err" && <AlertCircle size={16} />}
            {st === "idle" && <Send size={16} />}
            <span>
              {st === "verifying"
                ? "Verifying..."
                : st === "sending"
                  ? "Sending..."
                  : st === "ok"
                    ? "Sent!"
                    : "Send Message"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
