import { Task, User } from '../../src/pages/api/models';
import { Types } from 'mongoose';

enum TaskStatus {
  active = 'active',
  completed = 'completed',
}

interface Task {
  id: Types.ObjectId;
  title: string;
  status: TaskStatus;
}

const resolvers = {
  Query: {
    tasks: async (
      parent, 
      args: { status?: TaskStatus }, 
      context
    ): Promise<Task[]> => {
      try {
        const tasks = args.status ? await Task.find({ status: args.status }) : await Task.find();
        tasks.forEach(task => task.id = task._id);
        return tasks;
      } catch (err) {
        console.error(err);
      };
    },
    task(parent, args, context) {
      return null;
    },
    books: () => [],
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (err) {
        console.error(err);
      }
    }
  },
  Mutation: {
    createTask: async (
      parent, 
      args: { input: { title: string } }, 
      context
    ): Promise<Task> => {
      try {
        const task = await Task.create({ 
          title: args.input.title, 
          status: TaskStatus.active 
        });
        return task;
      } catch (err) {
        console.error(err);
      };
    },
    updateTask(parent, args, context) {
      return null;
    },
    deleteTask(parent, args, context) {
      return null;
    },
  },
};

export default resolvers;