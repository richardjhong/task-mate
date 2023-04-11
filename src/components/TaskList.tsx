import React from 'react'
import { Task } from '../../generated/graphql-frontend';
import Link from 'next/link';

interface Props {
  tasks: Task[];
};

const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-list-item">
          <Link href="/update/[id]" as={`/update/${task.id}`}>
            <div className="task-list-item-title">
              {task.title} 
            </div>
          </Link>
          ({task.status})
        </li>
      ))}
    </ul>
  );
};

export default TaskList;