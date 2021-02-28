import React, { useEffect, useState } from 'react';

export const FacebookContext = React.createContext();

export function FacebookProvider({ children }) {
  const [state, setState] = useState({ isInitialized: false });
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APPID;

  useEffect(() => {

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v10.0'
      });

      window.FB.AppEvents.logPageView();

      window.FB.getLoginStatus(response => {
        console.log('Facebook SDK initialized');
        console.log(response);
        setState({ isInitialized: true });
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
    <FacebookContext.Provider value={state}>
      {children}
    </FacebookContext.Provider>
  );
}
