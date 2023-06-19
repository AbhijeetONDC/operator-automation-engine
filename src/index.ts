import { evaluateOperation } from './Operator/util';
import { OPERATIONS, InstructionSet } from './Operator/types';

const samplePayload = {
  message: {
    fulfillment: {
      location: {
        gps: '12.43434343, 23.5467784',
      },
    },
    fulfillment_2: {
      location: {
        gps: {
          value: '12.43434343, 23.5467781',
        },
      },
    },
    fulfillment_3: {
      location: {
        gps: {
          value: '12.43434343, 23.5467784',
        },
      },
    },
  },
};

const instructionSetSample: InstructionSet[] = [
  {
    operation: {
      type: OPERATIONS.READ,
      input: { value: 'message.fulfillment.location.gps' },
    },
  },
  {
    operation: {
      type: OPERATIONS.NOT_EQUAL,
      input: {
        values: [
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment.location.gps' } },
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment_2.location.gps.value' } },
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment_3.location.gps.value' } },
        ],
      },
    },
  },
];

const checkIfValidEnum = (type: OPERATIONS): boolean => {
  return Object.keys(OPERATIONS).includes(type);
};

const runInstructionSet = (instructionSet: InstructionSet[]) => {
  instructionSet.forEach((operations) => {
    const isValidEnum = checkIfValidEnum(operations.operation.type);
    if (!isValidEnum) throw new Error(`${operations.operation.type} is not a valid type`);

    const operation = {
      ...operations.operation,
      type: operations.operation.type,
    };

    const output = evaluateOperation(samplePayload, operation);

    console.log(output);
  });
};

runInstructionSet(instructionSetSample);
