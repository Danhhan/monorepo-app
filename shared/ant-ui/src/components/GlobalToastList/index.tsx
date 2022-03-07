import React, { Key, useState, ReactNode, ReactChild } from 'react';
import { EuiGlobalToastList } from '@elastic/eui';
import { EuiToastProps } from '@elastic/eui/src/components/toast/toast';

export type ToastProviderProps = {
  toastLifeTimeMs?: number;
};

export type Toast = EuiToastProps & {
  id: Key;
  text?: ReactChild;
  toastLifeTimeMs?: number;
};

let addToastHandler: (toast: Omit<Toast, 'id'>) => void;

let removeAllToastsHandler: () => void;

let toastId: number = 0;

const TOAST_LIFE_TIME_MS = 10000;

export const ToastProvider: React.FC<ToastProviderProps> = ({
  toastLifeTimeMs = TOAST_LIFE_TIME_MS,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  addToastHandler = (toast: Omit<Toast, 'id'>): void => {
    setToasts(prevState => [
      ...prevState,
      // eslint-disable-next-line no-plusplus
      { ...toast, id: `toast${toastId++}` },
    ]);
  };

  const removeToastHandler = (removedToast: EuiToastProps): void => {
    setToasts(prevState =>
      prevState.filter((toast: EuiToastProps) => toast.id !== removedToast.id),
    );
  };

  removeAllToastsHandler = (): void => {
    setToasts([]);
  };

  return (
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={removeToastHandler}
      toastLifeTimeMs={toastLifeTimeMs}
    />
  );
};

export { EuiGlobalToastList as GlobalToastList };

export const notification = {
  info: ({ title, text }: { title: ReactNode; text?: ReactChild }) =>
    addToastHandler({
      title,
      text,
      iconType: 'help',
      color: 'primary',
    }),
  success: ({ title, text }: { title: ReactNode; text?: ReactChild }) =>
    addToastHandler({
      title,
      text,
      iconType: 'check',
      color: 'success',
    }),
  warning: ({ title, text }: { title: ReactNode; text?: ReactChild }) =>
    addToastHandler({
      title,
      text,
      iconType: 'alert',
      color: 'warning',
    }),
  error: ({ title, text }: { title: ReactNode; text?: ReactChild }) =>
    addToastHandler({
      title,
      text,
      iconType: 'minusInCircle',
      color: 'danger',
    }),
};

export function removeAllToasts() {
  removeAllToastsHandler();
}
