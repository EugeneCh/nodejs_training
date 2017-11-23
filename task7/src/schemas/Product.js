import mongoose from 'mongoose';

const Product = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name']
    },
    value: String
});

export default mongoose.model('Product', Product);