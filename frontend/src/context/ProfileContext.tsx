import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/Skin";
import { createContext, useContext, useEffect, useState } from "react";

interface ProfileContextType {
  profile: Profile;
  setProfile: (profile: Profile) => void;

  profileLoading: boolean;
  setProfileLoading: (loading: boolean) => void;

  profileError: string | null;
  setProfileError: (error: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile>({
    username: "",
    photo: "",
    skin_type: "tidak diketahui",
    dob: new Date(),
    is_premium: false,
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);

        // 1. Ambil user login
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error("User not authenticated");
        }

        // 2. Ambil profile berdasarkan user.id
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile({
            ...data,
            dob: new Date(data.dob),
          });
        }
      } catch (error: unknown) {
        console.error("Error fetching profile:", error);
        setProfileError(error instanceof Error ? error.message : null);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        profileLoading,
        setProfileLoading,
        profileError,
        setProfileError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
