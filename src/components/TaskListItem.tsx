import React, { useEffect } from 'react';
import { Task, useDeleteTaskMutation } from '../../generated/graphql-frontend';
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

  return (
    <li key={task.id} className="task-list-item">
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <div className="task-list-item-title">
          {task.title} 
        </div>
      </Link>
      ({task.status})
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