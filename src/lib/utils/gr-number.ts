export function formatGRNumber(n: number): string {
  return `GR-${n.toString().padStart(4, '0')}`;
}

export function parseGRNumber(s: string): number {
  if (!s.startsWith('GR-')) {
    return parseInt(s, 10);
  }
  return parseInt(s.replace('GR-', ''), 10);
}
