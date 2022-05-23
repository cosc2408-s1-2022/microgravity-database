import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useReducer } from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExperimentPublication, ExperimentPublicationsResponse } from '../../../util/types';
import FormField from '../../FormField';
import LoadingButton from '../../LoadingButton';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SearchRounded } from '@mui/icons-material';
import publicationReducer from '../../../util/reducers/PublicationReducer/PublicationReducer';

interface formPropsInterface {
  id: number;
  data: ExperimentPublication;
  handlePublicationRemove: () => void;
  handlePublicationEdit: (data: ExperimentPublication) => void;
  errors?: Record<string, string> | undefined;
}

export default function PublicationForm(formProps: formPropsInterface) {
  const initialState: ExperimentPublication = {
    doi: '',
    title: '',
    journal: '',
    volumeNumber: '',
    issueNumber: '',
    journalDatabase: '',
    pagesUsed: '',
    url: '',
    accessDate: '',
    yearPublished: '',
    authors: [],
  };
  const [publication, dispatch] = useReducer(publicationReducer, formProps.data || initialState);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch({ type: 'MODIFY', payload: { ...publication, [event.target.name]: event.target.value } });
  };

  const handleClear = () => {
    dispatch({ type: 'MODIFY', payload: initialState });
  };

  const { data, mutate, isLoading } = useMutation<AxiosResponse<ExperimentPublicationsResponse>, AxiosError>(() => {
    return axios.get(`https://api.crossref.org/works/${publication.doi.toString()}`);
  });

  const handleFindDoi = async () => {
    mutate();
  };

  useEffect(() => {
    if (data) {
      const date = new Date(data?.data?.message?.created?.['date-time']);
      const convertedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      dispatch({
        type: 'MODIFY',
        payload: {
          doi: data?.data?.message?.DOI,
          title: data?.data?.message?.title[0] as string,
          journal: data?.data?.message?.['container-title'][0] as string,
          volumeNumber: data?.data?.message?.volume,
          issueNumber: data?.data?.message?.issue,
          journalDatabase: data?.data?.message?.publisher,
          pagesUsed: data?.data?.message?.page,
          url: data?.data?.message?.URL,
          accessDate: convertedDate,
          yearPublished: data?.data?.message?.issued?.['date-parts'][0][0] as string,
          authors: data?.data?.message?.author.map((author) => ({
            firstName: author.given,
            lastName: author.family,
          })),
        },
      });
    }
  }, [data]);

  useEffect(() => {
    formProps.handlePublicationEdit(publication);
  }, [formProps, publication]);

  return (
    <Accordion sx={{ p: 0 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
        <Grid item display='flex' flexGrow={1} alignItems='center'>
          <Typography>{formProps.data.title || 'Untitled Publication'}</Typography>
        </Grid>
        <Grid item display='flex' sm={1}>
          <IconButton onClick={formProps.handlePublicationRemove}>
            <RemoveCircleIcon />
          </IconButton>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid container item height='fit-content' xs={12} spacing={1} wrap='nowrap'>
            <Grid item display='flex' flexGrow={1}>
              <FormField
                name='doi'
                size='small'
                color='secondary'
                fullWidth
                label='DOI'
                value={publication.doi}
                handleChange={handleChange}
              />
            </Grid>
            <Grid item display='flex'>
              <LoadingButton
                loading={isLoading}
                variant='contained'
                color='secondary'
                size='small'
                onClick={handleFindDoi}
              >
                <SearchRounded />
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='title'
              size='small'
              color='secondary'
              fullWidth
              label='Title'
              value={publication.title}
              errors={formProps.errors}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='journal'
              size='small'
              color='secondary'
              fullWidth
              label='Journal'
              value={publication.journal}
              errors={formProps.errors}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='volumeNumber'
              size='small'
              color='secondary'
              fullWidth
              label='Volume Number'
              value={publication.volumeNumber}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='issueNumber'
              size='small'
              color='secondary'
              fullWidth
              label='Issue Number'
              value={publication.issueNumber}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='journalDatabase'
              size='small'
              color='secondary'
              fullWidth
              label='Journal Database'
              value={publication.journalDatabase}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='url'
              size='small'
              color='secondary'
              fullWidth
              label='URL'
              value={publication.url}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='accessDate'
              size='small'
              color='secondary'
              fullWidth
              label='Access Date'
              value={publication.accessDate}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='yearPublished'
              size='small'
              color='secondary'
              fullWidth
              label='Year Published'
              value={publication.yearPublished}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='pagesUsed'
              size='small'
              color='secondary'
              fullWidth
              label='Pages'
              value={publication.pagesUsed}
              handleChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              name='authors'
              size='small'
              color='secondary'
              fullWidth
              label='Authors'
              value={publication.authors?.map((author) => author.lastName[0] + '. ' + author.firstName).join(', ')}
            />
          </Grid>
        </Grid>
        <Button sx={{ mt: 2, width: '50%' }} variant='contained' onClick={handleClear}>
          Clear
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
