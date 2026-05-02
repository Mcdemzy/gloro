/**
 * lib/api/teams.ts
 *
 * Uses tokenManager directly (reads "gloroq_access_token" from localStorage)
 * and derives the correct base URL by stripping /auth from NEXT_PUBLIC_API_URL.
 *
 * If NEXT_PUBLIC_API_URL = https://gloroq-backend.vercel.app/api/v1/auth
 * then TEAMS_BASE          = https://gloroq-backend.vercel.app/api/v1
 * and all calls go to      = https://gloroq-backend.vercel.app/api/v1/teams/...
 */

import { tokenManager } from "@/lib/api/auth/tokenManager";

// Strip trailing /auth so teams hit /api/v1/teams not /api/v1/auth/teams
const TEAMS_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/auth"
).replace(/\/auth\/?$/, "");

function getHeaders(isMultipart = false): Record<string, string> {
  const token = tokenManager.get(); // "gloroq_access_token" key
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token ?? ""}`,
  };
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

async function teamFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const isMultipart = init.body instanceof FormData;

  const res = await fetch(`${TEAMS_BASE}/teams${path}`, {
    ...init,
    credentials: "include",
    headers: {
      ...getHeaders(isMultipart),
      ...(init.headers as Record<string, string> | undefined),
    },
  });

  // 401 → refresh token once, then retry
  if (res.status === 401) {
    const newToken = await tokenManager.refresh();
    if (newToken) {
      return fetch(`${TEAMS_BASE}/teams${path}`, {
        ...init,
        credentials: "include",
        headers: {
          ...getHeaders(isMultipart),
          ...(init.headers as Record<string, string> | undefined),
        },
      });
    }
  }

  return res;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  userId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    username: string;
    gloroId: string;
    avatar?: string;
  };
  role: string;
  joinedAt: string;
}

export interface Team {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  isPrivate: boolean;
  creatorId: {
    _id: string;
    firstName?: string;
    lastName?: string;
    username: string;
    email?: string;
    gloroId: string;
    avatar?: string;
  };
  members: TeamMember[];
  maxMembers: number;
  joinWindowExpiry?: string;
  status: "active" | "expired" | "dissolved";
  currentTournaments?: number;
  createdAt: string;
  updatedAt: string;
  isMember?: boolean;
}

export interface CreateTeamPayload {
  name: string;
  description?: string;
  isPrivate?: boolean;
  accessPassword?: string;
  maxMembers?: number;
}

export interface UpdateTeamPayload {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  accessPassword?: string;
  maxMembers?: number;
}

// ── Endpoints ─────────────────────────────────────────────────────────────────

// 1. Create Team  POST /teams
export async function createTeam(payload: CreateTeamPayload) {
  const res = await teamFetch("", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res.json();
}

// 2. Get My Teams  GET /teams/user/my-teams
export async function getMyTeams() {
  const res = await teamFetch("/user/my-teams");
  return res.json();
}

// 3. Get Team by ID  GET /teams/detail/:id
export async function getTeamById(id: string) {
  const res = await teamFetch(`/detail/${id}`);
  return res.json();
}

// 4. Get Team by Slug (public)  GET /teams/:slug
export async function getTeamBySlug(slug: string) {
  const res = await fetch(`${TEAMS_BASE}/teams/${slug}`);
  return res.json();
}

// 5. Update Team  PUT /teams/:id
export async function updateTeam(id: string, payload: UpdateTeamPayload) {
  const res = await teamFetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res.json();
}

// 6. Upload Team Logo  POST /teams/:id/logo  (multipart)
export async function uploadTeamLogo(id: string, file: File) {
  const formData = new FormData();
  formData.append("logo", file);
  const res = await teamFetch(`/${id}/logo`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

// 7. Upload Team Cover  POST /teams/:id/cover  (multipart)
export async function uploadTeamCover(id: string, file: File) {
  const formData = new FormData();
  formData.append("cover", file);
  const res = await teamFetch(`/${id}/cover`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

// 8. Join Team  POST /teams/:slug/join
export async function joinTeam(slug: string, password?: string) {
  const res = await teamFetch(`/${slug}/join`, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  return res.json();
}

// 9. Get Invite Link  GET /teams/:id/invite-link
export async function getInviteLink(id: string) {
  const res = await teamFetch(`/${id}/invite-link`);
  return res.json();
}

// 10. Add Members  POST /teams/:id/members
export async function addMembers(id: string, gloroIds: string[]) {
  const res = await teamFetch(`/${id}/members`, {
    method: "POST",
    body: JSON.stringify({ gloroIds }),
  });
  return res.json();
}

// 11. Update Member Role  PUT /teams/:id/members/:userId
export async function updateMemberRole(
  id: string,
  userId: string,
  role: string,
) {
  const res = await teamFetch(`/${id}/members/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ role }),
  });
  return res.json();
}

// 12. Remove Member  DELETE /teams/:id/members/:userId
export async function removeMember(id: string, userId: string) {
  const res = await teamFetch(`/${id}/members/${userId}`, { method: "DELETE" });
  return res.json();
}

// 13. Leave Team  POST /teams/:id/leave
export async function leaveTeam(id: string) {
  const res = await teamFetch(`/${id}/leave`, { method: "POST" });
  return res.json();
}

// 14. Extend Join Window  POST /teams/:id/extend
export async function extendJoinWindow(id: string) {
  const res = await teamFetch(`/${id}/extend`, { method: "POST" });
  return res.json();
}

// 15. Dissolve Team  DELETE /teams/:id
export async function dissolveTeam(id: string) {
  const res = await teamFetch(`/${id}`, { method: "DELETE" });
  return res.json();
}
