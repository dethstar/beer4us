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

const findOrCreate = async function findOrCreate(id, styleObj, categoryID) {
  let style = await this.findOne({ id });
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
    style = new this({
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

styleSchema.statics = {
  findOrCreate,
};

const Style = mongoose.model('Style', styleSchema);

export default Style;
