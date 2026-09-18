"use client";
import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage("auth_success", window.location.origin);
    }
    window.close();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-[#F3F0E9] code-text text-[#000000]">
      Signed in — closing…
    </div>
  );
}