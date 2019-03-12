import mongoose from 'mongoose';
import Category from 'models/Category';
import Style from 'models/Style';

const beerSchema = new mongoose.Schema({
  id: String,
  name: String,
  nameDisplay: String,
  abv: String,
  ibu: String,
  styleId: Number,
  isOrganic: String,
  isRetired: String,
  status: String,
  statusDisplay: String,
  createDate: Date,
  updateDate: Date,
  style: mongoose.Schema.Types.ObjectId,
});

const findOrCreate = async function findOrCreate(id, beerObj, styleID) {
  let mBeer = await this.findOne({ id });
  if (!mBeer) {
    const {
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
    mBeer = new this({
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

const onBeerResponse = async function onBeerResponse(beer) {
  let category = null;
  let style = null;
  if (beer.style) {
    category = Category.findOrCreate(beer.style.category.id, beer.style.category);
    style = Style.findOrCreate(beer.style.id, beer.style, category._id);
  }
  const styleID = beer.style ? style._id : null;
  this.findOrCreate(beer.id, beer, styleID);
};

beerSchema.statics = {
  onBeerResponse,
  findOrCreate,
};

const Beer = mongoose.model('Beer', beerSchema);

export default Beer;
