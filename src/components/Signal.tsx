import React from "react";
import styled from "styled-components";
import { ISignal } from "../types";

const SignalCt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;
const Light = styled.div<{ color: string; size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  box-shadow: 0 0 1px ${(props) => props.color},
    0 0 2px ${(props) => props.color}, 0 0 4px ${(props) => props.color},
    0 0 8px ${(props) => props.color}; ;
`;

export default function Signal({ color, size }: ISignal) {
  return (
    <SignalCt>
      <Light color={color} size={size + "px"} />
    </SignalCt>
  );
}
