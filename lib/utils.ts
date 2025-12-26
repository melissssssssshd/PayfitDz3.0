import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formate un nombre selon le format algérien/français
 * Évite les erreurs d'hydratation en utilisant une locale explicite
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    ...options,
  })
}

/**
 * Formate un montant en DA (Dinars Algériens)
 */
export function formatCurrency(value: number, currency: string = 'DA'): string {
  return `${formatNumber(value)} ${currency}`
}
