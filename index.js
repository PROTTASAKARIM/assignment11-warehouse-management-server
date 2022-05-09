const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hzyov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {
        await client.connect();
        const inventoryItems = client.db('smartPhoneWarehouse').collection('items');


        app.get('/inventory', async (req, res) => {
            const query = {};
            const cursor = inventoryItems.find(query);
            const inventory = await cursor.toArray();
            res.send(inventory);
        });

        app.get('/inventory/:inventoryId', async (req, res) => {
            const id = req.params.inventoryId;
            const query = { _id: ObjectId(id) };
            const inventory = await inventoryItems.findOne(query);
            res.send(inventory);
        });
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Smartphone Warehouse');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})