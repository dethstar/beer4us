import axios from 'axios';
import config from 'config';

const BEER_RANDOM = `${config.brewerydbAPI.url}beer/random?key=${config.brewerydbAPI.token}`;
const BEERS = `${config.brewerydbAPI.url}beers?key=${config.brewerydbAPI.token}&p=`;

export const getRandomBeer = () => axios.get(BEER_RANDOM).then(({ data }) => data.data);
export const getAnything = (whatToGet = 'beers', page = 1) => {
	return new Promise((res, rej) => {
		let url = `${config.brewerydbAPI.url}${whatToGet}?key=${config.brewerydbAPI.token}&p=`;
		axios.get(`${url}${page}`).then(({ data }) => res(data.data)).catch(e => rej(e));
	})
}
export const getBeers = (page = 1) => axios.get(`${BEERS}${page}`).then(({ data }) => data.data);
export const getStyles = (page = 1) => getAnything('styles', page)