/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, {Component} from 'react';
//Import all required component
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import languageString from '../../Constant/languageString';
import HomeStyle from './HomeStyle';
import bgImg from '../../Image/bg_blue.png';
import logo from '../../Image/logo_xpay.png';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../Constant/API';

class HomeScreen extends Component {
  //global.currentScreenIndex = 'HomeScreen';

  state={
    xtoken:"",
    user_id:"",
    error:"",
    loading:true,
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
                      this.setState({loading:false,offers:responseJson.purchase_codes.length})
                  }
                  else
                  {
                      this.setState({loading:false,error:languageString["common-error-token"]})
                  }
              }).catch(err=>{
                  this.setState({loading:false,error:languageString["common-error-network"]})
              })
          }
      }
      );
  }

  render()
  {
    return (
      <ImageBackground source={bgImg} style={HomeStyle.backgroundImage}>
        <ScrollView>
          <View style={HomeStyle.container}>
            <View style={HomeStyle.imgContainer}>
              <Image style={HomeStyle.img} source={logo} />
            </View>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("QRCodeScanner")}} style={HomeStyle.buttons}>
              <Image style={HomeStyle.buttonIcon} source={require('../../Image/btn-purchase.png')}/>
              <Text style={HomeStyle.buttonText}>{languageString["home-nav-purchase"]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("TimeLineScreen")}} style={HomeStyle.buttons}>
              <Image style={HomeStyle.buttonIcon} source={require('../../Image/btn-timeline.png')}/>
              <Text style={HomeStyle.buttonText}>{languageString["home-nav-timeline"]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("OffersScreen")}} style={HomeStyle.buttons}>
              {this.state.offers?<View style={HomeStyle.badge}>
                <Text style={HomeStyle.badgeText}>{this.state.offers}</Text>
              </View>:null}
              <Image style={HomeStyle.buttonIcon} source={require('../../Image/btn-messages.png')}/>
              <Text style={HomeStyle.buttonText}>{languageString["home-nav-messages"]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("WalletCardListScreen")}} style={HomeStyle.buttons}>
              <Image style={HomeStyle.buttonIcon} source={require('../../Image/btn-wallet.png')}/>
              <Text style={HomeStyle.buttonText}>{languageString["home-nav-wallet"]}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
};


export default HomeScreen;