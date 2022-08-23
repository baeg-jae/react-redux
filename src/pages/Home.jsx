import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import UserDataAdd from "../components/UserDataAdd";
import { __getUser } from "../redux/modules/user";
import UserDataShow from "components/UserDataShow";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUser());
  }, [dispatch]);

  return (
    <StWrap>
      <UserDataAdd />
      <StLine />

      <UserDataShow />
    </StWrap>
  );
};

export default Home;

const StWrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
`;

const StLine = styled.div`
  width: 35%;
  height: 1px;
  margin-top: 2rem;
  border: 1px solid #d5d5d5;
`;
