import { DebtItem } from '../store/data';

const items: Array<DebtItem> = [
  {
    path: 'src/index.html',
    type: 'Documentation',
    description: 'Not good',
    deadline: new Date(2020, 4, 23).valueOf(),
    created: new Date(2020, 0, 15).valueOf(),
    priority: 1,
    estimate: 3,
    title: 'This file need documentation',
    id: '1',
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
    id: '22',
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
    id: '333',
  },
];

export default items;
