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
  Attachment,
  Author,
  ForCode,
  Mission,
  PeopleReducerState,
  PublicationsReducerState,
  SeoCode,
  Toa,
  UserRole,
  Subsystem,
  TestSubjectType,
  Area,
  Activity,
} from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import PublicationsForm from '../../components/PublicationsForm';
import { ACCEPTED_ATTACHMENT_TYPES } from '../../util/constants';
import { AttachFileRounded, DeleteOutlineRounded, PictureAsPdfRounded } from '@mui/icons-material';
import PeopleForm from '../../components/PeopleForm';
import { usePeopleReducer, usePublicationsReducer } from '../../util/hooks';
import Captcha from '../../components/Captcha';
import AutocompleteSelector from '../../components/AutocompleteSelector';
import moment from 'moment';

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

  const [title, setTitle] = useState<string | undefined>(experiment.title);
  const [leadInstitution, setLeadInstitution] = useState<string | undefined>(experiment.leadInstitution);
  const [mission, setMission] = useState<Mission | null>(experiment.mission);
  const [experimentObjectives, setExperimentObjectives] = useState<string | undefined>(experiment.experimentObjectives);
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
  const [peopleState, dispatchPeople] = usePeopleReducer(initialPeopleState);
  uid = 0;
  const initialPublicationState: PublicationsReducerState = {
    uid: 0,
    data: experiment?.publications.map((publication) => ({
      id: uid++,
      data: { ...publication },
    })),
  };
  initialPublicationState.uid = uid;
  const [publicationsState, dispatchPublications] = usePublicationsReducer(initialPublicationState);
  const [experimentAttachments, setExperimentAttachments] = useState<Attachment[]>(experiment.attachments);
  const [newExperimentAttachments, setNewExperimentAttachments] = useState<File[]>([]);
  const [activity, setActivity] = useState<Activity | null>(experiment.activity);

  // Scientific Research
  const [toa, setToa] = useState<Toa | null>(experiment?.toa || null);
  const [forCode, setForCode] = useState<ForCode | null>(experiment?.forCode || null);
  const [seoCode, setSeoCode] = useState<SeoCode | null>(experiment?.seoCode || null);

  // Industry
  const [spacecraft, setSpacecraft] = useState<string | undefined>(experiment.spacecraft);
  const [subsystem, setSubsystem] = useState<Subsystem | null>(experiment?.subsystem || null);
  const [payload, setPayload] = useState<string | undefined>(experiment.payload);

  // Human Spaceflight
  const [testSubjectCount, setTestSubjectCount] = useState<number | undefined>(experiment.testSubjectCount);
  const [area, setArea] = useState<Area | null>(experiment?.area || null);
  const [testSubjectType, setTestSubjectType] = useState<TestSubjectType | null>(experiment?.testSubjectType || null);

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
    mission && formData.append('missionId', mission.id.toString());
    leadInstitution && formData.append('leadInstitution', leadInstitution);
    experimentObjectives && formData.append('experimentObjectives', experimentObjectives);
    activity && formData.append('activityId', activity.id.toString());

    // Scientific Research
    toa && formData.append('toaId', toa.id.toString());
    forCode && formData.append('forCodeId', forCode.id.toString());
    seoCode && formData.append('seoCodeId', seoCode.id.toString());

    // Industry
    spacecraft && formData.append('spacecraft', spacecraft);
    subsystem && formData.append('subsystemId', subsystem.id.toString());
    payload && formData.append('payload', payload);

    // Human Spaceflight
    testSubjectCount && formData.append('testSubjectCount', testSubjectCount.toString());
    area && formData.append('areaId', area.id.toString());
    testSubjectType && formData.append('testSubjectTypeId', testSubjectType.id.toString());

    for (const i in peopleState.data) {
      Object.entries(peopleState.data[i].data).forEach(([key, value]) => {
        value && formData.append(`personRequests[${i}].${key}`, value.toString());
      });
    }

    for (const i in publicationsState.data) {
      Object.entries(publicationsState.data[i].data).forEach(([key, value]) => {
        if (key === 'authors') {
          for (const j in value as Author[]) {
            Object.entries(value[j]).forEach(([k, v]) => {
              v && formData.append(`publications[${i}].authors[${j}].${k}`, v.toString());
            });
          }
        } else {
          value && formData.append(`publications[${i}].${key}`, value.toString());
        }
      });
    }

    for (const id of experimentAttachments.map((attachment) => attachment.id.toString())) {
      formData.append('attachmentIds[]', id);
    }
    for (const file of newExperimentAttachments) {
      formData.append('attachmentFiles[]', file);
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

  useEffect(() => {
    if (experimentError?.response?.data) {
      experimentError.response.data.toaId = '';
      experimentError.response.data.forCodeId = '';
      experimentError.response.data.seoCodeId = '';

      experimentError.response.data.spacecraft = '';
      experimentError.response.data.subsystemId = '';
      experimentError.response.data.payload = '';

      experimentError.response.data.testSubjectCount = '';
      experimentError.response.data.areaId = '';
      experimentError.response.data.testSubjectTypeId = '';
    }
  }, [experimentError, activity]);

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
                <FormField
                  label='Lead Institution'
                  name='leadInstitution'
                  value={leadInstitution || ''}
                  errors={experimentError?.response?.data}
                  onChange={setLeadInstitution}
                />
              </Grid>
              <Grid item xs={6}>
                <AutocompleteSelector<Mission>
                  name='missionId'
                  label='Mission'
                  value={mission}
                  dispatch={setMission}
                  errors={experimentError?.response?.data}
                  queryKey='getAllMissions'
                  queryFn={() => api.get('/missions')}
                  matchFn={(option) => `${option.name} (${moment(option.launchDate).year()})`}
                  equalityFn={(option, value) => option.id === value.id}
                  noOptionsComponent={
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography variant='body1' flexGrow={1}>
                        No such missions found.
                      </Typography>
                      <Button
                        variant='contained'
                        color='secondary'
                        href='/addMission'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        Add new?
                      </Button>
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Objectives'
                  name='experimentObjectives'
                  value={experimentObjectives || ''}
                  multiline
                  minRows={4}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentObjectives}
                />
              </Grid>
              <Grid item xs={12}>
                <AutocompleteSelector<Activity>
                  name='activityId'
                  label='Activity'
                  value={activity}
                  dispatch={setActivity}
                  errors={experimentError?.response?.data}
                  queryKey='getAllActivities'
                  queryFn={() => api.get('/activities')}
                  matchFn={(option) => option.name}
                  equalityFn={(option, value) => option.id === value.id}
                />
              </Grid>
              {activity &&
                (activity.name === 'Scientific Research' ? (
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <AutocompleteSelector<Toa>
                        name='toaId'
                        label='Type of Activity (ToA)'
                        value={toa}
                        dispatch={setToa}
                        errors={experimentError?.response?.data}
                        queryKey='getAllToas'
                        queryFn={() => api.get('/toas')}
                        matchFn={(option) => option.name}
                        equalityFn={(option, value) => option.id === value.id}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteSelector<ForCode>
                        name='forCodeId'
                        label='Field of Research (FoR)'
                        value={forCode}
                        dispatch={setForCode}
                        errors={experimentError?.response?.data}
                        queryKey='getAllForCodes'
                        queryFn={() => api.get('/forCodes')}
                        matchFn={(option) => `${option.code} ${option.name}`}
                        equalityFn={(option, value) => option.id === value.id}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteSelector<SeoCode>
                        name='seoCodeId'
                        label='Socio-Economic Objective (SEO)'
                        value={seoCode}
                        dispatch={setSeoCode}
                        errors={experimentError?.response?.data}
                        queryKey='getAllSeoCodes'
                        queryFn={() => api.get('/seoCodes')}
                        matchFn={(option) => `${option.code} ${option.name}`}
                        equalityFn={(option, value) => option.id === value.id}
                      />
                    </Grid>
                  </Grid>
                ) : activity.name === 'Industry' ? (
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <FormField
                        label='Spacecraft'
                        name='spacecraft'
                        value={spacecraft || ''}
                        required
                        errors={experimentError?.response?.data}
                        onChange={setSpacecraft}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteSelector<Subsystem>
                        name='subsystemId'
                        label='Subsystem'
                        value={subsystem}
                        dispatch={setSubsystem}
                        errors={experimentError?.response?.data}
                        queryKey='getAllSubsystems'
                        queryFn={() => api.get('/subsystems')}
                        matchFn={(option) => option.name}
                        equalityFn={(option, value) => option.id === value.id}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        label='Payload'
                        name='payload'
                        value={payload || ''}
                        required
                        errors={experimentError?.response?.data}
                        onChange={setPayload}
                      />
                    </Grid>
                  </Grid>
                ) : activity.name === 'Human Spaceflight' ? (
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <FormField
                        label='Number of Test Subjects'
                        name='testSubjectCount'
                        type='number'
                        value={testSubjectCount?.toString() || ''}
                        required
                        errors={experimentError?.response?.data}
                        onChange={(value) => {
                          const numericValue = Number(value);
                          if (numericValue) setTestSubjectCount(numericValue);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteSelector<Area>
                        name='areaId'
                        label='Area'
                        value={area}
                        dispatch={setArea}
                        errors={experimentError?.response?.data}
                        queryKey='getAllAreas'
                        queryFn={() => api.get('/areas')}
                        matchFn={(option) => option.name}
                        equalityFn={(option, value) => option.id === value.id}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <AutocompleteSelector<TestSubjectType>
                        name='testSubjectTypeId'
                        label='Test Subject Type'
                        value={testSubjectType}
                        dispatch={setTestSubjectType}
                        errors={experimentError?.response?.data}
                        queryKey='getAllTestSubjectTypes'
                        queryFn={() => api.get('/testSubjectTypes')}
                        matchFn={(option) => option.name}
                        equalityFn={(option, value) => option.id === value.id}
                      />
                    </Grid>
                  </Grid>
                ) : undefined)}
              <Grid item xs={12}>
                <PeopleForm state={peopleState} dispatch={dispatchPeople} />
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
                    <Typography sx={{ p: 1, pl: 1.5 }}>Add Attachments</Typography>
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
              <Grid item xs={12} display='flex' justifyContent='center'>
                <Box display='flex' alignItems='center' mt={3} width='100%'>
                  <LoadingButton
                    sx={{ mr: 2 }}
                    disabled={!isCaptchaComplete}
                    loading={isExperimentLoading}
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='secondary'
                  >
                    Save Changes
                  </LoadingButton>
                  <Button fullWidth sx={{ backgroundColor: 'gray' }} variant='contained' onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <MessageSnackbar open={isExperimentError} message='Failed to save experiment.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
