import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import languageString from '../../../../Constant/languageString';
import bgImg from '../../../../Image/bg_blue.png';
import NotificationStyle from './NotificationStyle';
import CommonStyles from '../../../CommonStyles';
import logo from '../../../../Image/xc-sym-white.png';
import RadioButton from '../../../Components/RadioButton';
import CheckBox from '../../../Components/CheckBox';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Components/loader';
import API from '../../../../Constant/API';

export default class NotificationScreen extends Component {

    state={
        xtoken:"",
        user_id:"",
        pin:"",
        loading:false,
        error:"",
        radio:"btn1",
        check1: false,
        check2: false
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

    handleRadioClick = (value) => {
        this.setState({radio:value})
    }

    handleCheckBox = (value) => {
        this.setState({ [value]: !this.state[value] });
    }

    handleSave = () => {

        this.setState({loading:true})

        const {user_id,xtoken,radio,check1,check2} = this.state

        let dataObj = {
            user_id,
            xtoken
        }
        if(radio==="btn1")
            dataObj.push_optin = "1"
        if(radio==="btn2")
            dataObj.push_optin = "2"
        if(radio==="btn3")
            dataObj.push_optin = "0"
        if(check1&&check2)
        {
            dataObj.email_optin="3"
        }
        else
        {
            if(check1)
                dataObj.email_optin="1"
            else if(check2)
                dataObj.email_optin="2"
            else
                dataObj.email_optin="0"
        }

        console.log(dataObj)

        var formBody = [];
        for (var key in dataObj) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataObj[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        //console.log(formBody)
        
        fetch(API.SETTING_NOTIFICATION, {
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
                            <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-notifications"]}</Text>
                            {!this.state.error?null:
                                <View style={CommonStyles.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.error}</Text>
                                </View>
                            }
                            <Text style={NotificationStyle.textSmall}>{languageString["settings-txt-send-email"]}</Text>
                            <TouchableOpacity onPress={()=>{this.handleCheckBox("check1")}} style={CommonStyles.Graybtn} >
                                <CheckBox clicked={this.state.check1} />
                                <Text style={CommonStyles.btnText}>{languageString["settings-label-announcements"]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.handleCheckBox("check2")}} style={CommonStyles.Graybtn} >
                                <CheckBox clicked={this.state.check2} />
                                <Text style={CommonStyles.btnText}>{languageString["settings-label-thirdparty"]}</Text>
                            </TouchableOpacity>
                            <Text style={NotificationStyle.textSmall}>{languageString["settings-txt-push-notifications"]}</Text>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick("btn1")}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio==="btn1"}/>
                                <Text style={CommonStyles.btnText}>{languageString["settings-label-merchants-frequent"]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick("btn2")}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio==="btn2"}/>
                                <Text style={CommonStyles.btnText}>{languageString["settings-label-merchants-all"]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick("btn3")}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio==="btn3"}/>
                                <Text style={CommonStyles.btnText}>{languageString["settings-label-none"]}</Text>
                            </TouchableOpacity>
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


