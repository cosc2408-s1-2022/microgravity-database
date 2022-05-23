import { Box, IconButton, Paper, Typography } from '@mui/material';
import * as React from 'react';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PublicationForm from './PublicationForm';
import { ExperimentPublicationEntry } from '../../util/types';

interface PublicationsPropsInterface {
  publicationsState: {
    uid: number;
    data: ExperimentPublicationEntry[];
  };
  dispatchPublications: React.Dispatch<{ type: string; payload: ExperimentPublicationEntry }>;
  errors?: Record<string, string> | undefined;
}

export default function AddPublications(publicationsProps: PublicationsPropsInterface) {
  const { publicationsState, dispatchPublications, errors } = publicationsProps;

  return (
    <Paper sx={{ width: '100%', mt: 2, border: '1px #c4c4c4 solid' }} variant='outlined'>
      <Box display='flex' alignItems='center'>
        <Typography sx={{ p: 1, pl: 1.5 }}>Add Publications</Typography>
        <IconButton
          onClick={() => {
            dispatchPublications({
              type: 'ADD',
              payload: {
                id: publicationsState.uid,
                data: {
                  doi: '',
                  authors: [],
                  yearPublished: '',
                  title: '',
                  journal: '',
                  volumeNumber: '',
                  issueNumber: '',
                  pagesUsed: '',
                  journalDatabase: '',
                  url: '',
                  accessDate: '',
                },
              },
            });
          }}
        >
          <LibraryAddIcon />
        </IconButton>
      </Box>
      {publicationsState.data.map((entry) => {
        const newErrors = Object.fromEntries(
          Object.entries(errors || {})
            // Filter out errors only for this specific publication entry
            .filter(([key]) => new RegExp(`experimentPublications\\[${entry.id}].*`).test(key))
            // Edit key to only contain the field receiving the error
            .map(([key, value]) => [key.split('.').at(-1), value]),
        );
        return (
          <PublicationForm
            key={entry.id}
            id={entry.id}
            data={entry.data}
            errors={newErrors}
            handlePublicationRemove={() => {
              dispatchPublications({
                type: 'REMOVE',
                payload: { id: entry.id, data: entry.data },
              });
            }}
            handlePublicationEdit={(data) => {
              dispatchPublications({
                type: 'MODIFY',
                payload: { id: entry.id, data: data },
              });
            }}
          />
        );
      })}
    </Paper>
  );
}
