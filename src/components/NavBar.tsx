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
  padding: 1.3em;
  color: #1d1d1d;
  font-size: 1.4em;
  border-radius: 5px;
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
        <Item>
          <i className="fa-solid fa-ranking-star"></i>
        </Item>
        <Item>
          <i className="fa-solid fa-bolt"></i>
        </Item>
        <Item>
          <i className="fa-solid fa-fire"></i>
        </Item>
      </List>
    </Container>
  );
}
