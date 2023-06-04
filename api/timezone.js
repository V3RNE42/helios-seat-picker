const https = require('https');

module.exports = (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { lat, lon } = req.query;
    const APIkey = '7dad049d4d154390835146e2daa22d6f';
    const endpoint = `https://api.ipgeolocation.io/timezone?apiKey=${APIkey}&lat=${lat}&long=${lon}`;

    https.get(endpoint, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.status(200).send(data);
        });
    }).on('error', (error) => {
        res.status(500).send({ error: error.message });
    });
};
