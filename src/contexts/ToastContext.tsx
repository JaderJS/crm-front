import React, { createContext, ReactNode, useContext, useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

interface ToastContextData {
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showWarningToast: (message: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<{ type: "success" | "error" | "warning"; message: string }[]>([]);

	useEffect(() => {
		if (toasts.length > 0) {
			const Toast = Swal.mixin({
				toast: true,
				position: "bottom-end",
				showConfirmButton: false,
				timer: 2000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener("mouseenter", Swal.stopTimer);
					toast.addEventListener("mouseleave", Swal.resumeTimer);
				},
			});

			toasts.forEach(({ type, message }) => {
				const icon = type === "success" ? "success" : type === "error" ? "error" : "warning";
				Toast.fire({
					icon,
					title: message,
					width: "auto",
				});
			});

			setToasts([]);
		}
	}, [toasts]);

	const showSuccessToast = (message: string) => {
		setToasts((prevToasts) => [...prevToasts, { type: "success", message }]);
	};

	const showErrorToast = (message: string) => {
		setToasts((prevToasts) => [...prevToasts, { type: "error", message }]);
	};

	const showWarningToast = (message: string) => {
		setToasts((prevToasts) => [...prevToasts, { type: "warning", message }]);
	};

	const memoizedContextValue = useMemo(
		() => ({
			showSuccessToast,
			showErrorToast,
			showWarningToast,
		}),
		[showSuccessToast, showErrorToast, showWarningToast]
	);

	return (
		<ToastContext.Provider value={memoizedContextValue}>
			{children}
		</ToastContext.Provider>
	);
}
