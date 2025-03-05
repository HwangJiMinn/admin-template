import { ActionFunctionArgs } from '@remix-run/node';

import { validateFormData } from '../lib/utils';
import { RegisterPayload, registerSchema } from '../schemas/register';
import { createOperator } from '../services/operater.server';
import { createOperatorHash } from '../services/password.server';

export const registerController = async ({ request }: ActionFunctionArgs) => {
  const payload = await validateFormData<RegisterPayload>(request, registerSchema);

  const operator = await createOperator(payload.operatorId, payload.name);

  const operatorHash = await createOperatorHash(operator._id, payload.password);

  return operatorHash;
};
