const axios = require('axios');
const config = require('./config')

const baseUrl = `http://${config.els.host}:${config.els.port}`;

console.log('Elasticsearch address is ' + baseUrl);

const axi = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    url: "/_search?pretty",
})

module.exports = axi;
