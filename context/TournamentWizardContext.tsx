"use client";

/**
 * TournamentWizardContext
 *
 * Single source of truth for the entire Create Tournament flow.
 * - All step state lives here (no localStorage, no per-step scattered state)
 * - createTournament() + addGameToTournament() + addScheduleToTournament()
 *   are called once from step 3's "Submit" action
 * - Games list is fetched from the real API
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  createTournament,
  addGameToTournament,
  addScheduleToTournament,
} from "@/lib/api/tournaments";
import { getAllGames, Game } from "@/lib/api/games";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WizardGame {
  /** The real game _id from the backend */
  gameId: string;
  gameName: string;
  minTeamMembers: number;
  maxTeamMembers: number;
  maxTeams: number;
  rules: string;
}

export interface WizardSchedule {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  order: number;
}

export interface WizardPrizePool {
  first: string;
  second: string;
  third: string;
}

interface WizardState {
  // Step 1
  title: string;
  coverImageUrl: string;           // URL returned after upload, sent to API
  coverImagePreview: string;       // Local blob/dataURL for preview only
  games: WizardGame[];

  // Step 2
  startDate: string;
  endDate: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  schedules: WizardSchedule[];

  // Step 3
  prizePool: WizardPrizePool;
  maxTeamsPerGame: string;
  hasWaitlist: boolean;
  description: string;
}

interface WizardContextValue {
  state: WizardState;
  availableGames: Game[];
  gamesLoading: boolean;

  // Setters
  setTitle: (v: string) => void;
  setCoverImageUrl: (url: string) => void;
  setCoverImagePreview: (preview: string) => void;
  addGame: (g: WizardGame) => void;
  updateGame: (gameId: string, g: Partial<WizardGame>) => void;
  removeGame: (gameId: string) => void;

  setStartDate: (v: string) => void;
  setEndDate: (v: string) => void;
  setRegistrationOpenDate: (v: string) => void;
  setRegistrationCloseDate: (v: string) => void;
  addSchedule: (s: WizardSchedule) => void;
  removeSchedule: (index: number) => void;

  setPrizePool: (p: Partial<WizardPrizePool>) => void;
  setMaxTeamsPerGame: (v: string) => void;
  setHasWaitlist: (v: boolean) => void;
  setDescription: (v: string) => void;

  /** Final submit — calls createTournament then adds games + schedules */
  submitTournament: () => Promise<{ success: boolean; tournamentId?: string; message?: string }>;

  submitting: boolean;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const defaultState: WizardState = {
  title: "",
  coverImageUrl: "",
  coverImagePreview: "",
  games: [],
  startDate: "",
  endDate: "",
  registrationOpenDate: "",
  registrationCloseDate: "",
  schedules: [],
  prizePool: { first: "", second: "", third: "" },
  maxTeamsPerGame: "",
  hasWaitlist: false,
  description: "",
};

// ── Context ───────────────────────────────────────────────────────────────────

const WizardContext = createContext<WizardContextValue | null>(null);

export function TournamentWizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WizardState>(defaultState);
  const [availableGames, setAvailableGames] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch real games list once on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllGames();
        if (res.success && Array.isArray(res.data)) {
          setAvailableGames(res.data);
        }
      } catch {
        // Games will be empty; step 1 UI handles this gracefully
      } finally {
        setGamesLoading(false);
      }
    })();
  }, []);

  // ── Setters ──
  const setTitle = useCallback((v: string) => setState(s => ({ ...s, title: v })), []);
  const setCoverImageUrl = useCallback((url: string) => setState(s => ({ ...s, coverImageUrl: url })), []);
  const setCoverImagePreview = useCallback((preview: string) => setState(s => ({ ...s, coverImagePreview: preview })), []);

  const addGame = useCallback((g: WizardGame) => {
    setState(s => ({
      ...s,
      games: s.games.some(x => x.gameId === g.gameId)
        ? s.games.map(x => x.gameId === g.gameId ? g : x)
        : [...s.games, g],
    }));
  }, []);

  const updateGame = useCallback((gameId: string, g: Partial<WizardGame>) => {
    setState(s => ({
      ...s,
      games: s.games.map(x => x.gameId === gameId ? { ...x, ...g } : x),
    }));
  }, []);

  const removeGame = useCallback((gameId: string) => {
    setState(s => ({ ...s, games: s.games.filter(x => x.gameId !== gameId) }));
  }, []);

  const setStartDate = useCallback((v: string) => setState(s => ({ ...s, startDate: v })), []);
  const setEndDate = useCallback((v: string) => setState(s => ({ ...s, endDate: v })), []);
  const setRegistrationOpenDate = useCallback((v: string) => setState(s => ({ ...s, registrationOpenDate: v })), []);
  const setRegistrationCloseDate = useCallback((v: string) => setState(s => ({ ...s, registrationCloseDate: v })), []);

  const addSchedule = useCallback((sc: WizardSchedule) => {
    setState(s => ({ ...s, schedules: [...s.schedules, sc] }));
  }, []);

  const removeSchedule = useCallback((index: number) => {
    setState(s => ({ ...s, schedules: s.schedules.filter((_, i) => i !== index) }));
  }, []);

  const setPrizePool = useCallback((p: Partial<WizardPrizePool>) => {
    setState(s => ({ ...s, prizePool: { ...s.prizePool, ...p } }));
  }, []);

  const setMaxTeamsPerGame = useCallback((v: string) => setState(s => ({ ...s, maxTeamsPerGame: v })), []);
  const setHasWaitlist = useCallback((v: boolean) => setState(s => ({ ...s, hasWaitlist: v })), []);
  const setDescription = useCallback((v: string) => setState(s => ({ ...s, description: v })), []);

  // ── Submit ──
  const submitTournament = useCallback(async () => {
    setSubmitting(true);
    try {
      const { title, coverImageUrl, startDate, endDate, registrationOpenDate,
        registrationCloseDate, prizePool, maxTeamsPerGame, hasWaitlist, description,
        games, schedules } = state;

      // 1. Create the tournament
      const createRes = await createTournament({
        title,
        description: description || undefined,
        coverImage: coverImageUrl || undefined,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        registrationOpenDate: new Date(registrationOpenDate).toISOString(),
        registrationCloseDate: new Date(registrationCloseDate).toISOString(),
        prizePool: {
          first: prizePool.first ? Number(prizePool.first) : undefined,
          second: prizePool.second ? Number(prizePool.second) : undefined,
          third: prizePool.third ? Number(prizePool.third) : undefined,
        },
        maxTeamsPerGame: maxTeamsPerGame ? Number(maxTeamsPerGame) : undefined,
        hasWaitlist,
      });

      if (!createRes.success) {
        return { success: false, message: createRes.message || "Failed to create tournament." };
      }

      const tournamentId: string = createRes.data._id;

      // 2. Add games (parallel)
      if (games.length > 0) {
        await Promise.allSettled(
          games.map(g =>
            addGameToTournament(tournamentId, {
              gameId: g.gameId,
              minTeamMembers: g.minTeamMembers,
              maxTeamMembers: g.maxTeamMembers,
              maxTeams: g.maxTeams,
              rules: g.rules || undefined,
            })
          )
        );
      }

      // 3. Add schedules (sequential to preserve order)
      for (const sc of schedules) {
        await addScheduleToTournament(tournamentId, {
          title: sc.title,
          description: sc.description || undefined,
          startDate: new Date(sc.startDate).toISOString(),
          endDate: new Date(sc.endDate).toISOString(),
          order: sc.order,
        });
      }

      // Reset wizard state after successful submission
      setState(defaultState);

      return { success: true, tournamentId };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    } finally {
      setSubmitting(false);
    }
  }, [state]);

  const value: WizardContextValue = {
    state,
    availableGames,
    gamesLoading,
    setTitle,
    setCoverImageUrl,
    setCoverImagePreview,
    addGame,
    updateGame,
    removeGame,
    setStartDate,
    setEndDate,
    setRegistrationOpenDate,
    setRegistrationCloseDate,
    addSchedule,
    removeSchedule,
    setPrizePool,
    setMaxTeamsPerGame,
    setHasWaitlist,
    setDescription,
    submitTournament,
    submitting,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside TournamentWizardProvider");
  return ctx;
}