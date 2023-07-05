import { Operation } from '../Operator/types';

export enum ModulesEnums {
  LOG_VERIFICATION = 'log-verification',
  MOCK_API_SERVER = 'mock-api-server',
}

export type Domains = 'retail' | 'mobility' | 'logistics' | 'b2c' | 'finance';

enum PathsEnums {
  SEARCH = 'search',
  ON_SEARCH = 'on_search',
  SELECT = 'select',
  ON_SELECT = 'on_select',
  INIT = 'init',
  ON_INIT = 'on_init',
  CONFIRM = 'confirm',
  ON_CONFIRM = 'on_confirm',
  UPDATE = 'update',
  ON_UPDATE = 'on_update',
  CANCEL = 'cancel',
  ON_CANCEL = 'on_cancel',
  TRACK = 'track',
  ON_TRACK = 'on_track',
  SUPPORT = 'support',
  ON_SUPPORT = 'on_support',
  STATUS = 'status',
  ON_STATUS = 'on_status',
  ISSUE = 'issue',
  ON_ISSUE = 'on_issue',
  ISSUE_STATUS = 'issue_status',
  ON_ISSUE_STATUS = 'on_issue_status',
}

export interface Metadata {
  domain: Domains;
}

export interface Server {
  metadata: Metadata;
}

export type ModuleMap = PathsMap & { server: Server };

export interface Paths {
  schema: {
    $ref: string;
  };
  validation: Operation[];
}

export type PathsMap = {
  [key in PathsEnums]: Paths;
};

export type InstructionSet = {
  [key in ModulesEnums]: ModuleMap;
};
