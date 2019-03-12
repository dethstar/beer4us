import mongoose from 'mongoose';

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

const Beer = mongoose.model('Beer', beerSchema);

export default Beer;
