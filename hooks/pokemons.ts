import { Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import pokemonNames from 'pokemon';
import { usePokemonQuery } from 'queries';
import { useRef, useMemo } from 'react';
import create from 'zustand';

interface IUsePokemonNames {
    language: pokemonNames.Language;
    pokemonNames: readonly string[];
    setLanguage: (language: pokemonNames.Language) => void;
    setSelectedPokemon: (pokemon: string) => void;
}
export const usePokemonNames = create<IUsePokemonNames>((set, get) => ({
    language: 'zh-Hant',
    pokemonNames: pokemonNames.all('zh-Hant'),
    setLanguage: (language: pokemonNames.Language) => {
        set((state) => {
            const names = pokemonNames.all(language);
            return { ...state, pokemonNames: names, language };
        });
    },
    setSelectedPokemon: (pokemon: string) => {
        set((state) => ({ ...state, selectedPokemon: pokemon }));
    },
}));

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const usePokemon = (name: string) => {
    const { language } = usePokemonNames();
    const originalLanguage = useRef(language);
    const originalName = useRef(name ?? '');
    const originalPokemonID = useRef(pokemonNames.getId(originalName.current, originalLanguage.current));
    const pokemonName = useMemo(
        () => pokemonNames.getName(originalPokemonID.current, language),
        [language, originalPokemonID]
    );
    const cryName = useMemo(() => {
        const fullName = pokemonNames.getName(originalPokemonID.current, 'en');
        return fullName.replace(/[\W\s]/g, '').toLowerCase();
    }, [originalPokemonID]);
    const { data: pokemonData } = usePokemonQuery<Pokemon>(
        ['pokemon', `${originalPokemonID.current}`],
        `${API_URL}/${originalPokemonID.current}`
    );
    const { data: species } = usePokemonQuery<PokemonSpecies>(
        ['species', pokemonData?.species?.name ?? ''],
        pokemonData?.species?.url ?? '',
        !!pokemonData?.species?.url
    );
    const numberString = useMemo(
        () => `#${originalPokemonID.current.toString().padStart(3, '0')}`,
        [originalPokemonID]
    );

    return {
        englishName: cryName,
        pokemonName,
        pokemonData,
        species,
        numberString,
    };
};
