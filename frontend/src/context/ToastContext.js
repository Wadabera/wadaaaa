import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((items) => items.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (message, type = "info") => {
      const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      setToasts((items) => [...items, { id, message, type }]);
      setTimeout(() => remove(id), 4200);
    },
    [remove]
  );

  const value = useMemo(
    () => ({
      success: (message) => notify(message, "success"),
      error: (message) => notify(message, "error"),
      info: (message) => notify(message, "info"),
    }),
    [notify]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((toast) => {
          const Icon =
            toast.type === "success"
              ? FiCheckCircle
              : toast.type === "error"
              ? FiAlertCircle
              : FiInfo;
          return (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              <Icon />
              <span>{toast.message}</span>
              <button onClick={() => remove(toast.id)} aria-label="Dismiss notification">
                <FiX />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
