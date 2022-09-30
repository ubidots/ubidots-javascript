import { ArrayFilter, BooleanFilter, DateFilter, IDFilters, NumberFilter, StringFilter } from '../../Filters/Filters';
import { Buildable } from '../../Builder/Builder';
import { Device, Organization, Properties } from './device.model';

type FilterTypes =
  typeof StringFilter
  | typeof IDFilters
  | typeof BooleanFilter
  | typeof NumberFilter
  | typeof ArrayFilter;


class DeviceObject implements Device {
  constructor({
                createdAt,
                description,
                id,
                isActive,
                label,
                lastActivity,
                name,
                organization,
                properties,
                tags,
                url,
                variables,
                variablesNumber,
              }: Device) {
    this.createdAt = createdAt;
    this.description = description;
    this.id = id;
    this.isActive = isActive;
    this.label = label;
    this.lastActivity = lastActivity;
    this.name = name;
    this.organization = organization;
    this.properties = properties;
    this.tags = tags;
    this.url = url;
    this.variables = variables;
    this.variablesNumber = variablesNumber;
  }

  createdAt: Date;
  description: string;
  id: string;
  isActive: boolean;
  label: string;
  lastActivity: null;
  name: string;
  organization: Organization;
  properties: Properties;
  tags: string[];
  url: string;
  variables: string;
  variablesNumber: number;

}

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
    variablesCount: NumberFilter,
    status: StringFilter,
    last_activity: DateFilter,
    created_at: DateFilter,
    updated_at: DateFilter,
  };

  public where<T>(field: string) {
    return super._where(field, DeviceObject);
  }
}
