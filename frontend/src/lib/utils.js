import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// 2 thư viện con clsx và twMerge
// clsx : thư viện giúp viết lớp có điều kiện
// twMerge xử lý xung đột khi gộp nhiều class tailwind lại với nhau
