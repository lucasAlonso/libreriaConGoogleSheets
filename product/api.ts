import axios from 'axios';
import Papa from 'papaparse';

import { Product } from './types';
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    list: async (): Promise<Product[]> => {
        return axios
            .get(
                'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGkISUzz4YiNCwRuwBrtJc3-IRqWqmcFeBZIa-hYox_VzvZMKepqOw1Akb1hot6hXHNPorNcnL6M3A/pub?output=csv',
                {
                    responseType: 'blob',
                }
            )
            .then((response) => {
                return new Promise<Product[]>((resolve, reject) => {
                    Papa.parse(response.data, {
                        header: true,
                        complete: (results) => {
                            const products = results.data as Product[];
                            return resolve(
                                products.map((product) => ({
                                    ...product,
                                    valor: Number(product.valor),
                                }))
                            );
                        },
                        error: (error) => reject(error.message),
                    });
                });
            });
    },
};
