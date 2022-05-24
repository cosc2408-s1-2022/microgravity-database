import { LibraryAdd } from '@mui/icons-material';
import { Box, IconButton, Paper, TextFieldProps, Typography } from '@mui/material';
import { useCallback } from 'react';
import { ExperimentPublicationEntry } from '../../../util/types';
import PublicationForm from './PublicationForm';

type PublicationsProps = Omit<TextFieldProps, 'onChange'> & {
  state: { uid: number; data: ExperimentPublicationEntry[] };
  dispatch: React.Dispatch<{
    type: string;
    payload: ExperimentPublicationEntry;
  }>;
  errors?: Record<string, string> | undefined;
};

export default function PublicationsForm({ state, dispatch, errors }: PublicationsProps) {
  const addPublication = () => {
    dispatch({
      type: 'ADD',
      payload: {
        id: state.uid,
        data: {
          title: '',
          authors: [],
        },
      },
    });
  };
  const removePublication = useCallback(
    (entry: ExperimentPublicationEntry) => {
      dispatch({
        type: 'REMOVE',
        payload: { id: entry.id, data: entry.data },
      });
    },
    [dispatch],
  );
  const modifyPublication = useCallback(
    (entry: ExperimentPublicationEntry) => {
      dispatch({
        type: 'MODIFY',
        payload: { id: entry.id, data: entry.data },
      });
    },
    [dispatch],
  );

  return (
    <Paper sx={{ width: '100%', border: '1px #c4c4c4 solid' }} variant='outlined'>
      <Box display='flex' alignItems='center'>
        <Typography sx={{ p: 1, pl: 1.5 }}>Add Publications</Typography>
        <IconButton onClick={addPublication}>
          <LibraryAdd />
        </IconButton>
      </Box>
      {state.data.map((entry, index) => (
        <PublicationForm
          key={entry.id}
          index={index}
          entry={entry}
          errors={errors}
          onRemove={removePublication}
          onModify={modifyPublication}
        />
      ))}
    </Paper>
  );
}
