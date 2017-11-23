import mongoose from 'mongoose';

const City = mongoose.Schema({
    id: String,
    name: String,
    country: String,
    capital: {
        type: Boolean,
        required: [true, 'Capital is required']
    },
    location: {
        lat: Number,
        long: Number
    }
});

export default mongoose.model('City', City);