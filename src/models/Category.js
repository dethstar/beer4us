import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  createDate: Date,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
