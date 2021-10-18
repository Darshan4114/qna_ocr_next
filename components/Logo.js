import Image from "next/image";
import styled from "styled-components";

export default function Logo({ mode }) {
  return (
    <Container>
      <div className="imageContainer">
        <Image
          src="/img/logo.png"
          layout="fill"
          objectFit="contain"
          alt="logo"
        />
      </div>

      <p style={{ fontFamily: "Great Vibes, cursive", fontSize: "1.5rem " }}>
        Exam Prep
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  width: 165px;

  .imageContainer {
    width: 60px;
    height: 40px;
    position: relative;
  }
  ${(props) =>
    props.mode === "vertical" &&
    css`
      flex-direction: column;
    `};
`;
