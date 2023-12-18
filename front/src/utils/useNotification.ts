import { toast as reactToast, ToastOptions } from 'react-toastify'

export type NotificationProps = {
  message: string
  type: ToastOptions['type']
}

export function useNotification() {
  const notification = (message: string, options?: ToastOptions) =>
    reactToast(message, {
      ...options,
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      theme: 'light',
      style: { width: 'max-content', top: 20 },
    })

  return { notification }
}
