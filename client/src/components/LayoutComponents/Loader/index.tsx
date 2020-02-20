import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from "./styles";

const useStyles = makeStyles(styles);

interface LoaderProps {
  spinning: boolean
  fullScreen: boolean
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { spinning, fullScreen } = props
   const classes = useStyles();
  return (
    <div
      className={clsx(classes.loader, {
        [classes.hidden]: !spinning,
        [classes.fullScreen]: fullScreen,
      })}
    />
  )
}

export default Loader
