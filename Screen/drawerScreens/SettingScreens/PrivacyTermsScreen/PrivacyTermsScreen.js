import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import languageString from '../../../../Constant/languageString';
import bgImg from '../../../../Image/bg_blue.png';
import CommonStyles from '../../../CommonStyles';
import logo from '../../../../Image/xc-sym-white.png';

export default class PrivacyTermsScreen extends Component {
    render()
    {
        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <View style={CommonStyles.modal}>
                    <ScrollView>
                        <View style={CommonStyles.modalHeader}>
                            <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                            <Text style={CommonStyles.modalHeaderText}>{languageString["settings-title-privacyterms"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <Image style={CommonStyles.logo} source={logo} />
                            <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-privacyterms"]}</Text>
                            
                            <TouchableOpacity style={CommonStyles.btn} >
                            <Text style={CommonStyles.btnText}>{languageString["btn-close"]}</Text>
                            {/* <Text style={PrivacyTermsStyle.btnText}>{languageString["unlock-btn-unlock"]}</Text> */}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

