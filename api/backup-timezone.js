const https = require('https');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { lat, lon } = req.query;
    const backupAPIkey = 'PVC3S7OZ8ZA9';
    const backupEndpoint = `https://api.timezonedb.com/v2.1/get-time-zone?key=${backupAPIkey}&format=json&by=position&lat=${lat}&lng=${lon}`;

    https.get(backupEndpoint, (apiRes) => {
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
