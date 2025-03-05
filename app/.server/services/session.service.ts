import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { getAcceptLanguage, isLanguage } from '~/.server/lib/localization';
import { Theme } from '~/common/constants';
import { isTheme } from '~/hooks/use-theme';

// * 언어 세션
export const getLanguageSession = async (request: Request) => {
  const languageStorage = createCookieSessionStorage({
    cookie: {
      name: 'language',
      secure: true,
      secrets: [process.env.SESSION_SECRET ?? ''],
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
    },
  });
  const session = await languageStorage.getSession(request.headers.get('Cookie'));
  return {
    getLanguage: () => {
      const langValue = session.get('language') as string;
      return isLanguage(langValue) ? langValue : getAcceptLanguage(request);
    },
    setLanguage: (language: string) => session.set('language', language),
    commit: () => languageStorage.commitSession(session),
  };
};

// * 테마 세션
export const getThemeSession = async (request: Request) => {
  const themeStorage = createCookieSessionStorage({
    cookie: {
      name: 'theme',
      secure: true,
      secrets: [process.env.SESSION_SECRET ?? ''],
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
    },
  });
  const session = await themeStorage.getSession(request.headers.get('Cookie'));
  return {
    getTheme: () => {
      const themeValue = session.get('theme');
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  };
};

const USER_SESSION_KEY = 'modoobits';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET ?? ''],
    secure: false,
    // secure: process.env.NODE_ENV === 'production',
  },
});

const getSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');

  return sessionStorage.getSession(cookie);
};

export const getUser = async (request: Request): Promise<undefined> => {
  const session = await getSession(request);

  return session.get(USER_SESSION_KEY);
};

export const login = async ({ request, user }: { request: Request; user: any }) => {
  const session = await getSession(request);

  session.set(USER_SESSION_KEY, user);

  return redirect('/', {
    status: 303,
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 1, // 1일
      }),
    },
  });
};

export const logout = async (request: Request) => {
  const session = await getSession(request);

  return redirect('/login', {
    status: 303,
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};
