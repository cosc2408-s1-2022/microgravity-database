import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ViewMission() {
  const id = useParams().id as unknown as number;
  console.log(id);
  return (
    <>
      <Container maxWidth='lg'></Container>
    </>
  );
}
