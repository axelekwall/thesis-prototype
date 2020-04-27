import { DebtItem } from '../store/data';
import { v4 as uuid } from 'uuid';

const items: Array<DebtItem> = [
  {
    path: 'src/components/ItemForm.tsx',
    type: 'Code',
    description:
      'The component re-renders too often and needs optimization. Maybe the redux bindings can be improved?',
    deadline: new Date(2020, 6, 3).valueOf(),
    created: new Date(2020, 3, 15).valueOf(),
    priority: 'High',
    title: 'Bad performance',
    id: uuid(),
  },
  {
    path: 'functions',
    type: 'Testing',
    description: 'The firebase functions are missing unit tests.',
    deadline: new Date(2020, 0, 11).valueOf(),
    created: new Date(2020, 0, 15).valueOf(),
    priority: 'Low',
    title: 'Missing unit tests',
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 2, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    title: 'Bad test coverage',
    id: uuid(),
  },
  {
    path: 'src/helpers/typeColor.ts',
    type: 'Documentation',
    description:
      'This helper function is complex and doesn not have any documentation',
    deadline: new Date(2020, 4, 23).valueOf(),
    created: new Date(2020, 0, 15).valueOf(),
    priority: 'Normal',
    title: 'Missing documentation',
    id: uuid(),
  },
  {
    path: 'src/index.html',
    type: 'Documentation',
    description: 'Not good',
    deadline: new Date(2020, 4, 23).valueOf(),
    created: new Date(2020, 0, 15).valueOf(),
    priority: 'High',
    title: 'Missing documentation',
    id: uuid(),
  },
  {
    path: 'src/components',
    type: 'Code',
    description:
      'The components in this folder are not using the lastest version of the design system. This might cause design bugs.',
    deadline: new Date(2020, 6, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'Normal',
    title: 'Not using latest version of design system',
    id: uuid(),
  },
  {
    path: 'package.json',
    type: 'Environmental',
    description:
      'Slow build process in CI environment. Can some scripts be run in parallel rather than sequence?',
    deadline: new Date(2020, 9, 11).valueOf(),
    created: new Date(2020, 3, 15).valueOf(),
    priority: 'Low',
    title: 'Slow build scripts',
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 2, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    title: 'Bad test coverage',
    completed: 1,
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Architectural',
    description:
      'We need to add the redux-thunk middleware to support async action and move our data fetching from compoennt lifecycle to redux actions.',
    deadline: new Date(2020, 3, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'Normal',
    title: 'Refactor async actions',
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 0, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    title: 'Bad test coverage',
    completed: 1,
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 2, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    completed: 1,
    title: 'Bad test coverage',
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 1, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    completed: 1,
    title: 'Bad test coverage',
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 1, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    completed: 1,
    title: 'Bad test coverage',
    id: uuid(),
  },
  {
    path: 'src/store',
    type: 'Testing',
    description:
      'The redux reducers have low test coverage and are not currently tested in CI',
    deadline: new Date(2020, 1, 11).valueOf(),
    created: new Date(2020, 1, 15).valueOf(),
    priority: 'High',
    completed: 1,
    title: 'Bad test coverage',
    id: uuid(),
  },
];

export default items;
