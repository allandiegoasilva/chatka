export const MESSAGE_MAX_LENGTH = 280;

export function clampMessage(value: string) {
  return value.trim().slice(0, MESSAGE_MAX_LENGTH);
}
