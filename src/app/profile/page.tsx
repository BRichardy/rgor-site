import type { Metadata } from "next";
import { ProfileContent } from "@/components/profile-content";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Perfil",
  description: `${profile.name} — ${profile.role}. Portfólio, projetos e trajetória.`,
  openGraph: {
    title: `${profile.shortName} · Portfólio`,
    description: profile.pitch,
  },
};

export default function ProfilePage() {
  return (
    <ProfileContent className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16" />
  );
}
