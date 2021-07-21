  const initialState = {
    dogs: [],
    dogsDetail: [],
    temperaments: [],
  };

  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_DOGS":
        return {
          ...state,
          dogs: action.payload,
        };
      case "GET_DOG_DETAIL":
        return {
          ...state,
          dogsDetail: action.payload,
        };
      case "GET_TEMPERAMENTS":
        return {
          ...state,
          temperaments: action.payload,
        };

      case "ASC":
        return {
          ...state,
          dogs: state.dogs
            .filter((b) => b.name !== null)
            .sort((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            ),
        };

      case "DESC":
        return {
          ...state,
          dogs: state.dogs
            .filter((b) => b.name !== null)
            .sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
            ),
        };
      case "MINMAX":
        return {
          ...state,
          dogs: state.dogs
            .filter((b) => b.weight !== null)
            .sort((a, b) => (a.weight < b.weight ? 1 : -1)),
        };
      case "MAXMIN":
        return {
          ...state,
          dogs: state.dogs
            .filter((b) => b.weight !== null)
            .sort((a, b) => (a.weight > b.weight ? 1 : -1)),
        };
      case "DB":
        return {
          ...state,
          dogs: state.dogs
            .filter((b) => b.id.length > 6)
            .sort((a, b) => (a.id > b.id ? 1 : -1)),
        };
      case "API":
        return {
          ...state,
          dogs: state.dogs.filter((b) => b.id < 500),
        };
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "FILTER":
        return {
          ...state,
          filtereddogs: action.payload,
        };

      default:
        return state;
    }
  }
