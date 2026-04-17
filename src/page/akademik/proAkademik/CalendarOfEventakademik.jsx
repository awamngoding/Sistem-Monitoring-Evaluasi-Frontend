/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import {
  Calendar as CalendarIcon,
  FileText,
  LayoutDashboard,
  Clock,
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarOfEventakademik() {
  const events = [
    {
      id: "1",
      title: "Monitoring Akademik SMK",
      start: "2026-03-12",
      backgroundColor: "#eff6ff",
      borderColor: "#3b82f6",
      textColor: "#1d4ed8",
      extendedProps: { category: "Monitoring", time: "08:00 WIB" },
    },
  ];

  return (
    <div className="flex h-screen bg-[#F4F7FE] overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col p-4 lg:p-6 h-full overflow-hidden">
        <header className="flex-none flex items-center justify-between bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-[#1E5AA5] rounded-2xl flex items-center justify-center">
              <CalendarIcon size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-800 tracking-tight leading-none uppercase">
                Academic <span className="text-[#1E5AA5]">Schedule</span>
              </h1>
              <p className="text-xs text-gray-400 mt-1 font-medium italic">
                Kalender Operasional Akademik YPA-MDR
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8">
              <Card className="!p-6 !rounded-[2.5rem] bg-white border-none shadow-sm h-full">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{ left: "title", right: "prev,next today" }}
                  events={events}
                  height="auto"
                />
              </Card>
            </div>
            <div className="xl:col-span-4 flex flex-col gap-6">
              <Card className="!p-6 !rounded-[2.5rem] bg-white border-none shadow-sm flex flex-col h-full">
                <h3 className="font-black text-gray-800 text-sm uppercase mb-6 flex items-center gap-2">
                  <FileText size={18} className="text-[#1E5AA5]" /> Agenda
                  Akademik
                </h3>
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-4 bg-gray-50 rounded-2xl border-l-4 border-[#1E5AA5]"
                    >
                      <span className="text-[9px] font-black uppercase text-[#1E5AA5] block mb-1">
                        {ev.extendedProps.category}
                      </span>
                      <p className="font-bold text-gray-700 text-xs">
                        {ev.title}
                      </p>
                      <p className="text-[9px] text-gray-400 mt-1 flex items-center gap-1">
                        <Clock size={10} /> {ev.start} | {ev.extendedProps.time}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
