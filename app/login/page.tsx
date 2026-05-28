"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const login = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    router.push("/");  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-3xl font-bold text-black">
          ログイン
        </h1>

        <input
          className="mb-4 w-full rounded-xl border border-slate-400 p-3 text-black placeholder:text-slate-500"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="mb-6 w-full rounded-xl border border-slate-400 p-3 text-black placeholder:text-slate-500"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
        >
          ログイン
        </button>
      </div>
    </main>
  );
}