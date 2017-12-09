import mongoose from 'mongoose';

const User = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    lastModifiedDate: Date
});

User.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

export default mongoose.model('User', User);