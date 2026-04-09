'use client';

import { useEffect } from 'react';
import { useCharacterStore } from '@/store/useCharacterStore';
import type { CharacterFilters } from '@/types/character';

type FilterStateHydratorProps = {
  filters: CharacterFilters;
};

export function FilterStateHydrator({ filters }: FilterStateHydratorProps) {
  const { setFilters } = useCharacterStore();

  useEffect(() => {
    setFilters(filters.status, filters.gender);
  }, [setFilters, filters.status, filters.gender]);

  return null;
}
