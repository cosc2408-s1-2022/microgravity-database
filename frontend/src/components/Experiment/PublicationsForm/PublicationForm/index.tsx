import {
  DeleteRounded,
  ExpandMoreRounded,
  PersonAddAlt1Rounded,
  PersonRemoveAlt1Rounded,
  SearchRounded,
} from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  ExperimentPublication,
  ExperimentPublicationAuthor,
  ExperimentPublicationEntry,
  ExperimentPublicationResponse,
} from '../../../../util/types';
import FormField from '../../../FormField';
import LoadingButton from '../../../LoadingButton';
import MessageSnackbar from '../../../MessageSnackbar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

interface PublicationItemProps {
  index: number;
  entry: ExperimentPublicationEntry;
  onRemove: (entry: ExperimentPublicationEntry) => void;
  onModify: (entry: ExperimentPublicationEntry) => void;
  errors?: Record<string, string> | undefined;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)({
  boxShadow: 'none',
  borderRadius: '4px',
  border: 0,
  '&:not(:last-child)': {
    borderBottom: '1px solid #c4c4c4',
  },
  '&:before': {
    display: 'none',
  },
});

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #c4c4c4',
  backgroundColor: '#f7f5f8',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export default function PublicationForm({ index, entry, onModify, onRemove, errors }: PublicationItemProps) {
  const initialPublicationState: ExperimentPublication = {
    title: '',
    authors: [],
  };
  const [publication, setPublication] = useState<ExperimentPublication>(entry.data);

  const {
    data: queryData,
    refetch,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<AxiosResponse<ExperimentPublicationResponse>, AxiosError>(
    ['doiQuery', entry.data.doi],
    ({ queryKey }) => {
      const [, doi] = queryKey;
      return axios.get(`https://api.crossref.org/works/${doi}`);
    },
    { enabled: false },
  );

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPublication({
      ...publication,
      [event.target.name.substring(event.target.name.indexOf('.') + 1)]: event.target.value,
    });
  };

  const handleClear = () => {
    setPublication(initialPublicationState);
  };

  useEffect(() => {
    if (isSuccess && queryData) {
      const data = queryData?.data;
      const date = new Date(queryData?.data?.message?.created?.['date-time']);
      const convertedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

      setPublication({
        doi: data?.message?.DOI,
        title: data?.message?.title[0] as string,
        journal: data?.message?.['container-title'][0] as string,
        volumeNumber: data?.message?.volume,
        issueNumber: data?.message?.issue,
        journalDatabase: data?.message?.publisher,
        pagesUsed: data?.message?.page,
        url: data?.message?.URL,
        accessDate: convertedDate,
        yearPublished: data?.message?.issued?.['date-parts'][0][0] as string,
        authors: data?.message?.author.map((author) => ({
          firstName: author.given,
          lastName: author.family,
        })),
      });
    }
  }, [isSuccess, queryData]);

  const defaultAuthor = {
    firstName: '',
    lastName: '',
  };
  const addAuthor = () => {
    setPublication({
      ...publication,
      authors: [...publication.authors, defaultAuthor],
    });
  };
  const removeAuthor = (index: number) => {
    const newAuthors = [...publication.authors];
    newAuthors.splice(index, 1);
    setPublication({ ...publication, authors: newAuthors });
  };
  const modifyAuthor = (index: number, author: ExperimentPublicationAuthor) => {
    const newAuthors = [...publication.authors];
    newAuthors[index] = author;
    setPublication({ ...publication, authors: newAuthors });
  };

  useEffect(() => {
    onModify({ id: entry.id, data: publication });
  }, [entry.id, onModify, publication]);

  return (
    <Accordion sx={{ my: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Grid item display='flex' flexGrow={1} alignItems='center'>
          <Typography>{`[${index + 1}]. ${publication.title || 'Untitled'}`}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => onRemove(entry)}>
            <DeleteRounded />
          </IconButton>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid container item height='fit-content' xs={12} spacing={1} wrap='nowrap'>
            <Grid item display='flex' flexGrow={1}>
              <FormField
                name={`experimentPublications[${index}].doi`}
                size='small'
                color='secondary'
                fullWidth
                label='DOI'
                value={publication.doi || ''}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item display='flex'>
              <LoadingButton
                loading={isLoading}
                variant='contained'
                color='secondary'
                size='small'
                onClick={() => refetch()}
              >
                <SearchRounded />
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormField
              name={`experimentPublications[${index}].title`}
              size='small'
              color='secondary'
              fullWidth
              label='Title'
              value={publication.title || ''}
              errors={errors}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].journal`}
              size='small'
              color='secondary'
              fullWidth
              label='Journal'
              value={publication.journal || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].volumeNumber`}
              size='small'
              color='secondary'
              fullWidth
              label='Volume Number'
              value={publication.volumeNumber || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].issueNumber`}
              size='small'
              color='secondary'
              fullWidth
              label='Issue Number'
              value={publication.issueNumber || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].journalDatabase`}
              size='small'
              color='secondary'
              fullWidth
              label='Journal Database'
              value={publication.journalDatabase || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].url`}
              size='small'
              color='secondary'
              fullWidth
              label='URL'
              value={publication.url || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].accessDate`}
              size='small'
              color='secondary'
              fullWidth
              label='Access Date'
              value={publication.accessDate || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].yearPublished`}
              size='small'
              color='secondary'
              fullWidth
              label='Year Published'
              value={publication.yearPublished || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name={`experimentPublications[${index}].pagesUsed`}
              size='small'
              color='secondary'
              fullWidth
              label='Pages'
              value={publication.pagesUsed || ''}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: '100%', border: '1px #c4c4c4 solid' }} variant='outlined'>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ p: 1, pl: 1.5 }}>Authors</Typography>
                <IconButton onClick={addAuthor}>
                  <PersonAddAlt1Rounded />
                </IconButton>
              </Box>
              {publication.authors.map((author, index) => (
                <Grid container key={index}>
                  <Grid item xs={5.5} sx={{ p: 1 }}>
                    <FormField
                      name={`experimentPublications[${index}].authors[${index}].firstName`}
                      size='small'
                      color='secondary'
                      fullWidth
                      label='First Name'
                      value={author.firstName}
                      errors={errors}
                      handleChange={(e) => {
                        modifyAuthor(index, { ...author, firstName: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={5.5} sx={{ p: 1, pr: 0 }}>
                    <FormField
                      name={`experimentPublications[${index}].authors[${index}].lastName`}
                      size='small'
                      color='secondary'
                      fullWidth
                      label='Last Name'
                      value={author.lastName}
                      errors={errors}
                      handleChange={(e) => {
                        modifyAuthor(index, { ...author, lastName: e.target.value });
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Box sx={{ mt: 1 }} display='flex' justifyContent='center'>
                      <IconButton onClick={() => removeAuthor(index)}>
                        <PersonRemoveAlt1Rounded />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button sx={{ width: '25%' }} variant='contained' onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
        <MessageSnackbar message='Could not retrieve DOI details. Please try again.' open={isError} severity='error' />
        <MessageSnackbar message='Form pre-filled with DOI details.' open={isSuccess} severity='success' />
      </AccordionDetails>
    </Accordion>
  );
}
