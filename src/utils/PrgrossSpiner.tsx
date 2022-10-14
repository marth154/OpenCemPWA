// mui
import styled from "@emotion/styled";
import { CircularProgress, Grid, Paper, useTheme } from "@mui/material";
import React from "react";

// ----------------------------------------------------------------------

interface ProgressSpinnerProps {
  spinnerSize?: number;
  minHeight?: string;
}

// ----------------------------------------------------------------------

/**
 *
 * @return {JSX.Element}
 */
export default function ProgressSpinner({
  minHeight = "75vh",
  spinnerSize = 40,
}: ProgressSpinnerProps) {
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight, backgroundColor: theme.palette.grey[100] }}
    >
      <Grid item xs={1} alignSelf="center" justifySelf="center">
        <Item sx={{ backgroundColor: theme.palette.grey[100] }}>
          <CircularProgress size={spinnerSize} />
        </Item>
      </Grid>
    </Grid>
  );
}

export const Item = styled(Paper)(({ theme }: any) => ({
    padding: 1,
    textAlign: "center",
    color: "#637381",
  }));
  