import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import bgImg from '../../Image/bg_blue.png';
import languageString from '../../Constant/languageString';
import CommonStyles from '../CommonStyles';
import OfferScreenStyle from './OfferScreenStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/loader';
import API from '../../Constant/API';

export default class OffersScreen extends Component {

    state={
        xtoken:"",
        user_id:"",
        error:"",
        loading:true,
        offers:[]
    }

    componentDidMount()
    {
        AsyncStorage.getItem('xtoken').then(value =>
            this.setState({ xtoken: value })
        );
        AsyncStorage.getItem('user_id').then(value =>{
            this.setState({ user_id: value })

            if(this.state.user_id&&this.state.xtoken)
            {
                let dataObj = {
                    user_id:this.state.user_id,
                    xtoken:this.state.xtoken
                }
        
                var formBody = [];
                for (var key in dataObj) {
                    var encodedKey = encodeURIComponent(key);
                    var encodedValue = encodeURIComponent(dataObj[key]);
                    formBody.push(encodedKey + '=' + encodedValue);
                }
                formBody = formBody.join('&');
        
                //console.log(formBody)
                
                fetch(API.GET_OFFERS, {
                    method: 'POST',
                    body: formBody,
                    headers: {
                    //Header Defination
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                })
                .then(async response => response.json())
                .then(async responseJson => {
                   
                    if(responseJson.error===0)
                    {
                        this.setState({loading:false,offers:responseJson.purchase_codes})
                    }
                    else
                    {
                        this.setState({loading:false,error:languageString["common-error-token"]})
                    }
                }).catch(err=>{
                    this.setState({loading:false,error:languageString["common-error-network"]})
                })
            }
        }
        );
    }

    handleClick = (offer) => {

        console.log(offer)

        this.setState({loading:true})

        if (this.state.user_id && this.state.xtoken) {
            let dataObj = {
                user_id: this.state.user_id,
                xtoken: this.state.xtoken,
                purchase_code_id: offer.message.match(/purchasecode_id: (.*?) /)[1]
            }

            var formBody = [];
            for (var key in dataObj) {
                var encodedKey = encodeURIComponent(key);
                var encodedValue = encodeURIComponent(dataObj[key]);
                formBody.push(encodedKey + '=' + encodedValue);
            }
            formBody = formBody.join('&');
            fetch(API.PURCHASE_OFFER, {
                method: 'POST',
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            })
            .then(async response => response.json())
            .then(async data => {
                if (data.error === 0) {
                    console.log("data",data)
                        if (data.purchase_code && data.code_status != 4 ) {
                            this.setState({loading:false})
                            var amount = data.purchase_code.split('-')[3]
                            // var newamount = Number(amount + (amount * tip) / 100).toFixed(2);
                            //purchase_code_array = data.purchase_code.split("-");
                            // purchase_code_array.push(purchase_code_id);
                            // await AsyncStorage.setItem('purchase_code_array', purchase_code_array);
                            // await AsyncStorage.setItem("merchant_id", data.merchant_id);
                            // await AsyncStorage.setItem("merchant_name", data.name);
                            // await AsyncStorage.setItem("location_id", data.location_id);
                            // await AsyncStorage.setItem("location_name", data.location);
                            // await AsyncStorage.setItem("purchase_code_id", data.purchase_code_id);
                            // await AsyncStorage.setItem("currency", data.currency);
                            // await AsyncStorage.setItem("xgift_transaction", data.xgift_transaction); //1/0
                            // await AsyncStorage.setItem("is_add_tip", data.add_tip); //1/0
                            offer.purchase_code_id = data.purchase_code_id
                            offer.purchase_code = data.purchase_code+"-"+data.purchase_code_id
                            offer.merchant_name = data.name
                            offer.location_name = data.location
                            offer.amount = amount
                            offer.xgift_transaction = data.xgift_transaction
                            offer.add_tip = data.add_tip
                            offer.merchant_id = data.merchant_id
                            offer.location_id = data.location_id
                            offer.currency = data.currency
                            this.props.navigation.navigate("PurchaseOfferScreen", { offer: offer })
                        } else {
                            this.setState({loading:false})
                            alert("Already been redeemed.");
                        }
                        
                } else if (data.error === 5) {
                    this.setState({ loading: false, error: languageString["purchase-error-issue-305"] })
                }
                else {
                        this.setState({ loading: false, error: languageString["common-error-token"] })
                }
                }).catch(err => {
                    this.setState({ loading: false, error: languageString["common-error-network"] })
                })
        }
    }

    render()
    {
        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <ScrollView>
                    <Loader loading={this.state.loading} />
                    <View style={OfferScreenStyle.container}>
                        <Text style={OfferScreenStyle.title}>{languageString["messages-subtitle"]}</Text>

                        {this.state.error != '' ? (
                            <View style={CommonStyles.warningContainer}>
                                <Text style={CommonStyles.warning}>{this.state.error}</Text>

                            </View>
                        ) : null}
                        {this.state.offers.length?this.state.offers.map((offer,index)=>{
                            return (
                                <TouchableOpacity onPress={()=>{this.handleClick(offer)}} key={index} style={OfferScreenStyle.offerContainer}>
                                    <Text style={OfferScreenStyle.offerText}>{offer.message}</Text>
                                </TouchableOpacity>
                            )
                        }):<Text>{languageString["messages-txt-no-message"]}</Text>}
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}