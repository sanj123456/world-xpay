import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import TextInputComponent from '../../../Components/TextInput';
import languageString from '../../../../Constant/languageString';
import bgImg from '../../../../Image/bg_blue.png';
import PasswordPinStyle from './PasswordPinStyle';
import CommonStyles from '../../../CommonStyles';
import logo from '../../../../Image/xc-sym-white.png';
import show from '../../../../Image/icon_show.png';
import hide from '../../../../Image/icon_hide.png';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Components/loader';
import API from '../../../../Constant/API';

export default class PasswordPinScreen extends Component {

    state={
        ShowPass: false,
        xtoken:"",
        user_id:"",
        loading:false,
        errors:{},
        password1:"",
        password2:"",
        pin1:"",
        pin2:""
    }

    handleInputChange = (val,type) => {
        if(type==="password1")
            this.setState({password1:val})
        if(type==="password2")
            this.setState({password2:val})
        if(type==="pin1")
            this.setState({pin1:val})
        if(type==="pin2")
            this.setState({pin2:val})
    }

    handleSave = () => {

        this.setState({loading:true})

        let {password1,password2,pin1,pin2,user_id,xtoken} = this.state

        let errors={}

        if (password1 !== undefined && password1 === password2) {
            if (password1.length > 7 && password1.length < 21) {
               var containsDigits = /[0-9]/.test(password1);
               var containsUpper = /[A-Z]/.test(password1);
               var containsLower = /[a-z]/.test(password1);
      
               if (containsDigits && containsUpper && containsLower) {
                  errors.password = ""
               } else {
                  errors.password = languageString["settings-error-security-password-format"]
               }
            } else {
                errors.password = languageString["settings-error-security-password-length"]
            }
        } else {
            errors.password = languageString["settings-error-security-password-mismatch"]
        }


        if (pin1 !== undefined && pin1 === pin2) {
            if (pin1.length > 3 && pin1.length < 8) {
               var pinContainsUpper = /[A-Z]/.test(pin1);
               var pinContainsLower = /[a-z]/.test(pin1);
      
               if (pinContainsUpper || pinContainsLower) {
                  errors.pin = languageString["settings-error-security-pin-format"]
               }else{
                   errors.pin = ""
               }

            } else {
               errors.pin = languageString["settings-error-security-pin-length"]
            }
        } else {
            errors.pin = languageString["settings-error-security-pin-mismatch"]
        }

        if(errors.password||errors.pin)
        {
            this.setState({errors,loading:false})
        }
        else
        {
            let dataObj = {
                user_id,
                xtoken,
                password:password1,
                pin:pin1
            }
    
            var formBody = [];
            for (var key in dataObj) {
                var encodedKey = encodeURIComponent(key);
                var encodedValue = encodeURIComponent(dataObj[key]);
                formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
    
            console.log(formBody)
            
            fetch(API.SETTING_PASSWORD_PIN, {
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
                    this.setState({loading:false,error:{}})
                    this.props.navigation.goBack()
                }
                else if(responseJson.error==="1")
                {
                    this.setState({loading:false,error:languageString["common-error-network"]})
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

    componentDidMount()
    {

        AsyncStorage.getItem('xtoken').then(value =>
        this.setState({ xtoken: value })
        );
        AsyncStorage.getItem('user_id').then(value =>
        this.setState({ user_id: value })
        );
    }

    handleShowPassword = () => {
        this.setState({ShowPass:!this.state.ShowPass})
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
                            <Text style={CommonStyles.modalHeaderText}>{languageString["settings-title-privacysecurity"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <Image style={CommonStyles.logo} source={logo} />
                            <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-privacysecurity"]}</Text>
                            {!this.state.errors.password?null:
                                <View style={CommonStyles.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.errors.password}</Text>
                                </View>
                            }
                            {!this.state.errors.pin?null:
                                <View style={CommonStyles.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.errors.pin}</Text>
                                </View>
                            }
                            <Text style={CommonStyles.textSmall}>{languageString["join-security-password-instructions"]}</Text>
                            <Text style={CommonStyles.textSmall}>{languageString["join-security-password-instructions1"]}</Text>
                            
                            <View style={PasswordPinStyle.textInputContainer}>
                                <TextInput
                                    placeholder={languageString["settings-label-password"]}
                                    onChangeText={val=>{this.handleInputChange(val,"password1")}}
                                    secureTextEntry={!this.state.ShowPass}
                                    style={PasswordPinStyle.textInput}
                                />
                                <TouchableOpacity onPress={this.handleShowPassword}>
                                    <Image source={this.state.ShowPass?hide:show} style={PasswordPinStyle.HideShowIcon} />
                                </TouchableOpacity>
                            </View>
                        
                            <TextInputComponent
                                placeholder = {languageString["join-security-lable-password2"]}
                                onChangeText={val=>{this.handleInputChange(val,"password2")}}
                                secureTextEntry={!this.state.ShowPass}
                            />

                            <Text style={PasswordPinStyle.textMargin}>{languageString["join-security-pin-instructions"]}</Text>
                            <TextInputComponent
                                placeholder = {languageString["join-security-lable-pin"]}
                                onChangeText={val=>{this.handleInputChange(val,"pin1")}}
                            />
                            <TextInputComponent
                                placeholder = {languageString["join-security-lable-pin2"]}
                                onChangeText={val=>{this.handleInputChange(val,"pin2")}}
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

