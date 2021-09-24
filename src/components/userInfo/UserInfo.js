import Modal from "../../UI/modal/Modal";

const UserInfo = () => {
  return (
    <Modal>
      <div>
        <div className="avatar__container">
          <span>avtar</span>
        </div>
        <div className="userInfo__container">
          <span>NickName</span>
          <span>state message</span>
          <span>email</span>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfo;
