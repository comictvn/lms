import { grayColor, whiteColor, pxToRem } from 'resources/variables'

const loginLayoutStyle = (theme: any) => ({
  layout: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    background: grayColor,
    backgroundImage: 'url("/resources/images/bg.jpg")',
    backgroundSize: 'cover',
    backgroundColor: '#fff',
    backgroundPosition: 'center center',
  },
  header: {
    alignSelf: 'flex-start',
    width: '100%',
    color: whiteColor,
    padding: pxToRem(40),
  },
  content: {
    alignSelf: 'middle',
  }
})

export default loginLayoutStyle
