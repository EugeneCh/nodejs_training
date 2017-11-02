export default function cookieParser(req, res, next){
    const cookies = req.headers.cookie;
    let cookiesParsed = {};

    if (cookies) {
        cookies.split(';').forEach(cookie => {
            const singleCookie = cookie.split('=');
            cookiesParsed[singleCookie[0]] = singleCookie[1];
        });

        req.parsedCookies = cookiesParsed;
    }

    next();
}