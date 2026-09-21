import { AdminHeader } from "@/components/admin-header";
import { isLocalAdminAuthenticated } from "@/lib/local-auth";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let label: string | null = null;

  if (hasSupabaseEnv()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      label = user?.email ?? null;
    } catch {
      label = null;
    }
  } else if (await isLocalAdminAuthenticated()) {
    label = "modo local";
  }

  return (
    <div className="min-h-full bg-bg">
      <AdminHeader label={label} />
      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">{children}</div>
    </div>
  );
}
