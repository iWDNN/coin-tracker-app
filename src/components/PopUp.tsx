import React, { useState } from "react";
import styled from "styled-components";
import { IPopUp } from "../types/common";

const Container = styled.div`
  position: relative;
  width: 50%;
  i {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    position: absolute;
    right: 20px;
    bottom: 25px;
    width: 300px;
    padding: 0.5em;
    font-size: 0.7em;
    letter-spacing: 0.5px;
    line-height: 1.4;
    border-radius: 5px;
    background-color: white;
    opacity: 0.5;
  }
`;

export default function PopUp({
  iconTag = "fa-regular fa-circle-question",
  text = "",
}: IPopUp) {
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
      {toggle ? <p>{text}</p> : null}
    </Container>
  );
}
