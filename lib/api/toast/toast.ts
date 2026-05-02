// Thin wrapper around sonner — swap for react-hot-toast if preferred.
// Install: npm install sonner
// Add <Toaster /> to your root layout.tsx

import { toast as sonnerToast } from "sonner";

export const toast = {
  success: (message: string) =>
    sonnerToast.success(message, { duration: 4000 }),

  error: (message: string) => sonnerToast.error(message, { duration: 5000 }),

  info: (message: string) => sonnerToast(message, { duration: 3500 }),

  loading: (message: string) => sonnerToast.loading(message),

  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};
