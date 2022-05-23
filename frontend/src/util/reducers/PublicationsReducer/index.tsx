import { ExperimentPublicationEntry } from '../../types';

const publicationsReducer = (
  state: { uid: number; data: ExperimentPublicationEntry[] },
  action: { type: string; payload: ExperimentPublicationEntry },
) => {
  switch (action.type) {
    case 'ADD': {
      return { uid: state.uid + 1, data: [...state.data, action.payload] };
    }
    case 'REMOVE': {
      return {
        uid: --state.uid, data: state.data.filter((entry) => entry.id !== action.payload.id)
      };
    }
    case 'MODIFY': {
      return {
        uid: state.uid,
        data: state.data.map((entry) => {
          if (entry.id === action.payload.id) return action.payload;

          return entry;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export default publicationsReducer;
