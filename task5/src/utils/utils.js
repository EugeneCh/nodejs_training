export function getErrorResponse() {
    return {
        "code": 404,
        "message": "Not Found",
        "data": "User or password did not match"
    }
}

export function getTokenResponse(username, email) {
    return {
        "code": 200,
        "message": "OK",
        "data": {
            "user": {
                "email": email,
                "username": username
            }
        },
        "token": "11111"
    }
}