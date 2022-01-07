const { graphqlHTTP } = require('express-graphql');
const express = require('express');
const schema = require('./schema');
const cors = require('cors');

const app = express();

const PORT = 3005;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log("server is running on port :" + PORT)).on('error', err => console.log(err))