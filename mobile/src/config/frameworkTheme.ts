import { MD3LightTheme as DefaultTheme, configureFonts } from 'react-native-paper'
import theme from './theme'

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    secondary: theme.colors.secondary
  },
  fonts: configureFonts({
    config: {
      fontFamily: theme.fonts.regular
    }
  })
}