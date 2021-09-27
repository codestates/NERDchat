import React from "react";
import "./LoginTab.scss";

const LoginTab = ({ isLoginClicked, loginTablHandler }) => {
  return (
    <>
      <div className="modal__tab__container">
        <div className="tab__header">
          {isLoginClicked && (
            <h3 className="tab__header-h3">
              <span className="tab__header-span">NERDchat</span>
            </h3>
          )}
          {!isLoginClicked && (
            <h3 className="tab__header-h3">
              <span className="tab__header-span">NERDchat</span>
            </h3>
          )}
        </div>
        <div className="modal__tab">
          <div
            className={
              isLoginClicked
                ? "modal__tab__options clicked__tab"
                : "modal__tab__options"
            }
            onClick={() => loginTablHandler(1)}
          >
            Login
          </div>
          <div
            className={
              isLoginClicked
                ? "modal__tab__options"
                : "modal__tab__options clicked__tab"
            }
            onClick={() => loginTablHandler(0)}
          >
            Sign Up
          </div>
        </div>
        <div className="modal__tab__split" />
      </div>
    </>
  );
};

export default LoginTab;
