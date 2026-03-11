import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** クラス名を結合・マージするユーティリティ */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
