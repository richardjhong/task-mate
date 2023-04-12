import { Resolvers, TaskStatus, Task as TaskType } from '../../generated/graphql-backend';
import { Task } from '../models';
import { Db as MongoDB } from 'mongodb';

interface ApolloContext {
  db: MongoDB;
};

type TaskDbQuery = {
  task: {
    _id: string;
    title: string;
    status: TaskStatus;
  }[],
  _id: string;
  title: string;
  status: TaskStatus;
};

type TaskDbMutation = {
  _id?: string;
  title?: string;
  status?: TaskStatus;
};

const convertIdWithoutUnderscore = ({ _id, title, status}) => {
  return {
    id: _id.toString(),
    title,
    status
  };
};
//

export const resolvers: Resolvers<ApolloContext> = {
  Query: {
    tasks: async (parent, args, context) => {
      try {
        const originalTasks = args.status ? await Task.find<TaskDbQuery>({ status: args.status }) : await Task.find<TaskDbQuery>();
        const convertedTasks = originalTasks.map((originalTask) => convertIdWithoutUnderscore(originalTask));
        return convertedTasks;
      } catch (err) {
        console.error(err);
      };
    },
    task: async (parent, args, context) => {
      try {
        const originalTask = await Task.findById<TaskDbQuery>({ _id: args.id });
        return convertIdWithoutUnderscore(originalTask);
      } catch (err) {
        console.error(err);
      };
    },
  },
  Mutation: {
    createTask: async (parent, args, context): Promise<TaskType> => {
      try {
        const originalTask = await Task.create<TaskDbMutation>({
          title: args.input.title, 
          status: TaskStatus.Active 
        });

        return convertIdWithoutUnderscore(originalTask);
      } catch (err) {
        console.error(err);
      };
    },
    updateTask: async (parent, args, context): Promise<TaskType> => {
      try {
        const updatedFields = {};
        if (args.input.title) updatedFields['title'] = args.input.title;
        if (args.input.status) updatedFields['status'] = args.input.status;

        const originalTask = await Task.findByIdAndUpdate({ _id: args.input.id }, updatedFields, { new: true });
        return convertIdWithoutUnderscore(originalTask);
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

        return convertIdWithoutUnderscore(taskToDelete);
      } catch (err) {
        console.error(err);
      };
    },
  },
};