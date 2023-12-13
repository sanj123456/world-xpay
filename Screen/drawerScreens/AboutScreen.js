
//Import React
import React, {Component} from 'react';

//Import all required component
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import languageString from '../../Constant/languageString';
import AboutStyle from './AboutStyle';
import CommonStyles from '../CommonStyles';
import bgImg from '../../Image/bg_blue.png';
import logo from '../../Image/logo_xchange.png';

class AboutScreen extends Component {


  
  render()
  {

    return (
      <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
        <ScrollView>
          <View style={AboutStyle.container}>
            <Text style={AboutStyle.screenHeader}>{languageString["about-subtitle"]}</Text>
            <Text style={AboutStyle.whiteText}>{languageString["about-txt-world-xpay"]} {languageString["about-txt-division-of"]}</Text>
            <View style={AboutStyle.imgContainer}>
              <Image style={AboutStyle.img} source={logo} />
            </View>
            <Text style={AboutStyle.whiteText}>{languageString["about-txt-address"]}</Text>
            <Text style={AboutStyle.whiteText}>{languageString["about-txt-loveland-co-usa"]}</Text>
            <View style={AboutStyle.RowContainer}>
              <Image style={AboutStyle.SocialIcon} source={require("../../Image/icon_facebook.png")} />
              <Image style={AboutStyle.SocialIcon} source={require("../../Image/icon_twitter.png")} />
              <Image style={AboutStyle.SocialIcon} source={require("../../Image/icon_linkedin.png")} />
            </View>

            <View style={AboutStyle.RowContainer}>
              <Text style={AboutStyle.lightblue}>{languageString["about-txt-general-inquiry"]}</Text>
              <Text style={AboutStyle.blue}>{languageString["about-txt-email-general"]}</Text>
            </View>
            <View style={AboutStyle.RowContainer}>
              <Text style={AboutStyle.lightblue}>{languageString["about-txt-customer-inquiry"]}</Text>
              <Text style={AboutStyle.blue}>{languageString["about-txt-email-customer"]}</Text>
            </View>
            <View style={AboutStyle.RowContainer}>
              <Text style={AboutStyle.lightblue}>{languageString["about-txt-merchant-inquiry"]}</Text>
              <Text style={AboutStyle.blue}>{languageString["about-txt-email-merchant"]}</Text>
            </View>
            <View style={AboutStyle.RowContainer}>
              <Text style={AboutStyle.lightblue}>{languageString["about-txt-acquirer-inquiry"]}</Text>
              <Text style={AboutStyle.blue}>{languageString["about-txt-email-acquirer"]}</Text>
            </View>
            <View style={AboutStyle.RowContainer}>
              <Text style={AboutStyle.lightblue}>{languageString["about-txt-press-inquiry"]}</Text>
              <Text style={AboutStyle.blue}>{languageString["about-txt-email-press"]}</Text>
            </View>
           

            <Text style={[AboutStyle.whiteText,{marginTop:20}]}>{languageString["about-txt-press"]}</Text>
            <Text style={[AboutStyle.whiteText,{marginBottom:20}]}>{languageString["about-txt-media-link"]}</Text>
            <Text style={AboutStyle.whiteText}>{languageString["about-txt-version"]} 2.2.0</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
};


export default AboutScreen;