import Head from 'next/head';
import { useQuery } from '@apollo/client';
import type { GetStaticProps } from 'next';
import { addApolloState, initializeApollo } from '../../lib/client.ts';
import { TASKS_QUERY } from '../utils/queries';

const Home = () => {
  const { loading: tasksLoading, data: tasksData, error: tasksError } = useQuery(TASKS_QUERY);

  // check for errors
  if (tasksError) {
    return <p>an error happened</p>;
  };

  return (
    <div>
      <Head>
        <title>Tasks</title>
      </Head>
      <h1>Tasks</h1>
      {(tasksLoading || tasksData.tasks === null) ? 
        <p>Loading Tasks...</p> :
        (
          <>
          {tasksData?.tasks?.map((task) => (
            <>
              <div key={task.id}>
                {task.title} ({task.status})
              </div>
            </>
          ))}
          </>
        )
      };
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApollo();

  await client.query({
    query: TASKS_QUERY,
  });

  return addApolloState(client, {
    props: {},
  });
};

export default Home;