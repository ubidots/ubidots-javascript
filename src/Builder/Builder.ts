import { Filter } from './constants';
import StringFilter from '../Filters/StringFilter';

export class BuildManager {
  public static params: Record<string, Filter> | Record<string, string> = {};
  public static entity = '';
  public static field: string = '';
}


abstract class Buildable {
  abstract fieldsWithFilters: Record<string, BuildManager>;
  protected abstract entity: string;

  public where<T>(field: string): T {
    if (!this.fieldsWithFilters[field]) {
      throw new Error(`Field ${field} does not exist`);
    }
    BuildManager.field = field;
    BuildManager.entity = this.entity;
    return this.fieldsWithFilters[field] as T;
  }
}


export class Devices extends Buildable {
  protected entity: string = 'devices';
  // Just to test
  fieldsWithFilters: Record<string, BuildManager> = {
    name: StringFilter.getInstance(),
    label: StringFilter.getInstance(),
    description: StringFilter.getInstance(),
    context: StringFilter.getInstance(),
    tags: StringFilter.getInstance(),
    variables: StringFilter.getInstance(),
    status: StringFilter.getInstance(),
    last_activity: StringFilter.getInstance(),
    created_at: StringFilter.getInstance(),
    updated_at: StringFilter.getInstance(),
  };
}
