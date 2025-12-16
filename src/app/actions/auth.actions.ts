"use server";
import { getErrorMessage } from "@/libs/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type SignupState = {
  error?: string;
  success?: boolean;
  email?: string;
};

export async function loginAction(
  prevState: Record<string, string>,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const apiUrl = process.env.API_URL;

  if (!apiUrl) return { error: "API URL is not configured" };

  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }).toString(),
  });

  const data = await response.json();

  if (response.status === 403 && data.detail === "ACCOUNT_NOT_VERIFIED") {
    redirect(`/verify?email=${encodeURIComponent(email)}`);
  }

  if (!response.ok) {
    return { error: getErrorMessage(data) };
  }

  const token = data.access_token;

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/dashboard");
}

export async function signupAction(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const fullname = formData.get("fullName") as string;

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return { error: "API URL is not configured", success: false, email: "" };
  }

  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username, full_name: fullname }),
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        error: getErrorMessage(data) || "Failed to register!",
        success: false,
        email: "",
      };
    }

    return {
      success: true,
      email: email,
      error: "",
    };
  } catch (e) {
    return {
      error: "Network error. Please try again.",
      success: false,
      email: "",
    };
  }
}

export async function verifyOtpAction(
  prevState: { error: string; success?: boolean },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const otp = formData.get("otp") as string;
  const apiUrl = process.env.API_URL;

  if (!apiUrl) return { error: "API Config Error" };

  try {
    const response = await fetch(`${apiUrl}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: getErrorMessage(data) };
    }

    if (data.access_token) {
      (await cookies()).set("token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
    }
  } catch (err) {
    return { error: "Network error. Please try again." };
  }

  redirect("/dashboard");
}
