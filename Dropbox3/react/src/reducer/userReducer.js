


const userReducer = (state = {
  isLoggedIn: false,
  firstname: '',
  lastname: '',
  username: '',
  password:'',
  token:'',
  contact:'',
  w1:'',
  w2:'',
  e1:'',
  e2:'',
  m1:'',
  m2:'',
  sh1:'',
  sh2:'',
  sp1:'',
  sp2:''

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
          firstname : action.payload.firstname,
          lastname : action.payload.lastname
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

    /*case "CHANGECON":
        state={
          ...state,
          contact: action.payload.contact
        };
        break;
    case "CHANGEW1":
      state={
          ...state,
          w1: action.payload.w1
        };
        break;
    case "CHANGEW2":
      state={
          ...state,
          w2: action.payload.w2
        };
        break;
    case "CHANGEE1":
        state={
          ...state,
          e1: action.payload.e1
        };
        break;
    case "CHANGEE2":
        state={
          ...state,
          e2: action.payload.e2
        };
        break;
    case "CHANGEM1":
        state={
          ...state,
          m1: action.payload.m1
        };
        break;
    case "CHANGEM2":
        state={
          ...state,
          m2: action.payload.m2
        };
        break;
    case "CHANGESH1":
        state={
          ...state,
          sh1: action.payload.sh1
        };
        break;
    case "CHANGESH2":
        state={
          ...state,
          sh2: action.payload.sh2
        };
        break;
    case "CHANGESP1":
        state={
          ...state,
          sp1: action.payload.sp1
        };
        break;
    case "CHANGESP2":
        state={
          ...state,
          sp2: action.payload.sp2
        };
        break;*/

    case 'CHANGEDATA':
       state={
         ...state,
         w1 : action.payload.data[0].Work,
         w2 : action.payload.data[1].Work,
         e1 : action.payload.data[0].Education,
         e2 : action.payload.data[1].Education,
         m1 : action.payload.data[0].Music,
         m2 : action.payload.data[1].Music,
         sh1: action.payload.data[0].Shows,
         sh2: action.payload.data[1].Shows,
         sp1: action.payload.data[0].Sports,
         sp2: action.payload.data[1].Sports
       };
       break;

    case "RESTORE":
        state={
          ...state,
          isLoggedIn: false,
          firstname: '',
          lastname: '',
          username: '',
          password:'',
          token:'',
          contact:'',
          w1:'',
          w2:'',
          e1:'',
          e2:'',
          m1:'',
          m2:'',
          sh1:'',
          sh2:'',
          sp1:'',
          sp2:''

        };
        break;
  }
    //localStorage.reduxStore = state;
  return state;
};

export default userReducer;
