
//Import React
import React, {Component} from 'react';

//Import all required component
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import languageString from '../../../../Constant/languageString';
import SettingStyle from './SettingStyle';
import bgImg from '../../../../Image/bg_blue.png';


class SettingsScreen extends Component {


  handeClick = (val) => {
    if(val===languageString["settings-subtitle-contactmethods"])
    {
        this.props.navigation.navigate("ContactScreen")
    }
    if(val===languageString["settings-nav-passwordpin"])
    {
        this.props.navigation.navigate("PasswordPinScreen")
    }
    if(val===languageString["settings-nav-resetrescue"])
    {
        this.props.navigation.navigate("ResetRescueScreen")
    }
    if(val===languageString["settings-nav-notificationsettings"])
    {
        this.props.navigation.navigate("NotificationScreen")
    }
    if(val===languageString["settings-nav-privacyterms"])
    {
        this.props.navigation.navigate("PrivacyTermsScreen")
    }
    if(val===languageString["settings-nav-closeaccount"])
    {
        this.props.navigation.navigate("CloseAccountScreen")
    }
  }
  
  render()
  {

    const items = [
      languageString["settings-nav-contactmethods"],
      languageString["settings-nav-passwordpin"],
      languageString["settings-nav-resetrescue"],
      languageString["settings-nav-notificationsettings"],
      languageString["settings-nav-privacyterms"], 
      languageString["settings-nav-closeaccount"]
    ]

    return (
      <ImageBackground source={bgImg} style={SettingStyle.backgroundImage}>
        <ScrollView>
        <View style={SettingStyle.container}>
          <Text style={SettingStyle.screenHeader}>{languageString["settings-subtitle"]}</Text>
          {items.map(item=>{
            return(
              <TouchableOpacity onPress={()=>{this.handeClick(item)}} key={item} style={SettingStyle.listView}>
                <Text style={SettingStyle.listText} key={item}>{item}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
        </ScrollView>
      </ImageBackground>
    );
  }
};


export default SettingsScreen;