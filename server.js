const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
const contactsRoute = require('./routes/contacts');
app.use('/contacts', contactsRoute);
//db
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
        //   useCreateIndex: true,
          useUnifiedTopology: true,
        //   useFindAndModify: false,
          useNewUrlParser: true,
        });
        console.log("connected to db");
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
}
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to Contacts App');
})

app.listen(process.env.PORT || port);