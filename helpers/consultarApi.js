//ejecuta consultas a los api externos
// recibe la url completa
const fetch = require('node-fetch');

const enviarConsulta = async (url_api, method = 'GET', token, data) => {
    if (method == 'GET') {
        let response = await fetch(url_api, {
            headers: {
                'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3YjBiMTg4MjA3MDQ0NDRmOWFmYTUiLCJuYW1lIjoiUHJ1ZWJhIGNvbiBwcm9waWV0YXJpbyIsImlhdCI6MTYwOTAzOTUwMywiZXhwIjoxNjA5MDQ2NzAzfQ.xSxx6JA0LoJQMlyDo1gYylGM5ba44El_GOzTgpfrjbs'
            }
        });
        let result = await response.json();
        return result;
    } else {

        let response = await fetch(url_api, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3YjBiMTg4MjA3MDQ0NDRmOWFmYTUiLCJuYW1lIjoiUHJ1ZWJhIGNvbiBwcm9waWV0YXJpbyIsImlhdCI6MTYwOTAzOTUwMywiZXhwIjoxNjA5MDQ2NzAzfQ.xSxx6JA0LoJQMlyDo1gYylGM5ba44El_GOzTgpfrjbs'
            },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        return result;
    }
}
module.exports = {
    enviarConsulta
}