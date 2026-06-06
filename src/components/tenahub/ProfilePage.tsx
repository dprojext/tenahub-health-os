import { useState } from "react";
import { toast } from "sonner";
import { UserCircle2, Edit3, CheckCircle2, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "user" | "partner" | "professional" | "admin";

export function ProfilePage({ role, onBack }: { role: Role; onBack: () => void }) {
  const [isEditing, setIsEditing] = useState(false);

  // Unified Profile State
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("tenahub_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: "Dawit Alemu",
      email: "dawit@example.com",
      phone: "+251 911 234567",
      dob: "1992-04-15",
      gender: "Male",
      healthGoal: "Improve Fitness & Activity",
      bloodType: "O+",
      disabilities: "None",
      chronicDiseases: "None",
      emergencyName: "Aster Mekonnen",
      emergencyPhone: "+251 911 000000",
      orgName: "Bethel Heart Clinic",
      contactRep: "Dr. Aster Mekonnen",
      collaboration: "We specialize in cardiology. Our module tracks heart rate variability and blood pressure for patients.",
      orgPhone: "+251 900 000000",
      orgEmail: "aster@bethelclinic.com",
      specialty: "General Medicine",
      licenseNumber: "MED-2014-8892",
      yearsExperience: "12",
    };
  });

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem("tenahub_profile", JSON.stringify(profile));
    toast.success("Profile updated successfully!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="rounded-[2rem] glass-strong p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <UserCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage your account details and preferences.
              </p>
            </div>
          </div>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="shrink-0"
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            ) : (
              <>
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Base Account Info (Always shown) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border pb-2">Account Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Full Name</Label>
                {isEditing ? (
                  <Input name="name" value={profile.name} onChange={handleChange} />
                ) : (
                  <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.name}</div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                {isEditing ? (
                  <Input name="email" value={profile.email} onChange={handleChange} />
                ) : (
                  <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.email}</div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                {isEditing ? (
                  <Input name="phone" value={profile.phone} onChange={handleChange} />
                ) : (
                  <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.phone}</div>
                )}
              </div>
            </div>
          </div>

          {/* User Specific Fields */}
          {role === "user" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Health & Personal Data</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Date of Birth</Label>
                  {isEditing ? (
                    <Input name="dob" type="date" value={profile.dob} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.dob}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Gender</Label>
                  {isEditing ? (
                    <select name="gender" value={profile.gender} onChange={handleChange} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.gender}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Health Goal</Label>
                  {isEditing ? (
                    <Input name="healthGoal" value={profile.healthGoal} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.healthGoal}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Blood Type</Label>
                  {isEditing ? (
                    <Input name="bloodType" value={profile.bloodType} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.bloodType}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Disabilities</Label>
                  {isEditing ? (
                    <Input name="disabilities" value={profile.disabilities || ""} onChange={handleChange} placeholder="e.g., None, Visual Impairment" />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.disabilities || "None reported"}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Chronic Diseases</Label>
                  {isEditing ? (
                    <Input name="chronicDiseases" value={profile.chronicDiseases || ""} onChange={handleChange} placeholder="e.g., None, Asthma, Diabetes" />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.chronicDiseases || "None reported"}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Emergency Contact Name</Label>
                  {isEditing ? (
                    <Input name="emergencyName" value={profile.emergencyName || ""} onChange={handleChange} placeholder="e.g., Abebe Kebede" />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.emergencyName || "Not provided"}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Emergency Contact Phone</Label>
                  {isEditing ? (
                    <Input name="emergencyPhone" value={profile.emergencyPhone || ""} onChange={handleChange} placeholder="e.g., +251 911 000000" />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.emergencyPhone || "Not provided"}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Partner Specific Fields */}
          {role === "partner" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Organization Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Organization Name</Label>
                  {isEditing ? (
                    <Input name="orgName" value={profile.orgName} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.orgName}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Contact Representative</Label>
                  {isEditing ? (
                    <Input name="contactRep" value={profile.contactRep} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.contactRep}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Organization Phone</Label>
                  {isEditing ? (
                    <Input name="orgPhone" value={profile.orgPhone || ""} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.orgPhone || "Not provided"}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Organization Email</Label>
                  {isEditing ? (
                    <Input name="orgEmail" value={profile.orgEmail || ""} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.orgEmail || "Not provided"}</div>
                  )}
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label>Collaboration</Label>
                  {isEditing ? (
                    <textarea 
                      name="collaboration" 
                      value={profile.collaboration} 
                      onChange={handleChange} 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                      rows={3}
                    />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.collaboration}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Professional Specific Fields */}
          {role === "professional" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-border pb-2">Professional Credentials</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Specialty</Label>
                  {isEditing ? (
                    <Input name="specialty" value={profile.specialty} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.specialty}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>License Number</Label>
                  {isEditing ? (
                    <Input name="licenseNumber" value={profile.licenseNumber} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.licenseNumber}</div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Years of Experience</Label>
                  {isEditing ? (
                    <Input name="yearsExperience" type="number" value={profile.yearsExperience} onChange={handleChange} />
                  ) : (
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium">{profile.yearsExperience}</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
