import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import styles from "./styles";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function Sidebar() {
  const classes = useStyles();
  const [open] = React.useState(false);

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/58bd011f55.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <div style={{marginBottom: '10px'}}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link key={1} to={'/managements/users'}>
          <ListItem className={clsx(classes.drawerListItem)} button key='user'>
            <ListItemIcon>{ <Icon className={clsx(classes.drawerIcon, "fa fa-user")} /> }</ListItemIcon>
            <ListItemText primary='User' />
          </ListItem>
        </Link>
        <Link key={2} to={'/managements/assignments'}>
          <ListItem className={clsx(classes.drawerListItem)} button key='assignment'>
            <ListItemIcon>{ <Icon className={clsx(classes.drawerIcon, "fa fa-book")} /> }</ListItemIcon>
            <ListItemText primary='Assignment' />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}
