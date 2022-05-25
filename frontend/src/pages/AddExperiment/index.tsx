import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import AuthWrapper from '../../components/AuthWrapper';
import {
  Experiment,
  ExperimentPublicationAuthor,
  ForCode,
  Mission,
  PeopleReducerState,
  SeoCode,
  Toa,
} from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import ToaSelector from '../../components/Experiment/ToaSelector';
import MissionSelector from '../../components/Experiment/MissionSelector';
import ForCodeSelector from '../../components/Experiment/ForCodeSelector';
import SeoCodeSelector from '../../components/Experiment/SeoCodeSelector';
import PeopleForm from '../../components/Experiment/PeopleForm';
import { usePeopleReducer } from '../../util/hooks';
import { AttachFileRounded, DeleteOutlineRounded, PictureAsPdfRounded } from '@mui/icons-material';
import { ACCEPTED_ATTACHMENT_TYPES } from '../../util/constants';
import Captcha from '../../components/Captcha';
import publicationsReducer from '../../util/reducers/PublicationsReducer';
import PublicationsForm from '../../components/Experiment/PublicationsForm';

export default function AddExperiment() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>();
  const [leadInstitution, setLeadInstitution] = useState<string>();
  const [experimentAim, setExperimentAim] = useState<string>();
  const [experimentObjective, setExperimentObjective] = useState<string>();
  const [experimentAttachments, setExperimentAttachments] = useState<File[]>([]);
  const [toa, setToa] = useState<Toa | null>(null);
  const [mission, setMission] = useState<Mission | null>(null);
  const [forCode, setForCode] = useState<ForCode | null>(null);
  const [seoCode, setSeoCode] = useState<SeoCode | null>(null);
  const initialState: PeopleReducerState = { uid: 0, data: [] };
  const [peopleState, dispatchPeople] = usePeopleReducer(initialState);
  const [publicationsState, dispatchPublications] = useReducer(publicationsReducer, { uid: 0, data: [] });

  const {
    error: experimentError,
    isSuccess: isExperimentSuccess,
    isLoading: isExperimentLoading,
    isError: isExperimentError,
    mutate: mutateExperiment,
  } = useMutation<AxiosResponse<Experiment>, AxiosError>('addExperiment', () => {
    const formData = new FormData();
    title && formData.append('title', title);
    leadInstitution && formData.append('leadInstitution', leadInstitution);
    experimentAim && formData.append('experimentAim', experimentAim);
    for (const attachment of experimentAttachments) {
      formData.append('experimentAttachmentFiles[]', attachment);
    }
    experimentObjective && formData.append('experimentObjective', experimentObjective);
    toa && formData.append('toaId', toa.id.toString());
    mission && formData.append('missionId', mission.id.toString());
    forCode && formData.append('forCodeId', forCode.id.toString());
    seoCode && formData.append('seoCodeId', seoCode.id.toString());
    for (const i in peopleState.data) {
      Object.entries(peopleState.data[i].data).forEach(([key, value]) => {
        formData.append(`experimentPersonRequests[${i}].${key}`, value?.toString() || '');
      });
    }
    for (const i in publicationsState.data) {
      Object.entries(publicationsState.data[i].data).forEach(([key, value]) => {
        if (key === 'authors') {
          for (const j in value as ExperimentPublicationAuthor[]) {
            Object.entries(value[j]).forEach(([k, v]) => {
              v && formData.append(`experimentPublications[${i}].authors[${j}].${k}`, v?.toString() || '');
            });
          }
        } else {
          value && formData.append(`experimentPublications[${i}].${key}`, value?.toString() || '');
        }
      });
    }

    return api.post('/experiments/save', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file && ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
      setExperimentAttachments((prevState) => [...prevState, file]);
    }
  };

  const removeFile = (index: number) => {
    setExperimentAttachments((prevState) => prevState.filter((_, i) => i !== index));
  };

  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateExperiment();
  };

  useEffect(() => {
    if (isExperimentSuccess) {
      navigate('/home');
    }
  }, [isExperimentSuccess, navigate]);

  return (
    <AuthWrapper>
      <Container maxWidth='md'>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            width: 'auto',
            bgcolor: '#F7F5F8',
            p: 3,
            borderRadius: '16px',
          }}
        >
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h3' fontWeight='bold' sx={{ mt: 1, mb: 3 }}>
              Add Experiment
            </Typography>
          </Box>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField
                  autoFocus
                  label='Title'
                  name='title'
                  errors={experimentError?.response?.data}
                  onChange={setTitle}
                />
              </Grid>
              <Grid item xs={6}>
                <ToaSelector value={toa} dispatch={setToa} errors={experimentError?.response?.data} />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label='Lead Institution'
                  name='leadInstitution'
                  errors={experimentError?.response?.data}
                  onChange={setLeadInstitution}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Aim'
                  name='experimentAim'
                  errors={experimentError?.response?.data}
                  onChange={setExperimentAim}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Objective'
                  name='experimentObjective'
                  multiline
                  minRows={4}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentObjective}
                />
              </Grid>
              <Grid item xs={12}>
                <MissionSelector value={mission} dispatch={setMission} errors={experimentError?.response?.data} />
              </Grid>
              <Grid container item spacing={2} xs={12}>
                <Grid item xs={6}>
                  <ForCodeSelector value={forCode} dispatch={setForCode} errors={experimentError?.response?.data} />
                </Grid>
                <Grid item xs={6}>
                  <SeoCodeSelector value={seoCode} dispatch={setSeoCode} errors={experimentError?.response?.data} />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <PeopleForm state={peopleState} dispatch={dispatchPeople} errors={experimentError?.response?.data} />
              </Grid>
              <Grid item xs={12}>
                <PublicationsForm
                  state={publicationsState}
                  dispatch={dispatchPublications}
                  errors={experimentError?.response?.data}
                />
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{ width: '100%', border: '1px #c4c4c4 solid', display: 'flex', flexDirection: 'column' }}
                  variant='outlined'
                >
                  <Box display='flex' alignItems='center'>
                    <Typography sx={{ p: 1, pl: 1.5 }}>Experiment Attachments</Typography>
                    <label htmlFor='add-attachment'>
                      <input
                        style={{ display: 'none' }}
                        id='add-attachment'
                        name='add-attachment'
                        type='file'
                        accept={ACCEPTED_ATTACHMENT_TYPES.join(',')}
                        onChange={addFile}
                      />
                      <IconButton component='span'>
                        <AttachFileRounded />
                      </IconButton>
                    </label>
                  </Box>
                  {experimentAttachments.length > 0 && (
                    <Box display='flex' flexWrap='wrap' px={2}>
                      {experimentAttachments.map((file, index) =>
                        file.type.includes('image') ? (
                          <Box
                            m={2}
                            ml={0}
                            key={index}
                            sx={{ position: 'relative', width: '10rem', height: '12rem' }}
                            display='flex'
                            flexDirection='column'
                            justifyContent='flex-start'
                          >
                            <Paper
                              variant='outlined'
                              component='img'
                              sx={{
                                width: '10rem',
                                height: '10rem',
                                objectFit: 'cover',
                              }}
                              alt='Attachment Image'
                              src={URL.createObjectURL(file)}
                            />
                            <IconButton
                              size='small'
                              sx={{
                                position: 'absolute',
                                right: '0.5rem',
                                top: '0.5rem',
                                background: 'transparent',
                                backdropFilter: 'blur(4px) brightness(60%)',
                              }}
                              onClick={() => removeFile(index)}
                            >
                              <DeleteOutlineRounded color='secondary' />
                            </IconButton>
                            <Typography whiteSpace='nowrap' textOverflow='ellipsis' sx={{ overflow: 'hidden' }} py={1}>
                              {file.name}
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            m={2}
                            ml={0}
                            key={index}
                            sx={{ position: 'relative', width: '10rem', height: '12rem' }}
                            display='flex'
                            flexDirection='column'
                            justifyContent='flex-start'
                          >
                            <Paper
                              variant='outlined'
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '10rem',
                                height: '10rem',
                              }}
                            >
                              <PictureAsPdfRounded fontSize='large' color='secondary' />
                            </Paper>
                            <IconButton
                              sx={{
                                position: 'absolute',
                                right: '0.5rem',
                                top: '0.5rem',
                                background: 'transparent',
                                backdropFilter: 'blur(8px)',
                              }}
                              onClick={() => removeFile(index)}
                            >
                              <DeleteOutlineRounded color='secondary' />
                            </IconButton>
                            <Typography whiteSpace='nowrap' textOverflow='ellipsis' sx={{ overflow: 'hidden' }} py={1}>
                              {file.name}
                            </Typography>
                          </Box>
                        ),
                      )}
                    </Box>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} display='flex' flexDirection='column' alignItems='center'>
                <Captcha onComplete={setIsCaptchaComplete} />
              </Grid>
            </Grid>
            <LoadingButton
              disabled={!isCaptchaComplete}
              loading={isExperimentLoading}
              type='submit'
              variant='contained'
              color='secondary'
              sx={{ width: '50%', mt: 3, mb: 1 }}
            >
              Add Experiment
            </LoadingButton>
          </Box>
          <MessageSnackbar open={isExperimentError} message='Failed to add experiment.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
