import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ICrypto } from "../types/crypto";
import Signal from "./Signal";

interface ISearchProps {
  small?: boolean;
}

const SearchCt = styled.form`
  position: relative;
  /* display: flex;
  align-items: center; */
  margin-left: 1em;
  border-radius: 10px;
`;
const SearchBarCt = styled.div<{ small: boolean }>`
  position: relative;
  display: flex;
  align-content: center;
  height: 100%;
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${(props) => (props.small ? "0.5em" : "1em")};
    font-size: ${(props) => (props.small ? "0.9em" : "1.1em")};
  }
`;

const SearchBar = styled.input<{ err: boolean; small: boolean }>`
  width: ${(props) => (props.small ? "30vw" : "33vw")};
  padding: ${(props) => (props.small ? "0.5em 1em" : "0.8em 2em")};
  padding-left: ${(props) => (props.small ? "2.3em" : "2.7em")};
  font-size: ${(props) => (props.small ? "1em" : "1.1em")};
  border-radius: 15px;
  border: none;
  &:focus {
    outline: ${(props) =>
      props.err ? "2px solid #ff5c5c" : "2px solid #c2c2c2"};
  }
  &::placeholder {
    color: #e3e2e2;
  }
`;
const SearchList = styled.ul<{ toggle: boolean }>`
  position: absolute;
  width: 100%;
  height: ${(props) => (props.toggle ? "174px" : "0%")};
  border-radius: 10px;
  overflow: scroll;
`;

const SearchListItem = styled.li`
  width: 100%;
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
    display: flex;
    align-items: center;
    color: #9a9a9a;
    letter-spacing: 1px;
    font-size: 0.5em;
    font-weight: 500;
  }
`;
export default function Search({ small = false }: ISearchProps) {
  //data
  const allCrypto: ICrypto[] = useOutletContext();
  const [searchList, setSearchList] = useState<ICrypto[]>([]);
  //status
  const navigate = useNavigate();
  const [paramSearch, setParamsSearch] = useState("");
  const [listTg, setListTg] = useState(false);
  const [errTg, setErrTg] = useState(false);
  //form

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchList([]);
    setParamsSearch(value);
    if (/[^a-zA-z]/g.test(value)) {
      setErrTg(true);
    } else setErrTg(false);
    if (value.length >= 3) {
      setListTg(true);
      setSearchList(
        allCrypto?.filter(
          (crypto) =>
            crypto.name.toLowerCase().slice(0, value.length) ===
              value.toLowerCase() && crypto.is_active === true
        )
      );
    } else {
      setListTg(false);
    }
    // console.log(searchList);
    //알수없는 서치리스트 버그 한번씩 출력이 안되서 콘솔출력 한번해주니까 작동되고 그럼 너무 무거워서 그런가
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (/[^a-zA-z]/g.test(paramSearch)) {
      // 영문자를 제외한 문자가 있으면 true
      setErrTg(true);
    } else {
      navigate(`/results/${paramSearch}/tabs/all`);
    }
    setListTg(false);
  };
  return (
    <SearchCt onSubmit={onSubmit}>
      <SearchBarCt small={small}>
        <i className="fa-solid fa-search" />
        <SearchBar
          placeholder="typing the crypto"
          err={errTg}
          small={small}
          onFocus={() => {
            setListTg(true);
            console.log("onFocus");
          }}
          onChange={onChange}
        />
      </SearchBarCt>
      <SearchList toggle={listTg} onBlur={() => console.log("onBlur")}>
        {searchList.map((crypto) => (
          <Link key={crypto.id} to={`/crypto-info/${crypto.id}`}>
            <SearchListItem>
              <div>{crypto.is_new ? <Signal color={"#fce700"} /> : null}</div>
              <img
                src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol.toLowerCase()}`}
                // src={`https://static.coinpaprika.com/coin/${crypto.id}/logo.png`}
                alt={crypto.name}
              />
              <h2>{crypto.name}</h2>
              <h3>{crypto.type}</h3>
            </SearchListItem>
          </Link>
        ))}
      </SearchList>
    </SearchCt>
  );
}
