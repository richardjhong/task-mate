import Link from 'next/link';
import React from 'react'

const TaskFilter = () => {
  return (
    <ul className="task-filter">
      <li>
        <Link href="/" scroll={false}>
          All
        </Link>
      </li>
      <li>
        <Link href="/[status]" as="/active" scroll={false}>
          Active
        </Link>
      </li>
      <li>
        <Link href="/[status]" as="/completed" scroll={false}>
          Completed
        </Link>
      </li>
    </ul>
  );
};

export default TaskFilter;