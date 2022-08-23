import styled from "@emotion/styled";
import React, { useState, useRef } from "react";
import { __addUser } from "redux/modules/user";
import { useDispatch } from "react-redux";

function UserDataAdd() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [nickname, setNickname] = useState();

  const nameRef = useRef();
  const nicknameRef = useRef();
  const numberRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();

  const onClickEventHandler = (e) => {
    if (name === "" || nickname === "" || number === "") alert("빈칸입니다.");
    else if (number.length !== 11) alert("전화번호를 확인하세요");
    else if (
      maleRef.current.checked === false &&
      femaleRef.current.checked === false
    )
      alert("성별을 선택하세요.");
    //로직 추가하기
    else {
      dispatch(
        __addUser({
          name: name,
          gender: gender,
          nickname: nickname,
          number: number,
        })
      );
      //input창 비우기
      nameRef.current.value = "";
      nicknameRef.current.value = "";
      numberRef.current.value = "";
      maleRef.current.checked = false;
      femaleRef.current.checked = false;
    }
  };
  return (
    <>
      <StBox>
        <div>
          <input
            type="radio"
            name="gender"
            ref={maleRef}
            value="남자"
            onChange={(e) => setGender(e.target.value)}
          />

          <input
            type="radio"
            name="gender"
            ref={femaleRef}
            value="여자"
            onChange={(e) => setGender(e.target.value)}
          />
          <span>여자</span>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="이름"
            maxLength={5}
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
          />
        </div>
        <div>
          <input
            type="tel"
            name="number"
            placeholder="전화번호"
            minLength={11}
            maxLength={11}
            onChange={(e) => setNumber(e.target.value)}
            ref={nicknameRef}
          />
        </div>
        <div>
          <input
            type="text"
            name="nickname"
            placeholder="별명"
            maxLength={7}
            onChange={(e) => setNickname(e.target.value)}
            ref={numberRef}
          />
        </div>
        <StButton onClick={onClickEventHandler}>등록</StButton>
      </StBox>
    </>
  );
}

export default UserDataAdd;

const StBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 55vw;
  padding: 1em;
  border: 1px dashed black;
  div {
    width: 50vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0.5em;
    input {
      width: 30vw;
    }
  }
`;
const StButton = styled.button`
  width: 90%;
  margin: 0.5em;
  background-color: cyan;
`;
