import { pxToRem, whiteColor } from 'resources/variables'

const loginStyle = (theme: any) => ({
  login: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  title: {
    margin: '0 auto',
    maxWidth: pxToRem(740),
    fontSize: pxToRem(18),
  },
  block: {
    padding: `${pxToRem(80)} ${pxToRem(40)} ${pxToRem(80)}`,
    width: '100%',
    alignSelf: 'center',
    position: 'relative' as 'relative',
    zIndex: 2,
  },
  inner: {
    minWidth: pxToRem(200),
    maxWidth: pxToRem(300),
    margin: '0 auto',
    padding: `${pxToRem(50)} ${pxToRem(40)} ${pxToRem(50)}`,
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: whiteColor,
    position: 'relative' as 'relative',
  },
  form: {
    position: 'relative' as 'relative',
    zIndex: 2,
  }

})

export default loginStyle
