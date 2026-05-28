"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
    setUserEmail(localStorage.getItem("userEmail") || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUserName("");
    setUserEmail("");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <p className="mb-4 font-bold text-blue-400">Meeting Room Booking</p>

        <h1 className="mb-6 text-5xl font-bold">会議室予約システム</h1>

        <p className="mb-10 text-slate-300">
          会議室の空き状況確認、設備選択、人数設定、料金計算まで管理できます。
        </p>

        {userName ? (
          <div className="mb-8 rounded-2xl bg-white/10 p-5 text-left">
            <p className="mb-2 font-bold text-blue-300">ログイン中</p>
            <p>名前：{userName}</p>
            <p>メール：{userEmail}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap justify-center gap-4">
          {userName ? (
            <button
              disabled
              className="block cursor-not-allowed rounded-xl bg-slate-600 px-8 py-4 font-bold text-slate-300"
            >
              ログイン済み
            </button>
          ) : (
            <Link
              href="/login"
              className="block rounded-xl bg-blue-600 px-8 py-4 font-bold text-white"
            >
              ログイン
            </Link>
          )}

          <Link
            href="/reserve"
            className="block rounded-xl bg-white px-8 py-4 font-bold text-black"
          >
            予約画面
          </Link>

          <Link
            href="/history"
            className="block rounded-xl bg-slate-700 px-8 py-4 font-bold text-white"
          >
            予約一覧
          </Link>

          {userName && (
            <button
              onClick={logout}
              className="block rounded-xl border border-slate-500 px-8 py-4 font-bold text-white"
            >
              ログアウト
            </button>
          )}
        </div>
      </div>
    </main>
  );
}