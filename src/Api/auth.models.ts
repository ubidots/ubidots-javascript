export interface UbidotsResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T;
}
