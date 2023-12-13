import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import languageString from '../Constant/languageString';
import bgImg from '../Image/bg_blue.png';
import CommonStyles from './CommonStyles';
import LoginStyle from './LoginStyle';
import API from '../Constant/API';
import Loader from './Components/loader';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { cond } from 'react-native-reanimated';

export default class ContactScreen extends Component {

    state={
        email: "",
        password: "",
        loading: true,
        error:"",
        device_uuid:null,
        device_version:null,
        device_manufacturer:null,
        device_serial:null,
        device_model:null,
        txt_device_id:null
    }

    async componentDidMount()
    {
        let device_manufacturer = await DeviceInfo.getManufacturer()
        let device_version = await DeviceInfo.getVersion()
        let device_serial = await DeviceInfo.getSerialNumber()
        let device_uuid = await DeviceInfo.getUniqueId()
        let device_model = await DeviceInfo.getModel()
        let txt_device_id = await AsyncStorage.getItem("device_token")

        this.setState({device_uuid,device_version,device_manufacturer,device_serial,device_model,txt_device_id,loading:false})
    }

    handleEmail = val => {
        this.setState({email:val})
    }
    handlePassword = val => {
        this.setState({password:val})
    }

    handleSubmit = () => {

        this.setState({loading:true})
        
        let dataObj = {
            email: this.state.email,
            password: this.state.password,
            device_uuid: this.state.device_uuid,
            device_version: this.state.device_version,
            device_platform: Platform.OS,
            device_manufacturer: this.state.device_manufacturer,
            device_serial: this.state.device_serial,
            device_model: this.state.device_model,
            txt_device_id: this.state.txt_device_id
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
        
        fetch(API.LOGIN, {
            method: 'POST',
            body: formBody,
            headers: {
            //Header Defination
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then(async response => response.json())
        .then(async responseJson => {
           
            console.log("qqq",responseJson)
            if(responseJson.error==="0")
            {
                this.setState({loading:false})
                AsyncStorage.setItem('user_id', responseJson.user_id).then(()=>{
                    this.props.navigation.navigate("SafetyRescueScreen")
                })
            }
            else
            {
                this.setState({loading:false,error:languageString["login-error-mismatch"]})
            }
        }).catch(err=>{
            this.setState({loading:false,error:languageString["common-error-network"]})
        })
    }
    
    render()
    {
        console.log(this.state)
        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <Loader loading={this.state.loading} />
                <ScrollView>
                    <View style={LoginStyle.container}>
                        
                        <Text style={LoginStyle.title}>{languageString["login-subtitle"]}</Text>

                        <Text style={LoginStyle.whiteSmall}>{languageString["login-lable-email"]}</Text>
                        <TextInput onChangeText={this.handleEmail} placeholder={languageString["safety-lable-phone-email"]} style={LoginStyle.textInput} />
                        <Text style={LoginStyle.whiteSmall}>{languageString["login-lable-password"]}</Text>
                        <TextInput onChangeText={this.handlePassword} secureTextEntry placeholder={languageString["safety-lable-password"]} style={LoginStyle.textInput} />
                        

                        <TouchableOpacity onPress={this.handleSubmit} style={LoginStyle.btn}>
                            <Text style={LoginStyle.btnText}>{languageString["login-btn-login"]}</Text>
                        </TouchableOpacity>

                        <Text style={LoginStyle.whiteSmall}>{languageString["login-txt-no-account"]}</Text>

                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Text style={LoginStyle.blueText}>{languageString["login-btn-get-one"]}</Text>
                        </TouchableOpacity>
                        
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

