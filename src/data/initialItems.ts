import { DebtItem } from '../store/data';

const items: Array<DebtItem> = [
  {
    path: 'src/index.html',
    type: 'Code',
    description: 'Not good',
    deadline: new Date().toISOString(),
    title: 'Test item',
    id: '1',
  },
];

export default items;
