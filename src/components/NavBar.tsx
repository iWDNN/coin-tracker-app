import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 0.8em;
  font-weight: 500;
  background-color: #cbcbcb;
`;
const List = styled.ul``;
const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d1d1d;
  font-size: 1.3em;
  padding: 1.5em;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 0 1px #111 inset;
  }
`;
export default function NavBar() {
  return (
    <Container>
      <List>
        <Link to="/">
          <Item>
            <i className="fa-solid fa-search"></i>
          </Item>
        </Link>
        <Link to="rank">
          <Item>
            <i className="fa-solid fa-ranking-star"></i>
          </Item>
        </Link>
        <Item>
          <Link to="/">
            <i className="fa-solid fa-bolt"></i>
          </Link>
        </Item>
        <Item>
          <Link to="/">
            <i className="fa-solid fa-fire"></i>
          </Link>
        </Item>
      </List>
    </Container>
  );
}
