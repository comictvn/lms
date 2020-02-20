import React from 'react';
import { withRouter } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from 'components/LayoutComponents/Sidebar'
import Header from 'components/LayoutComponents/Header'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from "./styles";

const useStyles = makeStyles(styles);

interface ProfileProps {
  children: any
}

function MainLayout(props: any) {
  const classes = useStyles(); 
  const { children } = props

  return (
    <div className={clsx('App')}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <main className={clsx(classes.content)}>{children}</main>
    </div>
  )
}

export default withRouter(MainLayout)
