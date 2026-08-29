import { Button, type ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function LoadingButton({
  isLoading,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <Button disabled {...props}>
        <Spinner data-icon="inline-start" />
        Enviando...
      </Button>
    );
  }

  return <Button {...props} />;
}
