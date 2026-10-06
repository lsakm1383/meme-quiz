import type { DreamCategory, DreamEntry } from "@/data/saju/types";
import animal from "@/data/saju/dreams/animal";
import body from "@/data/saju/dreams/body";
import people from "@/data/saju/dreams/people";
import nature from "@/data/saju/dreams/nature";
import object from "@/data/saju/dreams/object";
import action from "@/data/saju/dreams/action";
import place from "@/data/saju/dreams/place";
import food from "@/data/saju/dreams/food";

export const DREAM_CATEGORIES: { key: DreamCategory; name: string; emoji: string }[] = [
  { key: "animal", name: "동물", emoji: "🐷" },
  { key: "people", name: "사람", emoji: "🧑" },
  { key: "action", name: "행동·상황", emoji: "🏃" },
  { key: "body", name: "몸·건강", emoji: "🦷" },
  { key: "nature", name: "자연·날씨", emoji: "🌊" },
  { key: "object", name: "물건·돈", emoji: "💰" },
  { key: "place", name: "장소", emoji: "🏫" },
  { key: "food", name: "음식", emoji: "🍑" },
];

export const dreams: DreamEntry[] = [...animal, ...people, ...action, ...body, ...nature, ...object, ...place, ...food];

export function getDream(slug: string): DreamEntry | undefined {
  return dreams.find((dream) => dream.slug === slug);
}
