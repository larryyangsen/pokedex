import fetcher from '@util/fetcher';
import { useQuery } from 'react-query';

export const usePokemonQuery = <T>(keys: string[], url: string, enabled = true) => {
    const { data, status } = useQuery<T>(keys, () => fetcher(url), { enabled });
    return { data, status };
};
