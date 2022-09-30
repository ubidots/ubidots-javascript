import { ArrayFilter, BooleanFilter, IDFilters, NumberFilter, StringFilter } from '../../Filters/Filters';
import { Buildable } from '../../Builder/Builder';

type FilterTypes =
  typeof StringFilter
  | typeof IDFilters
  | typeof BooleanFilter
  | typeof NumberFilter
  | typeof ArrayFilter;


export class Devices extends Buildable {
  protected entity: string = 'devices';
  // Just to test
  fieldsWithFilters: Record<string, FilterTypes> = {
    id: IDFilters,
    name: StringFilter,
    label: StringFilter,
    description: StringFilter,
    context: StringFilter,
    isActive: BooleanFilter,
    tags: ArrayFilter,
    variables: StringFilter,
    status: StringFilter,
    last_activity: StringFilter,
    created_at: StringFilter,
    updated_at: StringFilter,
  };
}
