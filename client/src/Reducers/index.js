  const initialState = {
    dogs: [],
    dogsDetail: [],
    temperaments: [],
  };
  
  export default function rootReducer(state = initialState, action) {
      switch(action.type){
          case "GET_DOGS":
              return {
                  ...state,
                  dogs: action.payload
              }
            case "GET_DOG_DETAIL":
                return {
                    ...state,
                    dogsDetail: action.payload
                }
            case "GET_TEMPERAMENTS":
                return {
                    ...state,
                    temperaments: action.payload
                }
            default:
                return state;
      }
    }
