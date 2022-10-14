import { usePokemonNames } from 'hooks/pokemons';
import { PokemonType, Type } from 'pokedex-promise-v2';
import { usePokemonQuery } from 'queries';
import { useMemo } from 'react';

interface IPokemonTypeProps extends PokemonType {
    enabled?: boolean;
}
const PokemonType = ({ type, enabled = true }: IPokemonTypeProps) => {
    const { language: curLanguage } = usePokemonNames();
    const { data } = usePokemonQuery<Type>(['type', `${type.name}`], type.url, enabled);
    const localeTypeName = useMemo(
        () => data?.names?.find(({ language }) => language?.name === curLanguage),
        [curLanguage, data]
    );
    return <div className="bg-gray-100 rounded-xl p-2">{localeTypeName?.name ?? type.name}</div>;
};

export default PokemonType;
