const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname);

app.use(cors()); 

app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

app.use(express.static(publicPath, {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.css') {
            res.setHeader('Content-Type', 'text/css');
        }
    },
    strict: false
}));

app.get('/coords', (req, res) => {
    const { city, country } = req.query;
    const nominatimEndpoint = `https://nominatim.openstreetmap.org/search.php?city=${city}&country=${country}&format=jsonv2`;

    https.get(nominatimEndpoint, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(data);
        });
    }).on('error', (error) => {
        res.status(500).send({ error: error.message });
    });
});

app.get('/backup-coords', (req, res) => {
    const { city, country, apiKey } = req.query;
    const opencageEndpoint = `https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${apiKey}`;

    https.get(opencageEndpoint, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(data);
        });
    }).on('error', (error) => {
        res.status(500).send({ error: error.message });
    });
});

app.get('/timezone', (req, res) => {
    const { lat, lon } = req.query;
    const APIkey = '7dad049d4d154390835146e2daa22d6f';
    const endpoint = `https://api.ipgeolocation.io/timezone?apiKey=${APIkey}&lat=${lat}&long=${lon}`;

    https.get(endpoint, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(data);
        });
    }).on('error', (error) => {
        res.status(500).send({ error: error.message });
    });
});

app.get('/backup-timezone', (req, res) => {
    const { lat, lon } = req.query;
    const backupAPIkey = 'PVC3S7OZ8ZA9';
    const backupEndpoint = `https://api.timezonedb.com/v2.1/get-time-zone?key=${backupAPIkey}&format=json&by=position&lat=${lat}&lng=${lon}`;

    https.get(backupEndpoint, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            res.send(data);
        });
    }).on('error', (error) => {
        res.status(500).send({ error: error.message });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
