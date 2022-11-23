// based on the example on https://www.npmjs.com/package/@abandonware/noble

const noble = require('@abandonware/noble');

const uuid_service = "1109"
const uuid_value_x = "7109"
const uuid_value_y = "2102"
const uuid_value_z = "2103"

let sensorValue_x = NaN
let sensorValue_y = NaN
let sensorValue_z = NaN

noble.on('stateChange', async (state) => {
    if (state === 'poweredOn') {
        console.log("start scanning")
        await noble.startScanningAsync([uuid_service], false);
    }
});

noble.on('discover', async (peripheral) => {
    await noble.stopScanningAsync();
    await peripheral.connectAsync();
    const {
        characteristics
    } = await peripheral.discoverSomeServicesAndCharacteristicsAsync([uuid_service], [uuid_value_x, uuid_value_y, uuid_value_z]);
    readData(characteristics[0], characteristics[1], characteristics[2])
});

//
// read data periodically
//
let readData = async (characteristic_x, characteristic_y, characteristic_z) => {
    const value_x = (await characteristic_x.readAsync());
    const value_y = (await characteristic_y.readAsync());
    const value_z = (await characteristic_z.readAsync());
    sensorValue_x = value_x.readFloatLE(0);
    sensorValue_y = value_y.readFloatLE(0);
    sensorValue_z = value_z.readFloatLE(0);
    console.log(sensorValue_x, sensorValue_y, sensorValue_z);
    // console.log(sensorValue);

    // read data again in t milliseconds
    setTimeout(() => {
        readData(characteristic_x, characteristic_y, characteristic_z)
    }, 10);
}

//
// hosting a web-based front-end and respond requests with sensor data
// based on example code on https://expressjs.com/
//
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/game.html', (req, res) => {
    res.render('index')
})

app.get('/winner.html', (req, res) => {
    res.render('winner')
})

app.post('/', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        sensorValue_x: sensorValue_x,
        sensorValue_y: sensorValue_y,
        sensorValue_z: sensorValue_z
    }))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})