import Swal from "sweetalert2";

const COLORS = {
  honey: "#A87945",
  cream: "#F8F4ED",
  brown: "#4B3621",
  beige: "#E8D8C3",
};

/**
 * Displays a success notification.
 */
export const showSuccess = (title: string, text?: string) =>
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title,
    text,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    background: COLORS.cream,
    color: COLORS.brown,
  });

/**
 * Displays an error notification.
 */
export const showError = (title: string, text?: string) =>
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "OK",
    confirmButtonColor: COLORS.honey,
    background: COLORS.cream,
    color: COLORS.brown,
  });

/**
 * Displays a warning notification.
 */
export const showWarning = (title: string, text?: string) =>
  Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText: "OK",
    confirmButtonColor: COLORS.honey,
    background: COLORS.cream,
    color: COLORS.brown,
  });

/**
 * Displays a toast notification.
 */
export const showToast = (
  title: string,
  icon: "success" | "error" | "warning" | "info" = "success"
) =>
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: COLORS.cream,
    color: COLORS.brown,
  });

/**
 * Displays a confirmation dialog.
 */
export const showConfirm = (title: string, text: string) =>
  Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: COLORS.honey,
    cancelButtonColor: COLORS.brown,
    background: COLORS.cream,
    color: COLORS.brown,
  });