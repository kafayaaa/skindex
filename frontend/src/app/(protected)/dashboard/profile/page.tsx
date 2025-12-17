"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Camera,
  Calendar,
  Droplets,
  Settings,
  LogOut,
  Edit,
  Shield,
  Bell,
  ChevronRight,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import Header from "@/components/Header";
import Image from "next/image";
import { useProfile } from "@/context/ProfileContext";
import { LiaFeatherAltSolid } from "react-icons/lia";
import { PiEggCrack } from "react-icons/pi";
import { GiHeatHaze } from "react-icons/gi";
import { BsLayoutWtf } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import { supabase } from "@/lib/supabase";
import { TbCancel } from "react-icons/tb";
import { MdFileUpload } from "react-icons/md";
import { EditableProfile, Profile } from "@/types/Skin";

export default function ProfilePage() {
  const router = useRouter();

  const { profile, setProfile } = useProfile();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<EditableProfile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTempData({
      username: profile.username ?? "",
      skin_type: profile.skin_type,
      dob: new Date(profile.dob),
      photo: profile.photo ?? null,
    });
  }, [profile]);

  useEffect(() => {
    setPhotoPreview(profile.photo || null);
  }, [profile.photo]);

  useEffect(() => {
    if (!profile) return;

    setTempData({
      username: profile.username ?? "",
      skin_type: profile.skin_type,
      dob: new Date(profile.dob),
      photo: profile.photo ?? null,
    });
  }, [profile]);

  useEffect(() => {
    if (!profile) return;

    setTempData({
      username: profile.username ?? "",
      skin_type: profile.skin_type,
      dob: new Date(profile.dob),
      photo: profile.photo ?? null,
    });
  }, [profile]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat profil...
      </div>
    );
  }

  if (!tempData) return <p>Loading...</p>; // atau loading state

  // Calculate age from date of birth
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // validasi basic
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran maksimal 2MB");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleEdit = async () => {
    if (isEditing) {
      await updateProfile();
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = <K extends keyof EditableProfile>(
    field: K,
    value: EditableProfile[K] | string
  ) => {
    if (!tempData) return;

    setTempData({
      ...tempData,
      [field]: field === "dob" ? new Date(value as string) : value,
    });
  };

  const updateProfile = async () => {
    if (!tempData) return;

    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Unauthorized");

      let photoUrl = tempData.photo;

      if (photoFile) {
        photoUrl = await uploadProfilePhoto(photoFile);
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          username: tempData.username,
          skin_type: tempData.skin_type,
          dob: tempData.dob.toISOString().split("T")[0],
          photo: photoUrl,
        })
        .eq("id", user.id);

      if (error) throw error;

      // update context profile (lengkap)
      setProfile({
        id: profile.id ?? "", // wajib ada
        created_at: profile.created_at ?? new Date().toISOString(),
        username: tempData.username,
        skin_type: tempData.skin_type,
        dob: tempData.dob,
        is_premium: profile.is_premium ?? false,
        photo: tempData.photo ?? "",
      });

      setIsEditing(false);
      setPhotoFile(null);
    } catch (e) {
      console.error(e);
      alert("Gagal update profile");
    } finally {
      setSaving(false);
    }
  };

  const uploadProfilePhoto = async (file: File) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("photo_profiles")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("photo_profiles")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/signin");
  };
  const getSkinTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Normal:
        "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
      Dry: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
      Oily: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30",
      Combination:
        "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30",
      Sensitive: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
    };
    return (
      colors[type] ||
      "text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/30"
    );
  };

  const mapProfileToEditable = (profile: Profile): EditableProfile => ({
    id: profile.id,
    username: profile.username ?? "", // jika null, jadikan ""
    photo: profile.photo ?? null, // jika undefined, jadikan null
    skin_type: profile.skin_type,
    dob: profile.dob,
    is_premium: profile.is_premium,
    created_at: profile.created_at,
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <main className="max-w-4xl mx-auto flex flex-col items-center px-4 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Profil Saya
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Kelola data pribadi dan preferensi akun Anda
          </p>
        </div>

        <div className="w-full flex flex-col gap-6">
          {/* Left Column - Profile Card */}
          <div className="">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 py-5">
                  <form className="relative">
                    <div className="w-20 h-20 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <Image
                          width={80}
                          height={80}
                          src={photoPreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
                      )}
                    </div>
                    {isEditing && (
                      <>
                        <label
                          htmlFor="photo"
                          className="absolute -bottom-1 -right-1 p-2 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-colors cursor-pointer"
                        >
                          <MdFileUpload className="w-4 h-4" />
                        </label>

                        <input
                          type="file"
                          id="photo"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </>
                    )}
                  </form>

                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.username ?? ""}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="text-2xl font-bold bg-transparent border-b border-cyan-500 text-zinc-900 dark:text-zinc-100"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        {profile.username}
                      </h2>
                    )}
                    {/* <p className="text-zinc-500 dark:text-zinc-400">
                      Member sejak Jan 2024
                    </p> */}
                  </div>
                </div>
                <div className="max-w-56 flex flex-col items-center justify-center gap-2">
                  <button
                    disabled={saving}
                    onClick={handleEdit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-cyan-600 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    <span>
                      {saving
                        ? "Menyimpan..."
                        : isEditing
                        ? "Simpan"
                        : "Edit Profil"}
                    </span>
                  </button>

                  {isEditing && (
                    <button
                      onClick={() => {
                        setTempData(mapProfileToEditable(profile));
                        setIsEditing(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                    >
                      <TbCancel className="w-4 h-4" />
                      <span>Batal</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skin Type */}
                <div className="flex items-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-200/40 dark:bg-zinc-800">
                      {profile.skin_type === "normal" ? (
                        <CiFaceSmile className="w-8 h-8 text-slate-500" />
                      ) : profile.skin_type === "dry" ||
                        profile.skin_type === "kering" ? (
                        <PiEggCrack className="w-8 h-8 text-orange-500" />
                      ) : profile.skin_type === "oily" ||
                        profile.skin_type === "berminyak" ? (
                        <Droplets className="w-8 h-8 text-yellow-500" />
                      ) : profile.skin_type === "combination" ||
                        profile.skin_type === "kombinasi" ? (
                        <BsLayoutWtf className="w-8 h-8 text-violet-500" />
                      ) : profile.skin_type === "sensitive" ||
                        profile.skin_type === "sensitif" ? (
                        <LiaFeatherAltSolid className="w-8 h-8 text-rose-500" />
                      ) : null}
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Tipe Kulit
                      </p>
                      {isEditing ? (
                        <select
                          value={tempData.skin_type}
                          onChange={(e) =>
                            handleInputChange("skin_type", e.target.value)
                          }
                          className="mt-1 bg-transparent font-medium dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        >
                          <option value="normal">Normal</option>
                          <option value="dry">Kering</option>
                          <option value="oily">Berminyak</option>
                          <option value="combination">Kombinasi</option>
                          <option value="sensitive">Sensitif</option>
                        </select>
                      ) : (
                        <div
                          className={`inline-block py-1 rounded-full mt-1 ${getSkinTypeColor(
                            profile.skin_type
                          )}`}
                        >
                          <span className="font-medium">
                            {profile.skin_type === "normal" ? (
                              <p>Normal</p>
                            ) : profile.skin_type === "dry" ? (
                              <p>Kering</p>
                            ) : profile.skin_type === "oily" ? (
                              <p>Berminyak</p>
                            ) : profile.skin_type === "combination" ? (
                              <p>Kombinasi</p>
                            ) : profile.skin_type === "sensitive" ? (
                              <p>Sensitif</p>
                            ) : null}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Ditentukan dari analisis terakhir
                  </p> */}
                </div>

                {/* Date of Birth */}
                <div className="p-4 flex items-center rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                      <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Tanggal Lahir
                      </p>
                      {isEditing ? (
                        <input
                          type="date"
                          value={tempData.dob.toISOString().split("T")[0]}
                          onChange={(e) =>
                            handleInputChange("dob", e.target.value)
                          }
                          className="mt-1 bg-transparent font-medium text-zinc-900 dark:text-zinc-100"
                        />
                      ) : (
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                          {profile.dob.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          ({calculateAge(profile.dob)} tahun)
                        </p>
                      )}
                    </div>
                  </div>
                  {/* <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Usia mempengaruhi rekomendasi skincare
                  </p> */}
                </div>
              </div>

              {/* Recent Analysis */}
              {/* <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Analisis Terakhir
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      78%
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Kelembapan
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      2
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Jerawat Aktif
                    </p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      85%
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      Kesehatan
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right Column - Settings & Actions */}
          {/* <div className="space-y-6"> */}
          {/* Account Settings */}
          {/* <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Pengaturan Akun
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                      <Settings className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      Preferensi
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                      <Bell className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      Notifikasi
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                      <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      Privasi & Keamanan
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
                </button>
              </div>
            </div> */}

          {/* Subscription Status */}
          {/* <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Status Premium
                  </h4>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400">
                    Aktif hingga 15 Mar 2025
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Analisis Foto
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Unlimited
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Riwayat
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    90 hari
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Prioritas Support
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          {/* Logout Button */}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 px-4 py-2 mt-5 self-end bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Keluar</span>
        </button>

        {/* Stats Section */}
        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              24
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Total Analisis
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              86%
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Konsistensi Log
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              15
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Hari Berturut-turut
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
              94%
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Kepuasan Kulit
            </p>
          </div>
        </div> */}
      </main>
    </div>
  );
}
