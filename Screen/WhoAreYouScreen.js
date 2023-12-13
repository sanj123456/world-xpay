import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, TextInput, Platform } from 'react-native';
import languageString from '../Constant/languageString';
import bgImg from '../Image/bg_red.png';
import CommonStyles from './CommonStyles';
import WhoAreYouStyle from './WhoAreYouStyle';
import API from '../Constant/API';
import Loader from './Components/loader';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

export default class ContactScreen extends Component {

    state={
        email_or_phone:"",
        email:"",
        password:"",
        pin:"",
        loading:true,
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

    handleTextChange = (type,val) => {
        if(type===1)
            this.setState({email_or_phone:val})
        if(type===2)
            this.setState({email:val})
        if(type===3)
            this.setState({password:val})
        if(type===4)
            this.setState({pin:val})
    }

    handleSubmit = () => {
        
        this.setState({loading:true})

        let dataObj = {
            id: this.state.email_or_phone,
            idtype: "phone",
            username: this.state.email,
            password: this.state.password,
            pin: this.state.pin,
            language: "en",
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
        
        fetch(API.SAFETY_WHOAREYOU_LOGIN, {
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
                this.setState({loading:false})
                AsyncStorage.setItem('user_id', responseJson.user_id).then(()=>{
                    AsyncStorage.setItem('xtoken', responseJson.xtoken).then(()=>{
                        this.props.navigation.navigate("SetupAccountScreen")
                    })
                })
            }
            else
            {
                this.setState({loading:false})
            }
        }).catch(err=>{
            this.setState({loading:false})
        })
        
    }
    
    render()
    {
        console.log(this.state)
        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
            <Loader loading={this.state.loading} />
              <ScrollView>
                    <View style={WhoAreYouStyle.container}>
                        <Image style={WhoAreYouStyle.errorIcon} source={require('../Image/icon_ghost.png')} />
                        <Text style={WhoAreYouStyle.title}>{languageString["safety-title-spooky"]}</Text>

                        <Text style={WhoAreYouStyle.error}>{languageString["safety-txt-login"]}</Text>

                        <TextInput onChangeText={val=>this.handleTextChange(1,val)} placeholder={languageString["safety-lable-phone-email"]} style={WhoAreYouStyle.textInput} />
                        <TextInput onChangeText={val=>this.handleTextChange(2,val)} placeholder={languageString["safety-lable-username"]} style={WhoAreYouStyle.textInput} />
                        <TextInput onChangeText={val=>this.handleTextChange(3,val)} secureTextEntry placeholder={languageString["safety-lable-password"]} style={WhoAreYouStyle.textInput} />
                        <TextInput onChangeText={val=>this.handleTextChange(4,val)} placeholder={languageString["safety-lable-pin"]} style={WhoAreYouStyle.textInput} />

                        <TouchableOpacity onPress={this.handleSubmit} style={WhoAreYouStyle.btn}>
                            <Text style={WhoAreYouStyle.btnText}>{languageString["safety-btn-login"]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <Text style={WhoAreYouStyle.whiteSmall}>{languageString["safety-btn-back"]}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

