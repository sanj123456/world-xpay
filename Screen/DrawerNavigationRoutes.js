/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import HomeScreen from './drawerScreens/HomeScreen';
import SettingsScreen from './drawerScreens/SettingScreens/SettingScreen/SettingScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import EnterPinScreen from './drawerScreens/SettingScreens/EnterPinScreen/EnterPinScreen';
import ContactScreen from './drawerScreens/SettingScreens/ContactScreen/ContactScreen';
import PasswordPinScreen from './drawerScreens/SettingScreens/PasswordPinScreen/PasswordPinScreen';
import ResetRescueScreen from './drawerScreens/SettingScreens/ResetRescueScreen/ResetRescueScreen';
import NotificationScreen from './drawerScreens/SettingScreens/NotificationScreen/NotificationScreen';
import PrivacyTermsScreen from './drawerScreens/SettingScreens/PrivacyTermsScreen/PrivacyTermsScreen';
import CloseAccountScreen from './drawerScreens/SettingScreens/CloseAccountScreen/CloseAccountScreen';

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: EnterPinScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AppSettings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Setting Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    }),
  },
  ContactScreen: {
    screen: ContactScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PasswordPinScreen: {
    screen: PasswordPinScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ResetRescueScreen: {
    screen: ResetRescueScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  NotificationScreen: {
    screen: NotificationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PrivacyTermsScreen: {
    screen: PrivacyTermsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  CloseAccountScreen: {
    screen: CloseAccountScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    HomeScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home Screen',
      },
    },
    SettingsScreen: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Setting Screen',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);
export default DrawerNavigatorRoutes;