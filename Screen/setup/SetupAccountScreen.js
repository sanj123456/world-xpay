import React , {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  } from 'react-native';
import SetupAccountStyle from './SetupAccountStyle';
import AsyncStorage from '@react-native-community/async-storage';
import languageString from '../../Constant/languageString';

class SetupAccountScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rescue: '',
      method: '',
    };
  }
  
  componentDidMount() {
    AsyncStorage.getItem('rescue').then(value =>
      this.setState({ rescue: value })
    );
    AsyncStorage.getItem('method').then(value =>
      this.setState({ method: value })
    );
    this.focusListner = this.props.navigation.addListener("didFocus", () => {
        try {
        
          AsyncStorage.getItem('rescue').then(value =>
            this.setState({ rescue: value })
          );
          AsyncStorage.getItem('method').then(value =>
            this.setState({ method: value })
          );
          console.log('async', this.state.rescue);
          console.log('method',this.state.method);
        } catch (error) {
          console.log('Error !! : ' + error);
        }
    });
  }
  // componentWillUnmount() {
  //   this.focusListner.remove();
  // }
  render(){
    const {
      icon,
      pagetitle,
      centerAlign,
      moreitemLabel,
      setUpAccountRed,
      setUpAccountLable,
      centerAlignFlex
    } = SetupAccountStyle;

    
    return (
      <ImageBackground
      style={{ flex: 1 }}
      source={require('../../Image/bg_blue.png')}
      >
    <View style={centerAlign}>
      <Image
        source={require('../../Image/logo_xpay.png')}
        style={icon}
      />
          <Text style={pagetitle}>{languageString['setup-subtitle']}</Text>
    </View>

    <View style={centerAlign}>
          <Text h1 style={moreitemLabel}>{languageString['setup-txt-incomplete']}</Text>
    </View>
    <View style={centerAlignFlex}>
        <Image
            source={this.state.rescue == "set"
              ? require('../../Image/btn-todo-on.png')
              : require('../../Image/btn-todo-off.png')}
            style={setUpAccountRed}
          />
    
      <Text disabled={this.state.rescue == "set"
            ? true
            : false} onPress={() => this.props.navigation.navigate('ResetRescueScreen')} style={setUpAccountLable}>{languageString['setup-btn-security']}</Text>    
    </View>
      <View style={centerAlignFlex}>
      <Image
            source={this.state.method == "1"
              ? require('../../Image/btn-todo-on.png')
              : require('../../Image/btn-todo-off.png')}
            style={setUpAccountRed}
      />
          <Text disabled={this.state.method == "1"
            ? true
            : false} onPress={() => this.props.navigation.navigate('WalletAddCardScreen')} style={setUpAccountLable}>{languageString['setup-btn-add-card']}</Text>
      </View>
    </ImageBackground>
    );
  }

}
export default SetupAccountScreen;