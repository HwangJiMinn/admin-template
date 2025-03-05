import TopNavigation from './top-navigation';

const Header = (user: any) => {
  return (
    <header className="h-[109px] bg-white">
      <TopNavigation user={user} />
    </header>
  );
};

export default Header;
