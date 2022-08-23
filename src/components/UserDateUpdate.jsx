import { useDispatch } from "react-redux";
import { userUpdate } from "redux/modules/update";
import { __getSelectedUser } from "redux/modules/user";

const UserDateUpdate = ({ id }) => {
  const dispatch = useDispatch();
  const onUpdateHandler = () => {
    dispatch(userUpdate(true));
    dispatch(__getSelectedUser({ id }));
  };
  return (
    <>
      <button onClick={onUpdateHandler}>수정</button>
    </>
  );
};

export default UserDateUpdate;
