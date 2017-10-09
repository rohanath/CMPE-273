const persistReducer = (state = {
  
}, action) => {
  switch(action.type){
    /*case "UPDATE_STORE":
      state = {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        password: action.payload.pass,
        token: action.payload.token

      };
      break;*/
    case "CHANGELOG":
        state={
          ...state,
          isLoggedIn : true,
        };
        break;
    case "CHANGEUSER":
        state={
          ...state,
          username: action.payload.username
        };
        break;
    case "CHANGEPASS":
        state={
          ...state,
          password: action.payload.pass
        };
        break;
    case "SETTOKEN":
        state={
          ...state,
          token: action.payload.token
        };
        break;

  }
    //localStorage.reduxStore = state;
  return state;
};

export default userReducer;
