import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { __addUser, __updateUser } from "redux/modules/user";
import styled from "@emotion/styled";
import { userUpdate } from "redux/modules/update";
import UserDataAdd from "./UserDataAdd";

const UserDateInput = () => {
  const { isUpdate } = useSelector((state) => state.updateReducer);
  const { selectedUser } = useSelector((state) => state.userReducer);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const nameRef = useRef();
  const nicknameRef = useRef();
  const numberRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    nameRef.current.value = selectedUser.name;
    nicknameRef.current.value = selectedUser.nickname;
    numberRef.current.value = selectedUser.number;
    if (selectedUser.gender === "여자") {
      femaleRef.current.checked = true;
      setGender(femaleRef.current.value);
    } else {
      maleRef.current.checked = true;
      setGender(maleRef.current.value);
    }
    setName(nameRef.current.value);
    setNickname(nicknameRef.current.value);
    setNumber(numberRef.current.value);
  }, [selectedUser]);

  const onUpdateHandler = () => {
    // 유효성검사
    if (name === "" || nickname === "" || number.length === 0)
      alert("빈칸은 안됩니다.");
    else if (number.length !== 11) alert("제대로 된 전화번호를 적어주세요");
    else if (
      maleRef.current.checked === false &&
      femaleRef.current.checked === false
    )
      alert("성별을 선택해 주세요");
    else {
      dispatch(
        __updateUser({
          id: selectedUser.id,
          name: name,
          gender: gender,
          nickname: nickname,
          number: number,
        })
      );
      dispatch(userUpdate(false));
    }
  };
  return (
    <>
      {!isUpdate ? (
        <UserDataAdd />
      ) : (
        <StBox>
          <StInputContainer>
            <StFlexRow>
              <input
                type="radio"
                name="gender"
                value="남자"
                ref={maleRef}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>남자</span>
              <input
                type="radio"
                name="gender"
                value="여자"
                ref={femaleRef}
                onChange={(e) => setGender(e.target.value)}
              />
              <span>여자</span>
            </StFlexRow>
            <input
              type="text"
              placeholder="이름"
              maxLength={3}
              onChange={(e) => setName(e.target.value)}
              ref={nameRef}
            />
            <input
              type="text"
              placeholder="별명"
              maxLength={11}
              onChange={(e) => setNickname(e.target.value)}
              ref={nicknameRef}
            />
            <input
              type="tel"
              placeholder="전화번호"
              maxLength={11}
              onChange={(e) => setNumber(e.target.value)}
              ref={numberRef}
            />
          </StInputContainer>
          <StButtonContainer>
            <button onClick={onUpdateHandler}>수정하기</button>
          </StButtonContainer>
        </StBox>
      )}
    </>
  );
};

export default UserDateInput;

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

export const StInputContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  input {
    width: 80%;
    height: 20%;
    text-align: center;
    margin-left: 50px;
    outline: none;
  }
`;
export const StButtonContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 80%;
    height: 80%;
  }
`;

export const StFlexRow = styled.div`
  display: flex;
  input {
    margin: 0;
    height: 100%;
  }
  span {
    width: 100px;
  }
`;
