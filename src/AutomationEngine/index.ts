import { LogVerification } from '../LogVerification';
import { InstructionSet, ModulesEnums } from '../shared/types';

export class AutomationEngine {
  moduleMapping = {
    [ModulesEnums.LOG_VERIFICATION]: LogVerification,
    [ModulesEnums.MOCK_API_SERVER]: undefined,
  };
  instructionSet?: InstructionSet;

  constructor(instructionSet: InstructionSet) {
    this.instructionSet = instructionSet;
  }

  determineModule() {
    if (!this.instructionSet) throw new Error('Instuction set not initialised');
    Object.keys(this.instructionSet).forEach((item) => {
      const modules = item as ModulesEnums;
      if (this.moduleMapping[modules]) {
        // RUN MODULE
        console.log(this.moduleMapping[modules]);
      } else {
        throw new Error('Unknown module found');
      }
    });
  }

  runModule() {}
}
