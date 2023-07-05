import * as fs from 'fs';
import { GenericObject } from '../Operator/types';

export class LogVerification {
  parsedLogs: GenericObject[] = [];
  logsPath: string[] = [];
  report = '';

  constructor(logsPath: string[]) {
    this.logsPath = logsPath;
    this.parseLogs();
  }

  private parseLogs() {
    if (!this.logsPath.length) throw new Error('No logs found');

    this.logsPath.forEach((logPath) => {
      const fileContent = fs.readFileSync(logPath).toString();
      const parsedLog = JSON.parse(fileContent);
      this.parsedLogs.push(parsedLog);
    });

    this.writeToReport(`SUCCESSFULLY PARSED ${this.logsPath.length} LOGS`);
  }

  writeToReport(message: string) {
    if (!this.report) this.report = `[${new Date().toISOString()}]: ${message}`;
    else {
      this.report += `\n[${new Date().toISOString()}]: ${message}`;
    }
  }

  generateReport() {
    // Method to generate log verification report
    fs.writeFileSync('report.log', this.report);
  }

  parseInstructionSet() {
    // Method to parse instruction set
  }
}
