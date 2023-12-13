import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import languageString from '../../Constant/languageString';
import bgImg from '../../Image/bg_blue.png';
import CommonStyles from '../CommonStyles';
import PaymentSuccessStyle from './PaymentSuccessStyle';

export default class PaymentSuccessScreen extends Component {

    
    render()
    {
        const offer = this.props.navigation.getParam("offer")
        console.log("hhh",offer)
        const subtitle = languageString["purchase-success-subtitle"].split("<br>")

        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
              <ScrollView>
                    <View style={PaymentSuccessStyle.container}>
                        <Image style={PaymentSuccessStyle.errorIcon} source={require('../../Image/icon_success.png')} />
                        <Text style={PaymentSuccessStyle.title}>{languageString["purchase-success-title"]}</Text>
                        <Text style={PaymentSuccessStyle.subtitle}>{subtitle[0]}</Text>
                        <Text style={PaymentSuccessStyle.subtitle}>{subtitle[1]}</Text>
                        <Text style={PaymentSuccessStyle.merchant_name}>{offer.merchant_name}</Text>
                        <Text style={PaymentSuccessStyle.location}>{offer.location_name}</Text>
                        <Text style={PaymentSuccessStyle.amount}>${offer.amount}</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("HomeScreen")} style={PaymentSuccessStyle.btn}>
                            <Text style={PaymentSuccessStyle.btnText}>{languageString["purchase-btn-ok"]}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

