import bcrypt from 'bcryptjs';

import { OperatorModel } from '../models/operator';
import { OperatorHashModel } from '../models/operator-hash';

export const loginOperator = async (mbrId: string, password: string) => {
  const operator = await OperatorModel.findOne({ operatorId: mbrId });

  if (!operator) {
    throw new Error('아이디가 존재하지 않습니다.');
  }

  const operatorHash = (await OperatorHashModel.findOne({
    operator: operator._id,
  })) as any;

  if (!operatorHash || !bcrypt.compareSync(password, operatorHash.hash)) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  const isPasswordValid = await bcrypt.compare(password, operatorHash.hash);
  if (!isPasswordValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  return {
    _id: operator._id,
    id: operator.operatorId,
    name: operator.name,
    createdAt: operator.createdAt,
    updatedAt: operator.updatedAt,
  };
};
