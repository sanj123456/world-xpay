import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextInput from '../../../Components/TextInput';
import RadioButton from '../../../Components/RadioButton';
import languageString from '../../../../Constant/languageString';
import bgImg from '../../../../Image/bg_blue.png';
import CloseAccountStyle from './CloseAccountStyle';
import CommonStyles from '../../../CommonStyles';
import logo from '../../../../Image/xc-sym-white.png';
import CheckBox from '../../../Components/CheckBox';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Components/loader';
import API from '../../../../Constant/API';

export default class CloseAccountScreen extends Component {

    state={
        radio:0,
        xtoken:"",
        user_id:"",
        loading:false,
        error:"",
        check: 0,
        password:""
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

    handleCheckBox = () => {
        this.setState({check:1-this.state.check})
    }

    handleSubmit = () => {
        if(!this.state.radio)
            alert("Please Select one of the options.")
        else if(!this.state.check)
            alert("Please check this box if you want to proceed.")
        else
        {
            let dataObj = {
                uid: this.state.user_id,
                password: this.state.password,
                reason: this.state.radio,
                agree: this.state.check,
                xtoken: this.state.xtoken
            }

            console.log(dataObj)

            var formBody = [];
            for (var key in dataObj) {
                var encodedKey = encodeURIComponent(key);
                var encodedValue = encodeURIComponent(dataObj[key]);
                formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');

            
            fetch(API.SETTING_CLOSE_ACCOUNT, {
                method: 'POST',
                body: formBody,
                headers: {
                //Header Defination
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })
            .then(async response => response.json())
            .then(async responseJson => {

                console.log("www",responseJson)
                // if(responseJson.error==="0")
                // {
                //     this.setState({loading:false,error:""})
                //     this.props.navigation.navigate("AppSettings")
                // }
                // else if(responseJson.error==="1")
                // {
                //     this.setState({loading:false,error:languageString["settings-error-authorization"]})
                // }
                // else
                // {
                //     this.setState({loading:false,error:languageString["common-error-token"]})
                // }
            }).catch(err=>{
                this.setState({loading:false,error:languageString["common-error-network"]})
            })
        }
    }

    render()
    {
        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <Loader loading={this.state.loading} />
                <ScrollView style={CommonStyles.modal}>
                    <View style={CommonStyles.modalHeader}>
                        <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                        <Text style={CommonStyles.modalHeaderText}>{languageString["settings-title-closeaccount"]}</Text>
                    </View>
                    <View style={CommonStyles.modalBody} >
                        <Image style={CommonStyles.logo} source={logo} />
                        <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-closeaccount"]}</Text>
                        <Text style={CloseAccountStyle.textSmall}>{languageString["settings-label-password"]}</Text>
                        <TextInput
                            onChangeText={val=>this.setState({password:val})}
                            secureTextEntry={true}
                        />
                        <Text style={CloseAccountStyle.textSmall} >{languageString["settings-txt-close-reason"]}</Text>
                        <TouchableOpacity onPress={()=>{this.handleRadioClick(1)}} style={CommonStyles.Graybtn} >
                            <RadioButton clicked={this.state.radio===1}/>
                            <Text style={CommonStyles.btnText}>{languageString["settings-label-not-accepted"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.handleRadioClick(2)}} style={CommonStyles.Graybtn} >
                            <RadioButton clicked={this.state.radio===2}/>
                            <Text style={CommonStyles.btnText}>{languageString["settings-label-securityconcerns"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.handleRadioClick(3)}} style={CommonStyles.Graybtn} >
                            <RadioButton clicked={this.state.radio===3}/>
                            <Text style={CommonStyles.btnText}>{languageString["settings-label-how-use"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.handleRadioClick(4)}} style={CommonStyles.Graybtn} >
                            <RadioButton clicked={this.state.radio===4}/>
                            <Text style={CommonStyles.btnText}>{languageString["settings-label-disuse"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.handleRadioClick(5)}} style={CommonStyles.Graybtn} >
                            <RadioButton clicked={this.state.radio===5}/>
                            <Text style={CommonStyles.btnText}>{languageString["settings-label-other"]}</Text>
                        </TouchableOpacity>
                        <Text style={CommonStyles.textSmall} >{languageString["settings-txt-close-warning"]}</Text>
                        <TouchableOpacity onPress={this.handleCheckBox} style={CommonStyles.Graybtn} >
                            <CheckBox clicked={this.state.check} />
                            <Text style={CommonStyles.btnText}>{languageString["settings-label-agree"]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleSubmit} style={CommonStyles.btn} >
                            <Text style={CommonStyles.btnText}>{languageString["settings-btn-closeaccount"]}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}
