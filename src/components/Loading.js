import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core'

export default function Loading() {
  return (
    <Grid container direction="column" alignItems="center">
      <CircularProgress>
        <span className="sr-only">Loading...</span>
      </CircularProgress>
    </Grid>
  )
}
