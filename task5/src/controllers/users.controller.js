import User from '../models/User';

let fakeUsers = [new User('Jack', '12345', 'jack@2.com'), new User('Bob', '123', "bob@3.com")];

export const Users = {
    all() {
        return fakeUsers;
    }
};
