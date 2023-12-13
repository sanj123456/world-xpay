import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import WalletDeleteCardStyle from './WalletDeleteCardStyle';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../Constant/API';
import languageString from '../../Constant/languageString';
import bgImg from '../../Image/bg_blue.png';
import CommonStyles from '../CommonStyles';
import RadioButton from '../Components/RadioButton';
import Loader from '../Components/loader';
import logo from '../../Image/xc-sym-white.png';

export default class ContactScreen extends Component {

    state={
        radio:"btn1",
        xtoken:"",
        user_id:"",
        loading:false
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

    handleDeleteCard = () => {

        this.setState({loading:true})

        const card = this.props.navigation.getParam("card")
        let card_list = this.props.navigation.getParam("card_list")
        const DeleteCard = this.props.navigation.getParam("DeleteCard")

        const {user_id,xtoken} = this.state

        let dataObj = {
            user_id,
            xtoken,
            method_id: card.method_id,
            delete_type: this.state.radio==="btn1"?"card":"history"
        }

        var formBody = [];
        for (var key in dataObj) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataObj[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        //console.log(formBody)
      
        fetch(API.WALLET_DELETE_CARD, {
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
                card_list = card_list.filter(eachcard=>eachcard.method_id!==card.method_id)
                await AsyncStorage.setItem('card_list',JSON.stringify(card_list))
                DeleteCard(card_list)
                this.setState({loading:false,error:""})
                this.props.navigation.goBack()
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
                            <Text style={CommonStyles.modalHeaderText}>{languageString["wallet-title"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <Image style={CommonStyles.logo} source={logo} />
                            <Text style={CommonStyles.Subtitle}>{languageString["wallet-subtitle-verifydelete"]}</Text>
                            <Text style={[CommonStyles.textBig,{marginTop:25,marginBottom:10}]}>{languageString["wallet-txt-how-delete"]}</Text>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick("btn1")}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio==="btn1"}/>
                                <Text style={CommonStyles.btnText}>{languageString["wallet-txt-card-only"]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick("btn2")}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio==="btn2"}/>
                                <Text style={CommonStyles.btnText}>{languageString["wallet-txt-card-history"]}</Text>
                            </TouchableOpacity>
                            <View style={WalletDeleteCardStyle.warningContainer}>
                                <Text style={WalletDeleteCardStyle.warning}>{languageString["wallet-txt-warning"]}</Text>
                                <Text style={WalletDeleteCardStyle.warning}>{languageString["wallet-txt-cant-undo"]}</Text>
                            </View>
                            
                            <TouchableOpacity onPress={this.handleDeleteCard} style={CommonStyles.btn} >
                                <Text style={CommonStyles.btnText}>{languageString["wallet-btn-yesdelete"]}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

