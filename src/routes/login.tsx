import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, ArrowLeft, Building2, Eye, EyeOff, HeartPulse, Shield, User, Briefcase, Stethoscope, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Login TenaGulecha" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();
  const [role, setRole] = useState<"user" | "partner" | "professional">("user");
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard", search: { role } });
  };

  const handleDemoLogin = (demoRole: "user" | "partner" | "admin" | "professional") => {
    navigate({ to: "/dashboard", search: { role: demoRole } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center justify-center relative">
          <div className="absolute right-0 top-0">
            <div className="relative group">
              <button className="flex h-8 items-center justify-center rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent">
                <Globe className="h-3.5 w-3.5 mr-1.5" />
                <span>{language === "English" ? "EN" : "አማ"}</span>
              </button>
              <div className="absolute right-0 top-full pt-1 hidden w-32 flex-col group-hover:flex z-50">
                <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  <button onClick={() => setLanguage("English")} className="px-4 py-2 text-left text-sm hover:bg-accent">English</button>
                  <button onClick={() => setLanguage("Amharic")} className="px-4 py-2 text-left text-sm hover:bg-accent">አማርኛ</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">{t("app.title")}</span>
          </div>
        </div>
        
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex justify-center">
            <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to site
            </Link>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-center">Welcome back</h2>
          <p className="text-muted-foreground mb-6 text-center text-sm">Enter your credentials to access your account</p>

          <div className="mb-6 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all",
                role === "user" ? "border-primary bg-primary/10 text-primary" : "border-border bg-transparent text-muted-foreground hover:bg-accent"
              )}
            >
              <HeartPulse className="h-4 w-4" />
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("professional")}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all",
                role === "professional" ? "border-primary bg-primary/10 text-primary" : "border-border bg-transparent text-muted-foreground hover:bg-accent"
              )}
            >
              <Briefcase className="h-4 w-4" />
              Professional
            </button>
            <button
              type="button"
              onClick={() => setRole("partner")}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-all",
                role === "partner" ? "border-primary bg-primary/10 text-primary" : "border-border bg-transparent text-muted-foreground hover:bg-accent"
              )}
            >
              <Stethoscope className="h-4 w-4" />
              Organizer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="email">Email address</label>
              <input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                <span>Remember me</span>
              </label>
              <a href="#" className="font-medium text-primary hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign in
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <HeartPulse className="h-4 w-4" />
              Demo User
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin("partner")}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Building2 className="h-4 w-4" />
              Demo Organizer
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoLogin("professional")}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <User className="h-4 w-4" />
              Demo Professional
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Shield className="h-4 w-4" />
              Demo Super Admin
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
