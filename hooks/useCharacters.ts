import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '@/services/character.service';
import type { CharacterFilters } from '@/types/character';

export const useCharacters = (params: CharacterFilters) =>
  useQuery({
    queryKey: ['characters', params],
    queryFn: () => getCharacters(params),
  });
