"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  password?: string;
  children: ReactNode;
}

export default function PasswordGate({ password, children }: PasswordGateProps) {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(!password);
  const [error, setError] = useState(false);

  if (!password || unlocked) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === password) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="flex min-h-dvh items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(165deg, #fff9f5 0%, #ffeef3 35%, #f5f0ff 70%, #fff9f5 100%)",
      }}
    >
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-[#f0d4dc] bg-white/90 p-8 shadow-xl"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ffeef3] text-[#f4a6b8]">
            <Lock className="h-6 w-6" />
          </span>
          <h1 className="text-xl font-semibold text-[#5c3d4a]">This page is private</h1>
          <p className="text-sm text-[#8b6a75]">Enter the password to view this surprise.</p>
        </div>

        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="w-full rounded-xl border border-[#f0d4dc] bg-[#fff9f5] px-4 py-3 text-[#5c3d4a] outline-none focus:border-[#f4a6b8] focus:ring-2 focus:ring-[#f4a6b8]/20"
          autoFocus
        />

        {error && (
          <p className="mt-2 text-sm text-red-400">Wrong password — try again.</p>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-[#f4a6b8] py-3 text-sm font-medium text-white shadow-md transition hover:bg-[#e890a5]"
        >
          Unlock
        </button>
      </motion.form>
    </div>
  );
}
