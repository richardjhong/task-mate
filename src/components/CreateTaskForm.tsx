import React, { useState } from 'react'
import { useCreateTaskMutation } from '../../generated/graphql-frontend';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };
  const [createTask] = useCreateTaskMutation();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createTask({ variables: { input: { title }}});
    } catch (err) {
      console.error(err);
    };
  };

  return (
    <form onSubmit={handleSubmit}>
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