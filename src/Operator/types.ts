import { GenerateTmpstmpOperation, GenerateUuidOperation, ReadOperation } from './index';

export enum OPERATIONS {
  READ = 'READ',
  GENERATE_UUID = 'GENERATE_UUID',
  GENERATE_TIMESTAMP = 'GENERATE_TIMESTAMP',
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
}

export interface GenericObject {
  [key: string]: any;
}

export interface IOperationInput {
  value?: string | IOperationUnit;
  values?: string[] | IOperationUnit;
  // operation?: IOperationUnit;
}

export interface IOperationUnit {
  type: OPERATIONS;
  input: IOperationInput;
}

export type AllExecutableOperations = GenerateUuidOperation | ReadOperation | GenerateTmpstmpOperation;
