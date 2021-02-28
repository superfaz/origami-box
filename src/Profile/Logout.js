import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "./reducer";

export function Logout({ className, ...rest }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <button className={className ?? "btn btn-primary"} {...rest}
      onClick={handleLogout}>
      <i className="fas fa-sign-out-alt me-2"></i>
      <span>{t('profile.logout')}</span>
    </button>
  );
}
