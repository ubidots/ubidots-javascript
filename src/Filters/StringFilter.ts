import mix from '../utils/applyMixins';
import { MixinContainable, MixinExecutor } from '../Mixins';


class StringFiltersBase {
  static instance: StringFilters;

  static getInstance(): StringFilters {
    if (!StringFilters.instance) {
      StringFilters.instance = new StringFilters();
    }
    return StringFilters.instance;
  }
}

export default class StringFilters extends mix(StringFiltersBase).with(MixinExecutor, MixinContainable) {

}
