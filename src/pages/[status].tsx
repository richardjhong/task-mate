import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { addApolloState, initializeApollo } from '../lib/client.ts';
import { TaskStatus, TasksDocument, TasksQuery, TasksQueryVariables, useTasksQuery } from '../../generated/graphql-frontend.ts';
import TaskList from '../components/TaskList.tsx';
import CreateTaskForm from '../components/CreateTaskForm.tsx';
import { useRouter } from 'next/router';
import Error from 'next/error';
import TaskFilter from '../components/TaskFilter.tsx';

const isTaskStatus = (value: string): value is TaskStatus =>
  Object.values(TaskStatus).includes(value as TaskStatus);

const dynamicTasksBasedOnStatus = (status) => {
  switch (status) {
    case 'active':
      return 'active';
    case 'completed':
      return 'completed';
    default: 
      return undefined;
  };
}

const Home = () => {
  const router = useRouter();
  const status = typeof router.query.status === 'string' ? router.query.status : undefined;
  if (status !== undefined && !isTaskStatus(status)) {
    return <Error statusCode={404} />;
  };
  
  const fetchedTasks = useTasksQuery({ variables: { status: dynamicTasksBasedOnStatus(status) }})
  const { loading: tasksLoading, data: tasksData, error: tasksError } =
  const tasks = tasksData?.tasks || [];
  
  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm onSuccess={fetchedTasks.refetch}/>
      {tasksLoading && <p>Loading tasks...</p>}
      {tasksError && <p>An error occurred.</p>}
      {tasks && tasks.length > 0 ? 
        <TaskList tasks={tasks}/> : 
        <p className="no-tasks-message">No tasks</p>
      }
      <TaskFilter />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const status =
  typeof ctx.params?.status === 'string'
    ? ctx.params.status
    : undefined;

  if (status === undefined || isTaskStatus(status)) {
    const apolloClient = initializeApollo();
  
    await apolloClient.query<TasksQuery, TasksQueryVariables>({
      query: TasksDocument,
      variables: { status: "active" }
    });
  
    return {
      props: {
        initialApolloState: apolloClient.cache.extract()
      }
    };
  };
  return { props: {} };
};

export default Home;