const initialState = {};

export function connected(response) {
  if (process.env.REACT_APP_FACEBOOK_DEBUG) {
    console.log('login response', response);
  }

  if (!response.authResponse) {
    // User is not connected
    return reset();
  }
  else {
    // User is connected
    return (dispatch) => {
      // Set the access token
      dispatch(setField('accessToken', response.authResponse.accessToken));
      dispatch(setField('userId', response.authResponse.userID));

      // Retrieve the user id
      window.FB.api('/me', response => {
        if (process.env.REACT_APP_FACEBOOK_DEBUG) {
          console.log('/me', response);
        }

        dispatch(setField('name', response.name));
      });

      // Retrieve the user miniature
      window.FB.api('/me/picture', 'GET', { redirect: false, height: 40 }, response => {
        if (process.env.REACT_APP_FACEBOOK_DEBUG) {
          console.log('/me/picture', response);
        }

        dispatch(setField('picture', response.data.url));
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

      dispatch(reset());
    });
  }
}

export function reset() {
  return {
    type: 'RESET',
  };
}

export function setField(name, value) {
  return {
    type: 'SET_FIELD',
    payload: { name, value },
  };
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESET': {
      return initialState;
    }

    case 'SET_FIELD': {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      }
    }

    default: {
      return state;
    }
  }
}
