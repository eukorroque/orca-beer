// Arquivo criado: 16/05/2023 às 11:05
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { HomeLogistaControllerParamList } from '../../types/HomeLogistaControllerParamList'
import theme from '../../config/theme'
import { Ionicons } from '@expo/vector-icons'
import HeaderLojista from '../../components/HeaderLojista'
import PreferenciasLojistaScreen from '../../screens/PreferenciasLojistaScreen'
import HomeLogistaScreen from '../../screens/HomeLojistaScreen'

const Tab = createBottomTabNavigator<HomeLogistaControllerParamList>()

const HomeLogistaController = () => {

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: theme.colors.primary,
          height: 180,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 60,
        },
        headerTitle: () => <HeaderLojista />,
        tabBarActiveTintColor: theme.colors.mainText,
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: {
          fontSize: theme.fontSizes.body.p3,
          fontFamily: theme.fonts.regular,
          position: 'relative',
          top: -7
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'Preferências':
              iconName = focused ? 'menu' : 'menu-outline'
              break
            default:
              break
          }

          // @ts-expect-error o typescript reclama que o tipo do icone não está tipado. Nn tem problema deixar assim.
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeLogistaScreen}
      />

      <Tab.Screen
        name='Preferências'
        component={PreferenciasLojistaScreen}
      />
    </Tab.Navigator>
  )

}

export default HomeLogistaController
