const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const axios = require('axios');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 設定靜態檔案目錄
app.use(express.static(path.join(__dirname, 'public')));
let ip = "192.168.137.1"
let r, g, b
// 當 WebSocket 連線時
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received button number: ${message}`)
        switch (message) {
            case 1:
                r = 0;
                g = 0;
                b = 0;
                break;
            case 2:
                r = 255;
                g = 255;
                b = 255;
                break;
            case 3:
                r = 255;
                g = 0;
                b = 0;
                break;
            case 4:
                r = 255;
                g = 255;
                b = 0;
                break;
            case 5:
                r = 0;
                g = 255;
                b = 0;
                break;
            case 6:
                r = 0;
                g = 255;
                b = 255;
                break;
            case 7:
                r = 0;
                g = 0;
                b = 255;
                break;
            case 8:
                r = 255;
                g = 0;
                b = 255;
                break;
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://${ip}/color?r=${r}&g=${g}&b=${b}`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
