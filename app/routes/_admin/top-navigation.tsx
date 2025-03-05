import { Link, useFetcher, useLocation, useNavigate } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

export default function TopNavigation({ user }: any) {
  const location = useLocation();
  const logoutFetcher = useFetcher();

  const handleLogout = () => {
    logoutFetcher.submit(null, { method: 'post', action: '/api/logout' });
  };

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  let title;

  switch (location.pathname) {
    case '/':
      title = '';
      break;
    case '/user-management':
      title = '직원관리';
      break;
    case '/member-management':
      title = '회원관리';
      break;
    case '/withdrawal-management':
      title = '출금관리';
      break;
    case '/team-management':
      title = '팀관리';
      break;
    case '/notices':
      title = '공지사항';
      break;
    case '/reward-management':
      title = '리워드조회';
      break;
    case '/commission-management':
      title = '커미션조회';
      break;
    case '/events':
      title = '이벤트';
      break;
    case '/auto-trade-error':
      title = '자동매매 장애';
      break;
    case '/signal':
      title = '신호관리';
      break;
    case 'price-lottery':
      title = '추첨이벤트 조회';
      break;
    case '/popup-events':
      title = '팝업이벤트 관리';
      break;
    default:
      title = '';
  }

  return (
    <div className="flex items-center justify-between w-full h-full p-4">
      <h1 className="text-2xl font-bold text-gray-900 flex gap-3">
        {location.pathname.includes('detail') || location.pathname.includes('create') ? (
          <button onClick={goBack}>&#171;</button>
        ) : (
          <> </>
        )}
        {title}
      </h1>
      <div className="flex">
        {user === undefined ? (
          <Link to="/login">
            <Button variant="default">로그인</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="px-4 py-2 font-bold text-white w-full">
                {user.user.name}님
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={handleLogout}>로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
