import React from "react";
import {
  Link,
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { Search } from "../components";
import { ICrypto } from "../types/crypto";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
  background-color: #e7e7e7;
`;
const MiniCt = styled.div`
  display: flex;
  flex-grow: 1;
`;
const Tabs = styled.ul`
  display: flex;
  flex-direction: column;
  h1 {
    padding: 1em;
    font-weight: 500;
  }
`;
const Tab = styled.li<{ isActive: boolean }>`
  width: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.1em;
  transition: all 0.2s ease-in-out all;
  background-color: ${(props) => (props.isActive ? "#eee" : "none")};
  box-shadow: 0 0 0 1px rgba(150, 150, 150, 0.1) inset;
  span {
    font-size: 0.8em;
    font-weight: 500;
    letter-spacing: 1px;
  }
`;
const SideView = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;

export default function Results() {
  const cryptoTypes: string[] = ["all", "coin", "token"];
  const { searchId, tabId } = useParams();
  const allCrypto: ICrypto[] = useOutletContext();
  const searchResult: ICrypto[] = allCrypto.filter(
    (crypto) =>
      crypto.name.toLowerCase().slice(0, searchId!.length) ===
      searchId!.toLowerCase()
  );
  return (
    <Container>
      <MiniCt>
        <Tabs>
          <h1>Search</h1>
          {cryptoTypes.map((type) => (
            <Link key={uuid()} to={`tabs/${type}`}>
              <Tab isActive={type === tabId}>
                <span>{type}</span>
                <span>
                  (
                  {type === "all"
                    ? searchResult.length
                    : searchResult.filter((crypto) => crypto.type === type)
                        .length}
                  )
                </span>
              </Tab>
            </Link>
          ))}
        </Tabs>
        <SideView>
          <Header>
            <Search small />
          </Header>
          <Outlet context={searchResult} />
        </SideView>
      </MiniCt>
    </Container>
  );
}
