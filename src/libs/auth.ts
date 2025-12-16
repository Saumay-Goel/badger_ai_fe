import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.API_URL}/auth/users/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
