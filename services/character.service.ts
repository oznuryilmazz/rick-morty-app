import { api } from '@/lib/axios';
import { mapApiCharacterResponse } from '@/types/character';
import type {
  ApiCharacterResponse,
  CharacterFilters,
  CharacterResponse,
} from '@/types/character';

export const getCharacters = async (
  params: CharacterFilters = {},
): Promise<CharacterResponse> => {
  const requestParams = {
    ...(params.status ? { status: params.status } : {}),
    ...(params.gender ? { gender: params.gender } : {}),
  };

  const { data } = await api.get<ApiCharacterResponse>('/character', {
    params: requestParams,
  });

  return mapApiCharacterResponse(data);
};
