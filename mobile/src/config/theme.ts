export default {
  colors: {
    primary: '#F1B617', // caso vá mudar a cor primaria. Ela também é usada no arquivo app.json
    secondary: '#000000',
    mainText: '#000000',
    secondaryText: '#9FA5C0',
    outline: '#D0DBEA',
    form: '#F4F5F7'
  },
  fontSizes: {
    header: {
      h1: 32,
      h2: 27,
      h3: 25,
    },
    body: {
      p1: 27,
      p2: 25,
      p3: 15
    }
  },
  fonts: {
    regular: 'Inter_500Medium',
    bold: 'Inter_700Bold'
  },
}

/**
 *
 * import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
 let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_700Bold
  })

  if (!fontsLoaded) {
    return null
  }
 */


// https://www.figma.com/file/hoxmmVgmaKTgaigdnk3hHA/App?type=design&node-id=73-3290&t=sVJOxqP0SNeuB2jg-0