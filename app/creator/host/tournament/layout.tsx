/**
 * app/(dashboard)/creator/host/tournament/layout.tsx
 *
 * Wraps all tournament creation steps with the WizardContext provider.
 * This means state is shared across /step-2, /step-3, /complete automatically.
 *
 * Place this file at:
 *   app/(dashboard)/creator/host/tournament/layout.tsx
 */

import { TournamentWizardProvider } from "@/context/TournamentWizardContext";

export default function TournamentWizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TournamentWizardProvider>{children}</TournamentWizardProvider>;
}