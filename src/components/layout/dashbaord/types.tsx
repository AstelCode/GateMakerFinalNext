"use client";

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
}
export type UserRole = "user" | "admin" | "superadmin";
