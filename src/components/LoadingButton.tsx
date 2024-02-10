import { Button, ButtonProps, CircularProgress } from '@mui/material';

type LoadingButtonProps = ButtonProps & {
  isLoading: boolean;
};

/**
 * `LoadingButton` displays a loading icon when the loading prop is set to true.
 * @param {LoadingButtonProps} props - Props for `LoadingButton` component.
 * @returns
 */
export function LoadingButton(props: LoadingButtonProps) {
  const { isLoading, children, disabled, ...rootProps } = props;

  return (
    <Button {...rootProps} disabled={disabled || isLoading}>
      {isLoading ? <CircularProgress size={24} sx={{ mx: 2.4 }} /> : children}
    </Button>
  );
}
