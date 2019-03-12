import mongoose from 'mongoose';

const styleSchema = new mongoose.Schema({
  id: Number,
  category: mongoose.Schema.Types.ObjectId,
  name: String,
  shortName: String,
  description: String,
  ibuMin: String,
  ibuMax: String,
  abvMin: String,
  abvMax: String,
  srmMin: String,
  srmMax: String,
  ogMin: String,
  fgMin: String,
  fgMax: String,
  createDate: Date,
  updateDate: Date,
});

const Style = mongoose.model('Style', styleSchema);

export default Style;
