/**
 * Date Utilities
 * Provides consistent date formatting to prevent hydration mismatches
 */

/**
 * Formats a date string consistently for SSR/CSR
 * Always uses UTC to ensure server and client render the same output
 *
 * @param dateString - ISO date string (e.g., "2024-03-15")
 * @param format - Format style: 'short' | 'long' | 'numeric'
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  format: 'short' | 'long' | 'numeric' = 'short'
): string {
  const date = new Date(dateString);

  // Use UTC methods to ensure consistency between server and client
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const monthNames = {
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  switch (format) {
    case 'long':
      return `${monthNames.long[month]} ${day}, ${year}`;
    case 'numeric':
      return `${month + 1}/${day}/${year}`;
    case 'short':
    default:
      return `${monthNames.short[month]} ${day}, ${year}`;
  }
}

/**
 * Gets the year from a date string
 * @param dateString - ISO date string
 * @returns Year as number
 */
export function getYear(dateString: string): number {
  return new Date(dateString).getUTCFullYear();
}

/**
 * Checks if a date is in the past
 * @param dateString - ISO date string
 * @returns True if date is in the past
 */
export function isPast(dateString: string): boolean {
  return new Date(dateString).getTime() < Date.now();
}

/**
 * Formats a date for sitemap (ISO 8601)
 * @param dateString - ISO date string
 * @returns ISO 8601 formatted date
 */
export function formatSitemapDate(dateString: string): string {
  return new Date(dateString).toISOString();
}
