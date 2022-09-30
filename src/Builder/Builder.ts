import { Filter } from './constants';
import { StringFilter } from '../Filters/Filters';

type FilterTypes = typeof StringFilter;


export class BuildManager {
  static #params: Record<string | Filter, string | number> = {};
  public static entity = '';
  public static field: string = '';

  public static get params() {
    return BuildManager.#params;
  }

  public static reset() {
    BuildManager.#params = {};
  }

  public static buildQuery(suffix = '', value: string | number) {
    BuildManager.#params[`${BuildManager.field}${suffix}`] = value;
  }
}


export abstract class Buildable {
  protected abstract fieldsWithFilters: Record<string, FilterTypes>;
  protected abstract entity: string;

  public where<T>(field: string) {
    if (!this.fieldsWithFilters[field]) {
      console.error(`Field ${field} does not exist`);
    }

    BuildManager.field = field;
    BuildManager.entity = this.entity;
    const Filter: FilterTypes = this.fieldsWithFilters[field];

    return new Filter();
  }
}
