// import express from "express";

import Beer from 'models/Beer';
import Category from 'models/Category';
import Style from 'models/Style';
import { getRandomBeer, getBeers } from 'network/brewerydb';

let beers = 99;
const numberOfPages = 23;
let currentPage = 1;

const sing = () => {
  if (beers === 0) {
    console.log(`No more bottles of beer on the wall, no more bottles of beer.
    Go to the store and buy some more, 99 bottles of beer on the wall.`);
    beers = 99;
    return;
  }
  console.log(`${beers} bottle of beer on the wall, ${beers} bottle of beer.`);
  if (beers === 1) {
    console.log('Take one down and pass it around, no more bottles of beer on the wall.');
    beers -= 1;
    return;
  }
  beers -= 1;
  console.log(`Take one down and pass it around, ${beers} bottle of beer on the wall.`);
};

const findOrCreateCategory = async (id, categoryObj) => {
  let category = await Category.findOne({ id });
  if (!category) {
    category = new Category(categoryObj);
    category = await category.save();
  }
  return category;
};

const findOrCreateStyle = async (id, styleObj, categoryID) => {
  let style = await Style.findOne({ id });
  if (!style) {
    const {
      name,
      shortName,
      description,
      ibuMin,
      ibuMax,
      abvMin,
      abvMax,
      srmMin,
      srmMax,
      ogMin,
      fgMin,
      fgMax,
      createDate,
      updateDate,
    } = styleObj;
    style = new Style({
      id,
      category: categoryID,
      name,
      shortName,
      description,
      ibuMin,
      ibuMax,
      abvMin,
      abvMax,
      srmMin,
      srmMax,
      ogMin,
      fgMin,
      fgMax,
      createDate,
      updateDate,
    });
    style = await style.save();
  }
  return style;
};

const findOrCreateBeer = async (id, beerObj, styleID) => {
  let mBeer = await Beer.findOne({ id });
  if (!mBeer) {
    const {
      id,
      name,
      nameDisplay,
      abv,
      ibu,
      styleId,
      isRetired,
      status,
      statusDisplay,
      createDate,
      updateDate,
    } = beerObj;
    mBeer = new Beer({
      id,
      name,
      nameDisplay,
      abv,
      ibu,
      styleId,
      isRetired,
      status,
      statusDisplay,
      createDate,
      updateDate,
      style: styleID,
    });
    mBeer.save();
  }
  return mBeer;
};

const onBeer = async (beer) => {
  let category = null;
  let style = null;
  if (beer.style) {
    category = findOrCreateCategory(beer.style.category.id, beer.style.category);
    style = findOrCreateStyle(beer.style.id, beer.style, category._id);
  }
  const styleID = beer.style ? style._id : null;
  findOrCreateBeer(beer.id, beer, styleID);
  sing();
};
const onError = (param1, param2) => {
  console.error(param1, param2);
};

const generateBeer = () => getRandomBeer()
  .then(onBeer)
  .catch(onError);

// setInterval(generateBeer, 8571);

const getAllBeers = async () => {
  const beersResponse = await getBeers(currentPage);
  beersResponse.forEach(onBeer);
  currentPage += 1;
  if (currentPage <= numberOfPages) {
    getAllBeers();
  } else {
    console.log('got pretty drunk getting all beers');
  }
};

getAllBeers();
