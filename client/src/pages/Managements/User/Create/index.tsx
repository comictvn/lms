import React from 'react';
import { RESET_STATE } from 'redux/users/actions';
import { connect } from 'react-redux';
import { get, flowRight } from 'lodash';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { UserForm } from 'containers/Managements/Users/Form';
import { withRouter } from 'react-router';
import { CREATE } from 'redux/users/actions';
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
    return (
      <>
        <Typography variant="h4" component="h4">
          New User
        </Typography>
        <Paper>
          <Box mt={3} pb={5}>
            <UserForm saving={creating} onSubmit={this.handleSubmit} />
          </Box>
        </Paper>
        {this.state.created && (
          <SuccessDialog
            content="User was created successfully"
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
                <Link to="/managements/users">
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
const enhance = flowRight([withRouter, connect((state: any) => ({ create: state.users.create })), withSnackbar]);

export default enhance(Index);
