import { ExperimentPublication } from '../../types';

const publicationReducer = (state: ExperimentPublication, action: { type: string; payload: ExperimentPublication }) => {
  switch (action.type) {
    case 'MODIFY': {
      return action.payload;
    }
    default: return state;
  }
};

export default publicationReducer;
