import React from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import Button from '@material-ui/core/Button';
import { Grid, Container, Box, MenuItem } from '@material-ui/core';
import { GuardTextField, GuardSelectField } from 'components/GuardComponents/Form';
import { get, keys, flowRight } from 'lodash';
import { ROLES, EMAIL_REGEX } from 'models/user';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const validate = (values: any) => {
  const errors: any = {};
  const requiredFields = ['name', 'gender', 'email', 'phone', 'role'];
  const password = get(values, 'password');
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This is required';
    }
  });
  if (values.email && !EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (password && password !== values.confirmPassword) {
    errors.confirmPassword = "Confirm password doesn't match";
  }
  return errors;
};

const Password = (_props: any) => <GuardTextField {..._props} type="password" required={false} />;

const Index = (props: any) => {
  const { handleSubmit, saving } = props;
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={10} md={6}>
            <Field name="name" label="Name" component={GuardTextField} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10} md={6}>
            <Field name="email" component={GuardTextField} label="Email" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10} md={6}>
            <Field name="role" component={GuardSelectField} label="Role">
              {keys(ROLES).map((role: string) => (
                <MenuItem value={role} key={role}>
                  {ROLES[role]}
                </MenuItem>
              ))}
            </Field>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10} md={6}>
            <Field name="password" component={Password} label="New password" />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={10} md={6}>
            <Field name="password_confirmation" component={Password} label="Confirm password" />
          </Grid>
        </Grid>
        <Box mt={3} px={1}>
          <Grid container spacing={2}>
            <Box mr={2}>
              <Link to="/managements/users">
                <Button variant="contained">
                  Cancel
                </Button>
              </Link>
            </Box>
            <Button type="submit" variant="contained" color="primary" disabled={saving}>
              submit
            </Button>
          </Grid>
        </Box>
      </Container>
    </form>
  );
};

const enhance = flowRight([
  connect(state => ({ data: getFormValues('UserForm')(state) })),
  reduxForm({
    form: 'UserForm',
    validate,
  }),
]);
export const UserForm = enhance(Index);
