import { evaluateOperation } from './Operator/util';
import { OPERATIONS } from './Operator/types';

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
          value: '12, 23',
        },
      },
    },
  },
};

const instructionSet = [
  {
    operation: {
      type: 'READ',
      input: { value: 'message.fulfillment.location.gps' },
    },
  },
  {
    operation: {
      type: 'EQUAL',
      input: {
        values: [
          { operation: { type: 'READ', input: { value: 'message.fulfillment.location.gps' } } },
          { operation: { type: 'READ', input: { value: 'message.fulfillment_2.location.gps.value' } } },
        ],
      },
    },
  },
];

const checkIfValidEnum = (type: string): boolean => {
  return Object.keys(OPERATIONS).includes(type);
};

instructionSet.forEach((operations) => {
  const isValidEnum = checkIfValidEnum(operations.operation.type);

  const operation = {
    ...operations.operation,
    type: operations.operation.type as OPERATIONS,
  };

  const output = evaluateOperation(samplePayload, operation as any);

  console.log(output);
});
