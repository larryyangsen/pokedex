import { usePokemonNames } from 'hooks/pokemons';
import { AbilityElement, Ability } from 'pokedex-promise-v2';
import { usePokemonQuery } from 'queries';
import { useMemo } from 'react';
import cls from 'classnames';

interface IPokemonAbilityProps extends AbilityElement {
    enabled?: boolean;
}
const PokemonAbility = ({ ability, is_hidden, enabled }: IPokemonAbilityProps) => {
    const { language: curLanguage } = usePokemonNames();
    const { data } = usePokemonQuery<Ability>(['ability', `${ability.name}`], ability.url, enabled);
    const localeAbilityName = useMemo(
        () => data?.names?.find(({ language }) => language?.name === curLanguage),
        [curLanguage, data]
    );
    return (
        <div className={cls('bg-red-100 rounded-xl p-2', { 'opacity-30': is_hidden })}>
            {localeAbilityName?.name ?? ability.name}
        </div>
    );
};

export default PokemonAbility;
