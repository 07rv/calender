import LeftHeader from "./left-side";
import RightHeader from "./right-side";

const Header = () => {
  return (
    <div className="mx-4 flex items-center justify-between py-4">
      <LeftHeader />
      <RightHeader />
    </div>
  );
};

export default Header;
