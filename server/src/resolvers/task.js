import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    task: async (parent, { id }, { models: { taskModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await taskModel.findById({ _id: id }).exec();
    },
    tasks: async (parent, args, { models: { taskModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await taskModel.find({ author: me.id }).exec();
    },
  },
  Mutation: {
    createTask: async (parent, { title }, { models: { taskModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await taskModel.create({ title, author: me.id });
    },
    updateTask: async (parent, { id, isCompleted }, {models: { taskModel }, me}, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      return await taskModel.findByIdAndUpdate(id, { isCompleted }, { new: true },)
    }
  },
  Task: {
    author: async ({ author }, args, { models: { userModel } }, info) => {
      const user = await userModel.findById({ _id: author }).exec();
      return user;
    },
  },
};