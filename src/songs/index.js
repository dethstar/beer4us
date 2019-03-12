let beers = 99;

export default () => {
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
