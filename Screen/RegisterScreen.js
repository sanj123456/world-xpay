//Import React and Hook we needed
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import API from '../Constant/API';
import languageString from '../Constant/languageString';
import AsyncStorage from '@react-native-community/async-storage';
// import DeviceInfo from 'react-native-device-info';
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Picker,
  Platform
} from 'react-native';
import Loader from './Components/loader';
import DeviceInfo from 'react-native-device-info';
import { color } from 'react-native-reanimated';

const RegisterScreen = props => {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [telephone, setTelephone] = useState('');
  let [selectedCountry, setSelectedCountry] = useState("");
  let [postalCode, setPostalCode] = useState('');
  let [agree, setAgree] = useState(false);
  let [loading, setLoading] = useState(true);
  let [errortext, setErrortext] = useState('');
  let [errortext2, setErrortext2] = useState('');
  let [isStep1Complete, setIsStep1Complete] = useState(false);
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  let [deviceUuid, setDeviceUuid] = useState(null);
  let [deviceVersion, setdeviceVersion] = useState(null);
  let [deviceManufacturer, setdeviceManufacturer] = useState(null);
  let [deviceModel, setdeviceModel] = useState(null);
  let [deviceSerial, setdeviceSerial] = useState("");
  let [deviceId, setdeviceId] = useState(null);
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [pin, setPin] = useState("");
  let [confirmPin, setConfirmPin] = useState("");
  let [userId, setUserId] = useState("");
  let [xtoken, setXtoken] = useState("");
  let [hidePassword, sethidePassword] = useState(true);
  let [countries,setCountries] = useState([]);


  useEffect(() => {
    setDeviceUuid(DeviceInfo.getUniqueId())
    setdeviceVersion(DeviceInfo.getVersion())
    DeviceInfo.getManufacturer().then(res=>setdeviceManufacturer(res))
    setdeviceModel(DeviceInfo.getModel())
    DeviceInfo.getSerialNumber().then(res=>setdeviceSerial(res))

    AsyncStorage.getItem("device_token").then(token=>{
      setdeviceId(token)
    })

    fetch("https://world-xchange.com/webservices/app/countries_json.php", {
      method: 'GET',
      headers: {
      //Header Defination
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then(async response => response.json())
    .then(async responseJson => {
      
        let all_countries = Object.keys(responseJson.data).map(key=>{
          return {"Nickname":key,"Country":responseJson.data[key]}
        })
        setCountries(all_countries)
        setLoading(false)
        
    }).catch(err=>{
        console.log(err)
    })

  },[]);

  const managePasswordVisibility = () =>
  {
    if(!hidePassword){
      sethidePassword(true);
    }else{
      sethidePassword(false);
    }
  }
  // const uniqueId = DeviceInfo.defalut.getUniqueID();
  // setDeviceUuid(uniqueId);
  // setdeviceVersion(DeviceInfo.getSystemVersion());
  // setdeviceManufacturer(DeviceInfo.getManufacturer());
  // setdeviceModel(DeviceInfo.getModel());
  // setdeviceSerial(DeviceInfo.getSerialNumber());

  // const getCountryList = () => {

  //  fetch('https://world-xchange.com/webservices/app/countries.php', {
  //     method: 'POST',
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       console.log("country",responseJson);
  //     })
  //     .catch(error => {
        
  //     });
  // };
  const handleStep1 = () => {
    setErrortext('');
    setErrortext2('');
    if (!firstName) {
      alert(languageString["register-validation-first-name"]);
      return;
    }
    if (!lastName) {
      alert(languageString["register-validation-last-name"]);
      return;
    }
    if (!email) {
      alert(languageString["register-validation-email"]);
      return;
    }
    if (!telephone) {
      alert(languageString["register-validation-telephone"]);
      return;
    }
    if (!selectedCountry) {
      alert(languageString["register-validation-country"]);
      return;
    }
    if (!postalCode) {
      alert(languageString["register-validation-postalcode"]);
      return;
    }
    if (!agree) {
      alert(languageString["register-validation-terms"]);
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      firstname: firstName,
			lastname: lastName,
      email: email,
      phone: telephone,
      country: selectedCountry,
      postalcode: postalCode,
      agree: agree,
      device_platform: Platform.OS,
			device_version: deviceVersion,
			device_manufacturer: deviceManufacturer,
			device_model: deviceModel,
			device_uuid: deviceUuid,
			device_serial: deviceSerial,
			txt_device_id: deviceId
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(API.SIGNUP_JOIN, {
      method: 'POST',
      body: formBody,
      dataType: "json",
      crossDomain: true,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
				var error = responseJson.error;
        //Hide Loader
        setLoading(false);
        // console.log(responseJson);
        // If server response message same as Data Matched
        if (error === "0") {
          setIsStep1Complete(true);
          var user_id = responseJson.user_id.toString();
          AsyncStorage.setItem('user_id', user_id);
          setUserId(responseJson.user_id);
          // console.log('Registration Successful. Please Login to proceed');
        } else {
          switch (error) {
						case "1":
              setErrortext(languageString["join-error-telephone"]);
							break;
						case "2":
              setErrortext(languageString["join-error-email"]);
							break;
						case "4":
						case "5":
              setErrortext(languageString["common-error-network"]);
							break;
						case "6":
              setErrortext(languageString["join-error-no-deviceids"]);
							break;
						default: //An existing account is a potentially serious problem (active or historical). The following hedges against it. This overcomes the security problems Apple Pay has.  
              setErrortext(languageString["join-error-account-exists"]);
							if (error === "32") {//suspended or other inactive
                setErrortext(languageString["register-validation-account-suspend"]);
							} else if (error === "33") {//cancelled
                setErrortext2(languageString["safety-title-cancelled"]);
                setErrortext(languageString["safety-txt-cancelled"]);
							} else if (error === "34") {//legal action
                setErrortext2(languageString['safety-title-legal']);
                setErrortext(languageString['safety-txt-legal']);
							} else {//active or other unknown (3,31)
                setErrortext2(languageString['safety-title-spooky']);
                setErrortext(languageString['safety-txt-login']);
              }
              props.navigation.navigate("WhoAreYouScreen")
          }
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        setErrortext(languageString['common-error-network']);
      });

  };
  const handleSubmitButton = () => {
    setErrortext('');
    setErrortext2('');
    if (!password) {
      alert(languageString["register-validation-password"]);
      return;
    }
    if (password.length > 7 && password.length < 21) {
    }else{
      alert(languageString["join-security-error-pass-length"]);
      return;
    }
    var containsDigits = /[0-9]/.test(password);
		var containsUpper = /[A-Z]/.test(password);
		var containsLower = /[a-z]/.test(password);
    if (containsDigits && containsUpper && containsLower) {
    }else{
      alert(languageString["join-security-error-pass-content"]);
        return;
    }
    if (!confirmPassword) {
      alert(languageString["register-confirm-password"]);
      return;
    }
    if (password != confirmPassword) {
      alert(languageString["join-security-error-pass-notmatch"]);
      return;
    }
    if (!pin) {
      alert(languageString["register-pin"]);
      return;
    }
    if (pin.length > 3 && pin.length < 8) {
    }else{
      alert(languageString["join-security-error-pin-length"]);
      return;
    }
    if (!confirmPin) {
      alert(languageString["register-validation-pin"]);
      return;
    }
    if (pin != confirmPin) {
      alert(languageString["join-security-error-pin-notmatch"]);
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      password: password,
      pin: pin,
      user_id: userId,
      device_uuid: deviceUuid,
      txt_device_id: deviceId
    };
    console.log("password screen",dataToSend);
    console.log("xtoken",xtoken);
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(API.SIGNUP_JOIN_SECURITY, {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        var error = responseJson.error;
				var xtoken = responseJson.xtoken;
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (error === "0") {
          AsyncStorage.setItem('xtoken', xtoken);
          setXtoken(xtoken);
          setIsStep1Complete(false);
          setIsRegistraionSuccess(true);
          // console.log('Registration Successful. Please Login to proceed');
        } else {
          if (error === "1") {
            setErrortext(languageString['common-error-network']);
          } else {
            setErrortext(languageString['common-error-token']);
          }
          
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        setErrortext(languageString['common-error-network']);
      });
  };

  if(loading)
    return <Loader loading={loading} />

  if (isStep1Complete) {
    return (
    <View style={{ flex: 1 }}>
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../Image/bg_blue.png')}
      >
    <Loader loading={loading} />
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ alignItems: 'center' }}>
              <Text h4 style={{ marginBottom: 5, color: "#FFEB14", fontStyle: "italic", fontSize: 18, fontWeight: "bold" }}>{languageString["join-security-subtitle-so-far"]}</Text>
              <Text h1 style={styles.pagelabel}>{languageString["join-security-subtitle"]}</Text>
              <Text h4 style={{ marginBottom: 5, color: 'white', fontSize: 15, }}>{languageString["join-security-subtitle-create-password"]}</Text>
              <Text h3 style={styles.pageSublabel}>{languageString["join-security-lable-password"]}</Text>
              <Text h4 style={{ color: 'white', fontSize: 15, }}>{languageString["join-security-password-instructions"]}</Text>
              <Text h4 style={{ color: 'white', fontSize: 15, }}>{languageString["join-security-password-instructions1"]}</Text>
      </View> 
      <KeyboardAvoidingView enabled>
      <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={password => setPassword(password)}
            underlineColorAndroid="#FFFFFF"
            placeholder={languageString['join-security-lable-password']}
            placeholderTextColor="#333"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
            secureTextEntry = { hidePassword }
          />
          <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityPasswordIcon } onPress = {managePasswordVisibility}>
            <Image source = { ( hidePassword ) ? require('../Image/icon_show.png') : require('../Image/icon_hide.png') } style = { styles.passwordIcon } />
          </TouchableOpacity>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            underlineColorAndroid="#FFFFFF"
            placeholder={languageString['join-security-lable-password2']}
            placeholderTextColor="#333"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
            secureTextEntry={hidePassword}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
                <Text h3 style={styles.pageSublabel}>{languageString['join-security-lable-pin']}</Text>
                <Text h4 style={{ color: 'white', fontSize: 11, }}>{languageString['join-security-pin-instructions']}</Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={pin => setPin(pin)}
            placeholder="PIN"
            placeholderTextColor="#333"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={confirmPin => setConfirmPin(confirmPin)}
            placeholder="Re-enter PIN"
            placeholderTextColor="#333"
            keyboardType="numeric"
            blurOnSubmit={false}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>{languageString['join-btn-create-account']}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
    </ImageBackground>
  </View>
    );
  }
  if (isRegistraionSuccess) {
    return (
      props.navigation.navigate('SetupAccountScreen')
    //   <ImageBackground
    //     style={{ flex: 1 }}
    //     source={require('../Image/bg_blue.png')}
    //     >
    //   <View
    //     style={{
    //       flex: 1,
    //       // backgroundColor: '#002256',
    //       justifyContent: 'center',
    //     }}>
    //     <Image
    //       source={require('../Image/success.png')}
    //       style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
    //     />
    //     <Text style={styles.successTextStyle}>Registration Successful.</Text>
    //     <TouchableOpacity
    //       style={styles.buttonStyle}
    //       activeOpacity={1}
    //       onPress={() => props.navigation.navigate('SetupAccountScreen')}>
    //       <Text style={styles.buttonTextStyle}>Stup Account</Text>
    //     </TouchableOpacity>
    //   </View>
    //   </ImageBackground>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../Image/bg_blue.png')}
        >
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
            <Text h1 style={styles.pagelabel}>{languageString["join-subtitle-create"]}</Text>
            <Text h3 style={styles.pageSublabel}>{languageString['join-subtitle-account']}</Text>
        </View>
        <KeyboardAvoidingView enabled>
        <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={FirstName => setFirstName(FirstName)}
              underlineColorAndroid="#FFFFFF"
              placeholder={languageString['join-lable-firstname']}
              placeholderTextColor="#333"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._firstnameinput && this._firstnameinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={LastName => setLastName(LastName)}
              underlineColorAndroid="#FFFFFF"
              placeholder={languageString['join-lable-lastname']}
              placeholderTextColor="#333"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._lastnameinput && this._lastnameinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Email => setEmail(Email)}
              underlineColorAndroid="#FFFFFF"
                placeholder={languageString['join-lable-email']}
              placeholderTextColor="#333"
              keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              onSubmitEditing={() => this._emailinput && this._emailinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={Telephone => setTelephone(Telephone)}
              underlineColorAndroid="#FFFFFF"
              placeholder={languageString['join-lable-telephone']}
              placeholderTextColor="#333"
              // keyboardType="numeric"
              // ref={ref => {
              //   this._telephoneinput = ref;
              // }}
              onSubmitEditing={() =>
                this._telephoneinput && this._telephoneinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.container}>
            <Picker
              selectedValue={selectedCountry}
              style={styles.dropdownStyle}
              onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}
              placeholderTextColor="white"
            > 
                <Picker.Item label={languageString['join-country']} value="" />
              {countries.map(country=>{
                return(
                  <Picker.Item label={country.Country} value={country.Nickname} />
                )
              })}
            </Picker>
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={PostalCode => setPostalCode(PostalCode)}
              underlineColorAndroid="#FFFFFF"
              placeholder={languageString['join-lable-postalcode']}
              placeholderTextColor="#333"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._postalcodeinput && this._postalcodeinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyleCheckbox}>
          <TouchableOpacity>
            <CheckBox
            style={styles.styleCheckbox}
             title='Terms'
             tintColors='white'
             value={agree}
             onValueChange={() => agree ? setAgree(false) : setAgree(true)}
            />
            </TouchableOpacity>
              <Text style={styles.agreeTermsText}>{languageString['join-lable-agree']}</Text><Text onPress={() => props.navigation.navigate('TermsAndConditions')} style={{ color: '#5D9BF7', fontWeight: "bold", marginTop: 5 }}> {languageString['join-btn-terms']}</Text>
          </View>
            <View style={styles.sectionErrorMessage}>
          {errortext2 != '' ? (
            <Text style={styles.errorTextStyle2}> {errortext2} </Text>
          ) : null}
          </View>
            <View style={styles.sectionErrorMessage}>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleStep1}>
              <Text style={styles.buttonTextStyle}>{languageString['join-btn-next']}</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
              <Text h3 style={styles.pageSublabel}>{languageString['join-txt-have-account']}</Text>
              <TouchableOpacity onPress={()=>props.navigation.navigate("LoginScreen1")}>
                <Text h3 style={styles.blueText}>{languageString['join-btn-login']}</Text>
              </TouchableOpacity>
          </View> 
        </KeyboardAvoidingView>
      </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  visibilityPasswordIcon:
  {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
  passwordIcon:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },
  blueText: {
    fontSize:18,
    marginLeft: 10,
    marginRight: 10,
    marginTop:0,
    marginBottom:0,
    color: '#5D9BF7',
    fontWeight:"bold",
  },
  container: {
    flex: 1,
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: 'white', 
    overflow: 'hidden'
  },
  sectionErrorMessage: {
    flexDirection: 'row',
    marginLeft: 35,
    marginRight: 35,
    marginTop:0,
    marginBottom:0,
  },
  SectionStyleCheckbox: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom:5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFEB14',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#FFEB14',
    height: 50,
    alignItems: 'center',
    borderRadius: 26,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 5,
    // textShadowColor: '#eba637', 
    textShadowRadius: 10, 
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 6,
    fontSize: 25,
    fontWeight:"bold",
    // textShadowColor: '#eba637',
    textShadowRadius: 10,
    opacity:1 
  },
  inputStyle: {
    flex: 1,
    color: '#000000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 0,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  agreeTermsText: {
    color: 'white',
    marginTop: 5,
    
  },
  dropdownStyle: {
    flex: 1,
    color: '#000000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontWeight:"bold"
  },
  errorTextStyle2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight:"bold"
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  pagelabel: {
    fontSize: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom:0,
    color: 'white',
    fontWeight:"bold",
    fontFamily:"Lato, sans-serif"
},
pageSublabel: {
  fontSize:18,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  marginBottom:0,
  color: 'white',
  fontWeight:"bold",
  fontFamily:"Lato, sans-serif"
}
});