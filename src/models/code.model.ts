import { Schema, model } from 'mongoose';
import { Code } from '../entities/code';

const codeSchema = new Schema<Code>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now, expires: 3600 },
});

export const CodeModel = model('Code', codeSchema, 'codes');
