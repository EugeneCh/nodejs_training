import mongoose from 'mongoose';

const Product = mongoose.Schema({
    id: String,
    name: String,
    value: String
});

export default mongoose.model('Product', Product);