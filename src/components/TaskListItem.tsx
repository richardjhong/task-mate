import React from 'react';
import { Task } from '../../generated/graphql-frontend';
import Link from 'next/link';

interface Props {
  task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  return (
    <li key={task.id} className="task-list-item">
      <Link href="/update/[id]" as={`/update/${task.id}`}>
        <div className="task-list-item-title">
          {task.title} 
        </div>
      </Link>
      ({task.status})
    </li>
  );
}

export default TaskListItem;