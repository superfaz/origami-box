import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/dedupe';

export const FacebookContext = React.createContext({ user: {}, setUser: () => { } });

function manageLoginStatus(response, setUser) {
  if (process.env.REACT_APP_FACEBOOK_DEBUG) {
    console.log('login response', response);
  }

  if (response.authResponse) {
    // User is authenticated
    setUser({
      accessToken: response.accessToken,
      userId: response.userID,
    });

    window.FB.api('/me', profileResponse => {
      if (process.env.REACT_APP_FACEBOOK_DEBUG) {
        console.log('/me', profileResponse);
      }

      setUser({
        accessToken: response.accessToken,
        userId: response.userID,
        name: profileResponse.name,
      });
    });
  } else {
    // User is not authenticated
    setUser({});
  }
}

export function FacebookProvider({ children }) {
  const [user, setUser] = useState({});
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APPID;

  useEffect(() => {

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v10.0'
      });

      window.FB.getLoginStatus(response => {
        console.log('Facebook SDK initialized');
        manageLoginStatus(response, setUser);
      });
    };
  }, [facebookAppId]);

  // load facebook sdk script
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  return (
    <FacebookContext.Provider value={{ user, setUser }}>
      {children}
    </FacebookContext.Provider>
  );
}

export function Login({ className = null, ...rest }) {
  const { setUser } = useContext(FacebookContext);

  function handleClick() {
    window.FB.login(function (response) {
      manageLoginStatus(response, setUser);
    });
  }

  return (
    <button className={classNames("btn btn-outline-primary", className)} onClick={handleClick} {...rest}>
      <i className="fab fa-facebook me-2 float-start" style={{ marginLeft: '-.125em', fontSize: '1.5em' }}></i>
      Login with Facebook
    </button>
  );
}
