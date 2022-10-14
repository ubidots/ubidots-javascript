export interface Device {
  id: string;
  properties: Properties;
  createdAt: Date;
  description: string;
  isActive: boolean;
  label: string;
  lastActivity: null;
  name: string;
  organization: Organization;
  tags: string[];
  url: string;
  variables: string;
  variablesNumber: number;
}

export interface Organization {
  id: string;
  label: string;
  name: string;
  url: string;
}

export interface Properties {
  _color: string;
  _icon: string;
  _location_fixed: LocationFixed;
}

export interface LocationFixed {
  lat: number;
  lng: number;
}
