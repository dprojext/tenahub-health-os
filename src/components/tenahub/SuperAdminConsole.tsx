import { useState } from "react";
import { toast } from "sonner";
import {
  Shield, Users, Building2, Activity, AlertTriangle, CheckCircle2,
  XCircle, TrendingUp, Search, LayoutDashboard, User, Settings, PieChart, X,
  Layers, Plus, Globe, Download, FileText, Database
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

const initialProfessionals = [
  { id: 1, name: "Dr. Selamawit Tadesse", specialty: "General Medicine", rating: "4.9", verified: true, license: "MED-2014-8892", patients: 142, clinic: "Addis Hospital", experience: "15 Years" },
  { id: 2, name: "Ato Yonas Mekuria", specialty: "Physiotherapy", rating: "4.7", verified: true, license: "PHY-2018-334", patients: 86, clinic: "Kazanchis Rehab", experience: "8 Years" },
  { id: 3, name: "Dr. Aster Mekonnen", specialty: "Cardiology", rating: "-", verified: false, license: "MED-2022-110", patients: 0, clinic: "Bethel Heart Clinic", experience: "12 Years" },
  { id: 4, name: "Dr. Dawit Alemu", specialty: "Cardiology", rating: "5.0", verified: true, license: "MED-2011-002", patients: 320, clinic: "Bethel Heart Clinic", experience: "20 Years" },
];

const allUsersList = [
  { id: 1, name: "Dawit Alemu", email: "dawit@example.com", role: "User", joined: "2 weeks ago", activeModules: ["Heart Tracker", "Step Counter"], location: "Addis Ababa" },
  { id: 2, name: "Hanna Bekele", email: "hanna@example.com", role: "User", joined: "1 month ago", activeModules: ["Mental Health Journal"], location: "Dire Dawa" },
  { id: 3, name: "Marta Girma", email: "marta@example.com", role: "User", joined: "3 months ago", activeModules: [], location: "Hawassa" },
  { id: 4, name: "Solomon Kebede", email: "solomon@example.com", role: "User", joined: "6 months ago", activeModules: ["Physio Hub"], location: "Addis Ababa" },
];

const incidents = [
  { id: 1, severity: "low", title: "Webhook latency spike — YeneHealth", time: "12m ago", details: "Response time exceeded 2000ms for 3 consecutive pings." },
  { id: 2, severity: "med", title: "Failed signature on /api/public/webhook", time: "1h ago", details: "Multiple unauthorized requests blocked by WAF." },
];

const sparkline = [22, 30, 28, 41, 38, 52, 47, 60, 58, 71, 68, 80];

import { Globe2 } from "lucide-react";

type AdminTab = "dashboard" | "users" | "organizers" | "professionals" | "miniapps" | "submissions" | "analytics" | "reports" | "database" | "translations" | "settings";

export function SuperAdminConsole() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [partners, setPartners] = useState(initialPartners);
  const [filter, setFilter] = useState("");
  
  // Marketplace / Mini Apps State
  const [marketplace, setMarketplace] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tenahub_marketplace");
      if (stored) {
        try { return JSON.parse(stored); } catch (e) {}
      }
    }
    return [
      { id: "yenehealth", name: "YeneHealth", tagline: "Maternal & Postpartum Care", category: "Maternal Health" },
    ];
  });
  
  // Add Mini App State
  const [showAddMiniApp, setShowAddMiniApp] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [newAppTagline, setNewAppTagline] = useState("");
  const [newAppCategory, setNewAppCategory] = useState("General Wellness");
  const [newAppDeveloper, setNewAppDeveloper] = useState("");
  const [newAppUrl, setNewAppUrl] = useState("");

  // Modal State
  const [modalData, setModalData] = useState<{ title: string, data: any } | null>(null);

  const setStatus = (id: number, status: PartnerStatus, label: string) => {
    setPartners((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success(label);
  };

  const handleAddMiniApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName || !newAppTagline || !newAppDeveloper) {
      toast.error("Please fill in all mini-app details.");
      return;
    }
    const newApp = {
      id: "app_" + Date.now(),
      name: newAppName,
      tagline: newAppTagline,
      category: newAppCategory,
      developer: newAppDeveloper,
      url: newAppUrl,
      status: "Active",
      dateAdded: new Date().toLocaleDateString()
    };
    const updated = [...marketplace, newApp];
    setMarketplace(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("tenahub_marketplace", JSON.stringify(updated));
    }
    setShowAddMiniApp(false);
    setNewAppName("");
    setNewAppTagline("");
    setNewAppDeveloper("");
    toast.success("Mini App Added to Marketplace!");
  };

  const visiblePartners = partners.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[70vh] relative">
      
      {/* Modal Overlay for Details */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setModalData(null)} 
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">{modalData.title}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {Object.entries(modalData.data).map(([key, value]) => {
                if (key === "Icon" || key === "accent") return null;
                return (
                  <div key={key} className="flex flex-col border-b border-border pb-2 bg-white/5 rounded-lg p-3">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-semibold text-foreground/90">{Array.isArray(value) ? value.join(", ") || "None" : String(value)}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setModalData(null)}>Close Window</Button>
              <Button onClick={() => { toast.success("Action logged."); setModalData(null); }}>Manage Entity</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Mini App Modal */}
      {showAddMiniApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAddMiniApp(false)} 
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Mini App</h3>
            <form onSubmit={handleAddMiniApp} className="space-y-4">
              <div>
                <label className="text-sm font-medium">App Name</label>
                <Input value={newAppName} onChange={(e) => setNewAppName(e.target.value)} placeholder="e.g. HealthTracker" />
              </div>
              <div>
                <label className="text-sm font-medium">Developer / Company</label>
                <Input value={newAppDeveloper} onChange={(e) => setNewAppDeveloper(e.target.value)} placeholder="e.g. TenaHub Labs" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={newAppCategory} onChange={(e) => setNewAppCategory(e.target.value)}
                >
                  <option>Mental Health</option>
                  <option>Maternal Health</option>
                  <option>Physical Therapy</option>
                  <option>General Wellness</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tagline</label>
                <Input value={newAppTagline} onChange={(e) => setNewAppTagline(e.target.value)} placeholder="Short description" />
              </div>
              <div>
                <label className="text-sm font-medium">App URL / Link</label>
                <Input value={newAppUrl} onChange={(e) => setNewAppUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-border mt-4">
                <Button type="button" variant="outline" onClick={() => setShowAddMiniApp(false)}>Cancel</Button>
                <Button type="submit">Publish App</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 bg-card border border-border p-4 h-fit rounded-3xl flex flex-row overflow-x-auto gap-2 md:flex-col md:gap-0 md:space-y-1 scrollbar-hide">
        <div className="px-3 py-2 mb-2 hidden md:flex items-center gap-2 shrink-0">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg tracking-tight">Super Admin</span>
        </div>
        <div className="h-px bg-border my-2 mx-3 hidden md:block"></div>
        <NavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={LayoutDashboard} label="Dashboard" />
        <NavButton active={activeTab === "users"} onClick={() => setActiveTab("users")} icon={Users} label="Users" />
        <NavButton active={activeTab === "organizers"} onClick={() => setActiveTab("organizers")} icon={Building2} label="Listed Businesses" />
        <NavButton active={activeTab === "professionals"} onClick={() => setActiveTab("professionals")} icon={User} label="Professionals" />
        <NavButton active={activeTab === "miniapps"} onClick={() => setActiveTab("miniapps")} icon={Layers} label="Mini Apps" />
        <NavButton active={activeTab === "submissions"} onClick={() => setActiveTab("submissions")} icon={Activity} label="Submissions" />
        <NavButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={PieChart} label="Analytics" />
        <NavButton active={activeTab === "reports"} onClick={() => setActiveTab("reports")} icon={FileText} label="Reports" />
        <NavButton active={activeTab === "database"} onClick={() => setActiveTab("database")} icon={Database} label="Database" />
        <NavButton active={activeTab === "translations"} onClick={() => setActiveTab("translations")} icon={Globe2} label="Translations" />
        <NavButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={Settings} label="Settings" />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 space-y-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <KPI Icon={Users} label="Total Users" value={String(allUsersList.length)} trend="+1 Today" />
              <KPI Icon={Building2} label="Listed Orgs" value={String(partners.length)} trend="+0 Today" />
              <KPI Icon={User} label="Professionals" value={String(initialProfessionals.length)} trend="+2 This Week" />
              <KPI Icon={Layers} label="Mini Apps" value={String(marketplace.length)} trend="+1 New" />
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <section className="rounded-3xl bg-card border border-border p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
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
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background p-3 cursor-pointer hover:bg-accent/40 transition"
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

              <section className="rounded-3xl bg-card border border-border p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Platform Growth</h2>
                    <p className="text-xs text-muted-foreground">New signups last 12 weeks</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4 cursor-pointer hover:border-primary/50 transition" onClick={() => toast.info("Opening detailed analytics report...")}>
                  <div className="mb-3 flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-bold tracking-tight">+1,284</div>
                    </div>
                    <div className="text-xs font-medium text-emerald-600">▲ 22.6%</div>
                  </div>
                  <div className="flex h-32 items-end gap-1.5">
                    {sparkline.map((v, i) => (
                      <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/50 to-primary/20 opacity-80 transition hover:opacity-100" style={{ height: `${(v / 90) * 100}%` }} />
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
            <section className="rounded-3xl bg-card border border-border p-6">
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
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {visiblePartners.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setModalData({ title: "Business Integration Details", data: p })}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 transition hover:bg-accent/40 cursor-pointer sm:flex-row sm:items-center sm:justify-between"
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
            <section className="rounded-3xl bg-card border border-border p-6">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Professional Directory</h2>
                  <p className="text-sm text-muted-foreground">List of all healthcare professionals on the platform.</p>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {initialProfessionals.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => setModalData({ title: "Professional Profile", data: p })}
                    className="rounded-2xl border border-border bg-background p-4 cursor-pointer hover:bg-accent/40 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {p.name.charAt(0)}{p.name.charAt(4)}
                      </div>
                      <div>
                        <div className="font-semibold text-base flex items-center gap-2">
                          {p.name}
                          {p.verified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                        </div>
                        <div className="text-sm text-muted-foreground">{p.specialty} · {p.clinic}</div>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-medium">{p.patients} Patients</div>
                      <div className="text-xs text-muted-foreground">Rating: {p.rating}</div>
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
            <section className="rounded-3xl bg-card border border-border p-6">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">User Management</h2>
                  <p className="text-sm text-muted-foreground">Click a user to view their account and connected modules.</p>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                {allUsersList.map((u) => (
                  <div 
                    key={u.id} 
                    onClick={() => setModalData({ title: "User Profile Overview", data: u })}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-background p-4 shadow-sm transition hover:shadow-md cursor-pointer hover:border-primary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold shrink-0">
                        {u.name.charAt(0)}{u.name.split(" ")[1]?.charAt(0) || u.name.charAt(1)}
                      </div>
                      <div>
                        <div className="font-semibold text-base">{u.name}</div>
                        <div className="text-sm text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md inline-block">{u.role}</div>
                      <div className="text-[10px] text-muted-foreground mt-2 uppercase">Joined {u.joined}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* MINI APPS TAB */}
        {activeTab === "miniapps" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl bg-card border border-border p-6">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Marketplace Modules</h2>
                  <p className="text-sm text-muted-foreground">View and add verified mini-apps.</p>
                </div>
                <Button onClick={() => setShowAddMiniApp(true)}><Plus className="h-4 w-4 mr-1"/> Add App</Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {marketplace.map((m, i) => (
                  <div key={i} onClick={() => setModalData({ title: "Mini App Details", data: m })} className="p-4 border border-border rounded-2xl bg-background hover:bg-accent/40 cursor-pointer transition">
                    <div className="flex justify-between">
                      <div className="font-semibold text-lg">{m.name}</div>
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{m.category}</div>
                    <p className="text-sm mt-3">{m.tagline}</p>
                    {m.developer && <div className="text-xs text-muted-foreground mt-2">By {m.developer}</div>}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">System Analytics</h2>
                <p className="text-sm text-muted-foreground mt-1">Platform-wide usage and performance data.</p>
              </div>
              <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Export Report</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Traffic Overview */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-6">Daily Active Users (DAU)</h3>
                <div className="flex h-48 items-end gap-2 px-2 mt-4">
                  {[25, 45, 60, 50, 80, 75, 90, 85, 100, 95].map((h, i) => (
                    <div key={i} className="group relative w-full flex flex-col items-center justify-end h-full">
                      <div className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-background border border-border px-1.5 py-0.5 rounded shadow">
                        {h}k
                      </div>
                      <div className="w-full bg-blue-500/20 rounded-t-sm hover:bg-blue-500 transition-colors" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                  <span>10 Days Ago</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Module Usage */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-6">Mini-App Popularity</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">Maternal Health (YeneHealth)</span><span>45%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[45%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">Mental Wellness (Zema)</span><span>30%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[30%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">Physiotherapy Hub</span><span>15%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[15%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">Other Modules</span><span>10%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[10%]"></div></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">API Call Distribution</h3>
                <p className="text-sm text-muted-foreground">Most API traffic originates from profile synchronization and third-party integrations.</p>
              </div>
              <div className="h-40 w-40 rounded-full shadow-inner border-4 border-border shrink-0"
                style={{
                  background: "conic-gradient(from 0deg, #3b82f6 0% 50%, #10b981 50% 80%, #f59e0b 80% 100%)"
                }}
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-blue-500"/> Data Sync (50%)</div>
                <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-emerald-500"/> Partner Webhooks (30%)</div>
                <div className="flex items-center gap-2 text-sm"><div className="w-3 h-3 rounded-full bg-amber-500"/> Authentication (20%)</div>
              </div>
            </div>
          </div>
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === "submissions" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl bg-card border border-border p-6">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">Pending Mini-App Submissions</h2>
                  <p className="text-sm text-muted-foreground">Review apps submitted from the landing page form.</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { name: "MyCalm Meditation", developer: "Wellness Labs Ltd.", category: "Mental Health", tagline: "Daily guided mindfulness and mental resilience.", features: ["Guided Meditation", "Mood Tracking"], pricing: "Free" },
                  { name: "NutriPlan Pro", developer: "Healthy Life Inc.", category: "Fitness & Nutrition", tagline: "Custom diet tracking for chronic diseases.", features: ["Diet Planning", "Calorie Counter"], pricing: "Premium 100 ETB/mo" }
                ].map((sub, i) => (
                  <div 
                    key={i}
                    onClick={() => setModalData({ title: "Submission Details", data: sub })}
                    className="p-4 border border-border rounded-2xl bg-background flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between cursor-pointer hover:border-primary/50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Layers className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{sub.name}</div>
                        <div className="text-sm text-muted-foreground">{sub.developer} · {sub.category}</div>
                        <div className="text-xs mt-1 text-foreground/80">"{sub.tagline}"</div>
                      </div>
                    </div>
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" variant="outline" onClick={() => toast.error("Submission rejected.")}>Reject</Button>
                      <Button size="sm" onClick={() => toast.success(`${sub.name} approved and added to marketplace!`)}>Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* REPORTS TAB */}
        {activeTab === "reports" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">System Reports</h2>
                <p className="text-sm text-muted-foreground mt-1">Generate and download comprehensive system reports.</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-full group hover:border-primary/50 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">User Activity Log</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Detailed export of user logins, module usage, and profile syncs over the last 30 days.</p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => toast.success("Generating Activity Log (PDF)...")}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-full group hover:border-primary/50 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Financial & Billing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Complete transaction history, partner payouts, and platform fee collections.</p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => toast.success("Generating Financial Report (CSV)...")}>
                  <Download className="mr-2 h-4 w-4" /> Download CSV
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-full group hover:border-primary/50 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">API Usage & Health</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Endpoint latencies, error rates, and total calls aggregated by partner organization.</p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => toast.success("Generating API Health Report (Excel)...")}>
                  <Download className="mr-2 h-4 w-4" /> Download Excel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* DATABASE TAB */}
        {activeTab === "database" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold mb-2">Backend Connection Setup</h2>
              <p className="text-sm text-muted-foreground mb-6">Configure where the application stores and retrieves its data.</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-primary bg-primary/5 rounded-2xl relative cursor-pointer transition">
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase">Active</div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
                      <Database className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Local Storage Mode</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Data is stored entirely within the browser's LocalStorage. This mode requires no setup and is currently active for the demo.
                  </p>
                  <Button className="w-full" disabled>Currently Selected</Button>
                </div>

                <div className="p-6 border border-border bg-background rounded-2xl relative cursor-pointer hover:border-emerald-500/50 transition" onClick={() => toast.info("Supabase integration is locked for the demo mode.")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Database className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold">Supabase Cloud</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect to a real-time Postgres database via Supabase. Note: Changing the backend might alter login credentials and invalidate existing demo data.
                  </p>
                  <Button variant="outline" className="w-full">Switch to Supabase</Button>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 text-amber-600">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <p className="text-sm">
                  <strong>Warning:</strong> Changing the backend configuration will immediately reload the application. Any unsynced local data will not automatically transfer to the cloud database.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => toast.success("Database synchronized successfully!")} className="bg-emerald-600 hover:bg-emerald-700">
                  <Activity className="mr-2 h-4 w-4" /> Sync Database
                </Button>
              </div>
            </section>
          </div>
        )}

        {/* TRANSLATIONS TAB */}
        {activeTab === "translations" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="rounded-3xl bg-card border border-border p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Localization & Translations</h2>
                  <p className="text-sm text-muted-foreground">Manage Amharic (አማርኛ) and English string translations.</p>
                </div>
                <Button onClick={() => toast.success("Translations saved and published.")}>Publish Translations</Button>
              </div>

              <div className="rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3">Key (Component)</th>
                      <th className="px-4 py-3">English (Default)</th>
                      <th className="px-4 py-3">Amharic (አማርኛ)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-background">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">nav.dashboard</td>
                      <td className="px-4 py-3"><Input defaultValue="Dashboard" className="h-8" /></td>
                      <td className="px-4 py-3"><Input defaultValue="ዳሽቦርድ" className="h-8" /></td>
                    </tr>
                    <tr className="bg-background">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">nav.appointments</td>
                      <td className="px-4 py-3"><Input defaultValue="Appointments" className="h-8" /></td>
                      <td className="px-4 py-3"><Input defaultValue="ቀጠሮዎች" className="h-8" /></td>
                    </tr>
                    <tr className="bg-background">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">hero.title</td>
                      <td className="px-4 py-3"><Input defaultValue="HEALTH MANAGEMENT" className="h-8" /></td>
                      <td className="px-4 py-3"><Input defaultValue="የጤና አያያዝ" className="h-8" /></td>
                    </tr>
                    <tr className="bg-background">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">button.login</td>
                      <td className="px-4 py-3"><Input defaultValue="Log In" className="h-8" /></td>
                      <td className="px-4 py-3"><Input defaultValue="ግባ" className="h-8" /></td>
                    </tr>
                    <tr className="bg-background">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">button.signup</td>
                      <td className="px-4 py-3"><Input defaultValue="Sign Up" className="h-8" /></td>
                      <td className="px-4 py-3"><Input defaultValue="ተመዝገብ" className="h-8" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Platform Settings</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <section className="rounded-3xl bg-card border border-border p-6 hover:border-primary/50 transition">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> General Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Platform Name</label>
                    <Input defaultValue="TenaGulecha" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Support Email</label>
                    <Input defaultValue="support@tenagulecha.com" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Default Language</label>
                    <select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm mt-1">
                      <option>English</option>
                      <option>Amharic</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-card border border-border p-6 hover:border-primary/50 transition">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Landing Page Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hero Title</label>
                    <Input defaultValue="HEALTH MANAGEMENT, MADE TRANSPARENT." className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hero Subtitle</label>
                    <textarea 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1 resize-none"
                      rows={4}
                      defaultValue="TenaGulecha acts as an operating system for your health journey. Whether you are an individual tracking wellness goals or an organizer running a clinic, our transparent ecosystem brings everything together seamlessly."
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-card border border-border p-6 lg:col-span-2 hover:border-primary/50 transition">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Global Theme Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-4 rounded-2xl bg-background border border-border flex flex-col items-center justify-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Primary Color</label>
                    <input type="color" defaultValue="#3b82f6" className="h-12 w-20 p-0 border-0 rounded-lg cursor-pointer" onChange={(e) => document.documentElement.style.setProperty('--primary', e.target.value)} />
                  </div>
                  <div className="p-4 rounded-2xl bg-background border border-border flex flex-col items-center justify-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Background Color</label>
                    <input type="color" defaultValue="#020817" className="h-12 w-20 p-0 border-0 rounded-lg cursor-pointer" onChange={(e) => document.documentElement.style.setProperty('--background', e.target.value)} />
                  </div>
                  <div className="p-4 rounded-2xl bg-background border border-border flex flex-col items-center justify-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Card Color</label>
                    <input type="color" defaultValue="#0f172a" className="h-12 w-20 p-0 border-0 rounded-lg cursor-pointer" onChange={(e) => document.documentElement.style.setProperty('--card', e.target.value)} />
                  </div>
                  <div className="p-4 rounded-2xl bg-background border border-border flex flex-col items-center justify-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Text Foreground</label>
                    <input type="color" defaultValue="#f8fafc" className="h-12 w-20 p-0 border-0 rounded-lg cursor-pointer" onChange={(e) => document.documentElement.style.setProperty('--foreground', e.target.value)} />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center">Changes are previewed immediately via CSS variables. Click "Save All Changes" to persist.</p>
              </section>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
              <Button variant="destructive" onClick={() => toast.warning("Maintenance mode initiated")}>Enable Maintenance Mode</Button>
              <Button onClick={() => toast.success("Global platform settings updated successfully")} className="bg-emerald-600 hover:bg-emerald-700 text-white">Save All Changes</Button>
            </div>
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
        "flex shrink-0 w-auto md:w-full items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all",
        active 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function KPI({ Icon, label, value, trend }: { Icon: any; label: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4 hover:border-primary/50 transition cursor-pointer" onClick={() => toast.info(`Viewing detailed chart for ${label}`)}>
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-primary" />
        <span className={cn("text-[10px] font-medium", trend.includes("+") ? "text-emerald-500" : "text-muted-foreground")}>{trend}</span>
      </div>
      <div className="mt-2 text-xl font-bold tracking-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: PartnerStatus }) {
  const map = {
    approved: { Icon: CheckCircle2, cls: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20", label: "Approved" },
    pending: { Icon: AlertTriangle, cls: "bg-amber-500/10 text-amber-600 border border-amber-500/20", label: "Pending" },
    suspended: { Icon: XCircle, cls: "bg-rose-500/10 text-rose-600 border border-rose-500/20", label: "Suspended" },
  }[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium", map.cls)}>
      <map.Icon className="h-3 w-3" /> {map.label}
    </span>
  );
}