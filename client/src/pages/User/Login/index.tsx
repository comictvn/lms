import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import LoginForm from './LoginForm'
import styles from './styles'

const useStyles = makeStyles(styles);

function Login(props: any) {
  const classes = useStyles();

  const handleSubmit = (values: any) => {
    const { dispatch } = props
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    })
  }; 

  return (
    <div className={clsx(classes.login)}>
      <Grid container spacing={3} className={clsx(classes.block)}>
        <Grid item xs={12}>
          <div className={clsx(classes.inner)}>
            <div className={clsx(classes.form)}>
              <h4 className={clsx(classes.title, 'text-uppercase')}>
                <strong>IWA</strong>
              </h4>
              <br />
              <LoginForm onSubmit={handleSubmit}/>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: any, props: any) => ({
  user: state.user
})

export default connect(mapStateToProps)(Login)
