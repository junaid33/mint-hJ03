const hexadecimalPattern = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

export function isHexadecimal(color: string): boolean {
  return hexadecimalPattern.test(color);
}
