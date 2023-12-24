const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

const dbConfig = require('./config/dbConfig');


const userRoutes = require('./routes/userRouter');
const transactionsRoute = require('./routes/transactionsRoute');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is live on port ${PORT}`);
});