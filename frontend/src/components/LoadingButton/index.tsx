import { Button, ButtonProps, CircularProgress } from '@mui/material';

/**
 * A wrapper around {@link Button} for handling the loading state.
 */
function LoadingButton({ loading, ...rest }: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...rest}>
      {loading ? <CircularProgress size={24} color='secondary' /> : rest.children}
    </Button>
  );
}

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export default LoadingButton;
