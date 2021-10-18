import styled from "styled-components";
import Image from "next/image";

import Header from "../components/Header";
export default function exam() {
  return (
    <>
      <Header />

      <Container>
        <div className="question">
          <p>
            <span className="questionNumber">Q.1.</span> What is your name?
          </p>
          <div className="option">
            <input
              type="radio"
              id="option1"
              name="answer"
              value="Jake"
              label="Jake"
            />
            <label htmlFor="option1">Jake</label>
          </div>
          <div className="option">
            <input type="radio" id="option2" name="answer" value="Minnie" />
            <label htmlFor="option2">Minnie</label>
          </div>
          <div className="option">
            <input type="radio" id="option3" name="answer" value="Mickey" />
            <label htmlFor="option3">Mickey</label>
          </div>
          <div className="option">
            <input type="radio" id="option4" name="answer" value="James" />
            <label htmlFor="option4">James</label>
          </div>
        </div>
        <div className="questionListContainer">
          <h2>Questions</h2>
          <div className="questionList">
            <div className="questionBox">
              <p>1</p>
            </div>
            <div className="questionBox">
              <p>1</p>
            </div>
            <div className="questionBox">
              <p>1</p>
            </div>
            <div className="questionBox">
              <p>1</p>
            </div>
            <div className="questionBox">
              <p>1</p>
            </div>
            <div className="questionBox">
              <p>1</p>
            </div>
            <div className="questionBox">
              <p>1</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 1em;
  .question {
    padding: 1em;
    margin-bottom: 2em;
    background: var(--theme-white);
    color: var(--text-primary);
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    font-size: 1.25rem;
    > p {
      margin-bottom: 1em;
    }
    .option {
      margin-bottom: 1em;
    }
  }
  .questionListContainer {
    > h2 {
      margin-bottom: 1em;
    }
  }
  .questionList {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-items: center;
    gap: 1.25em;
    width: 20rem;
    margin: 0 auto;
  }
  .questionBox {
    height: 3rem;
    width: 3rem;
    display: grid;
    place-items: center;
    border-radius: 0.25em;
    background: var(--theme-white);
    color: var(--text-primary);
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;
