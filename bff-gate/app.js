const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');
const express = require('express');
const root = require('./root');
const cors = require('cors');

const app = express();

const PORT = 3005;

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

app.use(cors());

app.use('/graphql', graphqlHTTP({ schema: schema, rootValue: root, graphiql: true }));

app.listen(PORT, () => console.log("server is running on port :" + PORT)).on('error', err => console.log(err))