import { create } from 'zustand';
import {
  type Character,
  type CharacterFilters,
  type CharacterGender,
  type CharacterStatus,
} from '@/types/character';

interface State {
  selectedCharacterId?: number;
  selectedFilters: CharacterFilters;
  setSelected: (id: number) => void;
  clearSelected: () => void;
  isSelected: (id: number) => boolean;
  setStatusFilter: (status?: CharacterStatus) => void;
  setGenderFilter: (gender?: CharacterGender) => void;
  setFilters: (status?: CharacterStatus, gender?: CharacterGender) => void;
  clearFilters: () => void;
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character | null) => void;
}

export const useCharacterStore = create<State>((set, get) => ({
  selectedCharacterId: undefined,
  selectedCharacter: null,
  selectedFilters: {},
  setSelected: (id) => set({ selectedCharacterId: id }),
  clearSelected: () =>
    set({ selectedCharacterId: undefined, selectedCharacter: null }),
  isSelected: (id) => get().selectedCharacterId === id,
  setStatusFilter: (status) => {
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        status,
      },
    }));
  },
  setGenderFilter: (gender) => {
    set((state) => ({
      selectedFilters: {
        ...state.selectedFilters,
        gender,
      },
    }));
  },
  setFilters: (status, gender) =>
    set({
      selectedFilters: {
        ...(status ? { status } : {}),
        ...(gender ? { gender } : {}),
      },
    }),
  clearFilters: () => set({ selectedFilters: {} }),
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
}));
