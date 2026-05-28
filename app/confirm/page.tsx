"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Reservation = {
  roomName: string;
  grade: string;
  capacity: number;
  equipment: string;
  date: string;
  startHour: string;
  endHour: string;
  people: number;
  totalPrice: number;
};

export default function ConfirmPage() {
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedReservation = localStorage.getItem("reservation");

    if (savedReservation) {
      setReservation(JSON.parse(savedReservation));
    }
  }, []);

  const saveReservation = async () => {
    if (!reservation) return;

    await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    });

alert("予約を保存しました。");
router.push("/");  };

  if (!reservation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 text-black">
        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="mb-4 text-2xl font-bold">予約情報がありません</h1>
          <Link href="/reserve" className="font-bold text-blue-600">
            予約画面へ戻る
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold">予約確認</h1>

        <div className="space-y-4 text-lg">
          <p>会議室：{reservation.roomName}</p>
          <p>グレード：{reservation.grade}</p>
          <p>設備：{reservation.equipment}</p>
          <p>利用日：{reservation.date}</p>
          <p>
            利用時間：{reservation.startHour}:00 〜 {reservation.endHour}:00
          </p>
          <p>使用人数：{reservation.people}名</p>
          <p className="text-2xl font-bold">
            合計金額：{reservation.totalPrice.toLocaleString()}円
          </p>
        </div>

        {saved && (
          <div className="mt-6 rounded-xl bg-green-100 p-4 font-bold text-green-800">
            予約を保存しました。
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <Link
            href="/reserve"
            className="rounded-xl border border-slate-400 px-6 py-3 font-bold"
          >
            修正する
          </Link>

          <button
            onClick={saveReservation}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
          >
            予約を確定する
          </button>
        </div>
      </div>
    </main>
  );
}