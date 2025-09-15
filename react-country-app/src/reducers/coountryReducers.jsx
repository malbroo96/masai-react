export const initialState = { countries: [], loading: false, error: null };

export function countryReducer(state, action) {
  switch(action.type) {
    case "FETCH_START": return {...state, loading:true};
    case "FETCH_SUCCESS": return {...state, loading:false, countries: action.payload};
    case "FETCH_ERROR": return {...state, loading:false, error: action.payload};
    default: throw new Error("Invalid action type");
  }
}
