import styled from "styled-components";

import AdminNav from "../../components/AdminNav";
import Logo from "../../components/Logo";
export default function Admin() {
  return (
    <>
      <Logo />

      <Container>
        <h2>ADMIN</h2>
      </Container>
      <AdminNav />
    </>
  );
}

const Container = styled.div`
  padding: 1em;
`;
