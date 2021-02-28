import { useDispatch } from "react-redux";
import classNames from 'classnames';
import { connected } from "./reducer";

export function Login({ className = null, children, ...rest }) {
  const dispatch = useDispatch();

  function handleClick() {
    window.FB.login(function (response) {
      dispatch(connected(response));
    });
  }

  return (
    <button className={classNames("btn btn-outline-primary", className)} onClick={handleClick} {...rest}>
      {!children &&
        <>
          <i className="fab fa-facebook me-2 float-start" style={{ marginLeft: '-.125em', fontSize: '1.5em' }}></i>
          <span>Login with Facebook</span>
        </>
      }
      {children}
    </button>
  );
}
