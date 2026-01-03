/**
 * CSV field parsing utilities
 */

/**
 * Parse CSV-escaped field value
 * Handles the CSV escaping convention:
 * - Outer quotes stripped: "..." -> ...
 * - Doubled quotes unescaped: "" -> "
 *
 * NOTE: Does NOT convert \n sequences to actual newlines.
 * For text content, the display layer handles this.
 * For JSON content, JSON.parse handles \n escape sequences correctly.
 */
export function parseCsvField(input: string): string {
  let text = input.trim()

  // If wrapped in outer quotes, remove them and unescape doubled quotes
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1)
    // Unescape doubled quotes
    text = text.replace(/""/g, '"')
  }

  return text
}
