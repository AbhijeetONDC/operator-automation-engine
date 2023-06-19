import * as _ from 'lodash';
import { Output, Input } from './schema';
import { GenericObject } from './types';
import { evaluateOperation } from './util';

class Operator {
  constructor(context: GenericObject) {
    this.context = context;
  }
  context;
  input?: Input;
  output?: Output;
  setInput(input: Input) {
    this.input = input.__process();
    return this;
  }
  __process() {
    return this;
  }
  getOutput() {
    if (!this.__process) throw new Error('No output set');
    return this.__process()?.output?.__process();
  }
}

class GenerateUuidOperation extends Operator {
  __process() {
    this.output = new Output(crypto.randomUUID());
    return this;
  }
}

class GenerateTmpstmpOperation extends Operator {
  __process() {
    this.output = new Output(new Date().toISOString());
    return this;
  }
}

class ReadOperation extends Operator {
  __process() {
    const value = this.getAttribute(this.context, this.input?.getValue());

    if (!value) throw new Error(`No value found at the specified path: ${this.input?.getValue()}`);
    this.output = new Output(value);
    return this;
  }

  getAttribute(data: GenericObject, keys: string): string | undefined {
    return _.get(data, keys, undefined);
  }
}

class EqualOperation extends Operator {
  __process(): any {
    const value = this.input?.getValue();
    let equal = true;

    if (_.isArray(value) && value.length > 1) {
      const resolvedValues: string[] = [];
      value.forEach((eachValue) => {
        if (typeof eachValue === 'object' && eachValue?.operation) {
          const resolvedValue = evaluateOperation(this.context, eachValue?.operation);
          if (resolvedValues.length > 0 && !resolvedValues.includes(resolvedValue)) {
            this.output = new Output(false);
            equal = false;
            return this;
          }
          resolvedValues.push(resolvedValue);
        }
      });
      if (equal) this.output = new Output(true);
      else this.output = new Output(false);
      return this;
    } else throw new Error('More than 1 input arrays elements are required');
  }
}

class NotEqualOperation extends Operator {
  __process(): any {
    const value = this.input?.getValue();
    // let notEqual = true;

    if (_.isArray(value) && value.length > 1) {
      const resolvedValues = new Set();
      value.forEach((eachValue) => {
        if (typeof eachValue === 'object' && eachValue?.operation) {
          const resolvedValue = evaluateOperation(this.context, eachValue?.operation);
          resolvedValues.add(resolvedValue);
        }
      });
      if (resolvedValues.size > 1) this.output = new Output(true);
      else this.output = new Output(false);

      return this;
    } else throw new Error('More than 1 input arrays elements are required');
  }
}

export { GenerateUuidOperation, EqualOperation, NotEqualOperation, GenerateTmpstmpOperation, ReadOperation };
