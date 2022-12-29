import React from "react";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
`;
const Loader = styled(motion.div)`
  position: relative;
  width: 30px;
  height: 30px;
`;
const Item = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: #e7e7e7;
    transform: rotateZ(125deg);
    box-shadow: 0 0 10px #c3c3c3, 0 0 20px #c3c3c3;
  }
`;

const containerVar: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};
const itemVar: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};
export default function Loading() {
  return (
    <Container>
      <Loader variants={containerVar} initial="hidden" animate="visible">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Item
            key={item}
            variants={itemVar}
            style={{ transform: `rotate(${item * 40}deg)` }}
          />
        ))}
      </Loader>
    </Container>
  );
}
