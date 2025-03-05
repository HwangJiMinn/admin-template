import { ActionFunctionArgs } from '@remix-run/node';

import { validateFormData } from '../lib/utils';
import { LoginPayload, loginSchema } from '../schemas/login';
import { loginOperator } from '../services/login.server';
import { login } from '../services/session.service';

export const loginController = async ({ request }: ActionFunctionArgs) => {
  const payload = await validateFormData<LoginPayload>(request, loginSchema);

  const user = await loginOperator(payload.mbrId, payload.password);

  return login({ request, user });
};
