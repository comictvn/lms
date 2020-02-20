import React from 'react';
import { RESET_STATE } from 'redux/assignments/actions';
import { connect } from 'react-redux';
import { get, flowRight } from 'lodash';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { AssignmentForm } from 'containers/Managements/Assignments/Form';
import { withRouter } from 'react-router';
import { CREATE } from 'redux/assignments/actions';
import { SuccessDialog } from 'components/GuardComponents/Modal/Success';
import { Link } from 'react-router-dom';

class Index extends React.Component<any> {
  state: any = {
    created: false,
  };
  handleSubmit = (data: any) => {
    this.props.dispatch({ type: CREATE, payload: { data, onSuccess: this.handleSuccess, onError: this.handleError } });
  };
  handleSuccess = () => this.setState({ created: true });
  handleError = (error: any) => {
    this.props.enqueueSnackbar(
      get(error, 'data.message') || `There's something wrong, please try again or contact for assistance`,
      {
        variant: 'error',
      },
    );
  };
  componentWillUnmount() {
    this.props.dispatch({ type: RESET_STATE, payload: { field: 'create' } });
  }
  render() {
    const {
      create: { creating },
    } = this.props;
    const initialValues = {
      questions: [],
    };
    return (
      <>
        <Typography variant="h4" component="h4">
          New Assignment
        </Typography>
        <Paper>
          <Box mt={3} pb={5}>
            <AssignmentForm initialValues={initialValues} saving={creating} onSubmit={this.handleSubmit} />
          </Box>
        </Paper>
        {this.state.created && (
          <SuccessDialog
            content="Assignment was created successfully"
            open
            footer={
              <>
                <Button
                  onClick={() => {
                    this.setState({ created: false });
                  }}
                  color="primary"
                >
                  Stay back
                </Button>
                <Link to="/managements/assignments">
                  <Button autoFocus color="primary">
                    Go to list
                  </Button>
                </Link>
              </>
            }
          />
        )}
      </>
    );
  }
}
const enhance = flowRight([withRouter, connect((state: any) => ({ create: state.assignments.create })), withSnackbar]);

export default enhance(Index);
