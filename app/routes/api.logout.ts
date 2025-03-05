import { logout } from '~/.server/services/session.service';

export const action = async ({ request }) => {
  try {
    return logout(request);
  } catch (error) {
    console.error(error);
    return { error: 'server error', status: 500 };
  }
};
