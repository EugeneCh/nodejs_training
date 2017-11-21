import faker from 'faker';

import City from "../schemas/City";
import Product from "../schemas/Product";
import User from "../schemas/User";

export function getErrorResponse() {
    return {
        "code": 404,
        "message": "Not Found",
        "data": "User or password did not match"
    }
}

export function getTokenResponse(username, email, token) {
    return {
        "code": 200,
        "message": "OK",
        "data": {
            "user": {
                "email": email,
                "username": username
            }
        },
        "token": token
    }
}

export function generateFakeCities(citiesNumber) {
    City.remove({}, err => {
        if (err) {
            return console.error(err);
        }
    });

    let cities = [];
    for (let i = 0; i < citiesNumber; i++ ) {
        cities.push({
            name: faker.address.city(),
            country: faker.address.country(),
            capital: faker.random.boolean(),
            location: {
                lat: faker.address.latitude(),
                long: faker.address.longitude()
            }
        });
    }

    City.insertMany(cities, err => {
        if (err) {
            return console.error(err);
        }
    });

    console.log(`${citiesNumber} Cities were created`);
}

export function generateFakeProducts(productsNumber) {
    Product.remove({}, err => {
        if (err) {
            return console.error(err);
        }
    });

    let products = [];
    for (let i = 0; i < productsNumber; i++ ) {
        products.push({
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            value: faker.commerce.price()
        });
    }

    Product.insertMany(products, err => {
        if (err) {
            return console.log(err);
        }
    });

    console.log(`${productsNumber} Products were created`);
}

export function generateFakeUsers(usersNumber) {
    User.remove({}, err => {
        if (err) {
            return console.error(err);
        }
    });

    let users = [];
    for (let i = 0; i < usersNumber; i++ ) {
        users.push({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email()
        });
    }

    User.insertMany(users, err => {
        if (err) {
            return console.log(err);
        }
    });

    console.log(`${usersNumber} Users were created`);
}