import { Direction } from '../../../../../../shared/types/enums';
import { SortedField, User } from '../../../../../../shared/types/Types';

export const sortData = (
  userData: User[],
  field: SortedField,
  direction: Direction.ASC | Direction.DESC,
) => {
  return [...userData].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (direction === Direction.DESC) {
      return aValue > bValue ? 1 : -1;
    }

    return aValue < bValue ? 1 : -1;
  });
};
