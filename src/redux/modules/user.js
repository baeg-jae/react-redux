import axios from "axios";

//액션타입 - choise reducer
const GET_USER = "user/GET_USER";
const GET_USER_SELECTED = "user/GET_USER_SELECTED";
const ADD_USER = "user/ADD_USER";
const DELETE_USER = "user/DELETE_USER";
const UPDATE_USER = "user/UPDATE_USER";

//액션함수 - 리듀서에 뭐할지 알려주는애
const getUser = (payload) => ({ type: GET_USER, payload });
const getSelectedUser = (payload) => ({ type: GET_USER, payload });
const addUser = (payload) => ({ type: ADD_USER, payload });
const deleteUser = (payload) => ({ type: DELETE_USER, payload });
const updateUser = (payload) => ({ type: UPDATE_USER, payload });

//청크 함수 - 서버랑 노는애
export const __getUser = () => async (dispatch) => {
  const data = await axios.get("http://localhost:3001/user");
  dispatch(getUser(data.data));
};

export const __getSelectedUser = (payload) => async (dispatch) => {
  const data = await axios.get(`http://localhost:3001/user/${payload.id}`);
  dispatch(getSelectedUser(data.data));
};

export const __addUser = (payload) => async (dispatch) => {
  const data = await axios.post("http://localhost:3001/user", payload);
  dispatch(addUser(data.data));
};

export const __deleteUser = (payload) => async (dispatch, getState) => {
  const userId = getState().userReducer.users.findIndex((v) => {
    return v.id === payload.id;
  });
  // 서버에 있는걸 지운다(db.json)
  await axios.delete(
    `http://localhost:3001/user/${payload.id}`,
    payload.userId
  );
  //화면에 있는걸 지운다
  dispatch(deleteUser(userId));
};

export const __updateUser = (payload) => async (dispatch, getState) => {
  const updateToUser = {
    ...payload,
    done: !payload.done,
  };
  const { data } = await axios.put(
    `http://localhost:3001/user/${payload.id}`,
    updateToUser
  );
  dispatch(updateUser(data));
};

//initial state - 통 - store
const initialState = {
  users: [],
  selectedUser: {},
};

//reducer - initialState에 접근해서 바꿔주는 친구
export default function userReducer(state = initialState, { payload, type }) {
  console.log(payload);
  switch (type) {
    case GET_USER:
      return { ...state, users: [...payload] };
    case GET_USER_SELECTED:
      return { ...state, selectedUser: payload };
    case ADD_USER:
      return { ...state, users: [...state.users, payload] };
    case UPDATE_USER:
      const newUpdateState = state.users.map((v, i) => {
        return i === payload.userId
          ? {
              id: payload.id,
              name: payload.name,
              gender: payload.gender,
              nickname: payload.nickname,
              number: payload.number,
            }
          : v;
      });
      return { state, users: [...newUpdateState] };
    case DELETE_USER:
      const newDeleteState = state.users.filter((_, i) => {
        return i === payload ? false : true;
      });
      return { ...state, users: [...newDeleteState] };
    default:
      return state;
  }
}
