import { DebtItem } from '../store/data';
import { v4 as uuid } from 'uuid';

const items: Array<DebtItem> = [
  {
    path: '/',
    type: 'Architectural',
    description: 'Not good',
    deadline: new Date(2020, 9, 11).valueOf(),
    created: new Date(2020, 3, 15).valueOf(),
    priority: 2,
    estimate: 5,
    title: 'This file need documentation',
    id: uuid(),
  },
  {
    path: 'src/index.html',
    type: 'Documentation',
    description: 'Not good',
    deadline: new Date(2020, 4, 23).valueOf(),
    created: new Date(2020, 0, 15).valueOf(),
    priority: 1,
    completed: new Date().valueOf(),
    estimate: 3,
    title: 'This file need documentation',
    id: uuid(),
  },
  {
    path: 'src/index.html',
    type: 'Documentation',
    description: 'Not good',
    deadline: new Date(2020, 4, 23).valueOf(),
    created: new Date(2020, 0, 15).valueOf(),
    priority: 1,
    estimate: 5,
    title: 'This file need documentation',
    id: uuid(),
  },
  {
    path: '/',
    type: 'Code',
    description: 'Not good',
    deadline: new Date(2020, 6, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 2,
    estimate: 5,
    title: 'This file need documentation',
    id: uuid(),
  },
  {
    path: '/',
    type: 'Architectural',
    description: 'Not good',
    deadline: new Date(2020, 9, 11).valueOf(),
    created: new Date(2020, 3, 15).valueOf(),
    priority: 2,
    estimate: 5,
    title: 'This file need documentation',
    id: uuid(),
  },
];

export default items;
