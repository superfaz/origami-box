import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { notConnected, updateLoginStatus } from "../store/profile";

export function FacebookProvider({ children }) {
  const dispatch = useDispatch();
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APPID;

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookAppId,
        cookie: true,
        xfbml: true,
        version: "v10.0",
      });

      window.FB.getLoginStatus((response) => {
        console.log("Facebook SDK initialized");

        if (response.authResponse) {
          dispatch(updateLoginStatus(response));
        } else {
          dispatch(notConnected());
        }
      });
    };

    // load facebook sdk script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });

  return <>{children}</>;
}
