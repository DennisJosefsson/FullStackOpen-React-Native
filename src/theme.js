import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  img: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  inputContainer: {
    display: 'flex',
    backgroundColor: '#c3dfe0',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    height: 40,
    padding: 5,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 1,
  },
  button: {
    height: 40,
    padding: 5,
    backgroundColor: 'blue',
    margin: 10,
    borderRadius: 5,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 5,
    marginLeft: 5,
    color: 'red',
  },
}

export default theme
