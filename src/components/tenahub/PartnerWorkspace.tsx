import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Users,
  Activity,
  Code2,
  Settings,
  Key,
  Database,
  BarChart3,
  Copy,
  CheckCircle2,
  AlertTriangle,
  FileText,
  UserCircle2,
  Edit3,
  X,
  Calendar,
  Plus,
  Trash2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Layers,
  Shield,
  Award,
  Globe,
  PlusCircle,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ProfilePage } from "./ProfilePage";

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────

type WorkspaceTab = "dashboard" | "patients" | "appointments" | "portal" | "profile" | "analytics" | "reports";

interface Patient {
  id: number;
  name: string;
  age: number;
  email: string;
  status: string;
  connectionDate: string;
  lastSync: string;
}

// ─── DEFAULTS (FALLBACKS) ────────────────────────────────────────────────────

const defaultOrganizations = [
  {
    id: 1, name: "Bethel Heart Clinic", category: "Hospital / Cardiology Center", location: "Addis Ababa",
    Icon: "Building2", tagline: "Advanced cardiovascular care.",
    accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
    description: "Bethel Heart Clinic is the premier cardiovascular care center in Addis Ababa, equipped with state-of-the-art diagnostic and treatment facilities.",
    services: ["Echocardiography", "Cardiac Catheterization", "Heart Surgery", "Cardiac Rehabilitation", "Emergency Cardiac Care", "Preventive Screening"],
    operatingHours: "Mon–Sat: 7:00 AM – 8:00 PM",
    phone: "+251 115 551234",
    email: "info@bethelheartclinic.et",
    website: "www.bethelheartclinic.et",
    address: "Bole Sub-city, Woreda 03, Addis Ababa",
    established: "2012",
    accreditations: ["Ethiopian Health Authority", "WHO Partner Clinic", "ISO 9001:2015"],
    teamSize: "45+ medical professionals",
  }
];

const defaultProfessionals = [
  {
    id: 3, name: "Dr. Dawit Alemu", specialty: "Cardiology", rating: "5.0", verified: true,
    Icon: "Heart", category: "Specialist", tagline: "Heart health expert",
    accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
    description: "Dr. Dawit is a leading cardiologist in Addis Ababa with expertise in echocardiography, heart failure management, and preventive cardiology.",
    services: ["Echocardiography", "Cardiac Catheterization", "Heart Surgery", "Cardiac Rehabilitation", "Emergency Cardiac Care", "Preventive Screening"],
    education: "MD, Cardiology Fellowship — Tikur Anbessa Hospital",
    languages: ["Amharic", "English", "French"],
    location: "Bethel Heart Clinic, Addis Ababa",
    phone: "+251 933 112233",
    email: "dr.dawit@tenahub.com",
    consultationFee: "800 ETB",
    availableSlots: {
      "Jun 09": ["10:00", "11:00", "14:00"],
      "Jun 10": ["09:00", "10:30", "14:00", "16:00"],
      "Jun 11": ["09:00", "11:00", "14:30"],
      "Jun 12": ["08:30", "10:00", "13:00", "15:00"],
    },
  }
];

const defaultMarketplace = [
  {
    id: "yenehealth", name: "YeneHealth", tagline: "Maternal & Postpartum Care", category: "Maternal Health",
    Icon: "Baby", accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
    description: "YeneHealth is a comprehensive maternal health module that tracks your pregnancy journey, provides personalized nutrition guides, connects you with certified midwives, and offers postpartum mental health support.",
    features: ["Pregnancy week-by-week tracker", "Personalized nutrition plans", "Virtual midwife consultations", "Postpartum mood tracker", "Baby development milestones", "Community forum for mothers"],
    benefits: ["24/7 access to maternal health resources", "Personalized care plans", "Direct messaging with midwives", "Integration with your Unified Health Profile"],
    pricing: "Free basic plan · Premium at 199 ETB/month",
  }
];

const initialAppointments = [
  { id: 1, title: "Cardiology Follow-up", clinic: "Bethel Heart Clinic", date: "Jun 10, 09:30", status: "Confirmed" },
  { id: 2, title: "Annual Blood Work", clinic: "Addis Diagnostics", date: "Jun 14, 14:00", status: "Confirmed" },
];

export function PartnerWorkspace() {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("dashboard");
  const [modalData, setModalData] = useState<{ title: string, data: any } | null>(null);

  // ─── STATE LINKED TO LOCAL STORAGE ─────────────────────────────────────────
  const [organizations, setOrganizations] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_organizations");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return defaultOrganizations;
  });

  const [professionals, setProfessionals] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_professionals");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return defaultProfessionals;
  });

  const [marketplace, setMarketplace] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_marketplace");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return defaultMarketplace;
  });

  const [appointments, setAppointments] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_appointments");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    return initialAppointments;
  });

  // Current Organization (Bethel Heart Clinic id:1 is the organizer)
  const myOrg = organizations.find((o) => o.id === 1) || defaultOrganizations[0];

  // Doctors belonging to Bethel Heart Clinic
  const myDoctors = professionals.filter((p) => p.location.toLowerCase().includes("bethel"));

  // Appointments for Bethel Heart Clinic
  const myAppointments = appointments.filter((app) => app.clinic.toLowerCase().includes("bethel"));

  // ─── REGISTERED PATIENTS STATE ─────────────────────────────────────────────
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Dawit Alemu", age: 34, email: "dawit@example.com", status: "Active", connectionDate: "Jan 12, 2026", lastSync: "Today, 09:30 AM" },
    { id: 2, name: "Aster Mekonnen", age: 28, email: "aster@bethelclinic.com", status: "Active", connectionDate: "Feb 05, 2026", lastSync: "Yesterday, 04:15 PM" },
    { id: 3, name: "Solomon Kebede", age: 45, email: "solomon@example.com", status: "Inactive", connectionDate: "Nov 20, 2025", lastSync: "May 28, 2026" },
    { id: 4, name: "Tigist Demeke", age: 31, email: "tigist@example.com", status: "Active", connectionDate: "Mar 18, 2026", lastSync: "Today, 11:20 AM" },
  ]);

  // ─── PORTAL EDITOR SUB-STATES ──────────────────────────────────────────────
  const [editTagline, setEditTagline] = useState(myOrg.tagline);
  const [editDescription, setEditDescription] = useState(myOrg.description);
  const [editHours, setEditHours] = useState(myOrg.operatingHours);
  const [editPhone, setEditPhone] = useState(myOrg.phone);
  const [editEmail, setEditEmail] = useState(myOrg.email);
  const [editWebsite, setEditWebsite] = useState(myOrg.website);
  const [editAddress, setEditAddress] = useState(myOrg.address);
  const [newService, setNewService] = useState("");

  // Doctor Form
  const [docName, setDocName] = useState("");
  const [docSpecialty, setDocSpecialty] = useState("Cardiology");
  const [docFee, setDocFee] = useState("500 ETB");
  const [docTagline, setDocTagline] = useState("");
  const [docDescription, setDocDescription] = useState("");

  // ─── MINI APPS FORM STATES ─────────────────────────────────────────────────
  const [miniName, setMiniName] = useState("");
  const [miniTagline, setMiniTagline] = useState("");
  const [miniCategory, setMiniCategory] = useState("General Wellness");
  const [miniDesc, setMiniDesc] = useState("");
  const [miniFeatures, setMiniFeatures] = useState("");
  const [miniBenefits, setMiniBenefits] = useState("");
  // ─── APPOINTMENT FORM STATES ───────────────────────────────────────────────
  const [showAddApptModal, setShowAddApptModal] = useState(false);
  const [newApptTitle, setNewApptTitle] = useState("");
  const [newApptDate, setNewApptDate] = useState("");

  // ─── HANDLERS ──────────────────────────────────────────────────────────────

  const handleUpdatePortal = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedOrg = {
      ...myOrg,
      tagline: editTagline,
      description: editDescription,
      operatingHours: editHours,
      phone: editPhone,
      email: editEmail,
      website: editWebsite,
      address: editAddress,
    };
    const newOrgs = organizations.map((o) => (o.id === 1 ? updatedOrg : o));
    setOrganizations(newOrgs);
    localStorage.setItem("tenahub_organizations", JSON.stringify(newOrgs));
    toast.success("Public portal details updated successfully!");
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.trim()) return;
    const updatedOrg = {
      ...myOrg,
      services: [...myOrg.services, newService.trim()],
    };
    const newOrgs = organizations.map((o) => (o.id === 1 ? updatedOrg : o));
    setOrganizations(newOrgs);
    localStorage.setItem("tenahub_organizations", JSON.stringify(newOrgs));
    setNewService("");
    toast.success("New medical service registered!");
  };

  const handleRemoveService = (service: string) => {
    const updatedOrg = {
      ...myOrg,
      services: myOrg.services.filter((s: string) => s !== service),
    };
    const newOrgs = organizations.map((o) => (o.id === 1 ? updatedOrg : o));
    setOrganizations(newOrgs);
    localStorage.setItem("tenahub_organizations", JSON.stringify(newOrgs));
    toast.success("Medical service removed!");
  };

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docTagline.trim()) {
      toast.error("Please fill in required doctor details.");
      return;
    }
    const newDoc = {
      id: professionals.length + 20,
      name: docName.trim(),
      specialty: docSpecialty,
      rating: "5.0",
      verified: true,
      Icon: "Heart",
      category: "Specialist",
      tagline: docTagline.trim(),
      accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
      description: docDescription.trim() || "Consulting medical specialist at Bethel Heart Clinic.",
      services: myOrg.services.slice(0, 3),
      education: "MD Specialist Degree",
      languages: ["Amharic", "English"],
      location: "Bethel Heart Clinic, Addis Ababa",
      phone: editPhone,
      email: editEmail,
      consultationFee: docFee,
      availableSlots: {
        "Jun 09": ["09:00", "10:00", "11:00", "14:00"],
        "Jun 10": ["09:30", "11:00", "14:00", "16:00"],
      },
    };
    const updatedDocs = [...professionals, newDoc];
    setProfessionals(updatedDocs);
    localStorage.setItem("tenahub_professionals", JSON.stringify(updatedDocs));
    setDocName("");
    setDocTagline("");
    setDocDescription("");
    toast.success(`Registered Dr. ${newDoc.name} as active staff!`);
  };

  const handleRemoveDoctor = (id: number) => {
    const updatedDocs = professionals.filter((p) => p.id !== id);
    setProfessionals(updatedDocs);
    localStorage.setItem("tenahub_professionals", JSON.stringify(updatedDocs));
    toast.success("Doctor removed from active clinic staff.");
  };

  const handleTogglePatient = (id: number) => {
    setPatients(
      patients.map((pat) =>
        pat.id === id ? { ...pat, status: pat.status === "Active" ? "Inactive" : "Active" } : pat
      )
    );
    toast.info("Connection status toggled.");
  };

  const handleCancelAppointment = (id: number) => {
    const updatedApps = appointments.filter((app) => app.id !== id);
    setAppointments(updatedApps);
    localStorage.setItem("tenahub_appointments", JSON.stringify(updatedApps));
    toast.success("Appointment cancelled and removed from active schedule.");
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptTitle || !newApptDate) {
      toast.error("Please fill in all appointment details.");
      return;
    }
    
    // Calculate waiting time: 4 mins per existing appointment
    const waitingTimeMins = myAppointments.length * 4;
    const waitText = waitingTimeMins > 0 ? `Estimated Wait: ~${waitingTimeMins} mins` : "No wait time";

    const newAppt = {
      id: Date.now(),
      title: newApptTitle,
      clinic: myOrg.name,
      date: newApptDate,
      status: "Confirmed",
      waitingTime: waitText
    };
    const updatedApps = [...appointments, newAppt];
    setAppointments(updatedApps);
    localStorage.setItem("tenahub_appointments", JSON.stringify(updatedApps));
    setNewApptTitle("");
    setNewApptDate("");
    setShowAddApptModal(false);
    toast.success(`Appointment added! ${waitText}`);
  };

  return (
    <div className="space-y-6 relative">
      {/* Generic trace details modal */}
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
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => setModalData(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showAddApptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowAddApptModal(false)} 
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">Add New Appointment</h3>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div className="space-y-2">
                <Label>Appointment Title</Label>
                <Input 
                  placeholder="e.g. Follow-up Checkup" 
                  value={newApptTitle} 
                  onChange={(e) => setNewApptTitle(e.target.value)} 
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input 
                  type="datetime-local"
                  value={newApptDate} 
                  onChange={(e) => setNewApptDate(e.target.value)} 
                />
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowAddApptModal(false)}>Cancel</Button>
                <Button type="submit">Confirm Appointment</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center border-b border-border overflow-x-auto pb-1 gap-2 scrollbar-hide">
        <TabNavButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} Icon={Activity} label="Dashboard" />
        <TabNavButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} Icon={BarChart3} label="Analytics" />
        <TabNavButton active={activeTab === "reports"} onClick={() => setActiveTab("reports")} Icon={FileText} label="Reports" />
        <TabNavButton active={activeTab === "patients"} onClick={() => setActiveTab("patients")} Icon={Users} label="Linked Patients" />
        <TabNavButton active={activeTab === "appointments"} onClick={() => setActiveTab("appointments")} Icon={Calendar} label="Appointments" />
        <TabNavButton active={activeTab === "portal"} onClick={() => setActiveTab("portal")} Icon={Settings} label="Portal Settings" />
        <TabNavButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} Icon={Building2} label="Profile" />
      </div>

      <div className="mt-4">
        {/* ═══════════════ DASHBOARD TAB ═══════════════ */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Organization Overview</h2>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/20"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+12%</span>
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold">{patients.length}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Total Linked Patients</p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-rose-500/20"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">+5%</span>
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold">{myAppointments.length}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Active Appointments</p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-emerald-500/20"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold">{myDoctors.length}</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Registered Staff / Doctors</p>
                </div>
              </div>
            </div>

            {/* Dashboard Visual Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily Patient Visits Bar Chart */}
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col h-80">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Patient Visits This Week</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-6">Daily breakdown of completed consultations.</p>
                <div className="flex-1 flex items-end gap-3 px-2">
                  {[25, 45, 30, 65, 50, 20, 15].map((h, i) => (
                    <div key={i} className="group relative w-full flex flex-col items-center justify-end h-full">
                      <div className="absolute -top-8 bg-card border border-border text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {h}
                      </div>
                      <div className="w-full bg-blue-500/20 rounded-t-md hover:bg-blue-500 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                      <span className="text-[10px] mt-2 text-muted-foreground font-medium uppercase">{"SMTWTFS"[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Distribution */}
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col h-80">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Appointment by Department</h3>
                </div>
                <div className="flex flex-1 items-center justify-center gap-8">
                  {/* CSS Pie Chart alternative (Using conic-gradient) */}
                  <div 
                    className="h-40 w-40 rounded-full shadow-inner border-4 border-border"
                    style={{
                      background: "conic-gradient(from 0deg, #3b82f6 0% 45%, #10b981 45% 75%, #f59e0b 75% 90%, #6366f1 90% 100%)"
                    }}
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium"><div className="w-3 h-3 rounded-full bg-blue-500"/> Cardiology</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium"><div className="w-3 h-3 rounded-full bg-emerald-500"/> General</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium"><div className="w-3 h-3 rounded-full bg-amber-500"/> Pediatrics</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium"><div className="w-3 h-3 rounded-full bg-indigo-500"/> Other</span>
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ ANALYTICS TAB ═══════════════ */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
                <p className="text-sm text-muted-foreground mt-1">Deep dive into operational metrics and patient demographics.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Demographics */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-6">Patient Demographics (Age)</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">18-30 Years</span><span>40%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[40%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">31-45 Years</span><span>35%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[35%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">46-60 Years</span><span>15%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[15%]"></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1"><span className="font-medium">60+ Years</span><span>10%</span></div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[10%]"></div></div>
                  </div>
                </div>
              </div>

              {/* Revenue / Engagement */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-semibold text-lg mb-6">Consultation Revenue Trend</h3>
                <div className="flex h-36 items-end gap-2 px-2 mt-4">
                  {[30, 45, 40, 60, 80, 55, 90, 75, 85, 100].map((h, i) => (
                    <div key={i} className="group relative w-full flex flex-col items-center justify-end h-full">
                      <div className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-card border border-border px-1.5 py-0.5 rounded">
                        {h}k
                      </div>
                      <div className="w-full bg-emerald-500/30 rounded-t-sm hover:bg-emerald-500 transition-colors" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                  <span>Week 1</span>
                  <span>Week 10</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h3 className="font-semibold text-lg mb-4">Service Popularity</h3>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Service Name</th>
                    <th className="px-4 py-3">Bookings</th>
                    <th className="px-4 py-3">Growth</th>
                    <th className="px-4 py-3 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium">General Check-ups</td>
                    <td className="px-4 py-3">342</td>
                    <td className="px-4 py-3 text-emerald-500">+12%</td>
                    <td className="px-4 py-3 text-emerald-500">High Demand</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium">Cardiology Consult</td>
                    <td className="px-4 py-3">156</td>
                    <td className="px-4 py-3 text-emerald-500">+8%</td>
                    <td className="px-4 py-3 text-blue-500">Stable</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Preventive Screening</td>
                    <td className="px-4 py-3">89</td>
                    <td className="px-4 py-3 text-amber-500">-2%</td>
                    <td className="px-4 py-3 text-muted-foreground">Needs Promotion</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════ REPORTS TAB ═══════════════ */}
        {activeTab === "reports" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Operational Reports</h2>
                <p className="text-sm text-muted-foreground mt-1">Generate and download custom reports for your organization.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-full group hover:border-primary/50 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Patient Demographics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">A detailed breakdown of patient age, gender, and regional distribution for the last 30 days.</p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => toast.success("Generating Patient Demographics Report (PDF)...")}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-full group hover:border-primary/50 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Financial & Revenue</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Comprehensive revenue overview broken down by service type, consultation fees, and growth trends.</p>
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
                    <h3 className="font-semibold">Clinical Performance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Wait times, appointment completion rates, and average consultation durations across staff members.</p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => toast.success("Generating Clinical Performance Report (PDF)...")}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-full group hover:border-primary/50 transition">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">Equipment & Inventory</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Current active equipment status, maintenance logs, and supply chain inventory alerts.</p>
                </div>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => toast.success("Generating Inventory Report (Excel)...")}>
                  <Download className="mr-2 h-4 w-4" /> Download Excel
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 overflow-hidden">
              <h3 className="font-semibold text-lg mb-4">Recent Automated Reports</h3>
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Report Name</th>
                    <th className="px-4 py-3">Generated Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 rounded-r-xl text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium">May 2026 Monthly Overview</td>
                    <td className="px-4 py-3 text-muted-foreground">Jun 01, 2026</td>
                    <td className="px-4 py-3"><span className="bg-white/10 px-2 py-1 rounded-md text-xs">PDF</span></td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => toast.success("Viewing Report...")}><CheckCircle2 className="h-4 w-4 mr-1"/> View</Button>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium">Q1 2026 Financials</td>
                    <td className="px-4 py-3 text-muted-foreground">Apr 05, 2026</td>
                    <td className="px-4 py-3"><span className="bg-white/10 px-2 py-1 rounded-md text-xs">CSV</span></td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost" onClick={() => toast.success("Downloading CSV...")}><Download className="h-4 w-4 mr-1"/> Get</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════════ REGISTERED PATIENTS TAB ═══════════════ */}
        {activeTab === "patients" && (
          <section className="rounded-3xl border border-border bg-card p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold">Registered Users database</h2>
                <p className="text-xs text-muted-foreground">Manage active data sharing and connections with clients.</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border mt-4">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left">Patient Name</th>
                    <th className="px-4 py-3 text-left">Email Address</th>
                    <th className="px-4 py-3 text-center">Age</th>
                    <th className="px-4 py-3 text-left">Connection Date</th>
                    <th className="px-4 py-3 text-left">Last Profile Sync</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patients.map((pat) => (
                    <tr key={pat.id} onClick={() => setModalData({ title: "Patient Details", data: pat })} className="bg-card hover:bg-accent/20 cursor-pointer">
                      <td className="px-4 py-3 font-semibold text-foreground">{pat.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{pat.email}</td>
                      <td className="px-4 py-3 text-center">{pat.age}</td>
                      <td className="px-4 py-3 text-muted-foreground">{pat.connectionDate}</td>
                      <td className="px-4 py-3 text-muted-foreground">{pat.lastSync}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                          pat.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                        )}>
                          {pat.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="outline" onClick={() => handleTogglePatient(pat.id)}>
                          Toggle Status
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ═══════════════ APPOINTMENTS TAB ═══════════════ */}
        {activeTab === "appointments" && (
          <section className="rounded-3xl border border-border bg-card p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold">Active Patient Appointments</h2>
                  <p className="text-xs text-muted-foreground">Bookings registered at your organization from user portals.</p>
                </div>
              </div>
              <Button size="sm" onClick={() => setShowAddApptModal(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Appointment
              </Button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border mt-4">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left">Consultation / Appointment</th>
                    <th className="px-4 py-3 text-left">Scheduled Date/Time</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {myAppointments.map((app) => (
                    <tr key={app.id} onClick={() => setModalData({ title: "Appointment Details", data: app })} className="bg-card hover:bg-accent/20 cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="font-semibold">{app.title}</div>
                        <div className="text-xs text-muted-foreground">{app.clinic}</div>
                      </td>
                      <td className="px-4 py-3 font-mono font-medium text-primary">
                        {app.date}
                        {app.waitingTime && (
                          <div className="text-xs text-amber-500 mt-1">{app.waitingTime}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500">
                          {app.status || "Confirmed"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" variant="ghost" className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10" onClick={() => toast.success("Appointment completed successfully.")}>
                          Mark Done
                        </Button>
                        <Button size="sm" variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" onClick={() => handleCancelAppointment(app.id)}>
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {myAppointments.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-muted-foreground text-sm">
                        No active appointments scheduled for your clinic.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ═══════════════ PORTAL EDITOR TAB ═══════════════ */}
        {activeTab === "portal" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            
            {/* General Settings */}
            <section className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold">Public Portal Customization</h2>
                  <p className="text-xs text-muted-foreground">Edit what users see when they click "Visit Portal" on your clinic.</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePortal} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Clinic Tagline</Label>
                    <Input value={editTagline} onChange={(e) => setEditTagline(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Operating Hours</Label>
                    <Input value={editHours} onChange={(e) => setEditHours(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Contact Phone</Label>
                    <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Contact Email</Label>
                    <Input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Website URL</Label>
                    <Input value={editWebsite} onChange={(e) => setEditWebsite(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Physical Address</Label>
                    <Input value={editAddress} onChange={(e) => setEditAddress(e.target.value)} />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs">Clinic Overview Description</Label>
                    <textarea 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit"><Edit3 className="mr-2 h-4 w-4" /> Save Public Portal Details</Button>
              </form>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Medical Services Offered */}
              <section className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">Medical Services & Capabilities</h3>
                      <p className="text-xs text-muted-foreground">List the medical things your clinic can perform.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {myOrg.services.map((s: string, i: number) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold">
                        {s}
                        <button type="button" onClick={() => handleRemoveService(s)} className="text-rose-500 hover:text-rose-600 ml-1">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleAddService} className="flex gap-2">
                  <Input 
                    placeholder="e.g. Pediatric Cardiology" 
                    value={newService} 
                    onChange={(e) => setNewService(e.target.value)} 
                  />
                  <Button type="submit" size="sm"><Plus className="h-4 w-4" /> Add</Button>
                </form>
              </section>

              {/* Clinic Doctors & Specialists */}
              <section className="rounded-3xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Registered Doctors / Staff</h3>
                    <p className="text-xs text-muted-foreground">Add and remove professionals bookable under your clinic.</p>
                  </div>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto mb-6 pr-2">
                  {myDoctors.map((doc) => (
                    <div key={doc.id} onClick={() => setModalData({ title: "Doctor Details", data: doc })} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-accent/20">
                      <div>
                        <div className="font-semibold text-sm">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">{doc.specialty} · {doc.consultationFee}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10" onClick={(e) => { e.stopPropagation(); handleRemoveDoctor(doc.id); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {myDoctors.length === 0 && (
                    <div className="text-center py-4 text-xs text-muted-foreground">No doctors registered on staff.</div>
                  )}
                </div>

                <form onSubmit={handleAddDoctor} className="space-y-3 border-t border-border pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Doctor Name" 
                      value={docName} 
                      onChange={(e) => setDocName(e.target.value)} 
                      className="h-8 text-xs"
                    />
                    <Input 
                      placeholder="Specialty" 
                      value={docSpecialty} 
                      onChange={(e) => setDocSpecialty(e.target.value)} 
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="Consultation Fee" 
                      value={docFee} 
                      onChange={(e) => setDocFee(e.target.value)} 
                      className="h-8 text-xs"
                    />
                    <Input 
                      placeholder="Tagline" 
                      value={docTagline} 
                      onChange={(e) => setDocTagline(e.target.value)} 
                      className="h-8 text-xs"
                    />
                  </div>
                  <Input 
                    placeholder="Short Description / Education" 
                    value={docDescription} 
                    onChange={(e) => setDocDescription(e.target.value)} 
                    className="h-8 text-xs"
                  />
                  <Button type="submit" size="sm" className="w-full h-8 text-xs"><Plus className="mr-1 h-3.5 w-3.5" /> Add Staff Doctor</Button>
                </form>
              </section>
            </div>

          </div>
        )}

        {/* ═══════════════ PROFILE TAB ═══════════════ */}
        {activeTab === "profile" && (
          <ProfilePage role="partner" onBack={() => setActiveTab("dashboard")} />
        )}

      </div>

    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-3 backdrop-blur text-center">
      <div className="text-base font-extrabold sm:text-lg">{value}</div>
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function TabNavButton({ active, onClick, Icon, label }: { active: boolean; onClick: () => void; Icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border border-transparent whitespace-nowrap transition-all",
        active 
          ? "bg-primary/10 text-primary border-primary/20" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}