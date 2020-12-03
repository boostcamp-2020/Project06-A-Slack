export interface Service {
  [key: string]: (param?: any) => any;
}
