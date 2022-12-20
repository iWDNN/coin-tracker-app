import React, { useState } from "react";
import styled from "styled-components";
import { IPopUp } from "../types";

const Container = styled.div`
  position: relative;
  width: 50%;
  i {
    width: 20px;
    height: 20px;
  }
  ul {
    width: 300px;
    position: absolute;
    right: 20px;
    bottom: 25px;
    padding: 0.5em;
    line-height: 1.4;
    letter-spacing: 0.5px;
    border-radius: 5px;
    background-color: white;
    opacity: 0.5;
    li {
      margin-bottom: 5px;
      font-size: 0.7em;
    }
  }
`;

export default function PopUp({ iconTag, textList }: IPopUp) {
  const [toggle, setToggle] = useState(false);
  const mouseToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <Container>
      <i
        className={iconTag}
        onMouseOver={mouseToggle}
        onMouseOut={mouseToggle}
      />
      {toggle ? (
        <ul>
          {textList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      ) : null}
    </Container>
  );
}
