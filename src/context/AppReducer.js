export default (state, action) => {
  switch (action.type) {
    case "GET_PASSENGERS":
      return {
        ...state,
        loading: false,
        passengers: action.payload
      };
    case "PASSENGER_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
