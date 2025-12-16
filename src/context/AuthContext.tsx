"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type User = {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  disabled?: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);
  // console.log("AUTH PROVIDER RECEIVED:", initialUser);

  const login = (userData: User) => {
    setUser(userData);
    router.refresh();
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
