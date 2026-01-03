/**
 * CSV field parsing utilities
 */

/**
 * Parse field value - returns trimmed input for raw JSON format
 *
 * NOTE: Does NOT convert \n sequences to actual newlines.
 * For text content, the display layer handles this.
 * For JSON content, JSON.parse handles \n escape sequences correctly.
 */
export function parseCsvField(input: string): string {
  return input.trim()
}
