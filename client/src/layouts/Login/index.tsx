import React from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import styles from "./styles";

const useStyles = makeStyles(styles);

interface ProfileProps {
  children: any
}

function LoginLayout(props: any) {
  const classes = useStyles();
  const { children } = props

  return (
    <div className={clsx(classes.layout)}>
      <div className={clsx(classes.content)}>{children}</div>
    </div>
  );
}

export default withRouter(LoginLayout)
