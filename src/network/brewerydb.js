import axios from 'axios';
import config from 'config';

const BEER_RANDOM = `${config.brewerydbAPI.url}beer/random?key=${config.brewerydbAPI.token}`;
const BEERS = `${config.brewerydbAPI.url}beers?key=${config.brewerydbAPI.token}&p=`;

export const getRandomBeer = () => axios.get(BEER_RANDOM).then(({ data }) => data.data);
export const getBeers = (page = 1) => axios.get(`${BEERS}${page}`).then(({ data }) => data.data);
