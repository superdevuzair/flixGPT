import * as React from "react";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
  return (
    <div className="absolute top-0 left-0 p-4 z-10">
      {/* Logo */}
      <img className="w-48" src="/Netflix_Logo_PMS.png" alt="Netflix Logo" />
    </div>
  );
};

export default Header;
