const express = require('express');
const config = require('./config');
const axi = require('./axi');

const app = new express();

console.log('Starting server at http://127.0.0.1:' + config.port);

app.get('/', (req, res) => {
    res.send(`
        <form action='/search' method='get'>
            <div>
                <input type="text" id='query' name='q' placeholder='Search'>
                <span><button type="submit">OK</button></span>
            </div>
            <div>
                <label>Full text query type</label>
                <select name="full_text_query">
                    <option value="match" selected>match</option>
                    <option value="match_phrase">match_phrase</option>
                    <option value="match_phrase_prefix">match_phrase_prefix</option>
                    <option value="query_string">query_string</option>
                </select>
            </div>
        </form>
        `
    );
});

app.get('/search', (req, res) => {
    let query = req.query.q;

    if (!query) {
        return res.send('enter a query');
    }

    axi({
      data: {
        query: {
            query_string: {
                default_field: 'content',
                query: query
            }
        }
      }
    })
    .then(search_res => {
        res.send(search_res.data);
        // console.log(search_res.data);
    })
    .catch(err => {
        // res.json(err);
        console.log(err);
    });
    // json= JSON.stringify(a)
    // res.json(a);
});

app.listen(config.port);
