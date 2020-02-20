import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
const validate = (values: any) => {
  const errors: any = {}
  const requiredFields = [
    'email',
    'password',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Please fill login information'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}: any) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const LoginForm = (props: any) => {
  const { handleSubmit  } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="email"
          component={renderTextField}
          label="Email Address"
        />
      </div>
      <div>
        <Field name="password" type="password" component={renderTextField} label="Password" />
      </div>
      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        >
          Sign In
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
})(LoginForm)
