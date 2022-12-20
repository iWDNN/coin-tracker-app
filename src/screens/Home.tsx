import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Signal } from "../components";
import PopUp from "../components/PopUp";
import { popUpData } from "../data";
import { ICrypto } from "../types";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    display: flex;
    align-items: center;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    i {
      font-weight: 0.8em;
      margin-left: 5px;
    }
  }
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
  width: 30vw;
  height: 174px;
  border-radius: 10px;
  overflow: scroll;
`;

const SearchListItem = styled.li`
  padding: 0.5em;
  font-size: 0.9em;
  background-color: #fff;
  display: grid;
  grid-template-columns: 5% 5% 80% 10%;
  &:hover {
    border: 1px solid black;
    border-radius: 10px;
  }
  div:first-child {
    place-self: center;
  }
  img {
    width: 20px;
    height: 20px;
    place-self: center;
  }
  h2 {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  h3 {
    color: #9a9a9a;
    letter-spacing: 1px;
    font-size: 0.5em;
    font-weight: 500;
  }
`;

export default function Home() {
  //status
  const [listTg, setListTg] = useState(false);
  //data
  const [searchList, setSearchList] = useState<ICrypto[]>([]);
  const { isLoading, data: allCrypto } = useQuery<ICrypto[]>("allCrypto", () =>
    fetchCoins()
  );
  const onToggle = () => {
    setListTg((prev) => !prev);
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchList([]);
    const {
      currentTarget: { value },
    } = event;
    if (value.length >= 3) {
      allCrypto?.filter(
        (crypto) =>
          crypto.name.toLowerCase().slice(0, value.length) ===
            value.toLowerCase() && setSearchList((prev) => [...prev, crypto])
      );
    }
  };
  // console.log(allCrypto);
  return (
    <>
      <Container>
        {isLoading ? (
          <span>Loading</span>
        ) : (
          <>
            <h1>
              Cryptos
              <PopUp {...popUpData} />
            </h1>
            <SearchCt>
              <SearchBar
                onFocus={onToggle}
                onBlur={onToggle}
                onChange={onChange}
              />
              <SearchList>
                {listTg
                  ? searchList.map((crypto) => (
                      <SearchListItem key={crypto.id}>
                        <div>
                          {crypto.is_new ? (
                            <Signal color={"#fce700"} size={5} />
                          ) : null}
                        </div>
                        <img
                          src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`}
                          alt={crypto.name}
                        />
                        <h2>{crypto.name}</h2>
                        <h3>{crypto.type}</h3>
                      </SearchListItem>
                    ))
                  : null}
              </SearchList>
            </SearchCt>
          </>
        )}
      </Container>
    </>
  );
}
