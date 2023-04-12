import React, { useEffect } from 'react';
import { Task, TaskStatus, useDeleteTaskMutation, useUpdateTaskMutation } from '../../generated/graphql-frontend';
import Link from 'next/link';
import { Reference } from '@apollo/client';

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  const [deleteTask, { loading: deleteLoading, error: deleteError }] = useDeleteTaskMutation({
    variables: { id: task.id },
    errorPolicy: 'all',
    update: (cache, result) => {
      const deletedTask = result.data?.deleteTask
      if (deletedTask) {
        cache.modify({
          fields: {
            tasks: (taskRefs: Reference[], { readField }) => {
              return taskRefs.filter(taskRef => {
                return readField('id', taskRef) !== deletedTask.id;
              })
            }
          }
        });
      }
    }
  });
  const handleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
     await deleteTask();
    } catch (err) {
      // Log the error
      console.log(err);
    };
  };

  useEffect(() => {
    if (deleteError) {
      alert('An error occurred, please try again.');
    }
  }, [deleteError]);

  const [updateTask, { loading: updateLoading, error: updateError }] = useUpdateTaskMutation({ errorPolicy: 'all' });

  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newStatus = e.target.checked ? TaskStatus.Completed : TaskStatus.Active;  
    updateTask({ variables: { input: { id: task.id, status: newStatus }}});
  };

  useEffect(() => {
    if (updateError) {
      alert('An error occurred while updating task status, please try again later.');
    };
  }, [updateError]);

  return (
    <li key={task.id} className="task-list-item">
      <label className="checkbox">
        <input 
          type="checkbox" 
          onChange={handleStatusChange} 
          checked={task.status === TaskStatus.Completed}
          disabled={updateLoading}
        />
        <span className="checkbox-mark">&#10003;</span>
      </label>
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <div className="task-list-item-title">
          {task.title} 
        </div>
      </Link>
      <button 
        className="task-list-item-delete" 
        onClick={handleDeleteClick}
        disabled={deleteLoading}
      >
        &times;
      </button>
    </li>
  );
};

export default TaskListItem;