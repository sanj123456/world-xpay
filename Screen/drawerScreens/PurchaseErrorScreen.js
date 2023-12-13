import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import languageString from '../../Constant/languageString';
import bgImg from '../../Image/bg_blue.png';
import CommonStyles from '../CommonStyles';
import PurchaseErrorStyle from './PurchaseErrorStyle';

export default class ContactScreen extends Component {

    
    render()
    {
        const error = this.props.navigation.getParam("error")
        
        const issue = error.issue.split("<br>")

        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
              <ScrollView>
                    <View style={PurchaseErrorStyle.container}>
                        <Image style={PurchaseErrorStyle.errorIcon} source={require('../../Image/icon_warning.png')} />
                        <Text style={PurchaseErrorStyle.title}>{error.title}</Text>
                        {issue.map(txt=><Text style={PurchaseErrorStyle.error}>{txt}</Text>)}
                        {error.resolutionHeader?<Text style={PurchaseErrorStyle.resolution}>{error.resolutionHeader}</Text>:null}
                        <Text style={PurchaseErrorStyle.errorInfo}>{error.resolution}</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={PurchaseErrorStyle.btn}>
                            <Text style={PurchaseErrorStyle.btnText}>{languageString["purchase-btn-tryagain"]}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("HomeScreen")} style={PurchaseErrorStyle.bottomBtn}>
                  <Text style={PurchaseErrorStyle.bottomBtnText}>{languageString["purchase-btn-cancel"]}</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

