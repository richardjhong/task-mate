import React, { useState } from 'react'
import { useUpdateTaskMutation } from '../../generated/graphql-frontend';
import { isApolloError } from '@apollo/client';
import { useRouter } from 'next/router';

interface Values {
  title: string;
};

interface Props {
  id: string;
  initialValues: Values;
};

const UpdateTaskForm: React.FC<Props> = ({ id, initialValues }) => {
  const [values, setValues] = useState<Values>(initialValues);

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value }  = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const [updateTask, { loading: updateLoading, error: updateError }] = useUpdateTaskMutation();
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await updateTask({
        variables: {
          input: {
            id,
            title: values.title
          }
        }
      }); 
      if (updatedTask.data?.updateTask) {
        router.push('/');
      };
    } catch (err) {

    };
  };

  let errorMessage = '';
  if (updateError) {
    if (updateError.networkError) {
      errorMessage = 'A network error occurred, please try again.';
    } else {
      errorMessage = 'Sorry, an error occurred.';
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {updateError && <p className="alert-error">Error while updating task: {updateError.message}</p>}
      <p>
        <label className="field-label">Title</label>
        <input 
          type="text" 
          name="title" 
          className="text-input" 
          value={values.title}
          onChange={onTitleChange}
        />
      </p>
      <p>
        <button 
          type="submit" 
          className="button" 
          disabled={updateLoading}
        >
          {updateLoading ? 'Loading' : 'Save'}
        </button>
      </p>
    </form>
  );
};

export default UpdateTaskForm;