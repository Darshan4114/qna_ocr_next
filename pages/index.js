import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Header from "../components/Header";

import TabPanel from "../components/TabPanel";

export default function Home() {
  const [activeItem, setActiveItem] = useState(0);
  function changeActiveItem(item) {
    setActiveItem(item);
  }
  useEffect(() => {
    setActiveItem({
      label: "भारतीय इतिहास",
      value: "indian-history",
      idx: 0,
    });
  }, []);

  const QuizList = ({ subject }) => {
    const marathonLink = `/${subject}/marathon`;
    const timeLink = `/${subject}/time`;
    return (
      <div className="quizType">
        <Link href={marathonLink}>
          <a className="marathon">Marathon Quiz</a>
        </Link>
        <Link href={timeLink}>
          <a className="time">Time Quiz</a>
        </Link>
      </div>
    );
  };
  return (
    <Container>
      <Header home={true} changeActiveItem={changeActiveItem} nav={true} />
      <TabPanel value={activeItem.idx} index={0}>
        <QuizList subject={activeItem.value} />
      </TabPanel>
      <TabPanel value={activeItem.idx} index={1}>
        <QuizList subject={activeItem.value} />
      </TabPanel>
      <TabPanel value={activeItem.idx} index={2}>
        <QuizList subject={activeItem.value} />
      </TabPanel>
      <TabPanel value={activeItem.idx} index={3}>
        <QuizList subject={activeItem.value} />
      </TabPanel>
      <TabPanel value={activeItem.idx} index={4}>
        <QuizList subject={activeItem.value} />
      </TabPanel>
    </Container>
  );
}

const Container = styled.div`
  .quizType {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    > a {
      width: 250px;
      height: 250px;
      background: var(--theme-primary);
      color: var(--theme-white);
      font-weight: bold;
      display: grid;
      place-items: center;
      border-radius: 1em;
      border: none;
      font-size: 1.7rem;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
      :hover {
        background: var(--theme-dark);
      }
    }
  }
`;
