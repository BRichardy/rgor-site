import { ProfileContent } from "@/components/profile-content";

export default function AdminProfilePage() {
  return (
    <div>
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        Pré-visualização · dentro do admin
      </p>
      <ProfileContent homeHref="/admin/inicio" />
    </div>
  );
}
