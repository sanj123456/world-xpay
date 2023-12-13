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
import ResetRescueStyle from './ResetRescueStyle';
import API from '../../Constant/API';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/loader';
import languageString from '../../Constant/languageString';
class ResetRescueScreen extends Component{

  // state = {
  //   question_1: "",
  //   question_2: "",
  //   question_3: "",
  //   answer_1: "",
  //   answer_2: "",
  //   answer_3: "",
  //   step1: true,
  //   step2: false
  // }
  constructor(props) {
    super(props);
    this.state = {
      question_1: "",
      question_2: "",
      question_3: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      step1: true,
      step2: false,
      errorMessage:"",
      loading:false,
      xtoken:"",
      user_id:"",
      rescue: ""
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('xtoken').then(value =>
      this.setState({ xtoken: value })
    );
    AsyncStorage.getItem('user_id').then(value =>
      this.setState({ user_id: value })
    );
    AsyncStorage.getItem('rescue').then(value =>
      this.setState({ rescue: value })
    );
  }
  
// step2 = () => {
//   this.state.step2 = true;
//   this.state.step1 = false;
// };
// step1 = () => {
//     this.state.step2 = false;
//     this.state.step1 = true;
// };
// step1(){
//   alert("Step1");
//   this.setState({ step1: true });
//   this.setState({ step2: false });
// };
step2() {
  this.state.errorMessage = "";
  if (this.state.question_1 == "") {
    alert(languageString["reset-rescue-validation-question-1"]);
    return;
  }
  if (this.state.question_2 == "") {
    alert(languageString["reset-rescue-validation-question-2"]);
    return;
  }
  if (this.state.question_3 == "") {
    alert(languageString["reset-rescue-validation-question-3"]);
    return;
  }
  this.setState({ step1: false });
  this.setState({ step2: true });
};

async saveQuestion() {
    if (this.state.answer_1 == "") {
      alert(languageString['reset-rescue-validation-answer'] + this.state.question_1);
      return;
    }
    if (this.state.answer_2 == "") {
      alert(languageString['reset-rescue-validation-answer'] + this.state.question_2);
      return;
    }
    if (this.state.answer_3 == "") {
      alert(languageString['reset-rescue-validation-answer'] + this.state.question_3);
      return;
    }
    if (this.state.xtoken != '' && this.state.user_id != '') {
      this.setState({ loading: true });
      var dataToSend = {
        user_id: this.state.user_id,
        xtoken: this.state.xtoken,
        q1: this.state.question_1,
        q2: this.state.question_2,
        q3: this.state.question_3,
        a1: this.state.answer_1,
        a2: this.state.answer_2,
        a3: this.state.answer_3
      };
      console.log("send xtoken", dataToSend);
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      await fetch(API.SETTING_RESET_RESCUE, {
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
          // If server response message same as Data Matched
          if (error === "0") {
            console.log("rescue", this.state.rescue);
            if (this.state.rescue != '' && this.state.rescue != null) {
              console.log("if", this.state.rescue);
              this.props.navigation.navigate('SetupAccountScreen')
            } else {
              console.log("else", this.state.rescue);
              await AsyncStorage.setItem('rescue', 'set');
              this.setState({ rescue: "set" });
              this.props.navigation.navigate('SetupAccountScreen')
            }
          } else {
            if (error === "1") {
              this.state.errorMessage = languageString['common-error-network'];
            } else {
              this.state.errorMessage = languageString['common-error-token'];
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
      xpayImage,
      backButtonStyle,
      errorMessage,
      errorTextStyle
    } = ResetRescueStyle;

  if (this.state.step1) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../Image/bg_blue.png')}
      >

        <View style={viewMainStyle}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../Image/xc-sym-white.png')}
                style={xpayImage}

              />
              <Text h1 style={pagelabel}>{languageString['settings-subtitle-resetrescue']}</Text>
              <Text h4 style={pageSublabel}>{languageString['settings-txt-intheevent']}</Text>
            </View>
            <KeyboardAvoidingView enabled>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['settings-label-question-1']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ question_1: text })}
                  underlineColorAndroid="#FFFFFF"
                  placeholder={languageString['settings-ph-q1']}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._question_1input && this._question_1input.focus()
                  }
                  blurOnSubmit={false}
                  value={this.state.question_1}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['settings-label-question-2']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ question_2: text })}
                  underlineColorAndroid="#FFFFFF"
                  placeholder={languageString['settings-ph-q2']}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._question_2input && this._question_2input.focus()
                  }
                  blurOnSubmit={false}
                  value={this.state.question_2}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{languageString['settings-label-question-2']}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ question_3: text })}
                  underlineColorAndroid="#FFFFFF"
                  placeholder={languageString['settings-ph-q3']}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  value={this.state.question_3}
                />
              </View>
              <TouchableOpacity
                style={buttonStyle}
                activeOpacity={2}
                // onPress={() => this.setState({
                //   step1: false,
                //   step2: true,
                // })}
                onPress={() => this.step2()}
              >
                <Text style={buttonTextStyle}>{languageString['join-btn-next']}</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </ImageBackground>

    );
  }
  if(this.state.step2){
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
            <Text h1 style={pagelabel}>{languageString['settings-subtitle-resetrescue']}</Text>
              <Text h4 style={pageSublabel}>{languageString['settings-txt-enter-answers']}</Text>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={sectionStyle}>
              <Text h4 style={questionLabel}>{this.state.question_1}</Text>
              <TextInput
                style={inputStyle}
                onChangeText={(text) => this.setState({ answer_1: text })}
                value={this.state.answer_1}
                underlineColorAndroid="#FFFFFF"
                  placeholder={languageString['settings-ph-answer']}
                placeholderTextColor="#333"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._answer_1input && this._answer_1input.focus()
                }
                blurOnSubmit={false}
              />
            </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{this.state.question_2}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ answer_2: text })}
                  value={this.state.answer_2}
                  underlineColorAndroid="#FFFFFF"
                  placeholder={languageString['settings-ph-answer']}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._answer_2input && this._answer_2input.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={sectionStyle}>
                <Text h4 style={questionLabel}>{this.state.question_3}</Text>
                <TextInput
                  style={inputStyle}
                  onChangeText={(text) => this.setState({ answer_3: text })}
                  value={this.state.answer_3}
                  underlineColorAndroid="#FFFFFF"
                  placeholder={languageString['settings-ph-answer']}
                  placeholderTextColor="#333"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    this._answer_3input && this._answer_3input.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={errorMessage}>
                {this.state.errorMessage != '' ? (
                  <Text style={errorTextStyle}> {this.state.errorMessage} </Text>
                ) : null}
              </View>
            <TouchableOpacity
                style={backButtonStyle}
                onPress={() => this.setState({
                  step1: true,
                  step2: false,
                })}
              >
                <Text style={buttonTextStyle}>{languageString['settings-btn-back']}</Text>
            </TouchableOpacity> 
              <TouchableOpacity
                style={buttonStyle}
                // activeOpacity={1}
                onPress={() => this.saveQuestion()}
              >
                <Text style={buttonTextStyle}>{languageString['settings-btn-save']}</Text>
              </TouchableOpacity>
              
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
        </ImageBackground>
     
    );
  }
  }

}
export default ResetRescueScreen;