import { menuBg } from 'resources/variables'

const drawerWidth = 240;
const iconColor = '#b8cec7';
const iconSize = '1.9em !important';

const sidebarStyle = (theme: any) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap' as 'nowrap',
    '& a': {
      textDecoration: 'none' as 'none'
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden' as 'hidden',
    backgroundColor: menuBg,
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  drawerIcon: {
    color: iconColor,
    fontSize: iconSize,
    width: '1.6em',
  },
  drawerListItem: {
    paddingTop: '15px',
    paddingBottom: '15px'
  }
})

export default sidebarStyle
