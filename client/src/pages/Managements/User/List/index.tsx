import React from 'react';
import { FETCH_LIST } from 'redux/users/actions';
import { connect } from 'react-redux';
import { get, flowRight } from 'lodash';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton,
  Button,
  Box,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import { deleteUser } from 'services/user';
import { ConfirmationDialog } from 'components/GuardComponents/Modal/Confirmation';
import { withSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { ROLES } from 'models/user';
import { Add, Edit, Delete } from '@material-ui/icons';
import styles from './styles';

class Index extends React.Component<any> {
  state: any = {
    filters: {
      page: 1,
      per_page: 50,
    },
    userWillBeDeleted: null,
  };
  columns: any[] = [
    {
      title: 'Name',
      render: ({ attributes: { name } }: any) => name,
    },
    {
      title: 'Email',
      render: ({ attributes: { email } }: any) => email,
    },
    { title: 'Role', render: ({ attributes: { role } }: any) => ROLES[role] },
  ];
  componentDidMount() {
    this.props.dispatch({
      type: FETCH_LIST,
      payload: { filters: this.state.filters },
    });
  }
  goToPage(page: number) {
    this.setState(
      (state: any) => update(state, { filters: { page: { $set: page } } }),
      () =>
        this.props.dispatch({
          type: FETCH_LIST,
          payload: { filters: this.state.filters },
        }),
    );
  }
  handleDelete = async ({ attributes: { id } }: any) => {
    try {
      const result = await deleteUser(id);
      const message = get(result, 'data.message');
      this.props.enqueueSnackbar(message, {
        variant: 'success',
      });
      this.componentDidMount();
    } catch (e) {
      this.props.enqueueSnackbar('Can not delete user. Please try again or contact for assistance', {
        variant: 'error',
      });
    } finally {
      this.setState({ userWillBeDeleted: null });
    }
  };
  handleCloseDeleteModal = (isOk: boolean) => {
    return isOk ? this.handleDelete(this.state.userWillBeDeleted) : this.setState({ userWillBeDeleted: null });
  };

  handleSearchChange = (e: any) => {
    this.setState({ filters: { ...this.state.filters, search: e.target.value } });
  };
  handleSearchSubmit = () => {
    this.props.dispatch({
      type: FETCH_LIST,
      payload: { filters: this.state.filters },
    });
  };
  handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      this.handleSearchSubmit();
    }
  };

  render() {
    const {
      list: { data, meta, loading },
      classes,
    } = this.props;
    const {
      filters: { page, per_page },
      userWillBeDeleted,
    } = this.state;

    const loadingForm = () => {
      if (loading)
        return (
          <TableRow>
            <TableCell colSpan={5} align="center">
              LOADING
            </TableCell>
          </TableRow>
        );

      if (data.length === 0)
        return (
          <TableRow>
            <TableCell colSpan={5} align="center">
              NOT FOUND
            </TableCell>
          </TableRow>
        );
    };

    return (
      <>
        <Typography variant="h4" component="h4">
          Users
        </Typography>
        <Box my={3}>
          <Link to="/managements/users/create">
            <Button variant="contained" color="primary" startIcon={<Add />}>
              Create
            </Button>
          </Link>
        </Box>
        <Paper>
          <div className={classes.tableWrapper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {this.columns.map((column: any, idx: number) => (
                    <TableCell key={idx} align="left" variant="head">
                      {column.title}
                    </TableCell>
                  ))}
                  <TableCell align="center" variant="head">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user: any, idx: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {this.columns.map((column: any, columnIdx: number) => {
                        return (
                          <TableCell key={columnIdx} align="left">
                            {column.render(user)}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <Link to={`/managements/users/${user.attributes.id}/edit`}>
                          <IconButton aria-label="edit">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Link>
                        <IconButton aria-label="delete" onClick={() => this.setState({ userWillBeDeleted: user })}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {loadingForm()}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={get(meta, 'pager.total') || 0}
            rowsPerPage={per_page || 0}
            page={page - 1}
            onChangePage={(_, page) => this.goToPage(page + 1)}
          />
        </Paper>
        {userWillBeDeleted && (
          <ConfirmationDialog
            content="Are you sure you want to delete user?"
            open
            onClose={this.handleCloseDeleteModal}
          />
        )}
      </>
    );
  }
}
const enhance = flowRight([
  connect((state: any) => ({ list: state.users.list })),
  withStyles(styles),
  withSnackbar,
]);

export default enhance(Index);
