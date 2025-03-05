import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';

export default function SideNavigation({ pathSegment }: any) {
  const [selectedMenu, setSelectedMenu] = useState('');

  const handleMenuClick = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const menuGroups = [
    {
      groupName: '조회',
      items: [{ name: '00조회', path: '/00-check' }],
    },
    {
      groupName: '관리',
      items: [{ name: '01관리', path: '/01-manage' }],
    },
  ];

  useEffect(() => {
    const currentGroup = menuGroups
      .flatMap((group) => group.items)
      .find((item) => pathSegment.includes(item.path));

    if (currentGroup) {
      setSelectedMenu(currentGroup.name);
    }
  }, [pathSegment]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* 로고 영역 */}
      <button
        className="flex items-center justify-center h-[108px]"
        onClick={() => setSelectedMenu('')}
      >
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-full object-cover object-center"
          />
        </Link>
      </button>

      <div className="space-y-4 p-4 flex flex-col gap-2">
        {menuGroups.map((group) => (
          <div key={group.groupName}>
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              {group.groupName}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <Link to={item.path} key={item.name}>
                  <button
                    className={`w-full flex justify-start items-center px-4 py-3 rounded-lg transition-all duration-300
                      ${
                        selectedMenu === item.name
                          ? 'bg-white text-[#4970FF]'
                          : 'bg-white text-gray-700'
                      }`}
                    onClick={() => handleMenuClick(item.name)}
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
