import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ICrypto } from "../types";
import Signal from "./Signal";

const SearchCt = styled.form`
  position: relative;
  margin-left: 1em;
  border-radius: 10px;
  i {
    position: absolute;
    padding: 0.5em;
    font-size: 0.9em;
  }
`;

const SearchBar = styled.input`
  width: 30vw;
  padding: 0.5em 1em;
  padding-left: 2.3em;
  border-radius: 10px;
  border: none;
  outline: 1px solid #eee;
`;
const SearchList = styled.ul`
  position: absolute;
  height: 174px;
  border-radius: 10px;
  overflow: scroll;
`;

const SearchListItem = styled.li`
  width: 30vw;
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
    flex-shrink: 1;
    place-self: center;
  }
  img {
    width: 20px;
    height: 20px;
    place-self: center;
  }
  h2 {
    width: 100%;
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
export default function Search() {
  //data
  const allCrypto: ICrypto[] = useOutletContext();
  const [searchList, setSearchList] = useState<ICrypto[]>([]);
  //status
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [listTg, setListTg] = useState(false);
  const onToggle = () => {
    setListTg((prev) => !prev);
  };
  //form
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchList([]);
    setValue(event.currentTarget.value);
    const {
      currentTarget: { value },
    } = event;
    if (value.length >= 3) {
      setSearchList(
        allCrypto?.filter(
          (crypto) =>
            crypto.name.toLowerCase().slice(0, value.length) ===
              value.toLowerCase() && crypto.is_active === true
        )
      );
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`results/${value}`);
  };
  return (
    <SearchCt onSubmit={onSubmit}>
      <i className="fa-solid fa-search" />
      <SearchBar
        onFocus={onToggle}
        onBlur={onToggle}
        onChange={onChange}
      ></SearchBar>
      <SearchList>
        {listTg
          ? searchList.map((crypto) => (
              <SearchListItem key={crypto.id}>
                <div>
                  {crypto.is_new ? <Signal color={"#fce700"} size={5} /> : null}
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
  );
}