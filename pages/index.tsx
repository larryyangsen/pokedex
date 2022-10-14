import LanguageSelector from 'components/Language-Selector';
import PokemonCard from 'components/Pokemon-Card';
import PokemonList from 'components/Pokemon-List';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <div className="h-screen w-full font-sans text-base antialiased relative">
            <LanguageSelector />
            <div className="container  h-full p-4 mx-auto">
                <PokemonList />
            </div>
        </div>
    );
};

export default Home;
