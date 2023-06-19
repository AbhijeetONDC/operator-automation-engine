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
          value: '12.43434343, 23.5467784',
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
    fulfillment_4: {
      location: {
        gps: {
          value: '9.3434343',
        },
      },
    },
    fulfillment_5: {
      location: {
        gps: {
          value: '12',
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
      type: OPERATIONS.EQUAL,
      input: {
        values: [
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment.location.gps' } },
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment_2.location.gps.value' } },
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment_3.location.gps.value' } },
          '12.43434343, 23.5467784',
        ],
      },
    },
  },
  {
    operation: {
      type: OPERATIONS.LESS_THAN,
      input: {
        values: [
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment_4.location.gps.value' } },
          { type: OPERATIONS.READ, input: { value: 'message.fulfillment_5.location.gps.value' } },
        ],
      },
    },
  },
  {
    operation: {
      type: OPERATIONS.CHECK_IF_KEY_EXISTS,
      input: {
        value: 'message.fulfillment_4.location.gps',
      },
    },
  },
];

const checkIfValidEnum = (type: OPERATIONS): boolean => {
  return Object.keys(OPERATIONS).includes(type);
};

const runInstructionSet = (instructionSet: InstructionSet[]) => {
  instructionSet.forEach((operations, index) => {
    const isValidEnum = checkIfValidEnum(operations.operation.type);
    if (!isValidEnum) throw new Error(`${operations.operation.type} is not a valid type`);

    const operation = {
      ...operations.operation,
      type: operations.operation.type,
    };

    const output = evaluateOperation(samplePayload, operation);

    console.log(`Operation index ${index + 1} output is: ${output}`);
  });
};

runInstructionSet(instructionSetSample);
