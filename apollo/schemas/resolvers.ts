import { Resolvers, TaskStatus, Task as TaskType } from '../../generated/graphql-backend';
import { Task, User } from '../../src/pages/api/models';
import { Types } from 'mongoose';
import { Db as MongoDB } from 'mongodb';

interface ApolloContext {
  db: MongoDB;
};

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    tasks: async (
      parent, 
      args, 
      context
    ) => {
      try {
        const tasks = args.status ? await Task.find({ status: args.status }) : await Task.find();
        tasks.forEach(task => task.id = task._id);
        return tasks;
      } catch (err) {
        console.error(err);
      };
    },
    task: async (parent, args, context) => {
      return null;
    },
    books: async (parent, args, context) => [],
    users: async (parent, args, context) => {
      try {
        const users = await User.find({});
        return users;
      } catch (err) {
        console.error(err);
      };
    }
  },
  Mutation: {
    createTask: async (
      parent, 
      args, 
      context
    ): Promise<TaskType> => {
      try {
        const task = await Task.create({ 
          title: args.input.title, 
          status: TaskStatus.Active 
        });
        return task;
      } catch (err) {
        console.error(err);
      };
    },
    updateTask: (parent, args, context) => {
      return null;
    },
    deleteTask: (parent, args, context) => {
      return null;
    },
  },
};

export default resolvers;