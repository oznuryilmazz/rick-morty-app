'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CardTitle } from '@/components/ui/card';
import { useCharacters } from '@/hooks/useCharacters';
import type { CharacterFilters } from '@/types/character';
import { CharacterCard } from './character-card';

export function CharacterGrid({ filters }: { filters: CharacterFilters }) {
  const { data, isLoading, isError, error } = useCharacters(filters);

  if (isError) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';

    return (
      <Card className="border-rose-200/70 bg-rose-50 dark:border-rose-900/40 dark:bg-rose-950/20">
        <CardContent>
          <CardTitle className="text-rose-700 dark:text-rose-300">
            API Error
          </CardTitle>
          <p className="text-sm text-rose-600 dark:text-rose-400">{message}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border-border bg-card h-72 animate-pulse rounded-2xl border"
          />
        ))}
      </div>
    );
  }

  const characters = data?.results ?? [];

  if (characters.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <CardTitle>No Results Found</CardTitle>
          <p className="text-muted-foreground mt-2 text-sm">
            Try updating your filters to see different results.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
