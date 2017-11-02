import User from '../models/User';

let fakeUsers = [new User(1, 'Jack'), new User(2, 'Bob')];

export const Users = {
    all() {
        return fakeUsers;
    }
};
