import { Document, Schema } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

import { db } from '~/.server/lib/mongodb';

import { Operator } from './operator';

export interface OperatorHash extends Document {
  _id: Schema.Types.ObjectId;
  operator: Operator;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}

const operatorHashSchema = new Schema<OperatorHash>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'Operator',
    autopopulate: true,
    required: true,
  },
  hash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

// autopopulate 플러그인 적용
operatorHashSchema.plugin(autopopulate);

export const OperatorHashModel =
  db.models.OperatorHash || db.model<OperatorHash>('OperatorHash', operatorHashSchema);
