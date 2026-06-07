import { useState, useRef, useEffect } from "react";
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

import { BarChart3, Users, Star, TrendingUp, Bot, Send } from "lucide-react";

type ProTab = "dashboard" | "meetings" | "analytics" | "ai" | "profile";

import { useTranslation } from "@/lib/i18n";

export function ProfessionalDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ProTab>("dashboard");
  const [modalData, setModalData] = useState<{ title: string, data: any } | null>(null);
  
  // AI Chat State
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  type ChatMessage = { role: string, content: string };
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tenahub_ai_chat");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return [
      { 
        role: "assistant", 
        content: "Hello Dr. Selamawit. I'm TenaHub AI, your secure clinical assistant. I can answer questions about the TenaGulecha platform, provide differential diagnoses, or review anonymized patient symptoms. How can I assist you today?" 
      }
    ];
  });

  useEffect(() => {
    if (activeTab === "ai") {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setMessages((prev: ChatMessage[]) => {
      const updated = [...prev, { role: "user", content: userMsg }];
      if (typeof window !== "undefined") {
        localStorage.setItem("tenahub_ai_chat", JSON.stringify(updated));
      }
      return updated;
    });
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = userMsg.toLowerCase();
      
      if (lowerInput.includes("platform") || lowerInput.includes("tenahub") || lowerInput.includes("tenagulecha") || lowerInput.includes("about")) {
        aiResponse = "TenaGulecha is East Africa's first Health Super App! We provide a unified ecosystem that connects patients with professionals, allows organizations to list their clinics and labs, and offers a marketplace for specialized wellness mini-apps. You can use this dashboard to manage your appointments, view patient health data synced from wearables, and conduct telehealth sessions.";
      } else if (lowerInput.includes("patient") || lowerInput.includes("record") || lowerInput.includes("history")) {
        aiResponse = "To view a patient's health record, simply navigate to the 'Dashboard' tab and click on any patient in your Patient Roster. This will open a detailed view of their medical history, recent lab results, and real-time biometric data synced from their connected modules.";
      } else if (lowerInput.includes("book") || lowerInput.includes("schedule") || lowerInput.includes("appointment")) {
        aiResponse = "Your appointments are automatically synced from the patient portal. You can view your full schedule under the 'Meetings' tab, where you can also launch secure video telehealth calls with a single click.";
      } else {
        aiResponse = `Regarding "${userMsg}", I've analyzed the latest clinical guidelines and medical databases. I recommend reviewing the patient's full metabolic panel and recent history before adjusting the treatment plan. Let me know if you'd like me to pull up those specific lab results or schedule a follow-up.`;
      }

      setMessages((prev: ChatMessage[]) => {
        const updated = [...prev, { role: "assistant", content: aiResponse }];
        if (typeof window !== "undefined") {
          localStorage.setItem("tenahub_ai_chat", JSON.stringify(updated));
        }
        return updated;
      });
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center border-b border-border pb-2 gap-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent transition-all", activeTab === "dashboard" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <Activity className="h-4 w-4" /> {t("tabs.dashboard")}
        </button>
        <button
          onClick={() => setActiveTab("meetings")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent transition-all", activeTab === "meetings" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <CalendarDays className="h-4 w-4" /> {t("tabs.meetings")}
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent transition-all", activeTab === "analytics" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <BarChart3 className="h-4 w-4" /> {t("tabs.analytics")}
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent transition-all", activeTab === "ai" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <Bot className="h-4 w-4" /> AI Consult
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={cn("flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent transition-all", activeTab === "profile" ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-accent/40")}
        >
          <User className="h-4 w-4" /> {t("tabs.profile")}
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

      {activeTab === "meetings" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold tracking-tight mb-2">All Meetings & Consultations</h2>
          <p className="text-sm text-muted-foreground mb-6">View your complete schedule, past history, and upcoming telehealth sessions.</p>
          
          <div className="rounded-3xl border border-border bg-card p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Patient</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-r-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ...appointments,
                    { id: 4, patient: "Aster Bekele", type: "Prescription Renewal", time: "04:00 PM (Yesterday)", duration: "15 min", status: "Completed", details: "Renewed medication." },
                    { id: 5, patient: "Solomon Tsegaye", type: "Follow-up", time: "09:00 AM (2 Days Ago)", duration: "30 min", status: "Completed", details: "Review of progress." },
                    { id: 6, patient: "Marta Girma", type: "General Checkup", time: "10:00 AM (Tomorrow)", duration: "30 min", status: "Upcoming", details: "Routine wellness check." },
                  ].map((apt) => (
                    <tr key={apt.id} className="border-b border-white/5 bg-card hover:bg-accent/20 cursor-pointer" onClick={() => setModalData({ title: "Appointment Details", data: apt })}>
                      <td className="px-4 py-3 font-medium text-foreground">{apt.patient}</td>
                      <td className="px-4 py-3 text-muted-foreground">{apt.time} ({apt.duration})</td>
                      <td className="px-4 py-3 text-muted-foreground">{apt.type}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          apt.status === "Upcoming" ? "bg-blue-500/10 text-blue-500" : "bg-emerald-500/10 text-emerald-500"
                        )}>
                          {apt.status === "Upcoming" ? <Clock className="mr-1 h-3 w-3"/> : <CheckCircle2 className="mr-1 h-3 w-3"/>}
                          {apt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        {apt.status === "Upcoming" ? (
                          <Button size="sm" onClick={() => toast.success(`Starting video call with ${apt.patient}...`)}>
                            <Video className="h-4 w-4 mr-1" /> Join
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing notes for ${apt.patient}...`)}>
                            <FileText className="h-4 w-4 mr-1" /> Notes
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Professional Analytics</h2>
          <p className="text-sm text-muted-foreground mb-6">Metrics and insights on your practice, patients, and ratings.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-2 text-muted-foreground"><Users className="h-4 w-4" /> Total Patients</div>
              <div className="text-3xl font-extrabold">142</div>
              <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +12 this month</div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-2 text-muted-foreground"><Video className="h-4 w-4" /> Consultations</div>
              <div className="text-3xl font-extrabold">85</div>
              <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +5 this month</div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-2 text-muted-foreground"><Star className="h-4 w-4" /> Avg Rating</div>
              <div className="text-3xl font-extrabold">4.9</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">Based on 64 reviews</div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-2 text-muted-foreground"><Activity className="h-4 w-4" /> Response Time</div>
              <div className="text-3xl font-extrabold">{"< 2hr"}</div>
              <div className="text-xs text-emerald-500 mt-1 flex items-center gap-1">Top 5% of professionals</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg mb-6">Patient Satisfaction Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-medium">5 Stars</span><span>85%</span></div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[85%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-medium">4 Stars</span><span>12%</span></div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[12%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-medium">3 Stars</span><span>3%</span></div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[3%]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="font-medium">{"< 3 Stars"}</span><span>0%</span></div>
                  <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[0%]"></div></div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg mb-6">Weekly Consultations Trend</h3>
              <div className="flex h-36 items-end gap-3 px-2 mt-4">
                {[12, 18, 15, 22, 28, 20, 32].map((h, i) => (
                  <div key={i} className="group relative w-full flex flex-col items-center justify-end h-full">
                    <div className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card border border-border px-1.5 py-0.5 rounded">
                      {h} visits
                    </div>
                    <div className="w-full bg-blue-500/30 rounded-t-sm hover:bg-blue-500 transition-colors" style={{ height: `${(h / 32) * 100}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                <span>6 Weeks Ago</span>
                <span>This Week</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-2">TenaHub AI Consultant</h2>
              <p className="text-sm text-muted-foreground mb-6">Ask for differential diagnoses, medication interactions, or patient triage advice.</p>
            </div>
            <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bot className="h-6 w-6" />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card overflow-hidden flex flex-col h-[60vh] min-h-[400px]">
            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg: ChatMessage, idx: number) => (
                <div key={idx} className={cn("flex gap-4", msg.role === "user" && "flex-row-reverse")}>
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    msg.role === "user" ? "bg-emerald-500/20 text-emerald-500" : "bg-primary/20 text-primary"
                  )}>
                    {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "rounded-2xl px-4 py-3 text-sm max-w-[80%] leading-relaxed",
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-white/5 border border-white/10 text-foreground"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-muted-foreground flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card flex gap-3 items-center">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about TenaGulecha or clinical queries..." 
                className="flex-1 bg-background border border-input rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isTyping || !chatInput.trim()}>
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </form>
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
