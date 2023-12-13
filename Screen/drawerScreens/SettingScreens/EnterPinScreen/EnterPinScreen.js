import React, {Component} from 'react';

//Import all required component
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import TextInput from '../../../Components/TextInput';
import languageString from '../../../../Constant/languageString';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../Components/loader';
import bgImg from '../../../../Image/bg_blue.png';
import API from '../../../../Constant/API';
import EnterPinStyle from './EnterPinStyle';
import CommonStyles from '../../../CommonStyles';

export default class EnterPinScreen extends Component {

    state={
        xtoken:"",
        user_id:"",
        pin:"",
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

    handleChangePin = (val) => {
        this.setState({pin:val})
    }
    
    SubmitPin = () => {
    
        this.setState({loading:true})

        const {xtoken,user_id,pin} = this.state

        let dataObj = {
            user_id,
            xtoken,
            pin
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
                this.props.navigation.navigate("AppSettings")
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
                            <Text onPress={()=>{this.props.navigation.navigate('HomeScreen')}} style={CommonStyles.closeBtn}>X</Text>
                            <Text style={CommonStyles.modalHeaderText}>{languageString["settings-btn-authorize"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <Text style={EnterPinStyle.textGrayBig}>{languageString["settings-subtitle-authorization"]}</Text>
                            {!this.state.error?<Text style={EnterPinStyle.textGraySmall}>{languageString["settings-label-enter-pin"]}</Text>:
                                <View style={CommonStyles.warningContainer}>
                                    <Text style={CommonStyles.warning}>{this.state.error}</Text>
                                </View>
                            }
                            <TextInput
                            onChangeText={this.handleChangePin}
                            value={this.state.pin}
                            />
                            <TouchableOpacity onPress={this.SubmitPin} style={CommonStyles.btn} >
                                <Text style={CommonStyles.btnText}>{languageString["settings-btn-authorize"]}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}