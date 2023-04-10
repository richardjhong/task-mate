import { Resolvers, TaskStatus, Task as TaskType } from '../../generated/graphql-backend';
import { Task, User } from '../../src/pages/api/models';
import { Types } from 'mongoose';
import { Db as MongoDB } from 'mongodb';

interface ApolloContext {
  db: MongoDB;
};

type TaskDb = {
  task: {
    _id?: string;
    title?: string;
    status?: TaskStatus;
  }[],
  _id?: string;
  title?: string;
  status?: TaskStatus;
};

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    tasks: async (parent, args, context) => {
      try {
        const tasks = args.status ? await Task.find<TaskDb>({ status: args.status }) : await Task.find<TaskDb>();
        const convertedTasks = tasks.map(({ _id, title, status }) => ({
          id: _id.toString(),
          title,
          status
        }));
        return convertedTasks;
      } catch (err) {
        console.error(err);
      };
    },
    task: async (parent, args, context) => {
      try {
        const { _id, title, status } = await Task.findById<TaskDb>({ _id: args.id });
        const foundTask = {
          id: _id.toString(),
          title,
          status
        };
        return foundTask;
      } catch (err) {
        console.error(err);
      };
    },
  },
  Mutation: {
    createTask: async (parent, args, context): Promise<TaskType> => {
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
    updateTask: async (parent, args, context): Promise<TaskType> => {
      try {
        const updatedFields = {};
        if (args.input.title) updatedFields['title'] = args.input.title;
        if (args.input.status) updatedFields['status'] = args.input.status;

        const foundTask = await Task.findByIdAndUpdate({ _id: args.input.id }, updatedFields, { new: true });
        return foundTask;
      } catch (err) {
        console.error(err);
      };
    },
    deleteTask: async (parent, args, context): Promise<TaskType> => {
      try {
        const taskToDelete = await Task.findByIdAndDelete({ _id: args.id });
        if (!taskToDelete) {
          throw new Error('Could not find your task.');
        };

        return taskToDelete;
      } catch (err) {
        console.error(err);
      };
    },
  },
};

export default resolvers;