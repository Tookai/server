const express = require('express');
const app = express();
const cors = require('cors');

// un deux trois

app.use(express.json());
app.use(cors());



app.listen(5500, () => {
    console.log('Backend server is running!');
});