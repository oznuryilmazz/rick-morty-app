'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCharacterStore } from '@/store/useCharacterStore';
import type { Character } from '@/types/character';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clapperboard,
  Compass,
  HeartPulse,
  MapPin,
  Skull,
  UserRound,
} from 'lucide-react';

const statusLabelMap: Record<Character['status'], string> = {
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'Unknown',
};

const genderLabelMap: Record<Character['gender'], string> = {
  male: 'Male',
  female: 'Female',
  genderless: 'Genderless',
  unknown: 'Unknown',
};

const statusVariantMap: Record<
  Character['status'],
  'success' | 'danger' | 'warning'
> = {
  alive: 'success',
  dead: 'danger',
  unknown: 'warning',
};

const statusIconMap: Record<Character['status'], typeof HeartPulse> = {
  alive: HeartPulse,
  dead: Skull,
  unknown: AlertTriangle,
};

const genderVariantMap: Record<
  Character['gender'],
  'info' | 'female' | 'muted' | 'warning'
> = {
  male: 'info',
  female: 'female',
  genderless: 'muted',
  unknown: 'warning',
};

const normalizePlaceName = (value: string): string => {
  if (!value || value.toLowerCase() === 'unknown') {
    return 'Unknown';
  }

  return value;
};

const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const CharacterCard = ({ character }: { character: Character }) => {
  const { selectedCharacterId, setSelected, setSelectedCharacter } =
    useCharacterStore();
  const selected = selectedCharacterId === character.id;

  return (
    <Card
      className={`group cursor-pointer transition-all ${
        selected
          ? 'ring-primary/40 border-primary/40 shadow-primary/15 -translate-y-0.5 shadow-xl ring-2'
          : 'hover:-translate-y-1 hover:shadow-lg'
      }`}
      onClick={() => {
        setSelected(character.id);
        setSelectedCharacter(character);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setSelected(character.id);
          setSelectedCharacter(character);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Select ${character.name}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={character.image}
          alt={`${character.name} image`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {selected ? (
          <>
            <div className="bg-primary/10 pointer-events-none absolute inset-0" />
            <div className="bg-primary text-primary-foreground absolute top-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold shadow-md">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Selected
            </div>
          </>
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <CardContent className="space-y-3 pt-4 pb-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight">
            {character.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={statusVariantMap[character.status]}>
            {(() => {
              const StatusIcon = statusIconMap[character.status];
              return <StatusIcon className="h-3.5 w-3.5" />;
            })()}
            {statusLabelMap[character.status]}
          </Badge>
          <Badge variant={genderVariantMap[character.gender]}>
            <UserRound className="h-3.5 w-3.5" />
            {genderLabelMap[character.gender]}
          </Badge>
        </div>

        <div className="border-border/70 grid grid-cols-2 gap-2 border-t pt-2">
          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-1 flex items-center gap-1 text-[11px] font-medium">
              <Compass className="h-3.5 w-3.5" />
              Origin
            </p>
            <p
              className="line-clamp-1 text-xs font-semibold"
              title={normalizePlaceName(character.origin.name)}
            >
              {normalizePlaceName(character.origin.name)}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-1 flex items-center gap-1 text-[11px] font-medium">
              <MapPin className="h-3.5 w-3.5" />
              Location
            </p>
            <p
              className="line-clamp-1 text-xs font-semibold"
              title={normalizePlaceName(character.location.name)}
            >
              {normalizePlaceName(character.location.name)}
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-1 flex items-center gap-1 text-[11px] font-medium">
              <Clapperboard className="h-3.5 w-3.5" />
              Episodes
            </p>
            <p className="text-xs font-semibold">{character.episode.length}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-2">
            <p className="text-muted-foreground mb-1 flex items-center gap-1 text-[11px] font-medium">
              <CalendarDays className="h-3.5 w-3.5" />
              Created
            </p>
            <p className="text-xs font-semibold">
              {formatDate(character.created)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
