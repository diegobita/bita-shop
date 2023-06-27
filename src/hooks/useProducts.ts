import { IProduct } from '@/interfaces';
import useSWR, { SWRConfiguration } from 'swr';

const fetcher = (...args: [key:string]) => fetch(...args).then(res => res.json());

export const useProducts = (path: string, config: SWRConfiguration = {}) =>{
    const { data, error, isLoading } = useSWR<IProduct[]>(`/api${path}`, fetcher, {})


    return{
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }
}