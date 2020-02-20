import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ProfileMenu from 'components/GuardComponents/ProfileMenu'
import styles from "./styles";

const useStyles = makeStyles(styles);

export default function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar 
        position="fixed" 
        className={clsx(classes.appBar)}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            G
          </Typography>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <ProfileMenu />
            </div>
          </Toolbar>
          <Button color="inherit">Kevin</Button>
        </Toolbar>
      </AppBar>
     </React.Fragment>
  );
}
