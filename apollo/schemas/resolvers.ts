import { Task, User } from '../../src/pages/api/models';

const resolvers = {
  Query: {
    tasks(parent, args, context) {
      return [];
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
    createTask(parent, args, context) {
      return null;
    },
    updateTask(parent, args, context) {
      return null;
    },
    deleteTask(parent, args, context) {
      return null;
    },
  },
};

export { resolvers };