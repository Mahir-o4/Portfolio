// Just to close the pop up window, kind of lame
"use client";
import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    // Send a 'ping' to the window that opened this popup
    if (window.opener) {
      window.opener.postMessage("auth_success", window.location.origin);
    }
    // Close the popup immediately
    window.close();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 code-text text-accent-cyan animate-pulse">
      Verifying...
    </div>
  );
}