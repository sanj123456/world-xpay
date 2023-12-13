import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Picker } from 'react-native';
import TextInput from '../Components/TextInput';
import languageString from '../../Constant/languageString';
import bgImg from '../../Image/bg_blue.png';
import logo from '../../Image/xc-sym-white.png';
import Loader from '../Components/loader';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../Constant/API';
import PurchaseOfferStyle from './PurchaseOfferStyle';
import CommonStyles from '../CommonStyles';

export default class ContactScreen extends Component {

    state={
        xtoken:"",
        user_id:"",
        error:"",
        loading:false,
        purchase_codes:[],
        tip: "No tip",
        choosenIndex: 0
    }
    
    render()
    {
        const offer = this.props.navigation.getParam("offer")
        console.log("offer",offer)

        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <Loader loading={this.state.loading} />
                <View style={CommonStyles.modal}>
                    <ScrollView>
                        <View style={CommonStyles.modalHeader}>
                            <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                            <Text style={CommonStyles.modalHeaderText}>{languageString["messages-title"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <View style={PurchaseOfferStyle.offerContainer}>
                                <Text style={PurchaseOfferStyle.offerText}>{offer.message}</Text>
                            </View>
                            
                            {offer.add_tip?<Text style={CommonStyles.textSmall}>{languageString["tip"]}</Text>:null}

                            {offer.add_tip?<View style={PurchaseOfferStyle.pickerContainer}>
                                <Picker style={PurchaseOfferStyle.pickerStyle}  
                                    selectedValue={this.state.tip}  
                                    onValueChange={(itemValue, itemPosition) =>  
                                        this.setState({tip: itemValue, choosenIndex: itemPosition})}  
                                    >  
                                    <Picker.Item label="No tip" value="No tip" />  
                                    <Picker.Item label="5%" value="5%" />  
                                    <Picker.Item label="10%" value="10%" />  
                                    <Picker.Item label="15%" value="15%" />  
                                    <Picker.Item label="20%" value="20%" /> 
                                    <Picker.Item label="Other" value="Other" />   
                                </Picker>
                            </View>:null}  

                            <View style={PurchaseOfferStyle.btnContainer}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate("OfferPaymentScreen",{offer})}} style={PurchaseOfferStyle.btn} >
                                    <Text style={CommonStyles.btnText}>{languageString["purchase-approve-btn"]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={PurchaseOfferStyle.Graybtn} >
                                    <Text style={CommonStyles.btnText}>{languageString["purchase-decline-btn"]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

