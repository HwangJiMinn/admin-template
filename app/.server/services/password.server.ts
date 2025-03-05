import bcrypt from 'bcryptjs';

import { OperatorModel } from '../models/operator';
import { OperatorHashModel } from '../models/operator-hash';

export const createOperatorHash = async (operatorId: string, password: string) => {
  const operator = await OperatorModel.findById(operatorId);

  if (!operator) {
    throw new Error('Operator not found');
  }
  const saltRounds = parseInt(process.env.SALT_ROUNDS!);
  const hash = bcrypt.hashSync(password, saltRounds);

  const operatorHash = new OperatorHashModel({
    operator: operator._id,
    hash,
    updatedAt: Date.now(),
  });

  await operatorHash.save();

  return {
    success: true,
    message: '회원가입이 완료되었습니다.',
  };
};
