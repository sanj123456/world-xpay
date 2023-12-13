import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import TextInput from '../../../Components/TextInput';
import languageString from '../../../../Constant/languageString';
import bgImg from '../../../../Image/bg_blue.png';
import CommonStyles from '../../../CommonStyles';
import logo from '../../../../Image/xc-sym-white.png';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Components/loader';
import API from '../../../../Constant/API';
import ResetRescueStyle from './ResetRescueStyle';

export default class ResetRescueScreen extends Component {

    state={
        NextClicked: false,
        xtoken:"",
        user_id:"",
        q1:"",
        q2:"",
        q3:"",
        a1:"",
        a2:"",
        a3:"",
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

    handleInputChange = (val,type) => {
        if(type==="q1")
            this.setState({q1:val})
        if(type==="q2")
            this.setState({q2:val})
        if(type==="q3")
            this.setState({q3:val})
        if(type==="a1")
            this.setState({a1:val})
        if(type==="a2")
            this.setState({a2:val})
        if(type==="a3")
            this.setState({a3:val})
    }

    handleNextClick = () =>{
        this.setState({NextClicked:!this.state.NextClicked})
    }

    handleSave = () => {

        this.setState({loading:true})

        const {user_id,xtoken,q1,q2,q3,a1,a2,a3} = this.state

        let dataObj = {user_id,xtoken,q1,q2,q3,a1,a2,a3}

        var formBody = [];
        for (var key in dataObj) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataObj[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        //console.log(formBody)
        
        fetch(API.SETTING_RESET_RESCUE, {
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
                    {!this.state.NextClicked?
                        <ScrollView>
                            <View style={CommonStyles.modalHeader}>
                                <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                                <Text style={CommonStyles.modalHeaderText}>{languageString["settings-title-resetrescue"]}</Text>
                            </View>
                            <View style={CommonStyles.modalBody} >
                                <Image style={CommonStyles.logo} source={logo} />
                                <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-resetrescue"]}</Text>
                                <Text style={ResetRescueStyle.textHeading}>{languageString["settings-txt-intheevent"]}</Text>
                                {!this.state.error?null:
                                <View style={ResetRescueStyle.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.error}</Text>
                                </View>
                                }
                                <Text style={CommonStyles.textSmall} >{languageString["settings-label-question-1"]}</Text>
                                <TextInput
                                    onChangeText={val=>{this.handleInputChange(val,"q1")}}
                                    placeholder={languageString["settings-ph-q1"]}
                                />
                                <Text style={CommonStyles.textSmall} >{languageString["settings-label-question-2"]}</Text>
                                <TextInput
                                    onChangeText={val=>{this.handleInputChange(val,"q2")}}
                                    placeholder={languageString["settings-ph-q2"]}
                                />
                                <Text style={CommonStyles.textSmall} >{languageString["settings-label-question-3"]}</Text>
                                <TextInput
                                    onChangeText={val=>{this.handleInputChange(val,"q3")}}
                                    placeholder={languageString["settings-ph-q3"]}
                                />
                                <TouchableOpacity onPress={this.handleNextClick} style={ResetRescueStyle.Graybtn} >
                                    <Text style={CommonStyles.btnText}>{this.state.NextClicked?languageString["settings-btn-back"]:languageString["settings-btn-next"]}</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>:
                        <ScrollView>
                            <View style={CommonStyles.modalHeader}>
                                <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                                <Text style={CommonStyles.modalHeaderText}>{languageString["settings-title-resetrescue"]}</Text>
                            </View>
                            <View style={CommonStyles.modalBody} >
                                <Image style={CommonStyles.logo} source={logo} />
                                <Text style={CommonStyles.Subtitle}>{languageString["settings-subtitle-resetrescue"]}</Text>
                                <Text style={ResetRescueStyle.textHeading}>{languageString["settings-txt-enter-answers"]}</Text>
                                {!this.state.error?null:
                                <View style={ResetRescueStyle.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.error}</Text>
                                </View>
                                }
                                {this.state.q1?<Text style={ResetRescueStyle.textSmall} >{this.state.q1}</Text>:null}
                                <TextInput
                                    onChangeText={val=>{this.handleInputChange(val,"a1")}}
                                    placeholder={languageString["settings-ph-answer"]}
                                />
                                {this.state.q2?<Text style={ResetRescueStyle.textSmall} >{this.state.q2}</Text>:null}
                                <TextInput
                                    onChangeText={val=>{this.handleInputChange(val,"a2")}}
                                    placeholder={languageString["settings-ph-answer"]}
                                />
                                {this.state.q3?<Text style={ResetRescueStyle.textSmall} >{this.state.q3}</Text>:null}
                                <TextInput
                                    onChangeText={val=>{this.handleInputChange(val,"a3")}}
                                    placeholder={languageString["settings-ph-answer"]}
                                />
                                <TouchableOpacity onPress={this.handleNextClick} style={ResetRescueStyle.Graybtn} >
                                    <Text style={CommonStyles.btnText}>{this.state.NextClicked?languageString["settings-btn-back"]:languageString["settings-btn-next"]}</Text>
                                </TouchableOpacity>
                               
                                <TouchableOpacity onPress={this.handleSave} style={[CommonStyles.btn,{marginTop:-10}]} >
                                    <Text style={CommonStyles.btnText}>{languageString["settings-btn-save"]}</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </ScrollView>
                    }
                </View>
            </ImageBackground>
        )
    }
}

