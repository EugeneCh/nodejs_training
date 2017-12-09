import mongoose from 'mongoose';

const Product = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name']
    },
    value: String,
    lastModifiedDate: Date
});

Product.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

export default mongoose.model('Product', Product);