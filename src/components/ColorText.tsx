import React from "react";
import styled from "styled-components";

interface IColorProps {
  color: string;
  text: string;
}

const ColorSpan = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 600;
`;

export default function ColorText({ color, text }: IColorProps) {
  return <ColorSpan color={color}>{text}</ColorSpan>;
}
