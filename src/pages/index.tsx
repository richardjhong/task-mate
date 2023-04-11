import Head from 'next/head';
import type { GetStaticProps } from 'next';
import { addApolloState, initializeApollo } from '../lib/client.ts';
import { TasksDocument, TasksQuery, useTasksQuery } from '../../generated/graphql-frontend.ts';
import TaskList from '../components/TaskList.tsx';
import CreateTaskForm from '../components/CreateTaskForm.tsx';

const Home = () => {
  const { loading: tasksLoading, data: tasksData, error: tasksError } = useTasksQuery();
  const tasks = tasksData.tasks;

  if (tasksError) {
    return <p>an error happened</p>;
  };
  
  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm />
      {tasksLoading && <p>Loading tasks...</p>}
      {tasksError && <p>An error occurred.</p>}
      {tasks && tasks.length > 0 ? 
        <TaskList tasks={tasks}/> : 
        <p className="no-tasks-message">No tasks</p>
      }
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();

  await client.query<TasksQuery>({
    query: TasksDocument,
  });

  return addApolloState(client, {
    props: {},
  });
};

export default Home;