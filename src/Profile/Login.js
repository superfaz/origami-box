import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import classNames from 'classnames/dedupe';
import { updateLoginStatus } from "./reducer";

export function Login({ className = null, children, ...rest }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function handleClick() {
    window.FB.login(response => {
      dispatch(updateLoginStatus(response));
    });
  }

  return (
    <button className={classNames("btn btn-outline-primary", className)} onClick={handleClick} {...rest}>
      {!children &&
        <>
          <i className="fab fa-facebook me-2 float-start" style={{ marginLeft: '-.125em', fontSize: '1.5em' }}></i>
          <span>{t('profile.login')}</span>
        </>
      }
      {children}
    </button>
  );
}
