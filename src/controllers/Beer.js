import { getRandomBeer, getBeers } from 'network/brewerydb';
import Beer from 'models/Beer';
import sing from 'songs';

const onError = (param1, param2) => {
  console.error(param1, param2);
};

const processBeer = (beer) => {
  Beer.onBeerResponse(beer);
  sing();
};

const generateBeer = () => getRandomBeer()
  .then(processBeer)
  .catch(onError);

export const downloadRandomBeers = (ms = 8571) => {
  setInterval(generateBeer, ms);
};

export const getAllBeers = async () => {
  const numberOfPages = 23;
  let currentPage = 1;
  const getNewPage = async () => {
    const beersResponse = await getBeers(currentPage);
    beersResponse.forEach(processBeer);
    currentPage += 1;
    if (currentPage <= numberOfPages) {
      getNewPage();
    } else {
      console.log('got pretty drunk drinking all those beers');
    }
  };
  getNewPage();
};
