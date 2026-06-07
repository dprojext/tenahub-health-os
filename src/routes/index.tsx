import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, HeartPulse, Stethoscope, Shield, CheckCircle2, Code2, Rocket, Layers, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TenaGulecha Health Operating System" },
      { name: "description", content: "A transparent and unified Health OS connecting users, clinics, and wellness mini-apps." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  const { t, language, setLanguage } = useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [appName, setAppName] = useState("");
  const [devName, setDevName] = useState("");
  const [category, setCategory] = useState("Mental Health");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [benefits, setBenefits] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !devName || !tagline || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);

    const defaultApps = [
      {
        id: "yenehealth",
        name: "YeneHealth",
        tagline: "Maternal & Postpartum Care",
        category: "Maternal Health",
        Icon: "Baby",
        accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
        description: "YeneHealth is a comprehensive maternal health module that tracks your pregnancy journey, provides personalized nutrition guides, connects you with certified midwives, and offers postpartum mental health support.",
        features: ["Pregnancy week-by-week tracker", "Personalized nutrition plans", "Virtual midwife consultations", "Postpartum mood tracker", "Baby development milestones", "Community forum for mothers"],
        benefits: ["24/7 access to maternal health resources", "Personalized care plans", "Direct messaging with midwives", "Integration with your Unified Health Profile"],
        pricing: "Free basic plan · Premium at 199 ETB/month",
      },
      {
        id: "physio",
        name: "Addis Physiotherapy Hub",
        tagline: "Recovery, mobility & rehab plans",
        category: "Physical Therapy",
        Icon: "Dumbbell",
        accent: "from-amber-500/15 to-amber-500/5 text-amber-600",
        description: "Addis Physiotherapy Hub provides guided rehabilitation programs, exercise videos, pain tracking, and direct access to licensed physiotherapists for sports injuries, post-surgical recovery, and chronic pain management.",
        features: ["Personalized rehab exercise plans", "Video-guided stretching routines", "Pain level daily tracker", "Progress reports & milestones", "Direct chat with physiotherapists", "Post-surgical recovery programs"],
        benefits: ["Recover faster with guided programs", "Track pain patterns over time", "Access expert physiotherapists remotely", "Syncs exercise data to your health profile"],
        pricing: "Free trial · 149 ETB/month",
      },
      {
        id: "zema",
        name: "Zema Mental Wellness",
        tagline: "Mindfulness & therapy on demand",
        category: "Mental Health",
        Icon: "Brain",
        accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
        description: "Zema Mental Wellness offers guided meditation, CBT-based mood tracking, anonymous peer support groups, and on-demand therapy sessions with licensed counselors. Designed to support your mental well-being daily.",
        features: ["Guided meditation library", "Daily mood & anxiety tracker", "CBT-based journaling prompts", "Anonymous peer support groups", "On-demand video therapy sessions", "Sleep improvement programs"],
        benefits: ["Reduce stress with daily mindfulness", "Track mood patterns and triggers", "Affordable therapy access", "Complete privacy and anonymity options"],
        pricing: "Free mindfulness tools · Therapy at 299 ETB/session",
      }
    ];

    setTimeout(() => {
      const stored = localStorage.getItem("tenahub_marketplace");
      let currentApps = defaultApps;
      if (stored) {
        try {
          currentApps = JSON.parse(stored);
        } catch (e) {
          // fallback
        }
      }

      const newApp = {
        id: "app_" + Date.now(),
        name: appName,
        tagline,
        category,
        Icon: "Layers",
        accent: "from-blue-500/15 to-blue-500/5 text-blue-600",
        description,
        features: features.split(",").map(f => f.trim()).filter(Boolean),
        benefits: benefits.split(",").map(b => b.trim()).filter(Boolean),
        pricing: "Free basic plan",
      };

      const updatedApps = [...currentApps, newApp];
      localStorage.setItem("tenahub_marketplace", JSON.stringify(updatedApps));

      toast.success(`Mini-app "${appName}" published successfully!`, {
        description: "It is now available in the TenaGulecha App Marketplace.",
      });

      setAppName("");
      setDevName("");
      setTagline("");
      setDescription("");
      setFeatures("");
      setBenefits("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
      {/* Navbar - Transparent & Minimal */}
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tight">{t("app.title")}</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <button onClick={() => setShowLangDropdown(!showLangDropdown)} className="flex h-8 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-foreground transition-colors hover:bg-white/10">
                <Globe className="h-3.5 w-3.5 mr-1.5" />
                <span className="hidden sm:inline">{language}</span>
                <span className="inline sm:hidden">{language === "English" ? "EN" : "አማ"}</span>
              </button>
              {showLangDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLangDropdown(false)} />
                  <div className="absolute right-0 top-full mt-2 w-32 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-card shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
                    <button onClick={() => { setLanguage("English"); setShowLangDropdown(false); }} className="px-4 py-2 text-left text-sm hover:bg-accent">English</button>
                    <button onClick={() => { setLanguage("Amharic"); setShowLangDropdown(false); }} className="px-4 py-2 text-left text-sm hover:bg-accent">አማርኛ</button>
                  </div>
                </>
              )}
            </div>

            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block">
              {t("nav.login")}
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            >
              {t("nav.signup")}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-24 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Blurred Background Image */}
          <div className="absolute inset-0 -z-20">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Background" 
              className="w-full h-full object-cover blur-md opacity-40 dark:opacity-20"
            />
          </div>
          
          {/* Dark Overlay for Text Contrast */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/80 to-background/100" />
          
          <div className="mx-auto max-w-5xl px-6 text-center z-10 relative">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs font-medium text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
              {t("hero.badge")}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 text-foreground drop-shadow-sm uppercase">
              {t("hero.title")}
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-foreground/80 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 drop-shadow-sm">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-105"
              >
                {t("hero.start")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-white/10"
              >
                {t("hero.signin")}
              </Link>
            </div>
          </div>
        </section>

        {/* About TenaGulecha Section */}
        <section className="py-24 relative border-t border-white/5">
          <div className="mx-auto max-w-5xl px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 p-3">
                <Activity className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">{t("about.title")}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("about.desc1")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">{t("about.whatwedo")}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("about.whatwedo.desc")}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{t("about.point1")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{t("about.point2")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{t("about.point3")}</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-2xl -z-10" />
                <div className="rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl p-8 shadow-xl">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">{t("about.whatweprovide")}</h3>
                  <div className="space-y-6 mt-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Shield className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{t("about.prov1.title")}</h4>
                        <p className="text-sm text-muted-foreground">{t("about.prov1.desc")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Layers className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{t("about.prov2.title")}</h4>
                        <p className="text-sm text-muted-foreground">{t("about.prov2.desc")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                        <Activity className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{t("about.prov3.title")}</h4>
                        <p className="text-sm text-muted-foreground">{t("about.prov3.desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Features Section */}
        <section className="py-24 relative border-t border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -z-10" />
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">{t("ecosystem.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("ecosystem.desc")}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <div className="h-10 w-10 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t("eco.users.title")}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("eco.users.desc")}
                </p>
                <ul className="space-y-2">
                  {[t("eco.users.li1"), t("eco.users.li2"), t("eco.users.li3")].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-primary/70" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 2: Professionals */}
              <div className="group rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <div className="h-10 w-10 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t("eco.pro.title")}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("eco.pro.desc")}
                </p>
                <ul className="space-y-2">
                  {[t("eco.pro.li1"), t("eco.pro.li2"), t("eco.pro.li3")].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-primary/70" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 3: Organizers/Businesses */}
              <div className="group rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all hover:bg-white/[0.04] hover:border-white/10">
                <div className="h-10 w-10 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t("eco.org.title")}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("eco.org.desc")}
                </p>
                <ul className="space-y-2">
                  {[t("eco.org.li1"), t("eco.org.li2"), t("eco.org.li3")].map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-primary/70" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Submission Form */}
        <section className="py-20 border-t border-white/5 relative">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                <Code2 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">{t("publish.title")}</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">{t("publish.desc")}</p>
              
              <div className="flex justify-center pt-4">
                <Link
                  to="/dashboard"
                  className="w-full md:w-1/2 rounded-2xl bg-primary text-primary-foreground font-semibold py-3.5 text-sm hover:bg-primary/95 transition-all shadow-[0_0_20px_rgba(var(--primary),0.2)] flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Rocket className="h-4 w-4" /> {t("publish.btn")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
          <Activity className="h-4 w-4" />
          <span className="font-semibold text-sm">{t("app.title")}</span>
        </div>
        <p className="text-xs text-muted-foreground/60">
          {t("footer.rights")}
        </p>
      </footer>
    </div>
  );
}
