import nookies from "nookies";
import styled from "styled-components";
import { firebaseAdmin } from "../../firebase/adminApp";

import Header from "../../components/Header";

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    // the user is authenticated!
    // FETCH STUFF HERE!! 🚀
    return {
      props: {
        userId: token.uid,
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist or token verification failed either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return { props: {} };
  }
};

export default function Marathon() {
  return (
    <Container>
      <Header />
      <h2>Exam page</h2>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  .nav {
    margin-top: 2em;
  }
`;
