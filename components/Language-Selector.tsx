import { useLanguages } from 'hooks/languages';
import { usePokemonNames } from 'hooks/pokemons';
import pokemon from 'pokemon';
import { ChangeEvent } from 'react';

const LanguageSelector = () => {
    const { language, setLanguage } = usePokemonNames();
    const langs = useLanguages();
    const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as pokemon.Language);
    };
    return (
        <div className="rounded-xl  border-2 fixed right-2 top-2 z-10">
            <select title="language-selector" className="w-full" value={language} onChange={handleChangeLanguage}>
                {Object.entries(langs).map(([lang, text]) => (
                    <option key={lang} value={lang}>
                        {text}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
