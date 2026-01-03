import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

interface ToastNotificationOptions {
  title: string;
  duration?: number;
}

export function useToastNotifications() {
  const toast = useToast();

  const defaultOptions = {
    duration: 3000,
    isClosable: true,
  };

  const showSuccess = useCallback(
    (options: ToastNotificationOptions) => {
      toast({
        ...defaultOptions,
        title: options.title,
        status: 'success',
        duration: options.duration,
      });
    },
    [toast]
  );

  const showError = useCallback(
    (options: ToastNotificationOptions) => {
      toast({
        ...defaultOptions,
        title: options.title,
        status: 'error',
        duration: options.duration,
      });
    },
    [toast]
  );

  const showWarning = useCallback(
    (options: ToastNotificationOptions) => {
      toast({
        ...defaultOptions,
        title: options.title,
        status: 'warning',
        duration: options.duration,
      });
    },
    [toast]
  );

  const showInfo = useCallback(
    (options: ToastNotificationOptions) => {
      toast({
        ...defaultOptions,
        title: options.title,
        status: 'info',
        duration: options.duration,
      });
    },
    [toast]
  );

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}

