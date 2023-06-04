const https = require('https');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { city, country } = req.query;
    const nominatimEndpoint = `https://nominatim.openstreetmap.org/search.php?city=${city}&country=${country}&format=jsonv2`;

    https.get(nominatimEndpoint, (apiRes) => {
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
