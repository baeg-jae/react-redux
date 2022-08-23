import { useDispatch } from "react-redux";
import { __deleteUser } from "redux/modules/user";

const UserDateDelete = ({ id }) => {
  const dispatch = useDispatch();
  const onDeleteHandler = () => {
    dispatch(__deleteUser({ id }));
  };
  return (
    <>
      <button onClick={onDeleteHandler}>삭제</button>
    </>
  );
};

export default UserDateDelete;
