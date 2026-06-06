import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  Video,
  FileText,
  User,
  CheckCircle2,
  MoreHorizontal,
  Phone,
  MessageSquare,
  Activity,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appointments = [
  { id: 1, patient: "Dawit Alemu", type: "Follow-up", time: "09:30 AM", duration: "30 min", status: "Upcoming", details: "Reviewing recent blood pressure logs from connected wearable." },
  { id: 2, patient: "Hanna Bekele", type: "Initial Consultation", time: "11:00 AM", duration: "45 min", status: "Upcoming", details: "First time visit, discussing anxiety and mental wellness journal entries." },
  { id: 3, patient: "Yonas Mekonnen", type: "Test Review", time: "02:15 PM", duration: "15 min", status: "Completed", details: "Discussed blood work. Everything looks normal." },
];

const patients = [
  { id: 1, name: "Dawit Alemu", lastVisit: "Jun 10, 2026", condition: "Hypertension", status: "Active", age: 34, connectedDevices: ["Apple Watch"] },
  { id: 2, name: "Marta Girma", lastVisit: "May 28, 2026", condition: "Type 2 Diabetes", status: "Monitoring", age: 45, connectedDevices: ["Glucose Monitor"] },
  { id: 3, name: "Tewodros Haile", lastVisit: "Apr 15, 2026", condition: "Post-op Recovery", status: "Discharged", age: 52, connectedDevices: [] },
];

import { ProfilePage } from "./ProfilePage";

type ProTab = "dashboard" | "profile";

export function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState<ProTab>("dashboard");
  const [modalData, setModalData] = useState<{ title: string, data: any } | null>(null);

  return (
    <div className="space-y-6 relative">
      
      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-border overflow-x-auto pb-1 gap-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent whitespace-nowrap transition-all", activeTab === "dashboard" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <Activity className="h-4 w-4" /> Dashboard
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent whitespace-nowrap transition-all", activeTab === "profile" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <User className="h-4 w-4" /> Profile
        </button>
      </div>

      {/* Modal Overlay */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setModalData(null)} 
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{modalData.title}</h3>
            <div className="space-y-4">
              {Object.entries(modalData.data).map(([key, value]) => (
                <div key={key} className="flex flex-col border-b border-border pb-2">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm font-semibold">{Array.isArray(value) ? value.join(", ") || "None" : String(value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalData(null)}>Close</Button>
              <Button onClick={() => { toast.success("Saved"); setModalData(null); }}>Save Note</Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <ProfilePage role="professional" onBack={() => setActiveTab("dashboard")} />
      )}

      {activeTab === "dashboard" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header Profile */}
          <section className="rounded-3xl glass-strong p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold backdrop-blur ring-1 ring-white/20">
                  ST
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-primary">Verified Professional</div>
                  <h1 className="mt-1 text-2xl font-bold tracking-tight">Dr. Selamawit Tadesse</h1>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">General Medicine</span>
                    <span>·</span>
                    <span>12 Yrs Exp</span>
                    <span>·</span>
                    <span>MED-2014-8892</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">
                <Metric label="Patients" value="142" />
                <Metric label="Consults" value="28/wk" />
                <Metric label="Rating" value="4.9 ★" className="hidden sm:block" />
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Today's Schedule */}
            <section className="rounded-3xl glass-strong p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold">Today's Schedule</h2>
                <p className="text-xs text-muted-foreground">Click appointment to view details</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {appointments.map((apt) => (
              <div 
                key={apt.id} 
                onClick={() => setModalData({ title: "Appointment Details", data: apt })}
                className="flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/40 p-3 backdrop-blur sm:flex-row sm:items-center sm:justify-between cursor-pointer hover:bg-white/60 transition"
              >
                <div>
                  <div className="font-medium">{apt.patient}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {apt.time} ({apt.duration}) · {apt.type}
                  </div>
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {apt.status === "Upcoming" ? (
                    <Button size="sm" onClick={() => toast.success(`Starting video call with ${apt.patient}...`)}>
                      <Video className="mr-2 h-4 w-4" /> Start Call
                    </Button>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" /> Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Patient Roster */}
        <section className="rounded-3xl glass-strong p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold">Patient Roster</h2>
                <p className="text-xs text-muted-foreground">Click to view patient health record</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {patients.map((p) => (
              <div 
                key={p.id} 
                onClick={() => setModalData({ title: "Patient Health Record", data: p })}
                className="flex items-center justify-between rounded-xl border border-white/40 bg-white/30 p-3 transition hover:bg-white/50 cursor-pointer"
              >
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.condition} · Last: {p.lastVisit}</div>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => toast.success(`Opening messages for ${p.name}`)}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => toast.info(`Downloading lab results for ${p.name}`)}>
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/50 bg-white/40 p-3 backdrop-blur ${className}`}>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
