import React from 'react';
import { FETCH_DETAIL, RESET_STATE } from 'redux/users/actions';
import { connect } from 'react-redux';
import { get, flowRight } from 'lodash';
import { Paper, Typography, Box, Button } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { UserForm } from 'containers/Managements/Users/Form';
import { withRouter } from 'react-router';
import { UPDATE_DETAIL } from 'redux/users/actions';
import { SuccessDialog } from 'components/GuardComponents/Modal/Success';
import { Link } from 'react-router-dom';

class Index extends React.Component<any> {
  state: any = {
    updated: false,
  };
  componentDidMount() {
    const {
      match: {
        params: { userId },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: FETCH_DETAIL,
      payload: { id: userId },
    });
  }
  handleSubmit = (data: any) => {
    this.props.dispatch({
      type: UPDATE_DETAIL,
      payload: { data, onSuccess: this.handleSuccess, onError: this.handleError },
    });
  };

  handleSuccess = () => this.setState({ updated: true });

  handleError = (error: any) => {
    this.props.enqueueSnackbar(
      get(error, 'data.message') || `There's something wrong, please try again or contact for assistance`,
      {
        variant: 'error',
      },
    );
  };
  componentWillUnmount() {
    this.props.dispatch({ type: RESET_STATE, payload: { field: 'detail' } });
  }
  render() {
    const {
      detail: { data, update },
    } = this.props;
    const initialValues = data && {
      ...data.attributes,
      company_name: get(data, 'attributes.company.name'),
    };
    return (
      <>
        <Typography variant="h4" component="h4">
          Edit User
        </Typography>
        <Paper>
          <Box mt={3} pb={5}>
            <UserForm initialValues={initialValues} saving={update.updating} onSubmit={this.handleSubmit} />
          </Box>
        </Paper>
        {this.state.updated && (
          <SuccessDialog
            content="User was updated successfully"
            open
            footer={
              <>
                <Button
                  onClick={() => {
                    this.setState({ updated: false });
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
const enhance = flowRight([withRouter, connect((state: any) => ({ detail: state.users.detail })), withSnackbar]);

export default enhance(Index);
