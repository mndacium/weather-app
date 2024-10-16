import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}

export function BaseBlock({ title, children }: React.PropsWithChildren<Props>) {
  return (
    <Stack
      border="1px solid"
      borderRadius="0.5rem"
      borderColor="GrayText"
      p="1.5rem"
    >
      <Typography variant="h5" fontWeight="500" mb="1.5rem">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}
