import { ArrayFilter, BooleanFilter, IDFilters, NumberFilter, StringFilter } from '../../Filters/FilterBuilders';

export type FilterTypes =
  typeof StringFilter
  | typeof IDFilters
  | typeof BooleanFilter
  | typeof NumberFilter
  | typeof ArrayFilter;
