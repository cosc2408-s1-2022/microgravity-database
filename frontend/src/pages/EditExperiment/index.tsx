import { Box, Button, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api, { BACKEND_URL } from '../../util/api';
import AuthWrapper from '../../components/AuthWrapper';
import {
  Experiment,
  ExperimentAttachment,
  ForCode,
  Mission,
  PeopleReducerState,
  SeoCode,
  Toa,
  UserRole,
} from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import publicationsReducer from '../../util/reducers/PublicationsReducer';
import PublicationsForm from '../../components/Experiment/PublicationsForm';
import { ACCEPTED_ATTACHMENT_TYPES } from '../../util/constants';
import { AttachFileRounded, DeleteOutlineRounded, PictureAsPdfRounded } from '@mui/icons-material';
import ToaSelector from '../../components/Experiment/ToaSelector';
import ForCodeSelector from '../../components/Experiment/ForCodeSelector';
import MissionSelector from '../../components/Experiment/MissionSelector';
import SeoCodeSelector from '../../components/Experiment/SeoCodeSelector';
import PeopleSelector from '../../components/Experiment/PeopleSelector';
import { usePeopleReducer } from '../../util/hooks';
import Captcha from '../../components/Captcha';

export default function EditExperiment() {
  const navigate = useNavigate();
  const location = useLocation();
  const experiment = location.state as Experiment;
  if (!experiment) {
    navigate('/', {
      state: {
        isError: true,
        message: 'Experiment could not be found.',
      },
    });
  }

  const [title, setTitle] = useState<string | undefined>(experiment?.title);
  const [leadInstitution, setLeadInstitution] = useState<string | undefined>(experiment?.leadInstitution);
  const [experimentAim, setExperimentAim] = useState<string | undefined>(experiment?.experimentAim);
  const [experimentObjective, setExperimentObjective] = useState<string | undefined>(experiment?.experimentObjective);
  const [experimentPublications, setExperimentPublications] = useState<string | undefined>(
    experiment?.experimentPublications,
  );
  const [experimentAttachments, setExperimentAttachments] = useState<ExperimentAttachment[]>(
    experiment.experimentAttachments,
  );
  const [newExperimentAttachments, setNewExperimentAttachments] = useState<File[]>([]);
  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file && ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
      setNewExperimentAttachments((prevState) => [...prevState, file]);
    }
  };
  const removeFile = (index: number) => {
    setNewExperimentAttachments((prevState) => prevState.filter((_, i) => i !== index));
  };
  const removeAttachment = (id: number) => {
    setExperimentAttachments((prevState) => prevState.filter((attachment) => attachment.id !== id));
  };
  const [toa, setToa] = useState<Toa | null>(experiment?.toa || null);
  const [mission, setMission] = useState<Mission | null>(experiment?.mission || null);
  const [forCode, setForCode] = useState<ForCode | null>(experiment?.forCode || null);
  const [seoCode, setSeoCode] = useState<SeoCode | null>(experiment?.seoCode || null);

  let uid = 0;
  const initialPeopleState: PeopleReducerState = {
    uid: 0,
    data: experiment?.people.map((person) => ({
      id: uid++,
      data: {
        roleId: person.role.id,
        personId: person.id.personId,
      },
    })),
  };
  initialPeopleState.uid = uid;
  const [peopleState, dispatchPeople] = usePeopleReducer(initialState);

  uid = 0;
  const initialPublicationState = {
    uid: 0,
    data: experiment?.experimentPublications.map((publication) => ({
      id: uid++,
      data: { ...publication },
    })),
  };
  initialPublicationState.uid = uid;
  const [publicationsState, dispatchPublications] = useReducer(publicationsReducer, initialPublicationState);

  const {
    error: experimentError,
    isSuccess: isExperimentSuccess,
    isLoading: isExperimentLoading,
    isError: isExperimentError,
    mutate: mutateExperiment,
  } = useMutation<AxiosResponse<Experiment>, AxiosError>('saveExperiment', () => {
    const formData = new FormData();
    formData.append('id', experiment.id.toString());
    title && formData.append('title', title);
    leadInstitution && formData.append('leadInstitution', leadInstitution);
    experimentAim && formData.append('experimentAim', experimentAim);
    for (const id of experimentAttachments.map((attachment) => attachment.id.toString())) {
      formData.append('experimentAttachmentIds[]', id);
    }
    for (const file of newExperimentAttachments) {
      formData.append('experimentAttachmentFiles[]', file);
    }
    experimentObjective && formData.append('experimentObjective', experimentObjective);
    experimentPublications && formData.append('experimentPublications', JSON.stringify(publicationsState.data.map((entry) => entry.data)));
    toa && formData.append('toaId', toa.id.toString());
    mission && formData.append('missionId', mission.id.toString());
    forCode && formData.append('forCodeId', forCode.id.toString());
    seoCode && formData.append('seoCodeId', seoCode.id.toString());
    for (const i in peopleState.data) {
      formData.append(`experimentPersonRequests[${i}].personId`, JSON.stringify(peopleState.data[i].data.personId));
      formData.append(`experimentPersonRequests[${i}].roleId`, JSON.stringify(peopleState.data[i].data.roleId));
    }

    return api.post('/experiments/save', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  });

  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutateExperiment();
  };

  useEffect(() => {
    if (isExperimentSuccess) {
      navigate(-1);
    }
  }, [isExperimentSuccess, navigate]);

  return (
    <AuthWrapper role={UserRole.ROLE_ADMIN}>
      <Container maxWidth='md' sx={{ mb: 3 }}>
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
              Edit Experiment
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
                  label='Title'
                  name='title'
                  value={title || ''}
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
                  value={leadInstitution || ''}
                  errors={experimentError?.response?.data}
                  onChange={setLeadInstitution}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Aim'
                  name='experimentAim'
                  value={experimentAim || ''}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentAim}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Objective'
                  name='experimentObjective'
                  value={experimentObjective || ''}
                  multiline
                  minRows={4}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentObjective}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Publications'
                  name='experimentPublications'
                  value={experimentPublications || ''}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentPublications}
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
                <PeopleSelector state={peopleState} dispatch={dispatchPeople} />
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
                  {(experimentAttachments.length > 0 || newExperimentAttachments.length > 0) && (
                    <Box display='flex' flexWrap='wrap' px={2}>
                      {experimentAttachments.map((attachment) =>
                        attachment.mediaType.includes('image') ? (
                          <Box
                            m={2}
                            ml={0}
                            key={attachment.id}
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
                              src={`${BACKEND_URL}/images/${attachment.filename}`}
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
                              onClick={() => removeAttachment(attachment.id)}
                            >
                              <DeleteOutlineRounded color='secondary' />
                            </IconButton>
                            <Typography whiteSpace='nowrap' textOverflow='ellipsis' sx={{ overflow: 'hidden' }} py={1}>
                              {`${attachment.filename.substring(attachment.filename.indexOf('DT') + 2)}`}
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            m={2}
                            ml={0}
                            key={attachment.id}
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
                              onClick={() => removeAttachment(attachment.id)}
                            >
                              <DeleteOutlineRounded color='secondary' />
                            </IconButton>
                            <Typography whiteSpace='nowrap' textOverflow='ellipsis' sx={{ overflow: 'hidden' }} py={1}>
                              {`${attachment.filename.substring(attachment.filename.indexOf('DT') + 2)}`}
                            </Typography>
                          </Box>
                        ),
                      )}
                      {newExperimentAttachments.map((file, index) =>
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
          </Box>
          <Box display='flex' alignItems='center' mt={3}>
            <LoadingButton
              sx={{ mr: 2 }}
              disabled={!isCaptchaComplete}
              loading={isExperimentLoading}
              onClick={handleSubmit}
              variant='contained'
              color='secondary'
            >
              Save Changes
            </LoadingButton>
            <Button sx={{ backgroundColor: 'gray' }} variant='contained' onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
          <MessageSnackbar open={isExperimentError} message='Failed to save experiment.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
