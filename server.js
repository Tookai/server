const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());



app.listen(5500, () => {
    console.log('Backend server is running!');
});