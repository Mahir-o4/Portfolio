"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Send } from "lucide-react";

 /**
   * Handles the form submission for contact form with Google authentication.
   * 
   * Opens a popup window for OAuth authentication, then polls for session confirmation.
   * Once authenticated, sends the contact message via POST request to `/api/mail`.
   * 
   * Flow:
   * 1. Prevents default form submission and sets state to "verifying"
   * 2. Opens a centered popup window for authentication
   * 3. Initiates Google OAuth sign-in with social provider
   * 4. Sets up message event listener for auth success confirmation
   * 5. Polls every 1.5s to check if user session is established
   * 6. On successful authentication, sends contact message and signs out user
   * 7. Handles popup closure and resets state accordingly
   * 
   * @param e - The React form event triggered on form submission
   * @returns Promise that resolves when authentication and message sending completes
   */
  

export default function ContactForm() {
  const [msg, setMsg] = useState("");
  const [st, setSt] = useState("idle");

 
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
    // 
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
    <div className="card-minimal rounded-none p-5 md:p-8 border-l-4 border-accent-purple mb-10">
      <h3 className="text-lg md:text-xl font-bold text-slate-100 code-text mb-3">
        ready to <span className="text-accent-cyan">collaborate</span>?
      </h3>
      <p className="text-slate-400 text-xs md:text-sm code-text mb-5 md:mb-6">
        Let's create something amazing together. Feel free to reach out!
      </p>

      <form
        onSubmit={submit}
        className="flex flex-col gap-3 max-w-md code-text"
      >
        <textarea
          required
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="your_message..."
          rows={6}
          className="bg-slate-950/50 border border-slate-700 p-2 text-slate-200 outline-none focus:border-[#b66bff] transition-colors resize-none min-h-20"
        />

        <button
          type="submit"
          disabled={st != "idle"}
          className={`flex justify-around items-center px-4 md:px-6 w-48 py-2 mt-2 border border-accent-purple text-accent-purple ${st === "idle" ? "hover:bg-accent-purple hover:text-[#00ff88]" : ""} font-semibold transition-all disabled:opacity-50`}
        >
          {st === "verifying"
        ? "verifying..."
        : st === "sending"
          ? "sending..."
          : st === "ok"
            ? "message sent!"
            : "send message"}
          {st === "idle" && <Send size={18} />}
        </button>
      </form>
    </div>
  );
}
