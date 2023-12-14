import createDebug from 'debug';
import { CodeModel } from '../models/code.model.js';
import { Code } from '../entities/code.js';

const debug = createDebug('SOCIALNETWORK:CODEREPO');

export class CodeRepo {
  constructor() {
    debug('Instantiated');
  }

  async create(data: Partial<Code>): Promise<Code> {
    const newCode = await CodeModel.create(data);
    return newCode;
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<Code[]> {
    const result = await CodeModel.find({ [key]: value })
      .populate('user')
      .exec();
    return result;
  }
}
