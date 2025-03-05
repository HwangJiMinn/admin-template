import { ActionFunction, ActionFunctionArgs, LoaderFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { registerController } from '~/.server/controllers/register.controller';
import { control } from '~/.server/lib/utils';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export const loader: LoaderFunction = async () => {
  // throw new Response('Not Found', { status: 404 });
  return true;
};

export const action: ActionFunction = async (arg: ActionFunctionArgs) => {
  return control(registerController, arg);
};

export default function Register() {
  const actionData: any = useActionData();
  // 액션 실행 후 응답 처리
  const handleSubmission = () => {
    if (actionData?.error) {
      alert(actionData.error);
    } else if (actionData?.operator) {
      alert('등록되었습니다.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <Form method="post" onSubmit={handleSubmission}>
        <div className="space-y-4">
          <div className="w-full">
            <label htmlFor="operatorId">ID</label>
            <Input id="operatorId" name="operatorId" type="text" required />
          </div>

          <div className="w-full">
            <label htmlFor="name">이름</label>
            <Input id="name" name="name" type="text" required />
          </div>

          <div className="w-full">
            <label htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" required />
          </div>

          <Button
            type="submit"
            className="w-full text-lg bg-blue-500 hover:bg-blue-600 text-white py-2"
          >
            Register
          </Button>
        </div>
      </Form>
      {actionData?.error && (
        <div className="bg-white flex items-center justify-center pt-5 mb-2">
          <div className="text-red-500 text-center">{actionData.error}</div>
        </div>
      )}
      {actionData && (
        <div className="mt-4">
          <pre>{JSON.stringify(actionData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
