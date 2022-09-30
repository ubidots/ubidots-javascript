import { Filter } from './constants';
import { IDFilters, StringFilters } from '../Filters/Filters';

type FilterType = typeof StringFilters;

export class BuildManager {
  public static params: Record<string, Filter> | Record<string, string> = {};
  public static entity = '';
  public static field: string = '';
}


abstract class Buildable {
  protected abstract fieldsWithFilters: Record<string, FilterType>;
  protected abstract entity: string;

  public where<T>(field: string) {
    if (!this.fieldsWithFilters[field]) {
      throw new Error(`Field ${field} does not exist`);
    }

    BuildManager.field = field;
    BuildManager.entity = this.entity;
    const Filter: FilterType = this.fieldsWithFilters[field];

    return new Filter();
  }
}


export class Devices extends Buildable {
  protected entity: string = 'devices';
  // Just to test
  fieldsWithFilters: Record<string, FilterType> = {
    id: IDFilters,
    name: StringFilters,
    label: StringFilters,
    description: StringFilters,
    context: StringFilters,
    tags: StringFilters,
    variables: StringFilters,
    status: StringFilters,
    last_activity: StringFilters,
    created_at: StringFilters,
    updated_at: StringFilters,
  };
}
