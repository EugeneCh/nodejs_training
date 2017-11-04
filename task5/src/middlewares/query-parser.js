export default function queryParser(req, res, next){
    let queriesParsed = {};
    const query = req.url.split('?')[1];

    if (query) {
        query.split('&').forEach((queryPart, i) => {
            queriesParsed[i] = queryPart;
        });

        req.parsedQuery = queriesParsed;
    }

    next();
}