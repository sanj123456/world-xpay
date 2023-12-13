import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextInput from '../Components/TextInput';
import languageString from '../../Constant/languageString';
import bgImg from '../../Image/bg_blue.png';
import CommonStyles from '../CommonStyles';
import UnlockStyle from './UnlockStyle';
import btn_yellow from '../../Image/btn-yellow.png'
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../Constant/API';
import Loader from '../Components/loader';

export default class PrivacyTermsScreen extends Component {

    state={
        pin:"",
        xtoken:"",
        user_id:"",
        error:"",
        loading:true,
    }

    async componentDidMount()
    {
        let user_id = await AsyncStorage.getItem('user_id')
        let xtoken = await AsyncStorage.getItem('xtoken')

        this.setState({user_id,xtoken,loading:false})
    }

    handleChangePin = val => {
        this.setState({pin:val})
    }

    handleSubmit = () => {
        
        this.setState({loading:true})

        let dataObj = {
            user_id:this.state.user_id,
            xtoken:this.state.xtoken,
            pin:this.state.pin
        }

        var formBody = [];
        for (var key in dataObj) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataObj[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(API.ENTER_PIN, {
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
                this.setState({loading:false,error:""})
                AsyncStorage.setItem('locked',"false").then(()=>{
                    this.props.navigation.navigate("HomeScreen")
                })
            }
            else if(responseJson.error==="1")
            {
                this.setState({loading:false,error:languageString["settings-error-authorization"]})
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
                            <Text style={CommonStyles.modalHeaderText}>{languageString["unlock-title"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            {!this.state.error?null:
                                <View style={CommonStyles.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.error}</Text>
                                </View>
                            }
                            <Text style={UnlockStyle.txt}>{languageString["unlock-label-pin"]}</Text>
                            <TextInput onChangeText={this.handleChangePin} />
                            <TouchableOpacity onPress={this.handleSubmit} style={UnlockStyle.btn}>
                                <Image style={UnlockStyle.btnImg} source={btn_yellow} />
                                <Text style={UnlockStyle.btnText}>{languageString["unlock-btn-unlock"]}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

