import { ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import { loginController } from '~/.server/controllers/login.controller';
import { control } from '~/.server/lib/utils';
import { Button } from '~/components/ui/button';

export const action = async (arg: ActionFunctionArgs) => {
  return control(loginController, arg);
};

export default function Login() {
  const actionData: any = useActionData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="shadow-lg rounded-lg w-[500px]">
        <div className="flex justify-center p-8 rounded-t-lg ">
          <img src="images/logo.png" alt="Logo" className="w-60" />
        </div>
        <div className="px-8 py-6 bg-white rounded-b-lg">
          <Form method="POST" action="/login">
            <div className="mb-4">
              <label htmlFor="mbrId" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                type="text"
                name="mbrId"
                id="mbrId"
                required
                className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                패스워드
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                autoComplete="off"
              />
            </div>
            {/* {user && user.bizErrCode && (
              <div className="text-red-500">{user.detailMessage}</div>
            )} */}
            <Button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-bold text-white rounded-md hover:bg-gray-800"
            >
              로그인
            </Button>
          </Form>
          {actionData?.error && (
            <div className="bg-white flex items-center justify-center pt-5 mb-2">
              <p className="text-red-500 text-center">{actionData.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
