import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextInput from '../../../Components/TextInput';
import languageString from '../../../../Constant/languageString';
import bgImg from '../../../../Image/bg_blue.png';
import CommonStyles from '../../../CommonStyles';
import logo from '../../../../Image/xc-sym-white.png';
import Loader from '../../../Components/loader';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../../../Constant/API';

export default class ContactScreen extends Component {

    state={
        xtoken:"",
        user_id:"",
        phone:"",
        email:"",
        loading:false,
        error:""
    }

    componentDidMount()
    {
        AsyncStorage.getItem('xtoken').then(value =>
        this.setState({ xtoken: value })
        );
        AsyncStorage.getItem('user_id').then(value =>
        this.setState({ user_id: value })
        );
    }

    handlePhoneChange = (val) => {
        this.setState({phone:val})
    }
    handleEmailChange = (val) => {
        this.setState({email:val})
    }

    handleSave = () => {

        this.setState({loading:true})

        const {xtoken,user_id,phone,email} = this.state

        let dataObj = {
            user_id,
            xtoken,
            phone,
            email
        }

        var formBody = [];
        for (var key in dataObj) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataObj[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        //console.log(formBody)
        
        fetch(API.SETTING_CONTACT_METHODS, {
            method: 'POST',
            body: formBody,
            headers: {
            //Header Defination
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then(async response => response.json())
        .then(async responseJson => {
            console.log(responseJson)
            if(responseJson.error==="0")
            {
                this.setState({loading:false,error:""})
                this.props.navigation.goBack()
            }
            else if(responseJson.error==="1")
            {
                this.setState({loading:false,error:languageString["settings-error-contact-phone"]})
            }
            else if(responseJson.error==="2")
            {
                this.setState({loading:false,error:languageString["settings-error-contact-email"]})
            }
            else if(responseJson.error==="3")
            {
                this.setState({loading:false,error:languageString["settings-error-contact-duplicate"]})
            }
            else
            {
                this.setState({loading:false,error:languageString["common-error-token"]})
            }
        }).catch(err=>{
            this.setState({loading:false,error:languageString["common-error-network"]})
        })
        
    }

    render()
    {

        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <Loader loading={this.state.loading} />
                <View style={CommonStyles.modal}>
                    <ScrollView>
                        <View style={CommonStyles.modalHeader}>
                            <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                            <Text style={CommonStyles.modalHeaderText}>{languageString["settings-title-contactmethods"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <Image style={CommonStyles.logo} source={logo} />
                            <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-contactmethods"]}</Text>
                            {!this.state.error?null:
                                <View style={CommonStyles.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.error}</Text>
                                </View>
                            }
                            <Text style={CommonStyles.textSmall}>{languageString["settings-label-telephone"]}</Text>
                            <TextInput
                                onChangeText={this.handlePhoneChange}
                            />
                            <Text style={[CommonStyles.textSmall]} >{languageString["settings-label-email"]}</Text>
                            <TextInput
                                onChangeText={this.handleEmailChange}
                            />
                            <TouchableOpacity onPress={this.handleSave} style={CommonStyles.btn} >
                                <Text style={CommonStyles.btnText}>{languageString["settings-btn-save"]}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

