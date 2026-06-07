import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Heart, Droplet, Target, CalendarPlus, Video, Calendar, CheckCircle2, Circle,
  Loader2, Plus, X, Sparkles, Baby, Dumbbell, Brain, Stethoscope, Clock,
  MessageSquare, User, Building2, Send, BarChart3, TrendingUp, Activity,
  LayoutDashboard, Play, FileText, Download, Save, Apple, GlassWater, Flame,
  Moon, Footprints, Scale, ChevronLeft, ChevronRight, Star, MapPin, Phone,
  Mail, Shield, Award, Utensils, ArrowRight, Layers, Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ProfilePage } from "./ProfilePage";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const initialAppointments = [
  { id: 1, title: "Cardiology Follow-up", clinic: "Bethel Heart Clinic", date: "Jun 10, 09:30" },
  { id: 2, title: "Annual Blood Work", clinic: "Addis Diagnostics", date: "Jun 14, 14:00" },
];

const defaultProfessionals = [
  {
    id: 1, name: "Dr. Selamawit Tadesse", specialty: "General Medicine", rating: "4.9", verified: true,
    Icon: "Stethoscope", category: "Doctor", tagline: "Internal medicine & diagnostics",
    accent: "from-blue-500/15 to-blue-500/5 text-blue-600",
    description: "Dr. Selamawit is a board-certified internist with over 15 years of experience in general medicine, diagnostics, and preventive care. She graduated from Addis Ababa University School of Medicine.",
    services: ["General Check-ups", "Blood Work Analysis", "Chronic Disease Management", "Preventive Health Screening", "Vaccination Consultations"],
    education: "MD, Addis Ababa University",
    languages: ["Amharic", "English", "Tigrinya"],
    location: "Bole, Addis Ababa",
    phone: "+251 911 223344",
    email: "dr.selamawit@tenahub.com",
    consultationFee: "500 ETB",
    availableSlots: {
      "Jun 09": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "Jun 10": ["09:30", "11:00", "14:00", "16:00"],
      "Jun 11": ["08:00", "09:00", "10:00", "13:00", "15:30"],
      "Jun 12": ["09:00", "10:30", "14:00", "15:00", "16:30"],
      "Jun 13": ["08:30", "09:30", "11:00", "14:00"],
      "Jun 16": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Jun 17": ["08:00", "10:00", "13:00", "15:00"],
    },
  },
  {
    id: 2, name: "Ato Yonas Mekuria", specialty: "Physiotherapy", rating: "4.7", verified: true,
    Icon: "Dumbbell", category: "Therapist", tagline: "Recovery and sports injuries",
    accent: "from-amber-500/15 to-amber-500/5 text-amber-600",
    description: "Ato Yonas is a licensed physiotherapist specializing in sports injury rehabilitation, post-surgical recovery, and chronic pain management. He uses evidence-based techniques to help patients recover mobility.",
    services: ["Sports Injury Rehab", "Post-Surgical Recovery", "Chronic Pain Therapy", "Mobility Assessment", "Ergonomic Consultation", "Home Exercise Programs"],
    education: "BSc Physiotherapy, Jimma University",
    languages: ["Amharic", "English"],
    location: "Kazanchis, Addis Ababa",
    phone: "+251 922 556677",
    email: "yonas.physio@tenahub.com",
    consultationFee: "400 ETB",
    availableSlots: {
      "Jun 09": ["08:00", "09:00", "10:00", "14:00", "16:00"],
      "Jun 10": ["09:00", "11:00", "14:00", "15:30"],
      "Jun 11": ["08:30", "10:00", "13:00", "15:00", "16:00"],
      "Jun 12": ["09:00", "10:00", "11:30", "14:00"],
      "Jun 13": ["08:00", "09:30", "11:00", "14:00", "16:00"],
      "Jun 16": ["09:00", "10:00", "14:00", "15:00"],
      "Jun 17": ["08:00", "09:00", "10:00", "13:00", "15:00", "16:30"],
    },
  },
  {
    id: 3, name: "Dr. Dawit Alemu", specialty: "Cardiology", rating: "5.0", verified: true,
    Icon: "Heart", category: "Specialist", tagline: "Heart health expert",
    accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
    description: "Dr. Dawit is a leading cardiologist in Addis Ababa with expertise in echocardiography, heart failure management, and preventive cardiology. He has published multiple papers on cardiovascular health in East Africa.",
    services: ["Echocardiography", "Heart Failure Management", "Hypertension Treatment", "Cardiac Risk Assessment", "ECG & Stress Testing", "Preventive Cardiology"],
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
      "Jun 13": ["09:00", "10:00", "14:00"],
      "Jun 16": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "Jun 17": ["09:30", "11:00", "14:00", "16:00"],
    },
  },
  {
    id: 4, name: "Dr. Tigist Hailu", specialty: "Psychiatry", rating: "4.8", verified: true,
    Icon: "Brain", category: "Psychiatrist", tagline: "Mood disorders & psychotherapy",
    accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
    description: "Dr. Tigist is a clinical psychiatrist specializing in anxiety, depression, and stress management. She holds extensive experience from Emmanuel Psychiatric Hospital.",
    services: ["Mental Health Evaluation", "Psychotherapy", "Anxiety Treatment", "Depression Therapy", "Stress Counseling"],
    education: "MD, Psychiatry residency — Emmanuel Hospital",
    languages: ["Amharic", "English"],
    location: "Emmanuel Psychiatric Hospital, Addis Ababa",
    phone: "+251 911 778899",
    email: "tigist.hailu@emmanuel.com",
    consultationFee: "600 ETB",
    availableSlots: {
      "Jun 09": ["09:00", "10:00", "11:00", "15:00"],
      "Jun 10": ["09:00", "14:00", "15:00", "16:00"],
      "Jun 11": ["10:00", "11:00", "13:00", "14:00"],
    },
  },
  {
    id: 5, name: "Dr. Abraham Assefa", specialty: "Internal Medicine", rating: "4.9", verified: true,
    Icon: "Stethoscope", category: "Specialist", tagline: "Tertiary diagnostic consultant",
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
    description: "Dr. Abraham is a senior diagnostic consultant at Black Lion Hospital. He handles complex medical cases, multi-system disorders, and chronic disease counseling.",
    services: ["Complex Diagnostics", "Multi-System Disease Management", "Pulmonary Consultations", "Geriatric Care", "Medical Research Review"],
    education: "MD, Internal Medicine Fellowship — Tikur Anbessa Hospital",
    languages: ["Amharic", "English"],
    location: "Black Lion Referral Hospital, Addis Ababa",
    phone: "+251 920 112233",
    email: "contact@abrahamassefa.com",
    consultationFee: "400 ETB",
    availableSlots: {
      "Jun 09": ["08:30", "10:30", "14:30"],
      "Jun 10": ["09:00", "11:00", "15:00"],
      "Jun 11": ["08:00", "10:00", "13:00", "16:00"],
    },
  }
];

const defaultOrganizations = [
  {
    id: 1, name: "Bethel Heart Clinic", category: "Hospital / Cardiology Center", location: "Addis Ababa",
    Icon: "Building2", tagline: "Advanced cardiovascular care.",
    accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
    description: "Bethel Heart Clinic is the premier cardiovascular care center in Addis Ababa, equipped with state-of-the-art diagnostic and treatment facilities. We provide comprehensive cardiac services from screening to surgery.",
    services: ["Echocardiography", "Cardiac Catheterization", "Heart Surgery", "Cardiac Rehabilitation", "Emergency Cardiac Care", "Preventive Screening"],
    operatingHours: "Mon–Sat: 7:00 AM – 8:00 PM",
    phone: "+251 115 551234",
    email: "info@bethelheartclinic.et",
    website: "www.bethelheartclinic.et",
    address: "Bole Sub-city, Woreda 03, Addis Ababa",
    established: "2012",
    accreditations: ["Ethiopian Health Authority", "WHO Partner Clinic", "ISO 9001:2015"],
    teamSize: "45+ medical professionals",
  },
  {
    id: 2, name: "YeneHealth Maternity", category: "Other Services / Maternity", location: "Online",
    Icon: "Baby", tagline: "Comprehensive maternity services.",
    accent: "from-purple-500/15 to-purple-500/5 text-purple-600",
    description: "YeneHealth Maternity is an innovative digital-first maternal health platform providing telehealth consultations, prenatal/postnatal care programs, and community support for mothers across Ethiopia.",
    services: ["Prenatal Care", "Postnatal Support", "Lactation Consulting", "High-Risk Pregnancy Monitoring", "Virtual Midwife Consultations", "Mental Health Support for New Mothers"],
    operatingHours: "24/7 Online Platform",
    phone: "+251 116 789012",
    email: "care@yenehealth.com",
    website: "www.yenehealth.com",
    address: "Online Platform — Based in Addis Ababa",
    established: "2020",
    accreditations: ["Ethiopian FDA Approved", "Digital Health Certified"],
    teamSize: "30+ healthcare professionals",
  },
  {
    id: 3, name: "Addis Diagnostics", category: "Labs & Diagnostics", location: "Bole",
    Icon: "Droplet", tagline: "Full service diagnostic lab.",
    accent: "from-blue-500/15 to-blue-500/5 text-blue-600",
    description: "Addis Diagnostics is a modern, fully automated diagnostic laboratory offering comprehensive blood work, imaging, pathology, and specialized testing services with rapid turnaround times.",
    services: ["Complete Blood Count", "Liver & Kidney Function Tests", "Hormone Panels", "COVID-19 & Infectious Disease Testing", "Urinalysis", "Ultrasound & X-Ray Imaging"],
    operatingHours: "Mon–Sat: 6:00 AM – 9:00 PM, Sun: 7:00 AM – 2:00 PM",
    phone: "+251 115 443322",
    email: "lab@addisdiagnostics.com",
    website: "www.addisdiagnostics.com",
    address: "Bole Medhanialem, Addis Ababa",
    established: "2015",
    accreditations: ["Ethiopian Accreditation Office", "ISO 15189:2022"],
    teamSize: "60+ lab technicians & pathologists",
  },
  {
    id: 4, name: "Emmanuel Psychiatric Hospital", category: "Psych Place / Specialized Hospital", location: "Addis Ababa",
    Icon: "Brain", tagline: "Pioneering psychiatric care and mental health rehabilitation.",
    accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
    description: "Emmanuel Psychiatric Hospital is a historic medical institution dedicated to mental health in East Africa. We offer outpatient evaluations, psychiatric nursing, counseling, and dedicated rehabilitation programs.",
    services: ["Psychiatric Evaluations", "Cognitive Behavioral Therapy (CBT)", "Addiction Rehabilitation", "Child Psychiatry", "Outpatient Counseling"],
    operatingHours: "Mon–Fri: 8:00 AM – 6:00 PM, Emergency: 24/7",
    phone: "+251 112 754321",
    email: "info@emmanuelhospital.gov.et",
    website: "www.emmanuelhospital.gov.et",
    address: "Gola Sefer, Addis Ababa",
    established: "1948",
    accreditations: ["Federal Ministry of Health", "WHO Mental Health Partner", "ISO 9001 Certified"],
    teamSize: "120+ clinical staff",
  },
  {
    id: 5, name: "Black Lion Referral Hospital", category: "Hospital / Medical Center", location: "Addis Ababa",
    Icon: "Stethoscope", tagline: "Ethiopia's largest tertiary teaching hospital.",
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
    description: "Tikur Anbessa (Black Lion) Hospital is the premier tertiary referral hospital in the country. It serves as the primary teaching facility for Addis Ababa University College of Health Sciences.",
    services: ["Emergency Trauma Care", "Oncology & Radiotherapy", "Pediatric Surgery", "Internal Medicine", "Specialist Consultation Center", "Advanced Diagnostics & MRI"],
    operatingHours: "24/7 Emergency & Inpatient Services",
    phone: "+251 115 511211",
    email: "contact@blacklionhospital.edu.et",
    website: "www.blacklion.edu.et",
    address: "Geja Sefer, Addis Ababa",
    established: "1972",
    accreditations: ["Addis Ababa University", "Joint Commission International (JCI) Candidate", "Ministry of Health Excellence Award"],
    teamSize: "1,500+ staff members",
  },
  {
    id: 6, name: "Addis Mental Health Center", category: "Psych Place / Counseling Clinic", location: "Bole Atlas",
    Icon: "Brain", tagline: "Modern psychological therapy & holistic wellness.",
    accent: "from-cyan-500/15 to-cyan-500/5 text-cyan-600",
    description: "Addis Mental Health Center provides a premium, private environment for mental wellness, family counseling, and personal growth. Our team of psychiatrists and therapists utilize modern evidence-based practices.",
    services: ["Individual Psychotherapy", "Couples & Family Therapy", "Stress & Anxiety Management", "Psychiatric Consultation", "Corporate Wellness Programs"],
    operatingHours: "Mon–Sat: 9:00 AM – 7:00 PM",
    phone: "+251 909 887766",
    email: "appointments@addismentalhealth.com",
    website: "www.addismentalhealth.com",
    address: "Bole Atlas, Near Euro-Medic, Addis Ababa",
    established: "2018",
    accreditations: ["Ethiopian Private Health Facilities Association", "Mental Health First Aid International Member"],
    teamSize: "12+ private specialists",
  }
];

type Marketplace = {
  id: string; name: string; tagline: string; category: string; Icon: any; accent: string;
  description: string; features: string[]; benefits: string[]; pricing: string;
};

const defaultMarketplace: Marketplace[] = [
  {
    id: "yenehealth", name: "YeneHealth", tagline: "Maternal & Postpartum Care", category: "Maternal Health",
    Icon: "Baby", accent: "from-rose-500/15 to-rose-500/5 text-rose-600",
    description: "YeneHealth is a comprehensive maternal health module that tracks your pregnancy journey, provides personalized nutrition guides, connects you with certified midwives, and offers postpartum mental health support.",
    features: ["Pregnancy week-by-week tracker", "Personalized nutrition plans", "Virtual midwife consultations", "Postpartum mood tracker", "Baby development milestones", "Community forum for mothers"],
    benefits: ["24/7 access to maternal health resources", "Personalized care plans", "Direct messaging with midwives", "Integration with your Unified Health Profile"],
    pricing: "Free basic plan · Premium at 199 ETB/month",
  },
  {
    id: "physio", name: "Addis Physiotherapy Hub", tagline: "Recovery, mobility & rehab plans", category: "Physical Therapy",
    Icon: "Dumbbell", accent: "from-amber-500/15 to-amber-500/5 text-amber-600",
    description: "Addis Physiotherapy Hub provides guided rehabilitation programs, exercise videos, pain tracking, and direct access to licensed physiotherapists for sports injuries, post-surgical recovery, and chronic pain management.",
    features: ["Personalized rehab exercise plans", "Video-guided stretching routines", "Pain level daily tracker", "Progress reports & milestones", "Direct chat with physiotherapists", "Post-surgical recovery programs"],
    benefits: ["Recover faster with guided programs", "Track pain patterns over time", "Access expert physiotherapists remotely", "Syncs exercise data to your health profile"],
    pricing: "Free trial · 149 ETB/month",
  },
  {
    id: "zema", name: "Zema Mental Wellness", tagline: "Mindfulness & therapy on demand", category: "Mental Health",
    Icon: "Brain", accent: "from-violet-500/15 to-violet-500/5 text-violet-600",
    description: "Zema Mental Wellness offers guided meditation, CBT-based mood tracking, anonymous peer support groups, and on-demand therapy sessions with licensed counselors. Designed to support your mental well-being daily.",
    features: ["Guided meditation library", "Daily mood & anxiety tracker", "CBT-based journaling prompts", "Anonymous peer support groups", "On-demand video therapy sessions", "Sleep improvement programs"],
    benefits: ["Reduce stress with daily mindfulness", "Track mood patterns and triggers", "Affordable therapy access", "Complete privacy and anonymity options"],
    pricing: "Free mindfulness tools · Therapy at 299 ETB/session",
  },
];

const IconMap: Record<string, any> = {
  Baby: Baby,
  Dumbbell: Dumbbell,
  Brain: Brain,
  Heart: Heart,
  Stethoscope: Stethoscope,
  Building2: Building2,
  Droplet: Droplet,
  Layers: Layers,
  Activity: Activity,
  Star: Star,
  Phone: Phone,
  Mail: Mail,
  Shield: Shield,
  Award: Award,
  Utensils: Utensils,
  ArrowRight: ArrowRight,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  MapPin: MapPin,
};

const getIcon = (iconInput: any) => {
  if (!iconInput) return Layers;
  if (typeof iconInput === "string") {
    return IconMap[iconInput] || Layers;
  }
  return iconInput;
};

// ─── HEALTH DATA TYPES ────────────────────────────────────────────────────────

type HealthCategory = "steps" | "sleep" | "heartRate" | "diet" | "water" | "calories" | "weight";

interface HealthEntry {
  date: string;
  value: string;
  unit: string;
  note?: string;
}

type UserTab = "dashboard" | "healthdata" | "miniapps" | "professionals" | "organizations" | "analytics" | "ai" | "profile";

// ─── COMPONENT ────────────────────────────────────────────────────────────────

import { useTranslation } from "@/lib/i18n";

export function UserDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<UserTab>("dashboard");
  
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
      const stored = localStorage.getItem("tenahub_user_ai_chat");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return [
      { 
        role: "assistant", 
        content: "Hello Dawit! I'm TenaHub AI, your secure personal health assistant. I can answer questions about the TenaGulecha platform, help you log your daily health metrics, or explain your lab results. How can I assist you today?" 
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
        localStorage.setItem("tenahub_user_ai_chat", JSON.stringify(updated));
      }
      return updated;
    });
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = userMsg.toLowerCase().trim();
      
      if (lowerInput === "hi" || lowerInput === "hello" || lowerInput === "hey" || lowerInput.includes("good morning") || lowerInput.includes("good afternoon")) {
        aiResponse = "Hello good afternoon Dawit! What can I help you with? I can answer a limited number of things, such as:\n• Information about the TenaGulecha platform\n• Understanding your synced health data (steps, sleep, etc.)\n• Helping you find the right healthcare professional\n\n*Please remember to always consult with a licensed doctor for serious medical advice.*";
      } else if (lowerInput.includes("platform") || lowerInput.includes("tenahub") || lowerInput.includes("tenagulecha") || lowerInput.includes("about")) {
        aiResponse = "TenaGulecha is East Africa's first Health Super App! We provide a unified ecosystem that connects patients with professionals, allows organizations to list their clinics and labs, and offers a marketplace for specialized wellness mini-apps. You can use this dashboard to track your health data, integrate with wearables, and book telehealth sessions.";
      } else if (lowerInput.includes("data") || lowerInput.includes("track") || lowerInput.includes("sync")) {
        aiResponse = "You can view all your synced health data in the 'Health Data' tab. It automatically pulls information like steps, sleep, and heart rate from your connected devices (like your Apple Watch). You can also manually log any metric there!";
      } else if (lowerInput.includes("doctor") || lowerInput.includes("professional") || lowerInput.includes("appointment")) {
        aiResponse = "To find a doctor or specialist, check out the 'Professionals' tab. You can view their verified credentials, read patient reviews, and easily book a telehealth consultation directly through the platform.";
      } else {
        aiResponse = `Regarding your query about "${userMsg}", I've analyzed our health database. I recommend keeping a consistent health log and discussing this specific concern with a verified professional on our platform. Let me know if you'd like me to help you find a suitable doctor for a consultation.`;
      }

      setMessages((prev: ChatMessage[]) => {
        const updated = [...prev, { role: "assistant", content: aiResponse }];
        if (typeof window !== "undefined") {
          localStorage.setItem("tenahub_user_ai_chat", JSON.stringify(updated));
        }
        return updated;
      });
      setIsTyping(false);
    }, 1000);
  };
  const [appointments, setAppointments] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_appointments");
    if (stored) {
      try { return JSON.parse(stored); } catch(e) {}
    }
    localStorage.setItem("tenahub_appointments", JSON.stringify(initialAppointments));
    return initialAppointments;
  });

  const [organizations, setOrganizations] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_organizations");
    if (stored) {
      try { return JSON.parse(stored); } catch(e) {}
    }
    localStorage.setItem("tenahub_organizations", JSON.stringify(defaultOrganizations));
    return defaultOrganizations;
  });

  const [professionals, setProfessionals] = useState<any[]>(() => {
    const stored = localStorage.getItem("tenahub_professionals");
    if (stored) {
      try { return JSON.parse(stored); } catch(e) {}
    }
    localStorage.setItem("tenahub_professionals", JSON.stringify(defaultProfessionals));
    return defaultProfessionals;
  });

  const [marketplace, setMarketplace] = useState<Marketplace[]>(() => {
    const stored = localStorage.getItem("tenahub_marketplace");
    if (stored) {
      try { return JSON.parse(stored); } catch(e) {}
    }
    localStorage.setItem("tenahub_marketplace", JSON.stringify(defaultMarketplace));
    return defaultMarketplace;
  });

  const [selectedOrgCategory, setSelectedOrgCategory] = useState("All");
  const [activatedModules, setActivatedModules] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<{ title: string; data: any; type?: string } | null>(null);

  // Health Logger State (Dashboard tab)
  const [logSteps, setLogSteps] = useState("");
  const [logSleep, setLogSleep] = useState("");
  const [logHeartRate, setLogHeartRate] = useState("");
  const [logHistory, setLogHistory] = useState([
    { date: "Today", steps: "9,842", sleep: "7.4h", hr: "72 bpm" },
    { date: "Yesterday", steps: "10,210", sleep: "8.1h", hr: "70 bpm" },
    { date: "2 Days Ago", steps: "8,500", sleep: "6.5h", hr: "74 bpm" },
  ]);

  // Health Data Tab State (Samsung Health style)
  const [healthCategory, setHealthCategory] = useState<HealthCategory>("steps");
  const [healthInput, setHealthInput] = useState("");
  const [healthNote, setHealthNote] = useState("");
  const [healthData, setHealthData] = useState<Record<HealthCategory, HealthEntry[]>>({
    steps: [
      { date: "Jun 06", value: "9,842", unit: "steps", note: "Morning walk + commute" },
      { date: "Jun 05", value: "10,210", unit: "steps", note: "Gym day" },
      { date: "Jun 04", value: "8,500", unit: "steps" },
      { date: "Jun 03", value: "11,340", unit: "steps", note: "Hiking" },
      { date: "Jun 02", value: "7,200", unit: "steps" },
    ],
    sleep: [
      { date: "Jun 06", value: "7.4", unit: "hours", note: "Woke up once" },
      { date: "Jun 05", value: "8.1", unit: "hours", note: "Deep sleep" },
      { date: "Jun 04", value: "6.5", unit: "hours" },
      { date: "Jun 03", value: "7.8", unit: "hours" },
      { date: "Jun 02", value: "7.0", unit: "hours" },
    ],
    heartRate: [
      { date: "Jun 06", value: "72", unit: "bpm" },
      { date: "Jun 05", value: "70", unit: "bpm", note: "After rest" },
      { date: "Jun 04", value: "74", unit: "bpm" },
      { date: "Jun 03", value: "68", unit: "bpm", note: "Very relaxed" },
      { date: "Jun 02", value: "71", unit: "bpm" },
    ],
    diet: [
      { date: "Jun 06", value: "Injera with Doro Wot", unit: "meal", note: "Lunch" },
      { date: "Jun 06", value: "Oatmeal + banana", unit: "meal", note: "Breakfast" },
      { date: "Jun 05", value: "Grilled fish + salad", unit: "meal", note: "Dinner" },
      { date: "Jun 05", value: "Kitfo with greens", unit: "meal", note: "Lunch" },
      { date: "Jun 04", value: "Shiro + bread", unit: "meal", note: "Lunch" },
    ],
    water: [
      { date: "Jun 06", value: "6", unit: "glasses" },
      { date: "Jun 05", value: "8", unit: "glasses", note: "Great hydration!" },
      { date: "Jun 04", value: "5", unit: "glasses" },
      { date: "Jun 03", value: "7", unit: "glasses" },
      { date: "Jun 02", value: "4", unit: "glasses", note: "Need to drink more" },
    ],
    calories: [
      { date: "Jun 06", value: "1,850", unit: "kcal" },
      { date: "Jun 05", value: "2,100", unit: "kcal", note: "Gym day - ate more" },
      { date: "Jun 04", value: "1,750", unit: "kcal" },
      { date: "Jun 03", value: "2,300", unit: "kcal", note: "Hiking day" },
      { date: "Jun 02", value: "1,900", unit: "kcal" },
    ],
    weight: [
      { date: "Jun 06", value: "74.2", unit: "kg" },
      { date: "Jun 03", value: "74.5", unit: "kg" },
      { date: "May 30", value: "74.8", unit: "kg" },
      { date: "May 27", value: "75.0", unit: "kg" },
      { date: "May 24", value: "75.3", unit: "kg", note: "Started cutting" },
    ],
  });

  // Booking State
  const [bookingProfessional, setBookingProfessional] = useState<any>(null);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | null>(null);
  const [selectedBookingTime, setSelectedBookingTime] = useState<string | null>(null);

  // Organization Portal State
  const [portalOrg, setPortalOrg] = useState<any>(null);

  // ─── HANDLERS ─────────────────────────────────────────────────────────────────

  const activate = (m: Marketplace) => {
    if (activatedModules.includes(m.id)) return;
    setLoadingId(m.id);
    setTimeout(() => {
      setActivatedModules((a) => [...a, m.id]);
      setLoadingId(null);
      toast.success("Module securely linked to your Unified Health Profile", { description: `${m.name} is now active` });
    }, 1500);
  };

  const handleLogHealth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logSteps && !logSleep && !logHeartRate) {
      toast.error("Please enter at least one metric to log.");
      return;
    }
    const newLog = {
      date: "Just Now",
      steps: logSteps ? Number(logSteps).toLocaleString() : "—",
      sleep: logSleep ? `${logSleep}h` : "—",
      hr: logHeartRate ? `${logHeartRate} bpm` : "—",
    };
    setLogHistory([newLog, ...logHistory]);
    setLogSteps("");
    setLogSleep("");
    setLogHeartRate("");
    toast.success("Health metrics logged successfully.");
  };

  const handleAddHealthData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthInput.trim()) {
      toast.error("Please enter a value.");
      return;
    }
    const catConfig = healthCategories.find((c) => c.key === healthCategory)!;
    const newEntry: HealthEntry = {
      date: "Just Now",
      value: healthCategory === "diet" ? healthInput : Number(healthInput.replace(/,/g, "")).toLocaleString(),
      unit: catConfig.unit,
      note: healthNote || undefined,
    };
    setHealthData((prev) => ({
      ...prev,
      [healthCategory]: [newEntry, ...prev[healthCategory]],
    }));
    setHealthInput("");
    setHealthNote("");
    toast.success(`${catConfig.label} data logged!`);
  };

  const handleBookAppointment = () => {
    if (!selectedBookingDate || !selectedBookingTime || !bookingProfessional) return;
    const newAppointment = {
      id: appointments.length + 10,
      title: `${bookingProfessional.specialty} Consultation`,
      clinic: bookingProfessional.location || "TenaHub Clinic",
      date: `${selectedBookingDate}, ${selectedBookingTime}`,
    };
    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem("tenahub_appointments", JSON.stringify(updated));
    toast.success(`Appointment booked with ${bookingProfessional.name}`, {
      description: `${selectedBookingDate} at ${selectedBookingTime}`,
    });
    setBookingProfessional(null);
    setSelectedBookingDate(null);
    setSelectedBookingTime(null);
    setModalData(null);
  };

  // ─── HEALTH CATEGORIES CONFIG ─────────────────────────────────────────────────

  const healthCategories = [
    { key: "steps" as HealthCategory, label: "Steps", Icon: Footprints, unit: "steps", color: "text-blue-500", bg: "bg-blue-500/10", placeholder: "e.g. 10000", type: "number" },
    { key: "sleep" as HealthCategory, label: "Sleep", Icon: Moon, unit: "hours", color: "text-indigo-500", bg: "bg-indigo-500/10", placeholder: "e.g. 7.5", type: "number" },
    { key: "heartRate" as HealthCategory, label: "Heart Rate", Icon: Heart, unit: "bpm", color: "text-rose-500", bg: "bg-rose-500/10", placeholder: "e.g. 72", type: "number" },
    { key: "diet" as HealthCategory, label: "Diet", Icon: Utensils, unit: "meal", color: "text-amber-500", bg: "bg-amber-500/10", placeholder: "e.g. Injera with Doro Wot", type: "text" },
    { key: "water" as HealthCategory, label: "Water", Icon: GlassWater, unit: "glasses", color: "text-cyan-500", bg: "bg-cyan-500/10", placeholder: "e.g. 8", type: "number" },
    { key: "calories" as HealthCategory, label: "Calories", Icon: Flame, unit: "kcal", color: "text-orange-500", bg: "bg-orange-500/10", placeholder: "e.g. 2000", type: "number" },
    { key: "weight" as HealthCategory, label: "Weight", Icon: Scale, unit: "kg", color: "text-emerald-500", bg: "bg-emerald-500/10", placeholder: "e.g. 74.5", type: "number" },
  ];

  const activeCatConfig = healthCategories.find((c) => c.key === healthCategory)!;

  // ─── RENDER ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6 relative">

      {/* ═══ BOOKING MODAL ═══ */}
      {bookingProfessional && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-card p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => { setBookingProfessional(null); setSelectedBookingDate(null); setSelectedBookingTime(null); }} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", bookingProfessional.accent)}>
                {(() => {
                  const BIcon = getIcon(bookingProfessional.Icon);
                  return <BIcon className="h-6 w-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl font-bold">Book Appointment</h3>
                <p className="text-sm text-muted-foreground">{bookingProfessional.name} · {bookingProfessional.consultationFee}</p>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Select a Date</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {Object.keys(bookingProfessional.availableSlots).map((date: string) => (
                  <button
                    key={date}
                    onClick={() => { setSelectedBookingDate(date); setSelectedBookingTime(null); }}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium border transition-all",
                      selectedBookingDate === date
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "border-border hover:border-primary/50 hover:bg-accent"
                    )}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {selectedBookingDate && (
              <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Available Times — {selectedBookingDate}</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {(bookingProfessional.availableSlots[selectedBookingDate] || []).map((time: string) => (
                    <button
                      key={time}
                      onClick={() => setSelectedBookingTime(time)}
                      className={cn(
                        "rounded-xl px-3 py-2.5 text-sm font-medium border transition-all",
                        selectedBookingTime === time
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md scale-105"
                          : "border-border hover:border-emerald-500/50 hover:bg-emerald-500/10"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmation */}
            {selectedBookingDate && selectedBookingTime && (
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-600">Ready to confirm</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {bookingProfessional.name} — {selectedBookingDate} at {selectedBookingTime}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => { setBookingProfessional(null); setSelectedBookingDate(null); setSelectedBookingTime(null); }}>Cancel</Button>
              <Button
                disabled={!selectedBookingDate || !selectedBookingTime}
                onClick={handleBookAppointment}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ ORGANIZATION PORTAL MODAL ═══ */}
      {portalOrg && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-card p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setPortalOrg(null)} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground z-10">
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              {(() => {
                const PortalIcon = getIcon(portalOrg.Icon);
                return (
                  <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br", portalOrg.accent)}>
                    <PortalIcon className="h-7 w-7" />
                  </div>
                );
              })()}
              <div>
                <h3 className="text-2xl font-bold">{portalOrg.name}</h3>
                <p className="text-sm text-muted-foreground">{portalOrg.category} · {portalOrg.location}</p>
              </div>
            </div>

            {/* Hero Banner */}
            <div className={cn("rounded-2xl bg-gradient-to-br p-6 mb-6", portalOrg.accent)}>
              <h4 className="font-bold text-lg mb-2">Welcome to {portalOrg.name} Portal</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{portalOrg.description}</p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl border border-border p-3 bg-white/5">
                <div className="flex items-center gap-2 mb-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Hours</span></div>
                <span className="text-sm font-semibold">{portalOrg.operatingHours}</span>
              </div>
              <div className="rounded-xl border border-border p-3 bg-white/5">
                <div className="flex items-center gap-2 mb-1"><Phone className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Phone</span></div>
                <span className="text-sm font-semibold">{portalOrg.phone}</span>
              </div>
              <div className="rounded-xl border border-border p-3 bg-white/5">
                <div className="flex items-center gap-2 mb-1"><Mail className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Email</span></div>
                <span className="text-sm font-semibold">{portalOrg.email}</span>
              </div>
              <div className="rounded-xl border border-border p-3 bg-white/5">
                <div className="flex items-center gap-2 mb-1"><MapPin className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Address</span></div>
                <span className="text-sm font-semibold">{portalOrg.address}</span>
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Services Provided</h4>
              <div className="grid grid-cols-2 gap-2">
                {portalOrg.services.map((s: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditations */}
            <div className="mb-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Accreditations</h4>
              <div className="flex flex-wrap gap-2">
                {portalOrg.accreditations.map((a: string, i: number) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Award className="h-3 w-3" /> {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Team & Established */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 rounded-xl border border-border p-3 bg-white/5 text-center">
                <div className="text-2xl font-bold text-primary">{portalOrg.established}</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Established</div>
              </div>
              <div className="flex-1 rounded-xl border border-border p-3 bg-white/5 text-center">
                <div className="text-2xl font-bold text-primary">{portalOrg.teamSize?.split("+")[0]}+</div>
                <div className="text-xs text-muted-foreground uppercase mt-1">Team Members</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setPortalOrg(null)}>Close</Button>
              <Button onClick={() => { toast.success(`Redirecting to ${portalOrg.website}...`); }}>
                <ArrowRight className="mr-2 h-4 w-4" /> Visit Website
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DETAIL MODAL (Professionals & Mini-apps) ═══ */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-card p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalData(null)} className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground z-10">
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              {modalData.data.Icon && (
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br", modalData.data.accent || "from-primary/20 to-primary/5 text-primary")}>
                  {(() => {
                    const ModalIcon = getIcon(modalData.data.Icon);
                    return <ModalIcon className="h-7 w-7" />;
                  })()}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">{modalData.title}</h3>
                <p className="text-muted-foreground">{modalData.data.specialty || modalData.data.category}</p>
                {modalData.data.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-semibold">{modalData.data.rating}</span>
                    {modalData.data.verified && <span className="text-emerald-500 text-xs ml-2 flex items-center gap-1"><Shield className="h-3 w-3" /> Verified</span>}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {modalData.data.description && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-6">
                <p className="text-sm leading-relaxed text-foreground/90">{modalData.data.description}</p>
              </div>
            )}

            {/* Professional Detail View */}
            {modalData.type === "professional" && (
              <>
                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><Award className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Education</span></div>
                    <span className="text-sm font-semibold">{modalData.data.education}</span>
                  </div>
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><Flame className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Fee</span></div>
                    <span className="text-sm font-semibold">{modalData.data.consultationFee}</span>
                  </div>
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><MapPin className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Location</span></div>
                    <span className="text-sm font-semibold">{modalData.data.location}</span>
                  </div>
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><MessageSquare className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Languages</span></div>
                    <span className="text-sm font-semibold">{modalData.data.languages?.join(", ")}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Services Provided</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {modalData.data.services?.map((s: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-3 mb-6">
                  <div className="flex-1 rounded-xl border border-border p-3 bg-white/5 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{modalData.data.phone}</span>
                  </div>
                  <div className="flex-1 rounded-xl border border-border p-3 bg-white/5 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{modalData.data.email}</span>
                  </div>
                </div>
              </>
            )}

            {/* Mini-app Detail View */}
            {modalData.type === "miniapp" && (
              <>
                {/* Features */}
                {modalData.data.features && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {modalData.data.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-white/5 border border-white/10">
                          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {modalData.data.benefits && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Benefits</h4>
                    <div className="space-y-2">
                      {modalData.data.benefits.map((b: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing */}
                {modalData.data.pricing && (
                  <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 p-4 mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">Pricing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{modalData.data.pricing}</p>
                  </div>
                )}
              </>
            )}

            {/* Organization Detail View */}
            {modalData.type === "organization" && (
              <>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><Clock className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Hours</span></div>
                    <span className="text-sm font-semibold">{modalData.data.operatingHours}</span>
                  </div>
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><Phone className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Phone</span></div>
                    <span className="text-sm font-semibold">{modalData.data.phone}</span>
                  </div>
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><MapPin className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Address</span></div>
                    <span className="text-sm font-semibold">{modalData.data.address}</span>
                  </div>
                  <div className="rounded-xl border border-border p-3 bg-white/5">
                    <div className="flex items-center gap-2 mb-1"><User className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-xs font-medium text-muted-foreground uppercase">Team</span></div>
                    <span className="text-sm font-semibold">{modalData.data.teamSize}</span>
                  </div>
                </div>

                {modalData.data.services && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Services</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {modalData.data.services.map((s: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {modalData.data.accreditations && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Accreditations</h4>
                    <div className="flex flex-wrap gap-2">
                      {modalData.data.accreditations.map((a: string, i: number) => (
                        <span key={i} className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                          <Award className="h-3 w-3" /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setModalData(null)}>Close</Button>
              {modalData.type === "professional" && (
                <Button onClick={() => { setBookingProfessional(modalData.data); }}>
                  <CalendarPlus className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
              )}
              {modalData.type === "organization" && (
                <Button onClick={() => { setPortalOrg(modalData.data); setModalData(null); }}>
                  <Building2 className="mr-2 h-4 w-4" /> Visit Portal
                </Button>
              )}
              {(!modalData.type || modalData.type === "miniapp") && (
                <Button onClick={() => {
                  const m = marketplace.find(x => x.name === modalData.title);
                  if (m && !activatedModules.includes(m.id)) {
                    activate(m);
                  }
                  setModalData(null);
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Activate Module
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ UNIFIED HEALTH PROFILE BANNER ═══ */}
      <section className="overflow-hidden rounded-[2rem] glass-tint p-6 text-primary-foreground">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold backdrop-blur ring-1 ring-white/20">
              DA
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest opacity-75">Unified Health Profile</div>
              <h1 className="text-2xl font-bold tracking-tight">Dawit Alemu</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm opacity-90">
                <span className="inline-flex items-center gap-1"><Droplet className="h-3.5 w-3.5" /> O+</span>
                <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {logHistory[0].hr}</span>
                <span className="inline-flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> Synced today</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center sm:gap-4">
            <Stat label="Steps" value={logHistory[0].steps} />
            <Stat label="Sleep" value={logHistory[0].sleep} />
            <Stat label="Modules" value={String(2 + activatedModules.length)} />
          </div>
        </div>
      </section>

      {/* ═══ TABBED NAVIGATION ═══ */}
      <div className="flex flex-wrap justify-center pb-2 gap-2">
        <TabButton active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} icon={LayoutDashboard} label={t("tabs.dashboard")} />
        <TabButton active={activeTab === "healthdata"} onClick={() => setActiveTab("healthdata")} icon={Activity} label={t("tabs.healthdata")} />
        <TabButton active={activeTab === "miniapps"} onClick={() => setActiveTab("miniapps")} icon={Target} label={t("tabs.miniapps")} />
        <TabButton active={activeTab === "professionals"} onClick={() => setActiveTab("professionals")} icon={User} label={t("tabs.professionals")} />
        <TabButton active={activeTab === "organizations"} onClick={() => setActiveTab("organizations")} icon={Building2} label={t("tabs.organizations")} />
        <TabButton active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} icon={BarChart3} label={t("tabs.analytics")} />
        <TabButton active={activeTab === "ai"} onClick={() => setActiveTab("ai")} icon={Bot} label="AI Consult" />
        <TabButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={User} label={t("tabs.profile")} />
      </div>

      <div className="mt-6">

        {/* ═══════════════ DASHBOARD TAB ═══════════════ */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Manual Health Logger */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <SectionTitle title="Manual Health Logger" subtitle="If your devices aren't synced, you can manually log your daily metrics here." />
                <form onSubmit={handleLogHealth} className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Steps</Label>
                      <Input type="number" placeholder="e.g. 8000" value={logSteps} onChange={(e) => setLogSteps(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Sleep (Hrs)</Label>
                      <Input type="number" step="0.1" placeholder="e.g. 7.5" value={logSleep} onChange={(e) => setLogSleep(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Heart Rate</Label>
                      <Input type="number" placeholder="e.g. 72" value={logHeartRate} onChange={(e) => setLogHeartRate(e.target.value)} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full"><Save className="mr-2 h-4 w-4" /> Save Metrics</Button>
                </form>
              </div>

              {/* Recent History */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <SectionTitle title="Recent Logs" subtitle="Your health metric history." />
                <div className="space-y-3">
                  {logHistory.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-medium text-sm">{log.date}</div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1" title="Steps"><Activity className="h-3 w-3" /> {log.steps}</span>
                        <span className="flex items-center gap-1" title="Sleep"><Clock className="h-3 w-3" /> {log.sleep}</span>
                        <span className="flex items-center gap-1" title="Heart Rate"><Heart className="h-3 w-3" /> {log.hr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SectionTitle title="Upcoming Appointments" subtitle="Scheduled through your connected modules." />
            <div className="grid gap-4 md:grid-cols-2">
              {appointments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 cursor-pointer hover:bg-accent transition">
                  <div>
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-sm text-muted-foreground">{a.clinic}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-bold text-primary">{a.date}</div>
                    <span className="mt-1 text-[10px] uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════ HEALTH DATA TAB (Samsung Health Style) ═══════════════ */}
        {activeTab === "healthdata" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SectionTitle title="Health Data Tracker" subtitle="Track all your health metrics like steps, sleep, heart rate, diet, water intake, calories, and weight." />

            {/* Category Selector */}
            <div className="flex flex-wrap justify-center gap-2">
              {healthCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setHealthCategory(cat.key)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all border",
                    healthCategory === cat.key
                      ? cn("shadow-lg scale-105 border-transparent", cat.bg, cat.color)
                      : "border-border bg-card text-muted-foreground hover:bg-accent"
                  )}
                >
                  <cat.Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Summary Card */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", activeCatConfig.bg)}>
                    <activeCatConfig.Icon className={cn("h-6 w-6", activeCatConfig.color)} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{activeCatConfig.label} Summary</h3>
                    <p className="text-xs text-muted-foreground">Latest: {healthData[healthCategory][0]?.value} {activeCatConfig.unit}</p>
                  </div>
                </div>

                {/* Visual Bar Chart */}
                {healthCategory !== "diet" && (
                  <div className="mt-4 flex h-36 items-end gap-2 px-2">
                    {healthData[healthCategory].slice(0, 7).reverse().map((entry, i) => {
                      const numVal = parseFloat(entry.value.replace(/,/g, ""));
                      const maxVal = Math.max(...healthData[healthCategory].slice(0, 7).map((e) => parseFloat(e.value.replace(/,/g, ""))));
                      const height = maxVal > 0 ? (numVal / maxVal) * 100 : 50;
                      return (
                        <div key={i} className="group relative w-full flex flex-col items-center justify-end h-full">
                          <div className="absolute -top-6 text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {entry.value} {activeCatConfig.unit}
                          </div>
                          <div
                            className={cn("w-full rounded-t-lg transition-all cursor-pointer hover:opacity-80", activeCatConfig.bg)}
                            style={{ height: `${Math.max(height, 10)}%`, backgroundColor: `hsl(var(--primary) / 0.3)` }}
                          />
                          <span className="text-[9px] mt-1.5 text-muted-foreground font-medium truncate w-full text-center">{entry.date.split(" ")[1] || entry.date}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Diet shows recent meals instead */}
                {healthCategory === "diet" && (
                  <div className="mt-4 space-y-2">
                    {healthData.diet.slice(0, 4).map((entry, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                        <Utensils className="h-4 w-4 text-amber-500 shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{entry.value}</div>
                          <div className="text-xs text-muted-foreground">{entry.note || entry.date}</div>
                        </div>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add New Entry */}
              <div className="rounded-3xl border border-border bg-card p-6">
                <SectionTitle title={`Log ${activeCatConfig.label}`} subtitle={`Add a new ${activeCatConfig.label.toLowerCase()} entry to your health data.`} />
                <form onSubmit={handleAddHealthData} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">{activeCatConfig.label} ({activeCatConfig.unit})</Label>
                    <Input
                      type={activeCatConfig.type === "number" ? "number" : "text"}
                      step={healthCategory === "sleep" || healthCategory === "weight" ? "0.1" : "1"}
                      placeholder={activeCatConfig.placeholder}
                      value={healthInput}
                      onChange={(e) => setHealthInput(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Note (optional)</Label>
                    <Input
                      type="text"
                      placeholder="e.g. After morning walk"
                      value={healthNote}
                      onChange={(e) => setHealthNote(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Log {activeCatConfig.label}
                  </Button>
                </form>
              </div>
            </div>

            {/* History Table */}
            <div className="rounded-3xl border border-border bg-card p-6 overflow-hidden">
              <h3 className="font-semibold text-lg mb-4">{activeCatConfig.label} History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 rounded-l-xl">Date</th>
                      <th className="px-4 py-3">Value</th>
                      <th className="px-4 py-3 rounded-r-xl">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthData[healthCategory].map((entry, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="px-4 py-3 font-medium">{entry.date}</td>
                        <td className="px-4 py-3">
                          <span className={cn("font-semibold", activeCatConfig.color)}>{entry.value}</span>
                          <span className="text-muted-foreground ml-1">{entry.unit}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{entry.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ MINI-APPS TAB ═══════════════ */}
        {activeTab === "miniapps" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SectionTitle title="Active Modules" subtitle="Your currently integrated health applications." />
            <div className="grid gap-4 md:grid-cols-3">
              {activatedModules.map((id) => {
                const m = marketplace.find((x) => x.id === id)!;
                return (
                  <ModuleCard key={id} title={m.name} Icon={getIcon(m.Icon)} badge="Partner" onClick={() => setModalData({ title: m.name, data: m, type: "miniapp" })}>
                    <div className={cn("rounded-xl bg-gradient-to-br p-4", m.accent)}>
                      <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{m.category}</div>
                      <div className="mt-1 text-sm font-medium text-foreground">{m.tagline}</div>
                    </div>
                  </ModuleCard>
                );
              })}
              {activatedModules.length === 0 && (
                <div className="col-span-3 text-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-2xl">
                  You have no partner modules active yet. Browse the directory below to connect apps to your profile.
                </div>
              )}
            </div>

            <SectionTitle title="Marketplace Directory" subtitle="Plug-and-play wellness mini-apps from our partners." />
            <div className="grid gap-4 md:grid-cols-3">
              {marketplace.map((m) => {
                const isActive = activatedModules.includes(m.id);
                const AppIcon = getIcon(m.Icon);
                return (
                  <div key={m.id} className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md cursor-pointer hover:border-primary/50" onClick={() => setModalData({ title: m.name, data: m, type: "miniapp" })}>
                    <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", m.accent)}><AppIcon className="h-6 w-6" /></div>
                    <div className="mt-4 flex-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{m.category}</div>
                      <h3 className="mt-1 text-lg font-bold">{m.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.tagline}</p>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground line-clamp-2">{m.description.substring(0, 100)}...</div>
                    <Button
                      disabled={isActive || loadingId === m.id}
                      onClick={(e) => { e.stopPropagation(); activate(m); }}
                      variant={isActive ? "secondary" : "default"}
                      className="mt-4 w-full"
                    >
                      {loadingId === m.id ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Securing…</> : isActive ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Activated</> : <><Plus className="mr-2 h-4 w-4" /> Activate Module</>}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════ PROFESSIONALS TAB ═══════════════ */}
        {activeTab === "professionals" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <SectionTitle title="Find a Professional" subtitle="Connect with certified health experts on our platform." />
            <div className="grid gap-4 md:grid-cols-3">
              {professionals.map((p) => {
                const ProIcon = getIcon(p.Icon);
                return (
                  <div key={p.id} onClick={() => setModalData({ title: p.name, data: p, type: "professional" })} className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md cursor-pointer hover:border-primary/50">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", p.accent)}>
                        <ProIcon className="h-6 w-6" />
                      </div>
                      {p.verified && <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Verified</span>}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{p.specialty}</div>
                      <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-3 w-3" /> {p.location} · {p.consultationFee}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                      <span className="text-sm font-semibold flex items-center gap-1">⭐ {p.rating}</span>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setBookingProfessional(p); }}>
                        <CalendarPlus className="mr-1.5 h-3.5 w-3.5" /> Book Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════ ORGANIZATIONS TAB ═══════════════ */}
        {activeTab === "organizations" && (() => {
          const filteredOrgs = organizations.filter((o: any) => {
            if (selectedOrgCategory === "All") return true;
            const cat = o.category.toLowerCase();
            if (selectedOrgCategory === "Hospitals") return cat.includes("hospital") || cat.includes("cardiology");
            if (selectedOrgCategory === "Psych Places") return cat.includes("psych") || cat.includes("mental");
            if (selectedOrgCategory === "Labs & Diagnostics") return cat.includes("lab") || cat.includes("diagnostic");
            if (selectedOrgCategory === "Other Services") return !cat.includes("hospital") && !cat.includes("cardiology") && !cat.includes("psych") && !cat.includes("mental") && !cat.includes("lab") && !cat.includes("diagnostic");
            return true;
          });

          return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <SectionTitle title="Partner Clinics & Labs" subtitle="Discover organizations integrated with TenaGulecha." />
              
              {/* Category Filter Row */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["All", "Hospitals", "Psych Places", "Labs & Diagnostics", "Other Services"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedOrgCategory(cat)}
                    className={cn(
                      "rounded-full px-5 py-2.5 text-xs font-semibold transition-all border",
                      selectedOrgCategory === cat
                        ? "bg-primary text-primary-foreground border-transparent shadow-md"
                        : "border-border bg-card text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {filteredOrgs.map((o) => {
                  const OrgIcon = getIcon(o.Icon);
                  return (
                    <div key={o.id} onClick={() => setModalData({ title: o.name, data: o, type: "organization" })} className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md cursor-pointer hover:border-primary/50">
                      <div className="flex justify-between items-start mb-4">
                        <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br", o.accent)}>
                          <OrgIcon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{o.category}</div>
                        <h3 className="mt-1 text-lg font-bold">{o.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{o.tagline}</p>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3 w-3" /> {o.address}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                        <span className="text-xs text-muted-foreground truncate w-1/2">{o.operatingHours}</span>
                        <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); setPortalOrg(o); }}>
                          <Building2 className="mr-1.5 h-3.5 w-3.5" /> Visit Portal
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ═══════════════ ANALYTICS TAB ═══════════════ */}
        {activeTab === "analytics" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <SectionTitle title="Health Analytics" subtitle="Comprehensive view of your wellness metrics over time." />
              <Button variant="outline" onClick={() => toast.success("Downloading comprehensive PDF report...")}><Download className="mr-2 h-4 w-4" /> Export Report</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between h-80">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Activity Trend</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">You've averaged 8,500 steps this week, up 12% from last week. Keep it up!</p>
                </div>
                <div className="mt-8 flex h-40 items-end gap-3 px-2">
                  {[40, 70, 50, 90, 80, 60, 100].map((h, i) => (
                    <div key={i} className="group relative w-full flex flex-col items-center justify-end h-full">
                      <div className="w-full bg-primary/20 rounded-t-md hover:bg-primary transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                      <span className="text-[10px] mt-2 text-muted-foreground font-medium">{"SMTWTFS"[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col h-80">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-lg">Wellness Score Breakdown</h3>
                </div>
                <div className="flex flex-1 items-center justify-between gap-8">
                  <div className="relative h-36 w-36 shrink-0 rounded-full border-8 border-emerald-500/20 flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-r-transparent border-b-transparent transform rotate-45"></div>
                    <div className="text-center">
                      <span className="text-4xl font-extrabold text-foreground">84</span>
                      <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">Excellent</div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="font-medium">Activity</span><span>90%</span></div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[90%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="font-medium">Sleep Recovery</span><span>75%</span></div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[75%]"></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1"><span className="font-medium">Heart Health</span><span>88%</span></div>
                      <div className="h-1.5 w-full bg-border rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[88%]"></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 overflow-hidden">
              <h3 className="font-semibold text-lg mb-4">Weekly Averages History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 rounded-l-xl">Week Of</th>
                      <th className="px-4 py-3">Avg Steps</th>
                      <th className="px-4 py-3">Avg Sleep</th>
                      <th className="px-4 py-3 rounded-r-xl">Resting HR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="px-4 py-4 font-medium">May 29, 2026</td>
                      <td className="px-4 py-4">9,200</td>
                      <td className="px-4 py-4">7.5h</td>
                      <td className="px-4 py-4 text-emerald-500">71 bpm</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="px-4 py-4 font-medium">May 22, 2026</td>
                      <td className="px-4 py-4">8,800</td>
                      <td className="px-4 py-4">7.2h</td>
                      <td className="px-4 py-4 text-emerald-500">72 bpm</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-medium">May 15, 2026</td>
                      <td className="px-4 py-4 text-amber-500">6,500</td>
                      <td className="px-4 py-4">7.4h</td>
                      <td className="px-4 py-4 text-emerald-500">72 bpm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ AI TAB ═══════════════ */}
        {activeTab === "ai" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">TenaHub AI Assistant</h2>
                <p className="text-sm text-muted-foreground mb-6">Ask about the platform, get help finding professionals, or understand your health metrics.</p>
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
                      "rounded-2xl px-4 py-3 text-sm max-w-[80%] leading-relaxed whitespace-pre-wrap",
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
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card flex gap-3 items-center">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about TenaGulecha or your health..." 
                  className="flex-1 bg-background border border-input rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isTyping || !chatInput.trim()}>
                  <Send className="h-4 w-4 ml-0.5" />
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* ═══════════════ PROFILE TAB ═══════════════ */}
        {activeTab === "profile" && (
          <ProfilePage role="user" onBack={() => setActiveTab("dashboard")} />
        )}
      </div>
    </div>
  );
}

// ─── HELPER COMPONENTS ──────────────────────────────────────────────────────────

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest opacity-75">{label}</div>
    </div>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}

function ModuleCard({ title, Icon, badge, children, onClick }: any) {
  return (
    <div className={cn("rounded-3xl border border-border bg-card p-6 transition hover:shadow-lg", onClick && "cursor-pointer hover:bg-accent")} onClick={onClick}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">{badge}</span>
      </div>
      {children}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
        active ? "bg-primary text-primary-foreground shadow-md scale-105" : "bg-card text-muted-foreground hover:bg-accent border border-transparent hover:border-border"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}