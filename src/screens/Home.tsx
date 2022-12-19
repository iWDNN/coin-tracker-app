import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { ICrypto } from "../types";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SearchCt = styled.div`
  position: relative;
  padding: 1em;
  border-radius: 10px;
  background-color: #eee;
`;

const SearchBar = styled.input`
  width: 30vw;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: none;
  outline: 1px solid #eee;
`;
const SearchList = styled.ul`
  position: absolute;
  width: 100%;
  height: 174px;
  border-radius: 10px;
  overflow: scroll;
  li {
    padding: 0.5em;
    font-size: 0.9em;
    background-color: #fff;
    &:hover {
      border: 1px solid black;
    }
  }
`;

export default function Home() {
  const [searchList, setSearchList] = useState<ICrypto[]>([]);
  const { isLoading, data } = useQuery<ICrypto[]>("allCoins", () =>
    fetchCoins()
  );
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchList([]);
    const {
      currentTarget: { value },
    } = event;
    if (value.length >= 3) {
      data?.filter(
        (crypto) =>
          crypto.name.toLowerCase().slice(0, value.length) ===
            value.toLowerCase() && setSearchList((prev) => [...prev, crypto])
      );
    }
    console.log(searchList);
  };
  return (
    <>
      <Container>
        {isLoading ? (
          <span>Loading</span>
        ) : (
          <>
            <span>Coins</span>
            <SearchCt>
              <SearchBar onChange={onChange} />
              <SearchList>
                {searchList.map((crypto) => (
                  <li key={crypto.id}>{crypto.name}</li>
                ))}
              </SearchList>
            </SearchCt>
          </>
        )}
      </Container>
    </>
  );
}
