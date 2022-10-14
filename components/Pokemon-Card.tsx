import { usePokemonNames } from 'hooks/pokemons';
import pokemon from 'pokemon';
import { useMemo, useRef } from 'react';
import Image from 'next/image';
import PokemonType from './Pokemon-Type';
import { usePokemonQuery } from 'queries';
import { Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import PokemonAbility from './Pokemon-Ability';
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

interface IPokemonProps {
    name?: string;
    enabled?: boolean;
}

const PokemonCard = ({ name, enabled }: IPokemonProps) => {
    const { language } = usePokemonNames();
    const originalLanguage = useRef(language);
    const originalName = useRef(name ?? '');
    const originalPokemonID = useRef(pokemon.getId(originalName.current, originalLanguage.current));
    const pokemonName = useMemo(
        () => pokemon.getName(originalPokemonID.current, language),
        [language, originalPokemonID]
    );

    const { data } = usePokemonQuery<Pokemon>(
        ['pokemon', `${originalPokemonID.current}`],
        `${API_URL}/${originalPokemonID.current}`,
        enabled
    );
    const { data: species } = usePokemonQuery<PokemonSpecies>(
        ['species', data?.species?.name ?? ''],
        data?.species?.url ?? '',
        !!data?.species?.url && enabled
    );
    const imageSrc = useMemo(() => data?.sprites?.other?.['official-artwork'].front_default, [data]);
    const numberString = useMemo(
        () => `#${originalPokemonID.current.toString().padStart(3, '0')}`,
        [originalPokemonID]
    );
    return (
        <div className={`w-full h-64 rounded-xl  flex items-center bg-${species?.color.name}-200`}>
            <Image
                src={imageSrc ?? '/assets/images/poke-ball.png'}
                alt={pokemonName}
                blurDataURL="/assets/images/poke-ball.png"
                placeholder={imageSrc ? 'blur' : 'empty'}
                width={imageSrc ? '100%' : '32px'}
                height={imageSrc ? '100%' : '32px'}
                layout="fixed"
            />
            <div className="space-y-1">
                <div className="flex items-center">
                    <h1 className="text-2xl">{pokemonName}</h1>
                    <h2 className="text-sm ml-2 mr-2">{numberString}</h2>
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="flex gap-2">
                        {data?.types?.map(({ type, slot }) => (
                            <PokemonType key={type.name} {...{ type, slot, enabled }} />
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data?.abilities?.map(({ ability, slot, is_hidden }) => (
                            <PokemonAbility key={ability.name} {...{ ability, slot, is_hidden, enabled }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
