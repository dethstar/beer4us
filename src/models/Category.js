import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  createDate: Date,
});

const findOrCreate = async function findOrCreate(id, categoryObj) {
  let category = await this.findOne({ id });
  if (!category) {
    category = new this(categoryObj);
    category = await category.save();
  }
  return category;
};

categorySchema.statics = {
  findOrCreate,
};

const Category = mongoose.model('Category', categorySchema);

export default Category;
