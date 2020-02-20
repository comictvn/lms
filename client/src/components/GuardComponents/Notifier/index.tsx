import { withSnackbar } from 'notistack';
import { useEffect } from 'react';
import { connect } from 'react-redux'

function Notifier(props: any) {
  const { notification, enqueueSnackbar } = props

  useEffect(() => {
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }, [enqueueSnackbar, notification])

  return null;
}

const mapStateToProps = (state: any, props: any) => ({
  notification: state.notifier.notification
})

export default withSnackbar(
  connect(mapStateToProps)(Notifier)
);
