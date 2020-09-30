export function trunc(val: number, dec: number): number {
  const mult = Math.pow(10, dec);
  return Math.trunc(Math.round(val * mult)) / mult;
}

export function truncFixed(val: number, dec: number): string {
  return trunc(val, dec).toFixed(dec);
}
