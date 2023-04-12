import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import { initializeApollo } from '../lib/client.ts';
import { TaskStatus, TasksDocument, TasksQuery, TasksQueryVariables, useTasksQuery } from '../../generated/graphql-frontend.ts';
import TaskList from '../components/TaskList.tsx';
import CreateTaskForm from '../components/CreateTaskForm.tsx';
import { useRouter } from 'next/router';
import TaskFilter from '../components/TaskFilter.tsx';
import { useEffect, useRef } from 'react';
import Custom404 from './404.tsx';

const isTaskStatus = (value: string): value is TaskStatus =>
  Object.values(TaskStatus).includes(value as TaskStatus);

const convertQueryStatusToEnum = (status) => {
  switch (status) {
    case 'active':
      return TaskStatus.Active;
    case 'completed':
      return TaskStatus.Completed;
    default: 
      return undefined;
  };
};

const Home = () => {
  const router = useRouter();
  const status = Array.isArray(router.query.status) ? router.query.status[0] : undefined;
  if (status !== undefined && !isTaskStatus(status)) {
    return <Custom404 />;
  };

  const prevStatus = useRef(status);

  useEffect(() => {
    prevStatus.current = status;
  }, [status]);
  
  const fetchedTasks = useTasksQuery({ 
    variables: { 
      status: convertQueryStatusToEnum(status) 
    },
    fetchPolicy: prevStatus.current === status ? 'cache-first' : 'cache-and-network'
  });
  const { loading: tasksLoading, data: tasksData, error: tasksError } = fetchedTasks;
  const tasks = tasksData?.tasks || [];
  
  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateTaskForm onSuccess={fetchedTasks.refetch}/>
      {tasksLoading && !tasks && <p>Loading tasks...</p>}
      {tasksError && <p>An error occurred.</p>}
      {tasks && tasks.length > 0 ? 
        <TaskList tasks={tasks}/> : 
        <p className="no-tasks-message">No tasks</p>
      }
      <TaskFilter status={convertQueryStatusToEnum(status)} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const status =
  Array.isArray(ctx.params.status) 
    ? ctx.params.status[0]
    : undefined;

  if (status === undefined || isTaskStatus(status)) {
    const apolloClient = initializeApollo();
  
    await apolloClient.query<TasksQuery, TasksQueryVariables>({
      query: TasksDocument,
      variables: { status: convertQueryStatusToEnum(status) }
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