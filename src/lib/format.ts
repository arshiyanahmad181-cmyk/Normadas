/** Format a number as Pakistani Rupees, e.g. 38000 -> "Rs 38,000". */
export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}
