import { VirtuosoGrid } from 'react-virtuoso';
import Image from 'next/image';
import { usePokemon, usePokemonNames } from 'hooks/pokemons';
import classNames from 'classnames';
import { useMemo } from 'react';

const PokemonListItem = ({ name }: { name: string }) => {
    const { pokemonName, englishName, pokemonData, numberString, species } = usePokemon(name);
    const imageSrc = useMemo(() => pokemonData?.sprites?.other?.['official-artwork'].front_default, [pokemonData]);

    return (
        <div className="flex flex-col items-center border-2 rounded-2xl">
            <h2 className="text-xl text-gray-400 ml-auto mr-2">{numberString}</h2>
            {/* <audio src={'/assets/cries/' + englishName + '.opus'} controls className="w-full" /> */}
            <Image
                src={imageSrc ?? '/assets/images/poke-ball.png'}
                alt={pokemonName}
                blurDataURL="/assets/images/poke-ball.png"
                placeholder={imageSrc ? 'blur' : 'empty'}
                width={imageSrc ? '200%' : '32px'}
                height={imageSrc ? '200%' : '32px'}
                layout="fixed"
            />
            <h4
                className={classNames(
                    `rounded-bl-xl rounded-br-xl w-full text-center text-xl bg-${species?.color.name}-400`,
                    {
                        'text-cyan-50': species?.color.name !== 'white',
                        'border-gray-100 border-2': species?.color.name === 'white',
                    }
                )}>
                {pokemonName}
            </h4>
        </div>
    );
};

const PokemonList = () => {
    const { pokemonNames } = usePokemonNames();
    return (
        <div className="overflow-hidden  h-[calc(100%-3rem)]">
            <VirtuosoGrid
                totalCount={pokemonNames.length}
                listClassName="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
                itemClassName="w-full h-full"
                computeItemKey={(index) => pokemonNames[index]}
                itemContent={(index) => <PokemonListItem name={pokemonNames[index]} />}
            />
        </div>
    );
};

export default PokemonList;
