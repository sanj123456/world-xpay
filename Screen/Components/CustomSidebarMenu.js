/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, {Component} from 'react';

//Import all required component
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import languageString from '../../Constant/languageString';
import AsyncStorage from '@react-native-community/async-storage';
import CommonStyles from '../CommonStyles';
import API from '../../Constant/API';

class CustomSidebarMenu extends Component{

  state={
    xtoken:"",
    user_id:"",
    error:"",
    offers: 0
  }

  componentDidMount()
  {
      AsyncStorage.getItem('xtoken').then(value =>
          this.setState({ xtoken: value })
      );
      AsyncStorage.getItem('user_id').then(value =>{
          this.setState({ user_id: value })

          if(this.state.user_id&&this.state.xtoken)
          {
              let dataObj = {
                  user_id:this.state.user_id,
                  xtoken:this.state.xtoken
              }
      
              var formBody = [];
              for (var key in dataObj) {
                  var encodedKey = encodeURIComponent(key);
                  var encodedValue = encodeURIComponent(dataObj[key]);
                  formBody.push(encodedKey + '=' + encodedValue);
              }
              formBody = formBody.join('&');
      
              //console.log(formBody)
              
              fetch(API.GET_OFFERS, {
                  method: 'POST',
                  body: formBody,
                  headers: {
                  //Header Defination
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                  },
              })
              .then(async response => response.json())
              .then(async responseJson => {
                 
                  if(responseJson.error===0)
                  {
                      this.setState({offers:responseJson.purchase_codes.length})
                  }
                  else
                  {
                      this.setState({error:languageString["common-error-token"]})
                  }
              }).catch(err=>{
                  this.setState({error:languageString["common-error-network"]})
              })
          }
      }
      );
  }

  handleClick = (index, screenToNavigate) => {
    if (screenToNavigate == 'logout') {
      this.props.navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Are you sure? You want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: () => {
              AsyncStorage.clear();
              props.navigation.navigate('Auth');
              console.log('logout');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      this.props.navigation.navigate(screenToNavigate);
    }
  }

  render()
  {
    let items = [
      {
        navOptionName: languageString["home-nav-timeline"],
        screenToNavigate: 'TimeLineScreen',
      },
      {
        navOptionName: languageString["home-nav-messages"],
        screenToNavigate: 'OffersScreen',
      },
      {
        navOptionName: languageString["home-nav-wallet"],
        screenToNavigate: 'WalletCardListScreen',
      },
      {
        navOptionName: languageString["home-nav-settings"],
        screenToNavigate: 'SettingsScreen',
      },
      {
        navOptionName: languageString["home-nav-about"],
        screenToNavigate: 'AboutScreen',
      },
      {
        navOptionName: languageString["home-nav-unlock"],
        screenToNavigate: 'UnlockScreen',
      },
    ];

    return (
      <View style={stylesSidebar.sideMenuContainer}>
        <ScrollView>
        <View style={stylesSidebar.appHeader}>
          <Text style={stylesSidebar.blueText}>{languageString["home-title-world"]}</Text>
          <Text style={stylesSidebar.whiteText}>{languageString["home-title-xpay"]}</Text>
        </View>
        <View style={stylesSidebar.profileHeader}>
          <Text style={stylesSidebar.profileHeaderText}>{languageString["home-nav-purchase"]}</Text>
        </View>
        <View style={{ width: '100%', flex: 1 }}>
          {items.map((item, key) => (
            <View
              style={{
                padding: 10,
                paddingLeft: 45,
                color: 'white',
                backgroundColor: 'rgb(0,34,86)z',
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center"
              }}
              key={key}
              onStartShouldSetResponder={() =>
                this.handleClick(key, item.screenToNavigate)
              }>
              <Text style={{ fontSize: 20, color: 'white', fontWeight:"bold" }}>
                {item.navOptionName}
              </Text>
              {this.state.offers?
                item.navOptionName===languageString["home-nav-messages"]?
                <View style={CommonStyles.badge}><Text style={CommonStyles.badgeText}>{this.state.offers}</Text></View>:null
              :null}
            </View>
          ))}
        </View>
        </ScrollView>
      </View>
    );
  }
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0,34,86)',
    paddingTop: 10,
    color: 'white',
  },
  appHeader: {
    flexDirection:"row",
    padding: 10,
    paddingLeft: 40,
    marginBottom: 40
  },
  blueText: {
    fontSize: 30,
    color:"rgb(19,108,197)"
  },
  whiteText: {
    fontSize: 30,
    color:"white"
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: "rgb(2,56,136)",
    padding: 5,
    borderRadius: 50,
    alignItems:"center",
    justifyContent:"center",
    marginHorizontal: 50,
    marginBottom: 10
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 25
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
    marginBottom: 10,
  },
});
export default CustomSidebarMenu;
