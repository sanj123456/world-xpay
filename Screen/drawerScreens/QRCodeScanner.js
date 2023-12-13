'use strict';
 
import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/loader';
import languageString from '../../Constant/languageString';
import API from '../../Constant/API';
 
export default class ScanScreen extends Component {

  state={
    loading:false,
    xtoken:"",
    user_id:"",
    card_list:[],
  }

  onSuccess = e => {

    let dataObj = {
      user_id: this.state.user_id,
      xtoken: this.state.xtoken,
      barcode: e.data
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
    
    fetch(API.BARCODE_REQUEST, {
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

      console.log("res",responseJson)

      if(responseJson.error==="0")
      {
        let offer={
          purchase_code_id: responseJson.purchase_code_id,
          purchase_code: e.data,
          merchant_name: responseJson.name,
          location_name: responseJson.location,
          amount: responseJson.amount,
          currency: responseJson.currency,
          xgift_transaction: responseJson.xgift_transaction,
          add_tip: "0",
          merchant_id: responseJson.merchant_id,
          location_id: responseJson.location_id
        }

        this.props.navigation.navigate("OfferPaymentScreen",{offer})
      }
      else
      {
        let errorcode;
        let error={};
        if(responseJson.error==="1")
        {
          errorcode="301"
        }
        else if(responseJson.error==="2")
        {
          errorcode="302"
        }
        else if(responseJson.error==="3")
        {
          errorcode="303"
        }
        else if(responseJson.error==="4")
        {
          errorcode="304"
        }
        else if(responseJson.error==="5")
        {
          errorcode="305"
        }
        else
        {
          errorcode="306"
        }

        error.title = languageString["purchase-error-title"]
        error.issue = languageString["purchase-error-issue-" + errorcode]
        error.resolution = languageString["purchase-error-resolution-" + errorcode]
        error.resolutionHeader = languageString["purchase-error-resolution-title"]

        if(responseJson.error==="3")
          error.issue+=languageString["purchase-suberror-303-" + responseJson.code_status]

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
  };

  async componentDidMount() {
    await AsyncStorage.getItem('xtoken').then(value =>
      this.setState({ xtoken: value })
    );
    await AsyncStorage.getItem('user_id').then(value =>
      this.setState({ user_id: value })
    );
  }
 
  render() {
    return (
      <QRCodeScanner
        fadeIn={true}
        showMarker={true}
        onRead={this.onSuccess}
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Position the Purchase Code inside the box</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}
 
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    marginTop: -50,
    fontSize: 13,
    color: 'white'
  },
  buttonTouchable: {
    padding: 16
  }
});
 