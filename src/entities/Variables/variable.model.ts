export interface Variable {
  createdAt: string;
  syntheticExpression: string;
  description: string;
  device: VariableDeviceResponse;
  icon: string;
  id: string;
  label: string;
  lastActivity?: null;
  lastValue: string | number;
  name: string;
  properties: Properties;
  tags?: (null)[] | null;
  type: string;
  unit?: null;
  url: string;
  valuesUrl: string;
}

export interface VariableDeviceResponse {
  id: string;
  label: string;
  name: string;
  url: string;
}

export interface Properties {
  any: string;
}
