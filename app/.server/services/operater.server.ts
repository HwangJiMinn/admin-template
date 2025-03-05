import { OperatorModel } from '../models/operator';

export const createOperator = async (id: string, name: string) => {
  const existingOperator = await OperatorModel.findOne({ operatorId: id });

  if (existingOperator) {
    throw new Error('ID가 이미 존재합니다.');
  }

  const operator = new OperatorModel({
    operatorId: id,
    name,
  });
  await operator.save();
  return operator;
};
