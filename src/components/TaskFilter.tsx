import Link from 'next/link';
import React from 'react';
import { TaskStatus } from '../../generated/graphql-frontend';

interface Props {
  status?: TaskStatus
}

const TaskFilter: React.FC<Props> = ({ status }) => {
  return (
    <ul className="task-filter">
      <li>
        <Link href="/" scroll={false} shallow={true}>
          <div className={!status ? 'task-filter-active' : ''}>
            All
          </div>
        </Link>
      </li>
      <li>
        <Link href="/[status]" as={`/${TaskStatus.Active}`} scroll={false} shallow={true}>
          <div className={status === TaskStatus.Active ? 'task-filter-active' : ''}>
            Active
          </div>
        </Link>
      </li>
      <li>
        <Link href="/[status]" as={`/${TaskStatus.Completed}`} scroll={false} shallow={true}>
          <div className={status === TaskStatus.Completed ? 'task-filter-active' : ''}>
            Completed
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default TaskFilter;