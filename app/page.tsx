import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { CharacterGrid } from '@/components/character/character-grid';
import { FilterStateHydrator } from '@/components/character/filter-state-hydrator';
import { FilterBar } from '@/components/filters/filter-bar';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { getCharacters } from '@/services/character.service';
import { createQueryClient } from '@/lib/query-client';
import { normalizeCharacterFilters } from '@/types/character';

type SearchParamValue = string | string[] | undefined;
type RawSearchParams = {
  status?: SearchParamValue;
  gender?: SearchParamValue;
};

interface PageProps {
  searchParams?: Promise<RawSearchParams>;
}

const resolveSearchValue = (value?: SearchParamValue): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export default async function Page({ searchParams }: PageProps) {
  const safeSearchParams = searchParams ? await searchParams : {};
  const filters = normalizeCharacterFilters({
    status: resolveSearchValue(safeSearchParams.status),
    gender: resolveSearchValue(safeSearchParams.gender),
  });

  const queryClient = createQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['characters', filters],
    queryFn: () => getCharacters(filters),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="relative overflow-hidden py-10 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl dark:bg-cyan-900/30" />
        <div className="absolute top-1/3 -left-8 h-72 w-72 rounded-full bg-indigo-100 blur-3xl dark:bg-indigo-900/30" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6">
        <header className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold tracking-[0.12em] text-cyan-700 uppercase">
                Rick and Morty
              </p>
              <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Filter Characters
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <FilterBar />
        <FilterStateHydrator filters={filters} />

        <HydrationBoundary state={dehydratedState}>
          <CharacterGrid filters={filters} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
