import { toast } from 'sonner';

interface ToastNotificationOptions {
  duration?: number;
  title: string;
}

const DEFAULT_DURATION = 3000;

const show =
  (kind: 'error' | 'info' | 'success' | 'warning') =>
  ({ duration = DEFAULT_DURATION, title }: ToastNotificationOptions) =>
    toast[kind](title, { duration });

const notifications = {
  showError: show('error'),
  showInfo: show('info'),
  showSuccess: show('success'),
  showWarning: show('warning'),
};

export function useToastNotifications() {
  return notifications;
}
