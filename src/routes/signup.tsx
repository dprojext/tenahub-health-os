import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Activity, ArrowLeft, ArrowRight, Eye, EyeOff, HeartPulse, Stethoscope, Briefcase, MailCheck, ClipboardList, CheckCircle2, Globe } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "Sign Up TenaGulecha" }],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();
  const [role, setRole] = useState<"user" | "partner" | "professional">("user");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);

  // Step 1 Form Data
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2 Data
  const [code, setCode] = useState("");

  // Step 3 Data (User)
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [healthGoal, setHealthGoal] = useState("");

  // Step 3 Data (Organizer)
  const [orgName, setOrgName] = useState("");
  const [contactRep, setContactRep] = useState("");
  const [collaboration, setCollaboration] = useState("");

  // Step 3 Data (Professional)
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/dashboard", search: { role } });
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
              <div className="absolute right-0 top-full mt-1 hidden w-32 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg group-hover:flex z-50">
                <button onClick={() => setLanguage("English")} className="px-4 py-2 text-left text-sm hover:bg-accent">English</button>
                <button onClick={() => setLanguage("Amharic")} className="px-4 py-2 text-left text-sm hover:bg-accent">አማርኛ</button>
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

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-500" 
              style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            />
          </div>

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-6 flex justify-center">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to site
                </Link>
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-center">Create an account</h2>
              <p className="text-muted-foreground mb-6 text-center text-sm">Join the TenaGulecha ecosystem</p>

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

              <form onSubmit={handleStep1} className="space-y-4">
                {role === "partner" && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="companyName">Company Name</label>
                    <input 
                      id="companyName" 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. Wellness Labs Ltd."
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                    {role === "partner" ? "Contact Representative Name" : "Full Name"}
                  </label>
                  <input 
                    id="name" 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder={role === "partner" ? "Dr. Aster Mekonnen" : "John Doe"}
                    required
                  />
                </div>
                
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

                {(role === "user" || role === "partner" || role === "professional") && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="phone">Phone Number</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="+251 900 000000"
                      required
                    />
                  </div>
                )}

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

                <button 
                  type="submit"
                  className="w-full mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                  <MailCheck className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">Check your email</h2>
                <p className="text-muted-foreground text-sm max-w-xs">
                  We've sent a 6-digit confirmation code to <span className="font-medium text-foreground">{email || "your email"}</span>.
                </p>
              </div>

              <form onSubmit={handleStep2} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-center" htmlFor="code">Confirmation Code</label>
                  <input 
                    id="code" 
                    type="text" 
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-[1em] text-lg rounded-lg border border-input bg-transparent px-3 py-3 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="000000"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Confirm Email
                </button>
                
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full inline-flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
                >
                  Change email address
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">
                  {role === "partner" ? "Tell us about your business" : role === "professional" ? "Professional Details" : "Personalize your experience"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {role === "partner" 
                    ? "Help us understand your organization and how we can collaborate." 
                    : role === "professional"
                    ? "Share your credentials so we can verify your profile."
                    : "Help us tailor your health journey."}
                </p>
              </div>

              <form onSubmit={handleStep3} className="space-y-4">
                {role === "partner" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="orgName">Organization / Business Name</label>
                      <input 
                        id="orgName" 
                        type="text" 
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="e.g. Bethel Heart Clinic"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="contactRep">Contact Representative Name</label>
                      <input 
                        id="contactRep" 
                        type="text" 
                        value={contactRep}
                        onChange={(e) => setContactRep(e.target.value)}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="e.g. Dr. Aster Mekonnen"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="collab">How can we benefit each other?</label>
                      <textarea 
                        id="collab" 
                        value={collaboration}
                        onChange={(e) => setCollaboration(e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Tell us about the services you provide and how listing on TenaGulecha can benefit your business and our users..."
                        required
                      />
                    </div>
                  </>
                )}

                {role === "professional" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="specialty">Specialty</label>
                      <select
                        id="specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      >
                        <option value="" disabled>Select your specialty...</option>
                        <option value="general">General Medicine</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="mental">Mental Health & Counseling</option>
                        <option value="nutrition">Nutrition & Dietetics</option>
                        <option value="physio">Physiotherapy</option>
                        <option value="maternal">Maternal & Child Health</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="license">License / Certification Number</label>
                      <input 
                        id="license" 
                        type="text" 
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="e.g. MED-2024-XXXXX"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="experience">Years of Experience</label>
                      <input 
                        id="experience" 
                        type="number" 
                        min="0"
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(e.target.value)}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="5"
                        required
                      />
                    </div>
                  </>
                )}

                {role === "user" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" htmlFor="dob">Date of Birth</label>
                        <input 
                          id="dob" 
                          type="date" 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" htmlFor="gender">Gender</label>
                        <select
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          required
                        >
                          <option value="" disabled>Select...</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" htmlFor="goal">Primary Health Goal</label>
                      <select
                        id="goal"
                        value={healthGoal}
                        onChange={(e) => setHealthGoal(e.target.value)}
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        required
                      >
                        <option value="" disabled>Select a goal...</option>
                        <option value="fitness">Improve Fitness & Activity</option>
                        <option value="weight">Weight Management</option>
                        <option value="chronic">Manage Chronic Condition</option>
                        <option value="mental">Mental Wellness</option>
                        <option value="general">General Health Tracking</option>
                      </select>
                    </div>
                  </>
                )}

                <button 
                  type="submit"
                  className="w-full mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Complete Setup
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
