/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 16/05/2023 às 11:05
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import {Image} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import TextDefault from '../../components/TextDefault'
import { HomeLogistaControllerParamList } from '../../types/HomeLogistaControllerParamList'
import theme from '../../config/theme'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import PreferenciasLojistaScreen from '../../screens/PreferenciasLojistaScreen'
import HomeLogistaScreen from '../../screens/HomeLojistaScreen'
import data from './data.json'
import * as S from './styles'

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
        headerTitle: () => (
          <S.HeaderContainer>
            <S.ProfileContainer>
              <Image source={require('./Profile-PNG-File.png')} style={{width: 66, height: 66 }}/>
              <S.ProfileContainer>
                <TextDefault bold>Hello World! Fine Drinks by Debora Almeida!</TextDefault>
              </S.ProfileContainer>
            </S.ProfileContainer>
            <S.IconsContainer>
              <FontAwesome name={'comments'} color={'#000'} size={25} />
              <FontAwesome name={'bell'} color={'#000'} size={25} />
            </S.IconsContainer>
            <S.AdressContainer>            
              <SelectDropdown
                dropdownStyle={{width: 300, borderRadius: 16}}
                buttonStyle={{width: 300, borderRadius: 16, backgroundColor: theme.colors.primary}}
                buttonTextStyle={{fontFamily: theme.fonts.regular, fontSize: theme.fontSizes.body.p3}}
                rowTextStyle={{fontFamily: theme.fonts.regular}}
                data={data.enderecos}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem) => {
                  return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`
                  
                }}
                rowTextForSelection={(item) => {
                  return `${item.rua}, ${item.numero}`
                }}
                showsVerticalScrollIndicator={true}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={14} />;
                }}
                defaultButtonText='Selecione o seu endereço'
              />
            </S.AdressContainer>
           
          </S.HeaderContainer>
        ),
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 60,
        },
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
