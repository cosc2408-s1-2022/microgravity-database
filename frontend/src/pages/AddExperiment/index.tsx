import { Box, Button, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import AuthWrapper from '../../components/AuthWrapper';
import {
  Experiment,
  Author,
  ForCode,
  Mission,
  SeoCode,
  Toa,
  Subsystem,
  Area,
  TestSubjectType,
  Activity,
} from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import PeopleForm from '../../components/PeopleForm';
import { usePeopleReducer, usePublicationsReducer } from '../../util/hooks';
import { AttachFileRounded, DeleteOutlineRounded, PictureAsPdfRounded } from '@mui/icons-material';
import { ACCEPTED_ATTACHMENT_TYPES } from '../../util/constants';
import Captcha from '../../components/Captcha';
import PublicationsForm from '../../components/PublicationsForm';
import AutocompleteSelector from '../../components/AutocompleteSelector';
import moment from 'moment';
import CodeSelector from '../../components/CodeSelector';

export default function AddExperiment() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>();
  const [leadInstitution, setLeadInstitution] = useState<string>();
  const [mission, setMission] = useState<Mission | null>(null);
  const [experimentObjectives, setExperimentObjectives] = useState<string>();
  const [peopleState, dispatchPeople] = usePeopleReducer({ uid: 0, data: [] });
  const [publicationsState, dispatchPublications] = usePublicationsReducer({ uid: 0, data: [] });
  const [experimentAttachments, setExperimentAttachments] = useState<File[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);

  // Scientific Research
  const [toa, setToa] = useState<Toa | null>(null);
  const [forCode, setForCode] = useState<ForCode | null>(null);
  const [seoCode, setSeoCode] = useState<SeoCode | null>(null);

  // Industry
  const [spacecraft, setSpacecraft] = useState<string>();
  const [subsystem, setSubsystem] = useState<Subsystem | null>(null);
  const [payload, setPayload] = useState<string>();

  // Human Spaceflight
  const [testSubjectCount, setTestSubjectCount] = useState<number>();
  const [area, setArea] = useState<Area | null>(null);
  const [testSubjectType, setTestSubjectType] = useState<TestSubjectType | null>(null);

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
    mission && formData.append('missionId', mission.id.toString());
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
        formData.append(`personRequests[${i}].${key}`, value?.toString() || '');
      });
    }

    for (const i in publicationsState.data) {
      Object.entries(publicationsState.data[i].data).forEach(([key, value]) => {
        if (key === 'authors') {
          for (const j in value as Author[]) {
            Object.entries(value[j]).forEach(([k, v]) => {
              v && formData.append(`publications[${i}].authors[${j}].${k}`, v?.toString() || '');
            });
          }
        } else {
          value && formData.append(`publications[${i}].${key}`, value?.toString() || '');
        }
      });
    }

    for (const attachment of experimentAttachments) {
      formData.append('attachmentFiles[]', attachment);
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
                  required
                  errors={experimentError?.response?.data}
                  onChange={setTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Lead Institution'
                  name='leadInstitution'
                  required
                  errors={experimentError?.response?.data}
                  onChange={setLeadInstitution}
                />
              </Grid>
              <Grid item xs={12}>
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
                      <CodeSelector<ForCode>
                        name='forCodeId'
                        label='Field of Research (FoR)'
                        value={forCode}
                        dispatch={setForCode}
                        errors={experimentError?.response?.data}
                        queryKey='getAllForCodes'
                        queryFn={() => api.get('/forCodes')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CodeSelector<SeoCode>
                        name='seoCodeId'
                        label='Socio-Economic Objective (SEO)'
                        value={seoCode}
                        dispatch={setSeoCode}
                        errors={experimentError?.response?.data}
                        queryKey='getAllSeoCodes'
                        queryFn={() => api.get('/seoCodes')}
                      />
                    </Grid>
                  </Grid>
                ) : activity.name === 'Industry' ? (
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <FormField
                        label='Spacecraft'
                        name='spacecraft'
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
