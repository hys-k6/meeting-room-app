"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const rooms = [
  {
    id: 1,
    name: "Room A",
    grade: "Standard",
    capacity: 4,
    pricePerHour: 1500,
    equipment: "モニター / Wi-Fi / ホワイトボード",
  },
  {
    id: 2,
    name: "Room B",
    grade: "Business",
    capacity: 8,
    pricePerHour: 3000,
    equipment: "大型モニター / Wi-Fi / 電源タップ / ホワイトボード",
  },
  {
    id: 3,
    name: "Room C",
    grade: "Premium",
    capacity: 12,
    pricePerHour: 5000,
    equipment: "大型モニター / 防音 / Wi-Fi / プロジェクター",
  },
];

export default function ReservePage() {
  const router = useRouter();

  const [roomId, setRoomId] = useState(1);
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState("10");
  const [endHour, setEndHour] = useState("11");
  const [people, setPeople] = useState(1);

  const selectedRoom = rooms.find((room) => room.id === roomId)!;
  const useHours = Math.max(Number(endHour) - Number(startHour), 1);
  const totalPrice = selectedRoom.pricePerHour * useHours;

  const handleReserve = () => {
    const reservation = {
      roomName: selectedRoom.name,
      grade: selectedRoom.grade,
      capacity: selectedRoom.capacity,
      equipment: selectedRoom.equipment,
      date,
      startHour,
      endHour,
      people,
      totalPrice,
    };

    localStorage.setItem("reservation", JSON.stringify(reservation));
    router.push("/confirm");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-black">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">会議室予約</h1>
        <p className="mb-8 text-slate-700">
          会議室・日付・時間・人数を選択してください。
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setRoomId(room.id)}
              className={`rounded-3xl border bg-white p-6 text-left shadow transition hover:-translate-y-1 ${
                roomId === room.id
                  ? "border-blue-600 ring-4 ring-blue-200"
                  : "border-slate-200"
              }`}
            >
              <p className="mb-2 text-sm font-bold text-blue-600">
                {room.grade}
              </p>
              <h2 className="mb-2 text-2xl font-bold">{room.name}</h2>
              <p className="mb-2 text-slate-700">最大 {room.capacity}名</p>
              <p className="mb-4 text-sm text-slate-600">{room.equipment}</p>
              <p className="text-xl font-bold">
                {room.pricePerHour.toLocaleString()}円 / 時間
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block font-bold">利用日</label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-400 p-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block font-bold">開始時間</label>
              <select
                className="w-full rounded-xl border border-slate-400 p-3"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}:00
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">終了時間</label>
              <select
                className="w-full rounded-xl border border-slate-400 p-3"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}:00
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold">使用人数</label>
<input
  type="number"
  min="1"
  max={selectedRoom.capacity}
  className="w-full rounded-xl border border-slate-400 p-3"
  value={people}
  onChange={(e) => {
    const value = e.target.value;

    if (value === "") {
      setPeople(1);
      return;
    }

    const numberValue = Number(value);

    if (numberValue < 1) {
      setPeople(1);
      return;
    }

    if (numberValue > selectedRoom.capacity) {
      setPeople(selectedRoom.capacity);
      return;
    }

    setPeople(numberValue);
  }}
/>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-slate-100 p-6">
            <p className="mb-2">
              選択中：{selectedRoom.name} / {selectedRoom.grade}
            </p>
            <p className="mb-2">利用時間：{useHours}時間</p>
            <p className="text-2xl font-bold">
              合計金額：{totalPrice.toLocaleString()}円
            </p>
          </div>

          <button
            onClick={handleReserve}
            className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700"
          >
            予約内容を確認する
          </button>
        </div>
      </div>
    </main>
  );
}