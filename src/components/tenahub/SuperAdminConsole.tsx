import { useState } from "react";
import { toast } from "sonner";
import {
  Shield, Users, Building2, Activity, AlertTriangle, CheckCircle2,
  XCircle, TrendingUp, Search, LayoutDashboard, User, Settings, PieChart, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PartnerStatus = "approved" | "pending" | "suspended";

const initialPartners = [
  { id: 1, name: "YeneHealth", category: "Maternal Health", users: 2847, status: "approved" as PartnerStatus, apiUsage: "124k calls/mo", contact: "info@yenehealth.com" },
  { id: 2, name: "Addis Physiotherapy Hub", category: "Physiotherapy", users: 1294, status: "approved" as PartnerStatus, apiUsage: "45k calls/mo", contact: "addisphysio@example.com" },
  { id: 3, name: "Zema Mental Wellness", category: "Mental Health", users: 1812, status: "approved" as PartnerStatus, apiUsage: "90k calls/mo", contact: "hello@zema.com" },
  { id: 4, name: "Bethel Cardio Tracker", category: "Cardiology", users: 0, status: "pending" as PartnerStatus, apiUsage: "0 calls/mo", contact: "admin@bethel.com" },
];

const professionals = [
  { id: 1, name: "Dr. Selamawit Tadesse", specialty: "General Medicine", rating: "4.9", verified: true, license: "MED-2014-8892", patients: 142 },
  { id: 2, name: "Ato Yonas Mekuria", specialty: "Physiotherapy", rating: "4.7", verified: true, license: "PHY-2018-334", patients: 86 },
  { id: 3, name: "Dr. Aster Mekonnen", specialty: "Cardiology", rating: "-", verified: false, license: "MED-2022-110", patients: 0 },
];

const allUsersList = [
  { id: 1, name: "Dawit Alemu", email: "dawit@example.com", role: "User", joined: "2 weeks ago", activeModules: ["Heart Tracker", "Step Counter"] },
  { id: 2, name: "Hanna Bekele", email: "hanna@example.com", role: "User", joined: "1 month ago", activeModules: ["Mental Health Journal"] },
  { id: 3, name: "Marta Girma", email: "marta@example.com", role: "User", joined: "3 months ago", activeModules: [] },
];

const incidents = [
  { id: 1, severity: "low", title: "Webhook latency spike — YeneHealth", time: "12m ago", details: "Response time exceeded 2000ms for 3 consecutive pings." },
  { id: 2, severity: "med", title: "Failed signature on /api/public/webhook", time: "1h ago", details: "Multiple unauthorized requests blocked by WAF." },
];

const sparkline = [22, 30, 28, 41, 38, 52, 47, 60, 58, 71, 68, 80];

type AdminTab = "dashboard" | "users" | "organizers" | "professionals" | "analytics" | "settings";

export function SuperAdminConsole() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [partners, setPartners] = useState(initialPartners);
  const [filter, setFilter] = useState("");
  
  // Modal State
  const [modalData, setModalData] = useState<{ title: string, data: any } | null>(null);

  const setStatus = (id: number, status: PartnerStatus, label: string) => {
    setPartners((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success(label);
  };

  const visiblePartners = partners.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[70vh] relative">
      
      {/* Modal Overlay */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setModalData(null)} 
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{modalData.title}</h3>
            <div className="space-y-4">
              {Object.entries(modalData.data).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-sm font-semibold">{Array.isArray(value) ? value.join(", ") || "None" : String(value)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setModalData(null)}>Close</Button>
              <Button onClick={() => { toast.success("Action taken"); setModalData(null); }}>Manage</Button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 rounded-[2rem] glass-tint p-4 space-y-1 h-fit">
        <div className="px-3 py-2 mb-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-medium uppercase tracking-widest ring-1 ring-white/20 backdrop-blur text-primary-foreground">
            <Shield className="h-3 w-3" /> Admin
          </div>
        </div>
        <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={LayoutDashboard} label="Dashboard" />
        <NavButton active={activeTab === "users"} onClick={() => setActiveTab("users")} icon={Users} label="Users" />
        <NavButton active={activeTab === "organizers"} onClick={() => setActiveTab("organizers")} icon={Building2} label="Listed Businesses" />
        <NavButton active={activeTab === "professionals"} onClick={() => setActiveTab("professionals")} icon={User} label="Professionals" />
        <NavButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={PieChart} label="Analytics" />
        <NavButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={Settings} label="Settings" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <KPI Icon={Users} label="Total Users" value="48.2k" trend="+9.2%" />
              <KPI Icon={Building2} label="Listed Orgs" value="36" trend="+2" />
              <KPI Icon={User} label="Professionals" value="142" trend="+12" />
              <KPI Icon={Activity} label="API Health" value="99.97%" trend="stable" />
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-3xl glass-strong p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">System Incidents</h2>
                    <p className="text-xs text-muted-foreground">Click for details</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {incidents.map((i) => (
                    <li 
                      key={i.id} 
                      onClick={() => setModalData({ title: "Incident Report", data: i })}
                      className="flex items-start gap-3 rounded-2xl border border-white/50 bg-white/40 p-3 backdrop-blur cursor-pointer hover:bg-white/60 transition"
                    >
                      <span className={cn("mt-1 h-2 w-2 shrink-0 rounded-full", i.severity === "med" ? "bg-amber-500" : "bg-emerald-500")} />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium leading-tight">{i.title}</div>
                        <div className="text-xs text-muted-foreground">{i.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl glass-strong p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Platform Growth</h2>
                    <p className="text-xs text-muted-foreground">New signups last 12 weeks</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/50 bg-gradient-to-b from-white/40 to-transparent p-4 backdrop-blur cursor-pointer hover:border-white/80 transition" onClick={() => toast.info("Opening detailed analytics report...")}>
                  <div className="mb-3 flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-bold tracking-tight">+1,284</div>
                    </div>
                    <div className="text-xs font-medium text-emerald-600">▲ 22.6%</div>
                  </div>
                  <div className="flex h-32 items-end gap-1.5">
                    {sparkline.map((v, i) => (
                      <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-emerald-400 opacity-80 transition hover:opacity-100" style={{ height: `${(v / 90) * 100}%` }} />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ORGANIZERS TAB */}
        {activeTab === "organizers" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl glass-strong p-6">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Listed Businesses</h2>
                  <p className="text-sm text-muted-foreground">Click a business to view integration details.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search businesses..."
                    className="border-white/50 bg-white/50 pl-9 backdrop-blur"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {visiblePartners.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setModalData({ title: "Business Integration Details", data: p })}
                    className="flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/40 p-4 backdrop-blur transition hover:bg-white/60 cursor-pointer sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{p.category} · {p.users.toLocaleString()} users</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <StatusBadge status={p.status} />
                      {p.status === "pending" && (
                        <Button size="sm" onClick={() => setStatus(p.id, "approved", `${p.name} approved to list`)}>Approve</Button>
                      )}
                      {p.status === "approved" && (
                        <Button size="sm" variant="outline" onClick={() => setStatus(p.id, "suspended", `${p.name} listing suspended`)}>Suspend</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PROFESSIONALS TAB */}
        {activeTab === "professionals" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl glass-strong p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Professional Directory</h2>
                <p className="text-sm text-muted-foreground">Click a professional to view their credentials.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {professionals.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => setModalData({ title: "Professional Credentials", data: p })}
                    className="rounded-2xl border border-white/50 bg-white/40 p-4 backdrop-blur cursor-pointer hover:bg-white/60 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {p.name.charAt(0)}{p.name.charAt(4)}
                        </div>
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.specialty}</div>
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        {p.verified ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full"><CheckCircle2 className="h-3 w-3"/> Verified</span>
                        ) : (
                          <Button size="sm" variant="secondary" className="h-7 text-xs" onClick={() => toast.success(`${p.name} verified`)}>Verify</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl glass-strong p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold">User Management</h2>
                <p className="text-sm text-muted-foreground">Click a user to view their account and connected modules.</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/50">
                <table className="w-full text-sm">
                  <thead className="bg-white/40 backdrop-blur text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsersList.map((u, i) => (
                      <tr 
                        key={u.id} 
                        onClick={() => setModalData({ title: "User Profile Overview", data: u })}
                        className={cn("cursor-pointer hover:bg-white/40 transition", i % 2 ? "bg-white/20" : "")}
                      >
                        <td className="px-4 py-3 font-medium">{u.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                        <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl glass-strong p-6 flex flex-col items-center justify-center text-center py-20 cursor-pointer hover:bg-white/10 transition" onClick={() => toast.info("Exporting CSV report...")}>
              <PieChart className="h-12 w-12 text-primary/40 mb-4" />
              <h2 className="text-xl font-bold mb-2">Advanced Analytics</h2>
              <p className="text-muted-foreground max-w-sm">Click to export comprehensive CSV reports on user engagement and business listings.</p>
            </section>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl glass-strong p-6">
              <h2 className="text-xl font-bold mb-6">Platform Settings</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="text-sm font-medium">Platform Name</label>
                  <Input defaultValue="TenaGulecha" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Support Email</label>
                  <Input defaultValue="support@tenagulecha.com" className="mt-1" />
                </div>
                <div className="pt-4 border-t border-white/20 flex gap-2">
                  <Button onClick={() => toast.success("Settings saved successfully")}>Save Changes</Button>
                  <Button variant="destructive" onClick={() => toast.warning("Maintenance mode initiated")}>Enable Maintenance Mode</Button>
                </div>
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
        active 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function KPI({ Icon, label, value, trend }: { Icon: any; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl glass p-4 hover:border-white/80 transition cursor-pointer" onClick={() => toast.info(`Viewing detailed chart for ${label}`)}>
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-medium text-emerald-600">{trend}</span>
      </div>
      <div className="mt-2 text-xl font-bold tracking-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: PartnerStatus }) {
  const map = {
    approved: { Icon: CheckCircle2, cls: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/20", label: "Approved" },
    pending: { Icon: AlertTriangle, cls: "bg-amber-500/15 text-amber-700 ring-amber-500/20", label: "Pending" },
    suspended: { Icon: XCircle, cls: "bg-rose-500/15 text-rose-700 ring-rose-500/20", label: "Suspended" },
  }[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1", map.cls)}>
      <map.Icon className="h-3 w-3" /> {map.label}
    </span>
  );
}
