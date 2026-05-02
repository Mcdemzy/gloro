"use client";

import { useAuthInit } from "@/lib/hooks/auth/useAuthInit";

/**
 * AuthProvider
 *
 * A thin Client Component wrapper that calls useAuthInit().
 * Use this in Server Component layouts where you can't call hooks directly.
 *
 * Usage in app/layout.tsx (Server Component):
 *
 *   import { AuthProvider } from "@/components/auth/AuthProvider";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html>
 *         <body>
 *           <AuthProvider>        ← wraps everything
 *             {children}
 *           </AuthProvider>
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * This is the correct pattern when your layout.tsx is a Server Component
 * and you need to run a client-side hook on app startup.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthInit(); // ← hook called correctly here, inside a Client Component
  return <>{children}</>;
}
