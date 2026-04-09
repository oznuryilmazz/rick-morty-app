export const CHARACTER_STATUSES = ['alive', 'dead', 'unknown'] as const;
export const CHARACTER_GENDERS = [
  'male',
  'female',
  'genderless',
  'unknown',
] as const;

export type CharacterStatus = (typeof CHARACTER_STATUSES)[number];
export type CharacterGender = (typeof CHARACTER_GENDERS)[number];

export interface CharacterPlace {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  gender: CharacterGender;
  species: string;
  type: string;
  origin: CharacterPlace;
  location: CharacterPlace;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterResponse {
  info?: {
    count: number;
    pages: number;
    next?: string | null;
    prev?: string | null;
  };
  results: Character[];
}

export interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: CharacterPlace;
  location: CharacterPlace;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ApiCharacterResponse {
  info?: {
    count: number;
    pages: number;
    next?: string | null;
    prev?: string | null;
  };
  results: ApiCharacter[];
}

export type CharacterFilters = {
  status?: CharacterStatus;
  gender?: CharacterGender;
};

export function sanitizeCharacterStatus(
  value?: string,
): CharacterStatus | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return (CHARACTER_STATUSES as readonly string[]).includes(normalized)
    ? (normalized as CharacterStatus)
    : undefined;
}

export function sanitizeCharacterGender(
  value?: string,
): CharacterGender | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return (CHARACTER_GENDERS as readonly string[]).includes(normalized)
    ? (normalized as CharacterGender)
    : undefined;
}

export function normalizeCharacterFilters(
  raw: { status?: string; gender?: string } = {},
): CharacterFilters {
  return {
    status: sanitizeCharacterStatus(raw.status),
    gender: sanitizeCharacterGender(raw.gender),
  };
}

export function mapApiCharacter(character: ApiCharacter): Character {
  return {
    id: character.id,
    name: character.name,
    status: sanitizeCharacterStatus(character.status) ?? 'unknown',
    gender: sanitizeCharacterGender(character.gender) ?? 'unknown',
    species: character.species,
    type: character.type,
    origin: character.origin,
    location: character.location,
    image: character.image,
    episode: character.episode,
    url: character.url,
    created: character.created,
  };
}

export function mapApiCharacterResponse(
  response: ApiCharacterResponse,
): CharacterResponse {
  return {
    info: response.info,
    results: response.results.map(mapApiCharacter),
  };
}
