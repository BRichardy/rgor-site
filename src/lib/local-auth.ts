export const LOCAL_ADMIN_COOKIE = "rgor_admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin";
}

/** Token local determinístico — ok para admin só na sua máquina. */
export function signAdminToken(password: string) {
  const payload = `rgor-local-admin:${password}`;
  let hash = 2166136261;
  for (let i = 0; i < payload.length; i++) {
    hash ^= payload.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `v1-${(hash >>> 0).toString(16)}-${payload.length}`;
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  return token === signAdminToken(getAdminPassword());
}

export async function isLocalAdminAuthenticated() {
  const { cookies } = await import("next/headers");
  const jar = await cookies();
  return isValidAdminToken(jar.get(LOCAL_ADMIN_COOKIE)?.value);
}

export function localAdminCookieOptions(token: string) {
  return {
    name: LOCAL_ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
  };
}
