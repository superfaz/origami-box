import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from "../store/profile";

export function Login({
  className = null,
  onClick = () => {},
  children,
  ...rest
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleClick() {
    window.FB.login((response) => {
      dispatch(updateLoginStatus(response));
      onClick();
    });
  }

  return (
    <button
      className={className || "btn btn-outline-primary"}
      onClick={handleClick}
      {...rest}
    >
      {!children && (
        <>
          <i
            className="fab fa-facebook me-2 float-start"
            style={{ marginLeft: "-.125em", fontSize: "1.5em" }}
          ></i>
          <span>{t("profile.login")}</span>
        </>
      )}
      {children}
    </button>
  );
}
