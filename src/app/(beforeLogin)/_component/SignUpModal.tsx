"use client";

import style from "./signup.module.css";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function SignupModal() {
  const [signUp, setSignUp] = useState({
    id: "",
    password: "",
    nickname: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File>();

  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setSignUp({
      ...signUp,
      [name]: value,
    });
  };

  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImageFile(e.target.files[0]);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:9090/api/users", {
      method: "post",
      body: JSON.stringify(signUp),
      credentials: "include",
    })
      .then((response: Response) => {
        console.log(response.status);
        if (response.status === 200) {
          router.replace("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <button className={style.closeButton} onClick={onClickClose}>
              <svg
                width={24}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
              >
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button>
            <div>계정을 생성하세요.</div>
          </div>
          <form>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder=""
                  value={signUp.id}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  className={style.input}
                  type="text"
                  placeholder=""
                  value={signUp.nickname}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  className={style.input}
                  type="password"
                  placeholder=""
                  value={signUp.password}
                  onChange={onChangeHandler}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton} disabled>
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
