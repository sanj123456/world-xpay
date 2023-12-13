import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    } from 'react-native';
import languageString from '../../Constant/languageString';
import CommonStyles from '../CommonStyles';
import WalletCardListStyle from '../card/WalletCardListStyle';
import OfferPaymentStyle from './OfferPaymentStyle';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/loader';
import API from '../../Constant/API';

export default class OffersScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          loading:true,
          xtoken:"",
          user_id:"",
          card_list:[],
        }
    }

    handlePayment = (card) => {

      this.setState({loading:true})
      
      let offer = this.props.navigation.getParam("offer")
      // this.props.navigation.navigate("PurchaseErrorScreen")

      let dataObj = {
        user_id: this.state.user_id,
        method_id: card.method_id,
        reflex: null,
        method_array: null,
        share: null,
        history: null,
        xtoken: this.state.xtoken,
        purchase_code_id: offer.purchase_code_id,
        barcode: offer.purchase_code,
        xgift_method: card.method_id,
        tip: offer.add_tip
      }

      console.log("bbb",dataObj)

      var formBody = [];
      for (var key in dataObj) {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(dataObj[key]);
          formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      console.log(formBody)
      
      fetch(API.PAYMENT_REQUEST, {
          method: 'POST',
          body: formBody,
          headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
      })
      .then(async response => response.json())
      .then(async responseJson => {

        this.setState({loading:false})

        if(responseJson.error==="0")
        {
          AsyncStorage.getItem('user_history').then(value =>{
            let new_transaction = {
              xtransaction_id: responseJson.acquirer_transaction_id,
              date: responseJson.transaction_timestamp,
              merchant_id: offer.merchant_id,
              merchant_name: offer.merchant_name,
              location_id: offer.location_id,
              location_name: offer.location_name,
              currency: offer.currency,
              amount: offer.amount,
              method_id: card.method_id,
              authorize: 0
            }
            console.log("new",new_transaction)
            let transactions=[]
            if(value)
            {
              transactions = JSON.parse(value)
              transactions = [new_transaction,...transactions]
            }
            else
            {
              transactions = [new_transaction]
            }

            AsyncStorage.setItem('user_history',JSON.stringify(transactions)).then(val =>{
              this.props.navigation.navigate("PaymentSuccessScreen",{offer})
            })
          }
          );
        }
        else
        {
          let errorcode;
          let error={};
          if(responseJson.error==="1"||responseJson.error==="2")
          {
            errorcode="401"
          }
          else if(responseJson.error==="3"||responseJson.error==="7")
          {
            errorcode="403"
          }
          else if(responseJson.error==="4"||responseJson.error==="5")
          {
            errorcode="404"
          }
          else if(responseJson.error==="6")
          {
            errorcode="406"
          }
          else
          {
            errorcode="408"
          }

          error.title = languageString["purchase-error-title-" + errorcode]
          error.issue = languageString["purchase-error-issue-" + errorcode]
          error.resolution = languageString["purchase-error-resolution-" + errorcode]
          error.resolutionHeader = languageString["purchase-error-resolution"]

          this.props.navigation.navigate("PurchaseErrorScreen",{error})
        }
      }).catch(err=>{
          this.setState({loading:false})
          let error={};
          error.title = languageString["purchase-error-title-408"]
          error.issue = languageString["purchase-error-issue-408"]
          error.resolution = languageString["purchase-error-resolution-408"]
          error.resolutionHeader = languageString["purchase-error-resolution"]
          this.props.navigation.navigate("PurchaseErrorScreen",{error})
      })
    }

    async componentDidMount() {
        await AsyncStorage.getItem('xtoken').then(value =>
          this.setState({ xtoken: value })
        );
        await AsyncStorage.getItem('user_id').then(value =>
          this.setState({ user_id: value })
        );
        await AsyncStorage.getItem('card_list').then(value =>
          this.setState({ card_list: value===null?[]:JSON.parse(value),loading:false })
        );
    }

    renderCard = () => {
        const {
          nicknameLabel,
          cardRow,
          cardEditIcon,
          cardview1,
          eachCard
        } = OfferPaymentStyle;
        return this.state.card_list.map((card,index) =>
          <View style={eachCard} key={index}>
            <ImageBackground style={cardRow} source={{ uri: card.base64 }} >
              <Text style={nicknameLabel}>{card.nickname}</Text>
              <View style={cardview1}>
                <TouchableOpacity onPress={()=>this.handlePayment(card)} style={OfferPaymentStyle.selectCardButton}>
                  <Image style={cardEditIcon} source={require('../../Image/icon_select.png')} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        );
      }

    render()
    {

      const offer = this.props.navigation.getParam("offer")
      console.log(offer)

        const {
            pagelabel,
            viewMainStyle,
            backgroundImageBorder,
            backgroundImage
          } = WalletCardListStyle;
        return (
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../Image/bg_blue.png')}
            >
              <Loader loading={this.state.loading} />
                <View style={viewMainStyle}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={OfferPaymentStyle.title}>{languageString['purchase-approve-title']}</Text>
                      <Text style={OfferPaymentStyle.merchant_name}>{offer.merchant_name}</Text>
                      <Text style={OfferPaymentStyle.location}>{offer.location_name}</Text>
                      <Text style={OfferPaymentStyle.amount}>${offer.amount}</Text>
                      <Text style={OfferPaymentStyle.smallWhiteText}>{languageString['purchase-approve-txt-noxgift']}</Text>
                    </View>
                    
                    <View style={backgroundImageBorder}>
                    <ImageBackground source={require('../../Image/bg_screen_dk_50.png')} style={backgroundImage}>
                      <ScrollView>
                        <View style={WalletCardListStyle.cardview}>
                        {this.renderCard()}
                        </View>
                      </ScrollView>
                    </ImageBackground>
                    </View>
                    
                  </ScrollView>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("HomeScreen")} style={OfferPaymentStyle.bottomBtn}>
                  <Text style={OfferPaymentStyle.btnText}>{languageString["purchase-btn-cancel"]}</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}