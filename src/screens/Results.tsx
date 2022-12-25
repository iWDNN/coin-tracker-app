import React from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { Search } from "../components";
import { ICrypto } from "../types/crypto";

const Container = styled.div`
  flex-grow: 1;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;
const MiniCt = styled.div`
  display: flex;
`;
const Tabs = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Tab = styled.li<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  padding: 10px 15px;
  margin-bottom: 5px;
  font-size: 0.9em;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out all;
  background-color: ${(props) => (props.isActive ? "#e7e7e7" : "none")};
  span {
    font-size: 0.8em;
  }
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
      <Header>
        <Search small />
      </Header>
      <MiniCt>
        <Tabs>
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
        <Outlet context={searchResult} />
      </MiniCt>
    </Container>
  );
}
