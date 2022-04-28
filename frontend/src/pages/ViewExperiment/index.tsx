import NavBar from '../../components/NavBar';
import React from 'react';
import {Experiment, } from '../../util/types';
import {Box, Grid, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {useQuery} from "react-query";
import {AxiosResponse} from "axios";
import api from "../../util/api";
import CircularProgress from "@mui/material/CircularProgress";

export default function ViewExperiment() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    const { data, isLoading } = useQuery<AxiosResponse<Experiment>>(
        ['experiment', id],
        ({ queryKey }) => {
            const [, id] = queryKey;
            return api.get('/experiments/get', {
                params: {id: id},
            });
        },
        { enabled: true },
    );

    let experimentElement;
    if(isLoading) {
        experimentElement = (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    } else if (data && data?.data) {
        const experiment: Experiment = data.data;
        experimentElement = (
            <Grid container direction='column' alignContent='center' wrap='nowrap' my={3}>
                <Typography variant='h3' textAlign='center'>{experiment.title}</Typography>
                <Typography>{experiment.experimentPublications}</Typography>
                <Typography>{experiment.leadInstitution}</Typography>
                <Grid container item spacing={2}>
                    {experiment.people.map((person) => (
                        <Grid item key={person.person.id}>
                            <Typography>
                                {`${person.person.familyName[0]}. ${person.person.firstName}`}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <Typography>Aim: {experiment.experimentAim}</Typography>
                <Typography>{experiment.experimentObjective}</Typography>
                <Typography>{experiment.principalInvestigator}</Typography>
            </Grid>
        );
    }

  return (
    <Grid container justifyContent='center'>
      <NavBar />
        {experimentElement}
    </Grid>
  );
}
