"use client";

import { useEffect, useState } from "react";

type Reservation = {
  id: number;
  room_name: string;
  grade: string;
  equipment: string;
  use_date: string;
  start_hour: string;
  end_hour: string;
  people: number;
  total_price: number;
};

export default function HistoryPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data));
  }, []);

  return (
  <main className="min-h-screen bg-slate-100 px-6 py-10 text-black">
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            予約スケジュール
          </h1>

          <p className="mt-2 text-slate-600">
            会議室の予約状況一覧
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">会議室</th>
              <th className="px-6 py-4 text-left">日付</th>
              <th className="px-6 py-4 text-left">時間</th>
              <th className="px-6 py-4 text-left">人数</th>
              <th className="px-6 py-4 text-left">設備</th>
              <th className="px-6 py-4 text-left">料金</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b border-slate-200"
              >
                <td className="px-6 py-4 font-bold">
                  {reservation.room_name}
                </td>

                <td className="px-6 py-4">
                  {reservation.use_date}
                </td>

                <td className="px-6 py-4">
                  {reservation.start_hour}:00 〜
                  {reservation.end_hour}:00
                </td>

                <td className="px-6 py-4">
                  {reservation.people}名
                </td>

                <td className="px-6 py-4">
                  {reservation.equipment}
                </td>

                <td className="px-6 py-4 font-bold">
                  {reservation.total_price.toLocaleString()}円
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </main>
);
}