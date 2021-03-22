import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'

export default function Error({error}) {
  return (
    <Alert severity="error">
      <AlertTitle>System Error!</AlertTitle>
      {error.message}
    </Alert>
  )
}
