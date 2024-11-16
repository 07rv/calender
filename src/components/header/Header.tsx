import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";

const Header = () => {
  return (
    <div className="mx-4 flex items-center justify-between py-4">
      <LeftHeader />
      <RightHeader />
    </div>
  );
};

export default Header;
