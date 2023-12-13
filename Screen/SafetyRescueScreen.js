import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import languageString from '../Constant/languageString';
import bgImg from '../Image/bg_blue.png';
import CommonStyles from './CommonStyles';
import SafetyRescueStyle from './SafetyRescueStyle';
import API from '../Constant/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';
import DeviceInfo from 'react-native-device-info';

export default class ContactScreen extends Component {

    state={
        q1:"",
        q2:"",
        q3:"",
        a1:"",
        a2:"",
        a3:"",
        user_id:"",
        error: false,
        loading: true
    }

    async componentDidMount()
    {
        await AsyncStorage.getItem('user_id').then(value =>{
            this.setState({ user_id: value })
        })

        let dataObj = {
            user_id: this.state.user_id
        }

        console.log(dataObj)

        var formBody = [];
        for (var key in dataObj) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataObj[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        console.log(formBody)
        
        fetch(API.GET_SAFETY_QUESTIONS, {
            method: 'POST',
            body: formBody,
            headers: {
            //Header Defination
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
        .then(async response => response.json())
        .then(async responseJson => {
           
            if(responseJson.error==="0")
            {
                this.setState({q1:responseJson.q1,q2:responseJson.q2,q3:responseJson.q3,loading:false})
            }
            else
            {
                this.setState({loading:false})
            }
        }).catch(err=>{
            this.setState({loading:false})
        })
    }

    handleTextChange = (type,val) => {
        if(type===1)
            this.setState({a1:val})
        if(type===2)
            this.setState({a2:val})
        if(type===3)
            this.setState({a3:val})
    }

    handleSubmit = () => {

        this.setState({loading:true})

        let dataObj =  {
            user_id: this.state.user_id,
            device_uuid: DeviceInfo.getUniqueId(),
            language: "en",
            a1: this.state.a1,
            a2: this.state.a2,
            a3: this.state.a3
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
        
        fetch(API.SAFETY_QUESTIONS_LOGIN, {
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
                AsyncStorage.setItem('xtoken', responseJson.xtoken).then(()=>{
                    this.props.navigation.navigate("SetupAccountScreen")
                })
            }
            else
            {
                this.setState({loading:false,error:true})
            }
        }).catch(err=>{
            this.setState({loading:false,error:true})
        })
    }
    
    render()
    {
        console.log(this.state)
        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <Loader loading={this.state.loading} />
              <ScrollView>
                    <View style={SafetyRescueStyle.container}>
                        {this.state.error?<Image style={SafetyRescueStyle.error_icon} source={require('../Image/icon_pop.png')} />:
                            <Image style={SafetyRescueStyle.icon} source={require('../Image/icon_celebrate.png')} 
                        />}
                        <Text style={SafetyRescueStyle.title}>{this.state.error?languageString["rescued-title-incorrect"]:languageString["rescued-title-hooray"]}</Text>

                        <Text style={SafetyRescueStyle.lightblue}>{languageString["rescued-txt-hooray"]}</Text>

                        <Text style={SafetyRescueStyle.white}>{this.state.q1?this.state.q1:"?"}</Text>
                        <TextInput onChangeText={val=>this.handleTextChange(1,val)} placeholder={languageString["settings-ph-answer"]} style={SafetyRescueStyle.textInput} />
                        <Text style={SafetyRescueStyle.white}>{this.state.q1?this.state.q1:"?"}</Text>
                        <TextInput onChangeText={val=>this.handleTextChange(2,val)} placeholder={languageString["settings-ph-answer"]} style={SafetyRescueStyle.textInput} />
                        <Text style={SafetyRescueStyle.white}>{this.state.q1?this.state.q1:"?"}</Text>
                        <TextInput onChangeText={val=>this.handleTextChange(3,val)} placeholder={languageString["settings-ph-answer"]} style={SafetyRescueStyle.textInput} />

                        <TouchableOpacity onPress={this.handleSubmit} style={SafetyRescueStyle.btn}>
                            <Text style={SafetyRescueStyle.btnText}>{languageString["rescued-btn-submit"]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("RegisterScreen")}>
                            <Text style={SafetyRescueStyle.white}>{languageString["rescued-btn-start-over"]}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

