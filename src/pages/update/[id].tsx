import { GetServerSideProps } from 'next';
import { initializeApollo } from '../../lib/client';
import { TaskDocument, TaskQuery, TaskQueryVariables, useTaskQuery } from '../../../generated/graphql-frontend';
import { useRouter } from 'next/router';
import Error from 'next/error';
import UpdateTaskForm from '../../components/UpdateTaskForm';

const UpdateTask = () => {
  const router = useRouter();
  
  const id = typeof router.query?.id === 'string' ? router.query.id : null;
  if (!id) {
    return <Error statusCode={404}/>
  };

  const { loading, data, error } = useTaskQuery({ variables: { id }});
  const task = data?.task;

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>An error occurred</p>}
      {task ? 
        <UpdateTaskForm id={task.id} initialValues={{ title: task.title }} /> :
        <p>Task not found</p>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = typeof ctx.params?.id === 'string' ? ctx.params.id : null;
  if (id) {
    const apolloClient = initializeApollo();
    await apolloClient.query<TaskQuery, TaskQueryVariables>({
      query: TaskDocument,
      variables: { id }
    });
    return { props: {initialApolloState: apolloClient.cache.extract() } };
  };

  return { props: {} }
};

export default UpdateTask;