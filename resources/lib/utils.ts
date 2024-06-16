import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function browseByKeyString(obj: { [key: string]: any } = {}, path = '') {
  return path.split('.').reduce((prev, curr) => {
    let key = Number.isNaN(Number(curr)) ? curr : Number.parseInt(curr)
    return prev ? prev[key] : null
  }, obj)
}
