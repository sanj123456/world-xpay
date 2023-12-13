import React , {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  } from 'react-native';
import WalletCardListStyle from './WalletCardListStyle';
import AsyncStorage from '@react-native-community/async-storage';
import languageString from '../../Constant/languageString';
class WalletCardListScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      errorMessage:"",
      loading:false,
      xtoken:"",
      user_id:"",
      card_list:[]
    }
  }
  async componentDidMount() {
    await AsyncStorage.getItem('xtoken').then(value =>
      this.setState({ xtoken: value })
    );
    await AsyncStorage.getItem('user_id').then(value =>
      this.setState({ user_id: value })
    );
    await AsyncStorage.getItem('card_list').then(value =>
      this.setState({ card_list: value===null?[]:JSON.parse(value) })
    );
    console.log(this.state.card_list);
    if(this.state.card_list.length===0)
      this.props.navigation.navigate("WalletAddCardScreen")
  }

  AddCard = () => {

  }

  DeleteCard = (card_list) => {
    this.setState({card_list})
  }

  handleCardEdit = (card) => {
    this.props.navigation.navigate("WalletEditCardScreen", {card:card});
  }
  handleCardDelete = (card) => {
    this.props.navigation.navigate("WalletDeleteCardScreen", {card:card,DeleteCard: this.DeleteCard, card_list:this.state.card_list});
  }

  renderCard = () => {
    const {
      nicknameLabel,
      cardRow,
      cardEditIcon,
      cardEditIconView,
      cardview1,
      eachCard
    } = WalletCardListStyle;
    return this.state.card_list.map((card,index) =>
      <View style={eachCard} key={index}>
        <ImageBackground style={cardRow} source={{ uri: card.base64 }} >
          <Text style={nicknameLabel}>{card.nickname}</Text>
          <View style={cardview1}>
            <TouchableOpacity onPress={()=>{this.handleCardEdit(card)}} style={cardEditIconView}>
              <Image style={cardEditIcon} source={require('../../Image/icon_edit.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.handleCardDelete(card)}} style={cardEditIconView}>
              <Image style={cardEditIcon} source={require('../../Image/icon_trash.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={cardEditIconView}>
              <Image style={cardEditIcon} source={require('../../Image/icon_sort.png')} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
  render(){
    const {
      pagelabel,
      pageSublabel,
      viewMainStyle,
      reflex,
      plusbutton,
      headerTopView,
      backgroundImageBorder,
      backgroundImage
    } = WalletCardListStyle;
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../Image/bg_blue.png')}
      >
        <View style={viewMainStyle}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={{ alignItems: 'center' }}>
              {/* <Image
                source={require('../../Image/xc-sym-white.png')}
                style={xpayImage}
              /> */}
              <Text h1 style={pagelabel}>{languageString['wallet-subtitle-card-wallet']}</Text>
              <Text h4 style={pageSublabel}>{languageString['wallet-subtitle-safety']}</Text>
            </View>
            <View style={headerTopView}>
              <View style={{flexDirection:"row"}}>
                <Text h1 style={reflex}>{languageString['wallet-txt-reflex']}</Text>
                <Text style={[reflex,{color:"white"}]}> {languageString["wallet-txt-off"]}</Text>
              </View>
              <Text onPress={() => this.props.navigation.navigate('WalletAddCardScreen',{card_list:this.state.card_list,AddCard:this.AddCard})} h1 style={plusbutton}>{languageString['wallet-symbol-plus']}</Text>
            </View>
            
            
              <View
                style={backgroundImageBorder}>
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
      </ImageBackground>

    );

  }

}
export default WalletCardListScreen;