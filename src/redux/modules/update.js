const USER_UPDATE = "update/USER_UPDATE";

export const userUpdate = (payload) => ({ type: USER_UPDATE, payload });

//initial state - 통 - store
const initialState = {
  isUpdate: false,
};

export default function updateReducer(state = initialState, { payload, type }) {
  switch (type) {
    case USER_UPDATE:
      return { ...state, isUpdate: payload };
    default:
      return state;
  }
}
