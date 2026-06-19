export function isNumeric(str) {
  return /^-?\d+(\.\d+)?$/.test(str.trim());
}
