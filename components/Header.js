import Link from "next/link";
import styled from "styled-components";

import Logo from "./Logo";

const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  margin-bottom: 1em;
  width: 100%;
  padding: 0.5em 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
