/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';
// import {requestNotifications,checkNotifications} from 'react-native-permissions';
//Import Navigators from React Navigation
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Import all the screens needed
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';
import TermsAndConditions from './Screen/TermsAndConditions';
import SetupAccountScreen from './Screen/setup/SetupAccountScreen';
import ResetRescueScreen from './Screen/resetRescue/ResetRescueScreen';
import WalletAddCardScreen from './Screen/card/WalletAddCardScreen';
import WalletCardListScreen from './Screen/card/WalletCardListScreen';
import WalletEditCardScreen from './Screen/card/WalletEditCardScreen';
import WalletDeleteCardScreen from './Screen/card/WalletDeleteCardScreen';
import OffersScreen from './Screen/drawerScreens/OffersScreen';
import PurchaseOfferScreen from './Screen/drawerScreens/PurchaseOfferScreen';
import OfferPaymentScreen from './Screen/drawerScreens/OfferPaymentScreen';
import PurchaseErrorScreen from './Screen/drawerScreens/PurchaseErrorScreen';
import PaymentSuccessScreen from './Screen/drawerScreens/PaymentSuccessScreen';
import QRCodeScanner from './Screen/drawerScreens/QRCodeScanner';
import TimeLineScreen from './Screen/drawerScreens/TimeLineScreen';
import AboutScreen from './Screen/drawerScreens/AboutScreen';
import WhoAreYouScreen from './Screen/WhoAreYouScreen';
import LoginScreen1 from './Screen/LoginScreen1';
import SafetyRescueScreen from './Screen/SafetyRescueScreen';
import UnlockScreen from './Screen/drawerScreens/UnlockScreen';
import LanguageSelectionScreen from './Language/LanguageSelectionScreen';
import languageString from './Constant/languageString';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const Auth = createStackNavigator({
  //Stack Navigator for Login and Sign up Screen
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title:languageString['register'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  LoginScreen1: {
    screen: LoginScreen1,
    navigationOptions: {
      title: languageString['login-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  SafetyRescueScreen: {
    screen: SafetyRescueScreen,
    navigationOptions: {
      title: languageString['rescued-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  ResetRescueScreen: {
    screen: ResetRescueScreen,
    navigationOptions: {
      title: languageString['settings-nav-resetrescue'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  SetupAccountScreen: {
    screen: SetupAccountScreen,
    navigationOptions: {
      title: languageString['setup-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  LanguageSelectionScreen: {
    screen: LanguageSelectionScreen,
    navigationOptions: { header: null }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  WhoAreYouScreen: {
    screen: WhoAreYouScreen,
    navigationOptions: {
      title: languageString['safety-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
});

const DrawerScreens = createStackNavigator({

  DrawerNavigationRoutes: {
    /* Navigation Drawer as a landing page */
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      /* Hiding header for Navigation Drawer as we will use our custom header */
      headerShown: false,
    },
  },
  TermsAndConditions: {
    screen: TermsAndConditions,
    navigationOptions: {
      title: languageString['settings-nav-privacyterms'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  WalletAddCardScreen: {
    screen: WalletAddCardScreen,
    navigationOptions: {
      title: languageString['wallet-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  WalletCardListScreen: {
    screen: WalletCardListScreen,
    navigationOptions: {
      title: languageString['wallet-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  WalletEditCardScreen: {
    screen: WalletEditCardScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  WalletDeleteCardScreen: {
    screen: WalletDeleteCardScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  OffersScreen: {
    screen: OffersScreen,
    navigationOptions: {
      title: languageString['messages-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  PurchaseOfferScreen: {
    screen: PurchaseOfferScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  OfferPaymentScreen: {
    screen: OfferPaymentScreen,
    navigationOptions: {
      title: languageString['purchase-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  PurchaseErrorScreen: {
    screen: PurchaseErrorScreen,
    navigationOptions: {
      title: languageString['purchase-error-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  PaymentSuccessScreen: {
    screen: PaymentSuccessScreen,
    navigationOptions: {
      title: languageString['purchase-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  QRCodeScanner: {
    screen: QRCodeScanner,
    navigationOptions: {
      headerShown: false,
    },
  },
  TimeLineScreen: {
    screen: TimeLineScreen,
    navigationOptions: {
      title: languageString['timeline-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: {
      title: languageString['about-title'],
      headerStyle: {
        backgroundColor: '#002256',
      },
      headerTintColor: '#fff',
    },
  },
})

/* Switch Navigator for those screens which needs to be switched only once
  and we don't want to switch back once we switch from them to the next one */
const AppNavigation = createSwitchNavigator({ 
  SplashScreen: {
    /* SplashScreen which will come once for 5 Seconds */
    screen: SplashScreen,
    navigationOptions: {
      /* Hiding header for Splash Screen */
      headerShown: false,
    },
  },
  Auth: {
    /* Auth Navigator which includer Login Signup will come once */
    screen: Auth,
  },
  DrawerScreens: {
    /* Navigation Drawer as a landing page */
    screen: DrawerScreens,
    navigationOptions: {
      /* Hiding header for Navigation Drawer as we will use our custom header */
      headerShown: false,
    },
  },
  UnlockScreen: {
    screen: UnlockScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

let AppContainer = createAppContainer(AppNavigation);

class App extends React.Component{

  componentDidMount()
  {

    messaging()
      .getToken()
      .then(token => {
        AsyncStorage.setItem('device_token',token)
      }).catch(e=>console.log("err"));

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    console.log("zzz",unsubscribe)

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
        setLoading(false);
      }).catch(e=>console.log("error2"))
  }

  render()
  {
    return(
        <AppContainer />
    )
  }
}

export default App;



// /* This is an Login Registration example from https://aboutreact.com/ */
// /* https://aboutreact.com/react-native-login-and-signup/ */

// //Import React
// import React, {Component} from 'react';
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-community/async-storage';
// //Import all required component
// import { View, Text } from 'react-native';

// export default class App extends Component {
//   //global.currentScreenIndex = 'HomeScreen';


//   async componentDidMount() {
//     this.checkPermission();
//   }
  
//     //1
//   async checkPermission() {
//     const enabled = await messaging().hasPermission();
//     if (enabled) {
//         this.getToken();
//     } else {
//         this.requestPermission();
//     }
//   }
  
//     //3
//   async getToken() {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     console.log(fcmToken)
//     if (!fcmToken) {
//         fcmToken = await messaging().getToken();
//         if (fcmToken) {
//             // user has a device token
//             console.log(fcmToken)
//             await AsyncStorage.setItem('fcmToken', fcmToken);
//         }
//         else{
//           console.log("woooo")
//         }
//     }
//   }
  
//     //2
//   async requestPermission() {
//     try {
//         await messaging().requestPermission();
//         // User has authorised
//         this.getToken();
//     } catch (error) {
//         // User has rejected permissions
//         console.log('permission rejected');
//     }
//   }
  

//   render()
//   {
//     return (
//       <View>
//         <Text>helloooo</Text>
//       </View>
//     );
//   }
// };
