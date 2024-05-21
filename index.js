const express = require('express');
const PouchDB = require('pouchdb');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

PouchDB.plugin(require('pouchdb-find'));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const localDB = new PouchDB('students');

 app.get('/', async (req, res) => {

    // public/index.html view file
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/students', async (req, res) => {
    try {
        const result = await localDB.allDocs({ include_docs: true });
        res.json(result.rows.map(row => row.doc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/students', async (req, res) => {
    try {
        const student = req.body;
        const response = await localDB.post(student);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
