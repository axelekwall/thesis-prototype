import { DebtTypes } from '../store/data';
import { purple, blue, brown, pink, teal } from '@material-ui/core/colors';

export default (type: DebtTypes): string => {
  switch (type) {
    case 'Architectural':
      return teal['400'];
    case 'Code':
      return purple['400'];
    case 'Documentation':
      return blue['400'];
    case 'Environmental':
      return pink['400'];
    case 'Testing':
      return brown['400'];
  }
};
