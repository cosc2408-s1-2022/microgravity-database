import { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import * as React from 'react';
import FormField from '../FormField';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ExperimentPublications } from '../../util/types';

export default function ExperimentsPublication() {
  const [doi, setDoi] = useState('');
  const [manualButton, setManualButton] = useState(true);
  const [doiButton, setDoiButton] = useState(true);
  const [manualForm, setManualForm] = useState(false);
  const [doiForm, setDoiForm] = useState(false);

  const [doiDoi, setDoiDoi] = useState('');
  const [doiTitle, setDoiTitle] = useState('');
  const [doiJournal, setDoiJournal] = useState('');
  const [doiVolumeNumber, setDoiVolumeNumber] = useState('');
  const [doiIssueNumber, setDoiIssueNumber] = useState('');
  const [doiJournalDatabase, setDoiJournalDatabase] = useState('');
  const [doiUrl, setDoiUrl] = useState('');
  const [doiAccessDate, setDoiAccessDate] = useState('');
  const [doiYearPublished, setDoiYearPublished] = useState('');
  const [doiAuthors, setDoiAuthors] = useState('');

  const handleSetManual = () => {
    setManualButton(false);
    setManualForm(true);
  };
  const handleSetDoi = () => {
    setDoiButton(false);
    setDoiForm(true);
  };
  const { data, isError, isSuccess, mutate } = useMutation<AxiosResponse<ExperimentPublications>, AxiosError>(() => {
    return axios.get(`https://api.crossref.org/works/${doi.toString()}`);
  });

  const handleFindDoi = async () => {
    mutate();
    if (isSuccess && data) {
      setDoiForm(false);
      setDoiDoi(data?.data?.message?.DOI);
      setDoiTitle(data?.data?.message?.title);
      setDoiJournal(data?.data?.message?.journal);
    }
  };

  console.log("DOI" + doiDoi);
  console.log("title" + doiTitle);
  console.log("journal" + doiJournal);
  console.log(data?.data?.message);



  return (
    <>
      <Grid container alignContent='space-between' alignItems='center'>
        <Grid item sx={{ ml: 1 }}>
          <Typography>Experiment Publications</Typography>
        </Grid>
        {manualButton && doiButton ? (
          <>
            <Grid item sx={{ ml: 1 }}>
              <Button variant='contained' color='secondary' sx={{}} onClick={handleSetDoi}>
                Enter DOI
              </Button>
            </Grid>
            <Grid item sx={{ ml: 1 }}>
              <Button variant='contained' color='secondary' sx={{}} onClick={handleSetManual}>
                Enter Manually
              </Button>
            </Grid>
          </>
        ) : undefined}
      </Grid>
      {manualForm ? (
        <>
          <Typography> manual FORM</Typography>{' '}
        </>
      ) : undefined}
      {doiForm ? (
        <>
          <FormField
            autoFocus
            label='DOI Name'
            placeholder='Type or paste the DOI Name :'
            name='DOI'
            onChange={setDoi}
          />
          {isError ? <Typography>DOI Not Found Try Again</Typography> : undefined}
          <Button variant='contained' color='secondary' sx={{}} onClick={handleFindDoi}>
            Search For DOI
          </Button>
        </>
      ) : undefined}
    </>
  );
}
