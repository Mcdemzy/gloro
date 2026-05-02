/**
 * lib/api/tournaments.ts
 *
 * Uses tokenManager directly (reads gloroq_access_token)
 * and derives base URL by stripping /auth from NEXT_PUBLIC_API_URL
 *
 * If NEXT_PUBLIC_API_URL =
 * https://gloroq-backend.vercel.app/api/v1/auth
 *
 * Then TOURNAMENTS_BASE =
 * https://gloroq-backend.vercel.app/api/v1
 */

import { tokenManager } from "@/lib/api/auth/tokenManager";

// Strip trailing /auth
const TOURNAMENTS_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/auth"
).replace(/\/auth\/?$/, "");

function getHeaders(): Record<string, string> {
  const token = tokenManager.get();

  return {
    Authorization: `Bearer ${token ?? ""}`,
    "Content-Type": "application/json",
  };
}

async function tournamentFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${TOURNAMENTS_BASE}/tournaments${path}`, {
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
      return fetch(`${TOURNAMENTS_BASE}/tournaments${path}`, {
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

export type TournamentStatus =
  | "draft"
  | "published"
  | "registration_open"
  | "ongoing"
  | "completed"
  | "cancelled";

export type RegistrationStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled"
  | "waitlisted";

export interface PrizePool {
  first?: number;
  second?: number;
  third?: number;
}

export interface TournamentGame {
  _id?: string;
  gameId: string;
  gameName?: string;
  minTeamMembers: number;
  maxTeamMembers: number;
  maxTeams: number;
  currentTeams?: number;
  rules?: string;
}

export interface TournamentSchedule {
  _id?: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  order: number;
}

export interface Tournament {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
  registrationOpenDate?: string;
  registrationCloseDate?: string;
  prizePool?: PrizePool;
  totalTeams?: number;
  views?: number;
  maxTeamsPerGame?: number;
  hasWaitlist?: boolean;
  games?: TournamentGame[];
  schedules?: TournamentSchedule[];
  creatorId?: {
    _id: string;
    username: string;
  };
}

export interface CreateTournamentPayload {
  title: string;
  description?: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  prizePool?: PrizePool;
  maxTeamsPerGame?: number;
  hasWaitlist?: boolean;
}

export interface UpdateTournamentPayload extends Partial<CreateTournamentPayload> {}

export interface HubParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  gameId?: string;
}

/* ────────────────────────────────────────────────
   Public Endpoints
──────────────────────────────────────────────── */

// 1. GET /
export async function getAllTournaments(params?: {
  limit?: number;
  status?: string;
}) {
  const query = new URLSearchParams();

  if (params?.limit) query.append("limit", String(params.limit));
  if (params?.status) query.append("status", params.status);

  const res = await fetch(
    `${TOURNAMENTS_BASE}/tournaments${
      query.toString() ? `?${query.toString()}` : ""
    }`,
  );

  return res.json();
}

// 2. GET /trending
export async function getTrendingTournaments() {
  const res = await fetch(`${TOURNAMENTS_BASE}/tournaments/trending`);
  return res.json();
}

// 3. GET /latest
export async function getLatestTournaments() {
  const res = await fetch(`${TOURNAMENTS_BASE}/tournaments/latest`);
  return res.json();
}

// 4. GET /hub
export async function getTournamentHub(params?: HubParams) {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", String(params.page));
  if (params?.limit) query.append("limit", String(params.limit));
  if (params?.search) query.append("search", params.search);
  if (params?.status) query.append("status", params.status);
  if (params?.gameId) query.append("gameId", params.gameId);

  const res = await fetch(
    `${TOURNAMENTS_BASE}/tournaments/hub?${query.toString()}`,
  );

  return res.json();
}

// 5. GET /:slug
export async function getTournamentBySlug(slug: string) {
  const res = await fetch(`${TOURNAMENTS_BASE}/tournaments/${slug}`);
  return res.json();
}

/* ────────────────────────────────────────────────
   Protected Endpoints
──────────────────────────────────────────────── */

// 6. POST /
export async function createTournament(payload: CreateTournamentPayload) {
  const res = await tournamentFetch("", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 7. PUT /:id
export async function updateTournament(
  id: string,
  payload: UpdateTournamentPayload,
) {
  const res = await tournamentFetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 8. POST /:id/publish
export async function publishTournament(id: string) {
  const res = await tournamentFetch(`/${id}/publish`, {
    method: "POST",
  });

  return res.json();
}

// 9. DELETE /:id
export async function deleteTournament(id: string) {
  const res = await tournamentFetch(`/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

// 10. POST /:id/games
export async function addGameToTournament(id: string, payload: TournamentGame) {
  const res = await tournamentFetch(`/${id}/games`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 11. PUT /:id/games/:gameId
export async function updateTournamentGame(
  id: string,
  gameId: string,
  payload: Partial<TournamentGame>,
) {
  const res = await tournamentFetch(`/${id}/games/${gameId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 12. DELETE /:id/games/:gameId
export async function removeTournamentGame(id: string, gameId: string) {
  const res = await tournamentFetch(`/${id}/games/${gameId}`, {
    method: "DELETE",
  });

  return res.json();
}

// 13. POST /:id/schedules
export async function addScheduleToTournament(
  id: string,
  payload: TournamentSchedule,
) {
  const res = await tournamentFetch(`/${id}/schedules`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 14. PUT /:id/schedules/:scheduleId
export async function updateTournamentSchedule(
  id: string,
  scheduleId: string,
  payload: Partial<TournamentSchedule>,
) {
  const res = await tournamentFetch(`/${id}/schedules/${scheduleId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 15. DELETE /:id/schedules/:scheduleId
export async function removeTournamentSchedule(id: string, scheduleId: string) {
  const res = await tournamentFetch(`/${id}/schedules/${scheduleId}`, {
    method: "DELETE",
  });

  return res.json();
}

// 16. POST /:slug/register
export async function registerTeamForTournament(
  slug: string,
  payload: {
    teamId: string;
    gameId: string;
  },
) {
  const res = await tournamentFetch(`/${slug}/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return res.json();
}

// 17. GET /:id/registrations
export async function getTournamentRegistrations(id: string) {
  const res = await tournamentFetch(`/${id}/registrations`);
  return res.json();
}

// 18. PUT /registrations/:id
export async function updateRegistrationStatus(
  registrationId: string,
  payload: {
    status: RegistrationStatus;
    rejectionReason?: string;
  },
) {
  const res = await tournamentFetch(`/registrations/${registrationId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.json();
}
