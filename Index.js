const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const documentRoutes = require('./routes/documentRoutes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MongoUrl).then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.log(err)
});

app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => 
  console.log(`Document Service running on port ${PORT}`)
);
