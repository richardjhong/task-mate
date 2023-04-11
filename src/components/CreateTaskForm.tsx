import React, { useState } from 'react'
import { useCreateTaskMutation } from '../../generated/graphql-frontend';

interface Props {
  onSuccess: () => void;
}

const CreateTaskForm: React.FC<Props> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };
  const [createTask, { loading: tasksLoading, error: tasksError }] = useCreateTaskMutation({
    onCompleted: () => {
      onSuccess();
      setTitle('');
    }
  });
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!tasksLoading) {
      try {
        await createTask({ variables: { input: { title }}});
      } catch (err) {
        // Log the error.
      };
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      {tasksError && <p className="alert-error">An error occurred while adding new task.</p>}
      <input 
        type="text" 
        name="title" 
        placeholder="What would you like to get done?" 
        autoComplete="off" 
        className="text-input new-task-text-input" 
        value={title}
        onChange={handleTitleChange}
      />
    </form>
  );
};

export default CreateTaskForm;