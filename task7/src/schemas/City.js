import mongoose from 'mongoose';

const City = mongoose.Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    }
});

export default mongoose.model('City', City);