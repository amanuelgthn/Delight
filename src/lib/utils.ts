import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(isoDate: string): string {
  const now = new Date(); // current time
  const past = new Date(isoDate); // convert the passed ISO date string to a Date object
  const diff = now.getTime() - past.getTime(); // difference in milliseconds

  const minute = 60 * 1000; // milliseconds in a minute
  const hour = 60 * minute; // milliseconds in an hour
  const day = 24 * hour; // milliseconds in a day

  if (diff < hour) {
    // Less than an hour
    return `${Math.floor(diff / minute)} minutes ago`;
  } else if (diff < day) {
    // Less than a day
    return `${Math.floor(diff / hour)} hours ago`;
  } else {
    // More than a day
    return `${Math.floor(diff / day)} days ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
}