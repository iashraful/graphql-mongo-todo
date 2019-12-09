import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import db from './config/database'
import configParser from './utils/config-parser'

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/user';
import taskModel from './models/task';

const app = express();
app.use(cors());

const getUser = async (req) => {
  // TODO: Will handle auth part here
  return {}
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          taskModel,
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(5000, () => {
  mongoose.connect(configParser.getDatabase({ config: db }));
});