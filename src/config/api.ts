export const API_ENDPOINTS = {
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  google: "/api/v1/auth/google",
} as const;

export interface AuthApiResponse {
  access_token?: string;
  token?: string;
  message?: string;
  error?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    photoURL?: string | null;
    image?: string | null;
    role?: string;
    credits?: number;
  };
}

export async function postJson<T extends object>(
  url: string,
  body: T,
): Promise<{ ok: boolean; status: number; data: AuthApiResponse }> {
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Network error. Please check your connection and try again.");
  }

  let data: AuthApiResponse = {};
  try {
    data = (await response.json()) as AuthApiResponse;
  } catch {
    data = {};
  }

  return { ok: response.ok, status: response.status, data };
}
