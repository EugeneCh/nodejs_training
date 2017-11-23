import mongoose from 'mongoose';

const City = mongoose.Schema({
    id: String,
    name: String,
    country: String,
    lastModifiedDate: Date,
    capital: {
        type: Boolean,
        required: [true, 'Capital is required']
    },
    location: {
        lat: Number,
        long: Number
    }
});

City.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

export default mongoose.model('City', City);