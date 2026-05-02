/**
 * lib/api/games.ts
 *
 * Uses same base strategy as teams.ts / tournaments.ts
 * Public endpoint for games list
 * Prepared for future admin endpoints
 */

import { tokenManager } from "@/lib/api/auth/tokenManager";

// Strip trailing /auth
const GAMES_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/auth"
).replace(/\/auth\/?$/, "");

function getHeaders(): Record<string, string> {
  const token = tokenManager.get();

  return {
    Authorization: `Bearer ${token ?? ""}`,
    "Content-Type": "application/json",
  };
}

async function gameFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${GAMES_BASE}/games${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...getHeaders(),
      ...(init.headers as Record<string, string> | undefined),
    },
  });

  // Retry once on 401
  if (res.status === 401) {
    const newToken = await tokenManager.refresh();

    if (newToken) {
      return fetch(`${GAMES_BASE}/games${path}`, {
        ...init,
        credentials: "include",
        headers: {
          ...getHeaders(),
          ...(init.headers as Record<string, string> | undefined),
        },
      });
    }
  }

  return res;
}

/* ────────────────────────────────────────────────
   Types
──────────────────────────────────────────────── */

export interface Game {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  coverImage?: string;
  description?: string;
  isActive?: boolean;
  primaryColorHex?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGamePayload {
  name: string;
  description?: string;
  icon?: string;
  coverImage?: string;
  primaryColorHex?: string;
}

export interface UpdateGamePayload extends Partial<CreateGamePayload> {}

/* ────────────────────────────────────────────────
   Public Endpoint
──────────────────────────────────────────────── */

// 19. GET /api/v1/games
export async function getAllGames() {
  const res = await fetch(`${GAMES_BASE}/games`, {
    credentials: "include",
  });

  return res.json();
}

/* ────────────────────────────────────────────────
   Future Admin Endpoints (Pending in docs)
──────────────────────────────────────────────── */

// 20. POST /api/v1/admin/games
export async function createGame(payload: CreateGamePayload) {
  const res = await gameFetch("", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 21. PUT /api/v1/admin/games/:id
export async function updateGame(id: string, payload: UpdateGamePayload) {
  const res = await gameFetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.json();
}
