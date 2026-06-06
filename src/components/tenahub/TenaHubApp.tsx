import { useState, useEffect } from "react";
import { Activity, Building2, Shield, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { UserDashboard } from "./UserDashboard";
import { useTranslation } from "@/lib/i18n";
import { PartnerWorkspace } from "./PartnerWorkspace";
import { SuperAdminConsole } from "./SuperAdminConsole";
import { ProfessionalDashboard } from "./ProfessionalDashboard";
import { ProfilePage } from "./ProfilePage";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type View = "user" | "partner" | "admin" | "professional";

const tabs: { id: View; label: string; short: string; Icon: typeof Activity }[] = [
  { id: "user", label: "User Ecosystem", short: "User", Icon: Activity },
  { id: "partner", label: "Organizer Workspace", short: "Organizer", Icon: Building2 },
  { id: "professional", label: "Professional Portal", short: "Pro", Icon: User },
  { id: "admin", label: "Super Admin", short: "Admin", Icon: Shield },
];

export function TenaHubApp({ initialView = "user" }: { initialView?: View }) {
  const { t, language, setLanguage } = useTranslation();
  const [view, setView] = useState<View>(initialView);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Settings State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
      toast.success("Switched to Light Mode");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
      toast.success("Switched to Dark Mode");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
      <header className="sticky top-0 z-40 border-b border-border bg-background/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
            <Activity className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <span className="text-base font-bold tracking-tight sm:text-lg">{t("app.title")}</span>
          </div>

          {/* Toggle - Only for Super Admin on Dashboard */}
          {initialView === "admin" && (
            <div className="relative mx-auto">
              <select
                value={view}
                onChange={(e) => setView(e.target.value as View)}
                className="appearance-none rounded-full border border-border bg-card px-4 py-1.5 pr-8 text-sm font-medium backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              >
                {tabs.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-rose-500/10 text-rose-500 transition-colors hover:bg-rose-500/20"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {view === "user" && <UserDashboard />}
          {view === "partner" && <PartnerWorkspace />}
          {view === "professional" && <ProfessionalDashboard />}
          {view === "admin" && <SuperAdminConsole />}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setShowSettingsModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Settings</h3>
              <button onClick={() => setShowSettingsModal(false)} className="rounded-full p-1 hover:bg-accent text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Dark Mode</div>
                  <div className="text-xs text-muted-foreground">Toggle between light and dark themes</div>
                </div>
                <button 
                  onClick={toggleTheme} 
                  className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", isDarkMode ? "bg-primary" : "bg-muted")}
                >
                  <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", isDarkMode ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Email Notifications</div>
                  <div className="text-xs text-muted-foreground">Receive updates via email</div>
                </div>
                <button 
                  onClick={() => { setEmailNotifs(!emailNotifs); toast.success(`Notifications ${!emailNotifs ? 'enabled' : 'disabled'}`); }} 
                  className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", emailNotifs ? "bg-emerald-500" : "bg-muted")}
                >
                  <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform", emailNotifs ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Two-Factor Authentication</div>
                  <div className="text-xs text-muted-foreground">Add extra security to your account</div>
                </div>
                <button onClick={() => toast.info("2FA setup wizard opened")} className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-500 hover:bg-amber-500/30">Setup</button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-sm font-medium">Language</div>
                  <div className="text-xs text-muted-foreground">Select your preferred language</div>
                </div>
                <select 
                  className="rounded-lg border border-input bg-background px-2 py-1 text-xs" 
                  value={language}
                  onChange={(e) => { 
                    setLanguage(e.target.value as "English" | "Amharic"); 
                    toast.success("Language updated"); 
                  }}
                >
                  <option>English</option>
                  <option>Amharic</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => { setShowSettingsModal(false); toast.success("Settings saved"); }}
              className="mt-6 w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
