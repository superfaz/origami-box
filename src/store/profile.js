const initialState = { status: 'unknown' };

export function updateLoginStatus(response) {
  if (process.env.REACT_APP_FACEBOOK_DEBUG) {
    console.log('login response', response);
  }

  if (!response.authResponse) {
    // User is not connected
    return notConnected();
  }
  else {
    // User is connected
    return (dispatch) => {
      // Set the basic info
      dispatch(connected(response.authResponse.accessToken, response.authResponse.userID));

      // Retrieve the user name
      window.FB.api('/me', response => {
        if (process.env.REACT_APP_FACEBOOK_DEBUG) {
          console.log('/me', response);
        }

        dispatch(setName(response.name));
      });

      // Retrieve the user miniature
      window.FB.api('/me/picture', 'GET', { redirect: false, height: 40 }, response => {
        if (process.env.REACT_APP_FACEBOOK_DEBUG) {
          console.log('/me/picture', response);
        }

        dispatch(setPicture(response.data.url));
      });
    }
  }
}

export function logout() {
  return (dispatch) => {
    window.FB.logout(response => {
      if (process.env.REACT_APP_FACEBOOK_DEBUG) {
        console.log('logout', response);
      }

      dispatch(notConnected());
    });
  }
}

export function notConnected() {
  return {
    type: 'NOT_CONNECTED',
  };
}

export function connected(accessToken, userId) {
  return {
    type: 'CONNECTED',
    payload: { accessToken, userId },
  }
}

export function setName(name) {
  return {
    type: 'SET_NAME',
    payload: { name },
  };
}

export function setPicture(picture) {
  return {
    type: 'SET_PICTURE',
    payload: { picture },
  };
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'NOT_CONNECTED': {
      return {
        ...initialState,
        status: 'not-connected'
      };
    }

    case 'CONNECTED': {
      const { accessToken, userId } = action.payload;
      return {
        ...state,
        status: 'connected',
        accessToken,
        userId,
      };
    }

    case 'SET_NAME': {
      const { name } = action.payload;
      const status = name && state.picture ? 'initialized' : state.status;

      return {
        ...state,
        status,
        name,
      };
    }

    case 'SET_PICTURE': {
      const { picture } = action.payload;
      const status = state.name && picture ? 'initialized' : state.status;

      return {
        ...state,
        status,
        picture,
      };
    }

    default: {
      return state;
    }
  }
}
