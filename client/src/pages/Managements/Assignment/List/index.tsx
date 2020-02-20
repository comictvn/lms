import React from 'react';
import { FETCH_LIST } from 'redux/assignments/actions';
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
import { deleteAssignment } from 'services/assignment';
import { ConfirmationDialog } from 'components/GuardComponents/Modal/Confirmation';
import { withSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { Add, Edit, Delete } from '@material-ui/icons';
import styles from './styles';

class Index extends React.Component<any> {
  state: any = {
    filters: {
      page: 1,
      per_page: 50,
    },
    assignmentWillBeDeleted: null,
  };
  columns: any[] = [
    {
      title: 'Name',
      render: ({ attributes: { name } }: any) => name,
    },
    {
      title: 'Description',
      render: ({ attributes: { description } }: any) => description,
    },
    {
      title: 'Questions',
      render: ({ attributes: { total_questions } }: any) => total_questions,
    },
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
      const result = await deleteAssignment(id);
      const message = get(result, 'data.message');
      this.props.enqueueSnackbar(message, {
        variant: 'success',
      });
      this.componentDidMount();
    } catch (e) {
      this.props.enqueueSnackbar('Can not delete assignment. Please try again or contact for assistance', {
        variant: 'error',
      });
    } finally {
      this.setState({ assignmentWillBeDeleted: null });
    }
  };
  handleCloseDeleteModal = (isOk: boolean) => {
    return isOk ? this.handleDelete(this.state.assignmentWillBeDeleted) : this.setState({ assignmentWillBeDeleted: null });
  };

  render() {
    const {
      list: { data, meta, loading },
      classes,
    } = this.props;
    const {
      filters: { page, per_page },
      assignmentWillBeDeleted,
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
          Assignments
        </Typography>
        <Box my={3}>
          <Link to="/managements/assignments/create">
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
                {data.map((assignment: any, idx: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                      {this.columns.map((column: any, columnIdx: number) => {
                        return (
                          <TableCell key={columnIdx} align="left">
                            {column.render(assignment)}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <Link to={`/managements/assignments/${assignment.attributes.id}/edit`}>
                          <IconButton aria-label="edit">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Link>
                        <IconButton aria-label="delete" onClick={() => this.setState({ assignmentWillBeDeleted: assignment })}>
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
        {assignmentWillBeDeleted && (
          <ConfirmationDialog
            content="Are you sure you want to delete assignment?"
            open
            onClose={this.handleCloseDeleteModal}
          />
        )}
      </>
    );
  }
}
const enhance = flowRight([
  connect((state: any) => ({ list: state.assignments.list })),
  withStyles(styles),
  withSnackbar,
]);

export default enhance(Index);
