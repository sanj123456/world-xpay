/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hooks we needed
import React, { useState, useEffect } from 'react';

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = props => {
  //State for ActivityIndicator animation
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then(value =>
        {

          if(value===null)
            props.navigation.navigate('Auth')
          else
          {
            AsyncStorage.getItem('locked').then(val=>{
              if(val==="true")
                props.navigation.navigate('UnlockScreen')
              else
                props.navigation.navigate('DrawerScreens')
            })
          }    
      }
      );
    }, 5000);
  }, []);

  return (
    <ImageBackground
    style={{ flex: 1 }}
    source={require('../Image/splash-mdpi.png')}
    >
    <View style={styles.container}>
     
      {/* <Image
        source={require('../Image/aboutreact.png')}
        style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
      /> */}
      {/* <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      /> */}
      
    </View>
    </ImageBackground>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#015cb1',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});