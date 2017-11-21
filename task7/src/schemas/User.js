import mongoose from 'mongoose';

const User = mongoose.Schema({
    username: String,
    password: String,
    email: String
});

export default mongoose.model('User', User);