
//Import React
import React, {Component} from 'react';

//Import all required component
import { View, Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import languageString from '../../Constant/languageString';
import SettingStyle from './SettingScreens/SettingScreen/SettingStyle';
import TimeLineStyle from './TimeLineStyle';
import bgImg from '../../Image/bg_blue.png';
import AsyncStorage from '@react-native-community/async-storage';


class SettingsScreen extends Component {

  state={
    transactions:[],
    card_list:[],
    card_selected:{},
    filtered_transactions:[]
  }

  async componentDidMount()
  {
    let transactions = await AsyncStorage.getItem('user_history')
    let card_list = await AsyncStorage.getItem('card_list')
    let filtered_transactions=[]

    if(transactions)
      transactions=JSON.parse(transactions)
    if(card_list)
      card_list=JSON.parse(card_list)

    if(!transactions&&!card_list)
    {
      transactions=[]
      card_list=[]
    }
    if(transactions&&card_list)
    {
      filtered_transactions = transactions.filter(transaction=>transaction.method_id===card_list[0].method_id)
    }

    this.setState({filtered_transactions,transactions,card_list,card_selected:card_list?card_list[0]:{}})
  }


  handleCardSelect = (card) => {
    let filtered_transactions = this.state.transactions.filter(transaction=>transaction.method_id===card.method_id)
    this.setState({card_selected:card,filtered_transactions})
  }
  
  render()
  {
    const Months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    let selected={borderWidth:1,borderColor:"yellow"}

    return (
      <ImageBackground source={bgImg} style={SettingStyle.backgroundImage}>
        <ScrollView>
          <View style={TimeLineStyle.container}>
            <Text style={SettingStyle.screenHeader}>{languageString["timeline-subtitle"]}</Text>
            <View style={TimeLineStyle.cardContainer}>
              {this.state.card_list.map(card=>{
                return (
                  <TouchableOpacity key={card.method_id} onPress={()=>{this.handleCardSelect(card)}}>
                    <View style={[this.state.card_selected.method_id===card.method_id?selected:null,{marginHorizontal: 10}]}>
                      <ImageBackground style={[TimeLineStyle.cardRow]} source={{ uri: card.base64 }} />
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={TimeLineStyle.cardNameContainer}>
              <Text style={TimeLineStyle.cardName}>{this.state.card_selected.nickname}</Text>
            </View>
            {this.state.filtered_transactions.map((transaction,index)=>{
              let prev_date = new Date(index?this.state.transactions[index-1].date:this.state.transactions[0].date)
              let curr_date = new Date(transaction.date)
              console.log(curr_date.getDate())
              return(
                <View key={index}>
                  {curr_date.getFullYear()===prev_date.getFullYear()&&curr_date.getMonth()===prev_date.getMonth()&&index?null:
                    <View style={TimeLineStyle.date}>
                    <Text style={TimeLineStyle.dateText}>{curr_date.getFullYear()}</Text>
                    <Text style={TimeLineStyle.dateText}>{Months[curr_date.getMonth()]}</Text>
                  </View>}
                  <View style={TimeLineStyle.transactionContainer}>
                    <View style={TimeLineStyle.transaction}>
                      <Text style={[TimeLineStyle.whiteText,{flex:2}]}>${transaction.amount}</Text>
                      <Text style={{color:"white",fontSize:18,paddingHorizontal:5,paddingVertical:6,borderRadius:2,marginHorizontal:15,
                        backgroundColor:"rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")"}}>TB</Text>
                      <View style={{flex:5}}>
                        <Text style={TimeLineStyle.whiteText}>{transaction.merchant_name}</Text>
                        <Text style={TimeLineStyle.blueText}>{transaction.location_name}</Text>
                      </View>
                    </View>
                    <Text style={[TimeLineStyle.blueText,{fontSize:20}]}>{curr_date.getDate()}</Text>
                  </View>
                </View>
              )
            })}
          </View>
          
        </ScrollView>
      </ImageBackground>
    );
  }
};


export default SettingsScreen;