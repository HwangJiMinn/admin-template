import { Document, Schema } from 'mongoose';

import { db } from '~/.server/lib/mongodb';

export interface Operator extends Document {
  _id: Schema.Types.ObjectId;
  operatorId: string;
  name: string;
  level?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const operatorSchema = new Schema<Operator>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  operatorId: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  deletedAt: { type: Date },
});

// 모델 생성
export const OperatorModel =
  db.models.Operator || db.model<Operator>('Operator', operatorSchema);
