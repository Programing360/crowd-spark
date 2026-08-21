import { z } from "zod";

export const REGISTER_CREDIT_BONUS = {
  Supporter: 50,
  Creator: 20,
} as const;

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(
    /^(?=.*[A-Za-z])(?=.*\d).*$/,
    "Password must contain at least one letter and one number",
  );

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name is too long"),
  email: z.email("Please enter a valid email address"),
  photoURL: z.union([
    z.literal(""),
    z.url("Please enter a valid URL (or leave it empty)"),
  ]),
  password: passwordSchema,
  role: z.enum(["Supporter", "Creator"]),
});

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
