import React , {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  } from 'react-native';
import WalletAddCardStyle from './WalletAddCardStyle';
import API from '../../Constant/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/loader';
import languageString from '../../Constant/languageString';
class WalletAddCardScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      card_number: "",
      card_exp: "",
      card_code: "",
      card_name: "",
      card_zip: "",
      card_nick: "",
      errorMessage:"",
      loading:false,
      xtoken:"",
      user_id:"",
      method:""
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('xtoken').then(value =>
      this.setState({ xtoken: value })
    );
    AsyncStorage.getItem('user_id').then(value =>
      this.setState({ user_id: value })
    );
    AsyncStorage.getItem('method').then(value =>
      this.setState({ method: value })
    );
  }

async saveCard() {
    if (this.state.card_number == "") {
      alert(languageString['wallet-validation-card_number']);
      return;
    }
    if (this.state.card_exp == "") {
      alert(languageString['wallet-validation-card_exp']);
      return;
    }
    if (this.state.card_code == "") {
      alert(languageString['wallet-validation-card_code']);
      return;
    }
    if (this.state.card_name == "") {
      alert(languageString['wallet-validation-card_name']);
      return;
    }
    if (this.state.card_zip == "") {
      alert(languageString['wallet-validation-card_zip']);
      return;
    }
    if (this.state.card_nick == "") {
      alert(languageString['wallet-validation-card_nick']);
      return;
    } 
    
    if (this.state.xtoken != '' && this.state.user_id != '') {
      this.setState({ loading: true });
      var dataToSend = {
        user_id: this.state.user_id,
        xtoken: this.state.xtoken,
        card_number: this.state.card_number,
        card_exp: this.state.card_exp,
        card_code: this.state.card_code,
        card_name: this.state.card_name,
        card_zip: this.state.card_zip,
        card_nick: this.state.card_nick
      };
      console.log("send xtoken", dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      await fetch(API.WALLET_ADD_CARD, {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then(async response => response.json())
      .then(async responseJson => {
          var error = responseJson.error;
          var xtoken = responseJson.xtoken;
          //Hide Loader
          this.setState({ loading: false });
          console.log(responseJson);
          const cardToBeSaved = responseJson;
          if (error === "0") {
            const existingCards = await AsyncStorage.getItem('card_list')
            let newCard = JSON.parse(existingCards);
            if (!newCard) {
              newCard = []
            }
            newCard.push(cardToBeSaved);
            await AsyncStorage.setItem('card_list', JSON.stringify(newCard))
              .then(() => {
                // console.log('It was saved successfully', newCard)
               
              })
              .catch(() => {
                console.log('There was an error saving the product')
              })
            await AsyncStorage.setItem('method', '1');  
            this.setState({ method: '1' });
            this.props.navigation.navigate('WalletCardListScreen')
          } else {
            if (error === "2") {
              this.state.errorMessage = "(ec:202) "+languageString['common-error-network'];
            } else if (error === "3") {
              this.state.errorMessage = "(ec:202) " + languageString['wallet-error-203'];
            } else if (error === "4") {
              this.state.errorMessage = "(ec:204) " +languageString['wallet-error-204'];
            } else if (error === "5") {
              this.state.errorMessage = "(ec:205) " +languageString['common-error-token'];
            } else if (error === "10") {
              this.state.errorMessage = "(ec:210) " +languageString['wallet-error-210'];
            } else {
              this.state.errorMessage = "(ec:206) " +languageString['wallet-error-206'];
            }
          }
        })
        .catch(error => {
          //Hide Loader
          this.setState({ loading: false });
          this.state.errorMessage = languageString['common-error-network'];
        });
    } else {
      alert(languageString['common-error-token']);
      return;
    }
  };
  render(){
    const {
      pagelabel,
      sectionStyle,
      inputStyle,
      buttonStyle,
      buttonTextStyle,
      pageSublabel,
      viewMainStyle,
      questionLabel,
      errorMessage,
      errorTextStyle
    } = WalletAddCardStyle;
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../Image/bg_blue.png')}
      >
        <Loader loading={this.state.loading} />
        <View style={viewMainStyle}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ alignItems: 'center' }}>
              {/* <Image
                source={require('../../Image/xc-sym-white.png')}
                style={xpayImage}
              /> */}
              <Text h1 style={pagelabel}>{languageString['wallet-btn-add-card']}</Text>
              <Text h4 style={pageSublabel}>{languageString['wallet-subtitle-card-types']}</Text>
            </View>
            <KeyboardAvoidingView enabled>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['wallet-label-card-number']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ card_number: text })}
                  underlineColorAndroid="#FFFFFF"
                  placeholderTextColor="#333"
                  keyboardType="numeric"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={this.state.card_number}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['wallet-label-card-exp']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ card_exp: text })}
                  placeholder={languageString['wallet-ph-card-exp']}
                  placeholderTextColor="#333"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  maxLength={4}
                  value={this.state.card_exp}
                  keyboardType="numeric"
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['wallet-label-card-code']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ card_code: text })}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  value={this.state.card_code}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['wallet-label-card-name']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ card_name: text })}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={this.state.card_name}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['wallet-label-card-zip']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ card_zip: text })}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={this.state.card_zip}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['wallet-label-card-nick']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ card_nick: text })}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={this.state.card_nick}
                />
              </View>
              <View style={errorMessage}>
                {this.state.errorMessage != '' ? (
                  <Text style={errorTextStyle}> {this.state.errorMessage} </Text>
                ) : null}
              </View>
              <TouchableOpacity
                style={buttonStyle}
                onPress={() => this.saveCard()}
              >
                <Text style={buttonTextStyle}>{languageString['wallet-btn-add-card']}</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </ImageBackground>

    );

  }

}
export default WalletAddCardScreen;