import { toast } from 'sonner';

interface ToastNotificationOptions {
  title: string;
  duration?: number;
}

export function useToastNotifications() {
  const showSuccess = ({ title, duration }: ToastNotificationOptions) => {
    toast.success(title, { duration: duration ?? 3000 });
  };

  const showError = ({ title, duration }: ToastNotificationOptions) => {
    toast.error(title, { duration: duration ?? 3000 });
  };

  const showWarning = ({ title, duration }: ToastNotificationOptions) => {
    toast.warning(title, { duration: duration ?? 3000 });
  };

  const showInfo = ({ title, duration }: ToastNotificationOptions) => {
    toast.info(title, { duration: duration ?? 3000 });
  };

  return { showSuccess, showError, showWarning, showInfo };
}
