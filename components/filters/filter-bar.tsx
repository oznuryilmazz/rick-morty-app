'use client';

import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useCharacterStore } from '@/store/useCharacterStore';
import { X } from 'lucide-react';
import {
  type CharacterStatus,
  type CharacterGender,
  sanitizeCharacterStatus,
  sanitizeCharacterGender,
} from '@/types/character';
import { useQueryState } from 'nuqs';

export function FilterBar() {
  const [status, setStatus] = useQueryState('status', { shallow: false });
  const [gender, setGender] = useQueryState('gender', { shallow: false });
  const {
    selectedCharacterId,
    selectedCharacter,
    setFilters,
    clearFilters,
    clearSelected,
  } = useCharacterStore();
  const sanitizedStatus = sanitizeCharacterStatus(status || undefined);
  const sanitizedGender = sanitizeCharacterGender(gender || undefined);

  const onStatusChange = (value: string) => {
    const nextStatus = (value || undefined) as CharacterStatus | undefined;
    setStatus(nextStatus ?? null);
    setFilters(nextStatus, sanitizedGender);
  };

  const onGenderChange = (value: string) => {
    const nextGender = (value || undefined) as CharacterGender | undefined;
    setGender(nextGender ?? null);
    setFilters(sanitizedStatus, nextGender);
  };

  const onClear = () => {
    setStatus(null);
    setGender(null);
    clearFilters();
  };

  return (
    <section className="border-border bg-card rounded-2xl border p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="w-full sm:w-44">
          <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-[0.08em] uppercase">
            Status
          </span>
          <Select
            value={sanitizedStatus ?? ''}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="">All statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Select>
        </label>

        <label className="w-full sm:w-44">
          <span className="text-muted-foreground mb-1 block text-xs font-semibold tracking-[0.08em] uppercase">
            Gender
          </span>
          <Select
            value={sanitizedGender ?? ''}
            onChange={(event) => onGenderChange(event.target.value)}
          >
            <option value="">All genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </Select>
        </label>

        <Button
          onClick={onClear}
          type="button"
          variant="outline"
          className="h-11 sm:ml-auto sm:min-w-24"
        >
          Clear Filters
        </Button>
      </div>

      {selectedCharacterId && selectedCharacterId === selectedCharacter?.id ? (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span>{`Selected character: ${selectedCharacter?.name}`}</span>
          <button
            type="button"
            onClick={clearSelected}
            className="hover:bg-muted inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors"
            aria-label="Clear selected character"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">
          No character selected yet.
        </p>
      )}
    </section>
  );
}
