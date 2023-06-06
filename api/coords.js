const https = require('https');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { city, country, apiKey } = req.query;
    const opencageEndpoint = `https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${apiKey}`;

    https.get(opencageEndpoint, (apiRes) => {
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
