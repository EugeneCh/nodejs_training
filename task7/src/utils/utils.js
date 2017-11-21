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

    for (let i = 0; i < citiesNumber; i++ ) {
        let city = new City({
            name: faker.address.city(),
            country: faker.address.country(),
            capital: faker.random.boolean(),
            location: {
                lat: faker.address.latitude(),
                long: faker.address.longitude()
            }
        });

        city.save(err => {
            if (err) {
                return console.error(err);
            }
        });
    }

    console.log(`${citiesNumber} Cities were created`);
}

export function generateFakeProducts(productsNumber) {
    Product.remove({}, err => {
        if (err) {
            return console.error(err);
        }
    });

    for (let i = 0; i < productsNumber; i++ ) {
        let product = new Product({
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            value: faker.commerce.price()
        });

        product.save(err => {
            if (err) {
                return console.error(err);
            }
        });
    }

    console.log(`${productsNumber} Products were created`);
}

export function generateFakeUsers(usersNumber) {
    User.remove({}, err => {
        if (err) {
            return console.error(err);
        }
    });

    for (let i = 0; i < usersNumber; i++ ) {
        let user = new User({
            username: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email()
        });

        user.save(err => {
            if (err) {
                return console.error(err);
            }
        });
    }

    console.log(`${usersNumber} Users were created`);
}