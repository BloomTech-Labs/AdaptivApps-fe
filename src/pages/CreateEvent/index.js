import React, { useReducer } from 'react';
import EventCreationForm from './EventCreationForm';

// Set up reducer and context
const initialState = { activities: [] };
const ADD_ACTIVITY = 'ADD_ACTIVITY';

function reducer(state, action) {
  switch (action.type) {
    case ADD_ACTIVITY:
      return { activities: [...state.activities, action.payload] };
    default:
      return state;
  }
}

export const MyContext = React.createContext(null);

export default function CreateEvent() {
  const [activitiesList, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={[activitiesList, dispatch]}>
      <div>
        <EventCreationForm />
      </div>
    </MyContext.Provider>
  );
}
