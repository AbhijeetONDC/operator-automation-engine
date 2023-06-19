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
  value?: string | Operation;
  values?: string[] | Operation[];
  // operation?: Operation;
}

export interface Operation {
  type: OPERATIONS;
  input: IOperationInput;
}

export interface InstructionSet {
  operation: Operation;
}

export type AllExecutableOperations = GenerateUuidOperation | ReadOperation | GenerateTmpstmpOperation;
