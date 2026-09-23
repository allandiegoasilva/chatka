export const reactionTypes = [
  "heart",
  "laugh",
  "fire",
  "like",
  "party",
] as const;

export type ReactionType = (typeof reactionTypes)[number];

export function isReactionType(value: unknown): value is ReactionType {
  return (
    typeof value === "string" &&
    reactionTypes.includes(value as ReactionType)
  );
}

export function spawnReaction(type: ReactionType) {
  window.dispatchEvent(new CustomEvent("chat:reaction", { detail: type }));
}
