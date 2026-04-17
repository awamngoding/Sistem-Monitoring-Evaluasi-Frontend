/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import InformationCard from "../../../components/InformationCard";
import Button from "../../../components/Button";
import Table from "../../../components/Table";

// Icons
import {
  Calendar as CalendarIcon,
  Clock,
  LayoutDashboard,
  AlertCircle,
  Briefcase,
  CheckCircle2,
  FileText,
  Plus,
  Zap,
} from "lucide-react";

// FullCalendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function DashboardAdmin() {
  const events = [
    {
      id: "1",
      title: "Kunjungan Cabang Bogor",
      start: "2026-04-12",
      extendedProps: { category: "Visit", time: "09:00", status: "Upcoming" },
    },
    {
      id: "2",
      title: "Audit Internal SMK 1",
      start: "2026-04-15",
      extendedProps: { category: "Audit", time: "13:00", status: "Pending" },
    },
  ];

  // --- CONFIG UNTUK TABLE.JSX ---
  const tableHeaders = ["AGENDA", "CATEGORY", "TIME", "STATUS"];
  const tableData = events.map((ev) => ({
    agenda: (
      <div className="flex flex-col">
        <span className="font-bold text-gray-800 text-[12px]">{ev.title}</span>
        <span className="text-[10px] text-gray-400 font-medium tracking-tight">
          Center of Excellence
        </span>
      </div>
    ),
    category: (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-[9px] font-black bg-blue-50 text-[#1E5AA5] border border-blue-100 uppercase">
        {ev.extendedProps.category}
      </span>
    ),
    time: (
      <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[10px]">
        <Clock size={12} className="text-[#1E5AA5]" />
        {ev.extendedProps.time} WIB
      </div>
    ),
    status: (
      <div className="flex items-center gap-2">
        <div
          className={`w-1.5 h-1.5 rounded-full ${ev.extendedProps.status === "Upcoming" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
        />
        <span
          className={`font-black text-[10px] uppercase ${ev.extendedProps.status === "Upcoming" ? "text-emerald-600" : "text-amber-600"}`}
        >
          {ev.extendedProps.status}
        </span>
      </div>
    ),
  }));

  const stats = [
    {
      title: "24",
      sub: "Total Agenda",
      icon: <CalendarIcon size={20} />,
      color: "text-[#1E5AA5]",
      bg: "bg-white",
    },
    {
      title: "08",
      sub: "Visit Cabang",
      icon: <Briefcase size={20} />,
      color: "text-indigo-600",
      bg: "bg-white",
    },
    {
      title: "03",
      sub: "Urgent Task",
      icon: <AlertCircle size={20} />,
      color: "text-rose-600",
      bg: "bg-white",
    },
    {
      title: "12",
      sub: "Completed",
      icon: <CheckCircle2 size={20} />,
      color: "text-emerald-600",
      bg: "bg-white",
    },
  ];

  return (
    <>
      <style>{`
        /* 1. Reset & Global locked view */
        html, body, #root { height: 100vh; overflow: hidden; background-color: #F8FAFC; font-family: 'Plus Jakarta Sans', sans-serif; }
        
        /* 2. FIX TABLE: Override style agar rapi dalam container */
        .fix-table-style table { width: 100% !important; border-collapse: separate !important; border-spacing: 0 !important; }
        
        /* Header Biru Astra */
        .fix-table-style thead tr { background-color: #1E5AA5 !important; }
        .fix-table-style thead th { 
          color: white !important; 
          font-size: 10px !important; 
          font-weight: 900 !important; 
          text-transform: uppercase !important; 
          letter-spacing: 0.1em !important; 
          padding: 16px 20px !important; 
          text-align: left !important;
          border: none !important;
        }

        /* Rounded Corners untuk Header */
        .fix-table-style thead th:first-child { border-top-left-radius: 16px !important; }
        .fix-table-style thead th:last-child { border-top-right-radius: 16px !important; }

        /* Body Cells Styling */
        .fix-table-style tbody td { 
          padding: 14px 20px !important; 
          border-bottom: 1px solid #F1F5F9 !important; 
          background-color: white !important;
          font-size: 11px !important;
          color: #475569 !important;
          vertical-align: middle !important;
        }
        .fix-table-style tbody tr:hover td { background-color: #F8FAFC !important; }
        .fix-table-style tbody tr:last-child td:first-child { border-bottom-left-radius: 16px !important; }
        .fix-table-style tbody tr:last-child td:last-child { border-bottom-right-radius: 16px !important; }

        /* 3. FullCalendar Customization */
        .fc { height: 100% !important; border: none !important; }
        .fc-toolbar-title { font-weight: 900 !important; color: #1e293b !important; text-transform: uppercase; font-size: 1rem !important; }
        .fc-button-primary { background: white !important; color: #1E5AA5 !important; border: 1px solid #e2e8f0 !important; font-weight: 800 !important; border-radius: 10px !important; text-transform: uppercase !important; font-size: 10px !important; }
        .fc-button-active { background: #1E5AA5 !important; color: white !important; border-color: #1E5AA5 !important; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>

      <div className="flex h-screen w-full bg-[#F8FAFC] overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col h-screen overflow-hidden p-6 gap-6 relative">
          {/* HEADER DASHBOARD */}
          <header className="flex-none flex items-center justify-between bg-white p-5 rounded-[2.5rem] shadow-sm border border-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1E5AA5] to-[#2563eb] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                <Zap size={22} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-800 tracking-tight leading-none uppercase">
                  Center of <span className="text-[#1E5AA5]">Excellence</span>
                </h1>
                <p className="text-[10px] text-gray-400 mt-1.5 font-bold uppercase tracking-[0.2em] opacity-70">
                  Operational Control & Monitoring
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">
                System Active
              </span>
            </div>
          </header>

          {/* STATS SECTION */}
          <div className="flex-none grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item, idx) => (
              <InformationCard
                key={idx}
                title={item.title}
                subtitle={item.sub}
                icon={item.icon}
                className={`!rounded-[2rem] !p-6 border border-white shadow-sm hover:shadow-md transition-all duration-300 ${item.color}`}
              />
            ))}
          </div>

          {/* BOTTOM CONTENT AREA */}
          <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* LEFT: CALENDAR CARD */}
            <Card className="xl:col-span-6 flex flex-col h-full !rounded-[2.5rem] !p-6 shadow-sm border-none overflow-hidden bg-white">
              <div className="flex-1 min-h-0">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{ left: "title", right: "prev,next today" }}
                  events={events}
                  height="100%"
                />
              </div>
            </Card>

            {/* RIGHT: TABLE CARD */}
            <Card className="xl:col-span-6 flex flex-col h-full !rounded-[2.5rem] !p-0 shadow-sm border-none overflow-hidden bg-white">
              <div className="flex items-center justify-between p-6 pb-4 flex-none">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#1E5AA5]">
                    <FileText size={18} />
                  </div>
                  <h3 className="font-black text-gray-800 text-xs uppercase tracking-widest">
                    Upcoming Agenda
                  </h3>
                </div>
                <Button
                  icon={<Plus size={16} />}
                  className="!p-2.5 !rounded-xl !bg-[#1E5AA5] !text-white hover:scale-105 shadow-md shadow-blue-200 transition-all"
                />
              </div>

              {/* TABLE AREA - Menggunakan Class fix-table-style */}
              <div className="flex-1 overflow-auto custom-scrollbar px-6 pb-6 fix-table-style">
                <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <Table headers={tableHeaders} data={tableData} />
                </div>
              </div>

              <div className="p-4 flex-none text-center border-t border-gray-50 bg-gray-50/30">
                <p className="text-[9px] text-gray-300 font-bold tracking-[0.3em] uppercase">
                  YPA-MDR Platform • v1.0
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
