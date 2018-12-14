import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import schema from './graphql/schema.graphql';
import resolvers from './graphql/resolvers';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
   .then(() => console.log('MongoDB database connected..'))
   .catch(err =>
      console.log(`Errors occur when tried to connect the database: ${err}`));


const server = new ApolloServer({
   typeDefs: schema,
   resolvers
});

server.applyMiddleware(app);


export default server;
