import styled from "styled-components";

import Nav from "../../components/Nav";
import Header from "../../components/Header";
export default function Admin() {
  return (
    <>
      <Header />

      <Container>
        <h2>ADMIN</h2>
      </Container>
      <Nav />
    </>
  );
}

const Container = styled.div`
  padding: 1em;
`;
