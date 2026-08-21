export type UserRole = "Supporter" | "Creator" | "Admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photoURL: string | null;
  role: UserRole;
}
