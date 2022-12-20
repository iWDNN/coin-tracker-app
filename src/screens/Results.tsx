import React from "react";
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { Header } from "../components";
import { ICrypto } from "../types";

const Container = styled.div`
  width: 100vw;
  margin-top: 4vh;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;
const MiniCt = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
`;
const Tabs = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Tab = styled.li`
  width: 100px;
  padding: 4px 10px;
  margin-bottom: 5px;
  font-size: 0.9em;
  font-weight: 500;
  letter-spacing: 1px;
  span {
    font-size: 0.8em;
  }
`;

export default function Results() {
  const cryptoTypes: string[] = ["all", "coin", "token"];
  const { searchId } = useParams();
  const allCrypto: ICrypto[] = useOutletContext();
  const searchResult: ICrypto[] = allCrypto.filter(
    (crypto) =>
      crypto.name.toLowerCase().slice(0, searchId!.length) ===
      searchId!.toLowerCase()
  );
  return (
    <Container>
      <Header />
      <MiniCt>
        <Tabs>
          {cryptoTypes.map((type) => (
            <Link key={uuid()} to={`tabs/${type}`}>
              <Tab>
                {type}{" "}
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
