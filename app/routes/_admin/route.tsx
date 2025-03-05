import { LoaderFunction, redirect } from '@remix-run/node';
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import { Suspense } from 'react';

import { getUser } from '~/.server/services/session.service';
import Spinner from '~/components/spinner/spinner';

import Header from './header';
import SideNavigation from './side-navigation';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pathSegment = url.pathname.split('/')[0] + '/' + url.pathname.split('/')[1];

  const user = await getUser(request);

  if (!user) {
    return redirect('/login');
  }

  return { pathSegment, user };
};

export default function Index() {
  const { pathSegment, user } = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isNavigating = navigation.state === 'loading';

  return (
    <div className="flex">
      <div className="flex flex-none min-h-full w-64 border-r border-gray-300 ">
        <SideNavigation pathSegment={pathSegment} />
      </div>

      <div className="w-full min-h-screen">
        <Header user={user} />
        <Suspense fallback={<div>Loading...</div>}>
          <main className="min-h-screen bg-white p-4 max-w-[1650px]">
            <Outlet />
          </main>
        </Suspense>
      </div>
      {isNavigating && <Spinner />}
    </div>
  );
}
