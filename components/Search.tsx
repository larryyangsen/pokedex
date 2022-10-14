interface SearchProps {
  defaultValue?: string;
}

const Search = ({ defaultValue = 'mew' }: SearchProps) => {
  return <input type="text" name="pokemon" className="rounded-sm" defaultValue={defaultValue} />;
};

export default Search;
