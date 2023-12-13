import React, {Component} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import TextInput from '../Components/TextInput';
import RadioButton from '../Components/RadioButton';
import languageString from '../../Constant/languageString';
import bgImg from '../../Image/bg_blue.png';
import CommonStyles from '../CommonStyles';
import logo from '../../Image/xc-sym-white.png';
import Loader from '../Components/loader';

export default class ContactScreen extends Component {

    state={
        radio:-1,
        loading:true
    }

    componentDidMount()
    {
        AsyncStorage.getItem('reflex').then(value =>{
                if(parseInt(value))
                    this.setState({radio:1,loading:false})
                else
                    this.setState({radio:0,loading:false})
            }
        );
    }

    handleRadioClick = (value) => {
        this.setState({radio:value})
    }

    handleSave = () => {

         AsyncStorage.setItem('reflex',this.state.radio.toString()).then(value =>{
            this.props.navigation.goBack()
        });
    }

    render()
    {
        console.log(this.state)
        const card = this.props.navigation.getParam("card")

        return (
            <ImageBackground source={bgImg} style={CommonStyles.backgroundImage}>
                <Loader loading={this.state.loading} />
                <View style={CommonStyles.modal}>
                    <ScrollView>
                        <View style={CommonStyles.modalHeader}>
                            <Text style={CommonStyles.closeBtn} onPress={()=>{this.props.navigation.goBack()}}>X</Text>
                            <Text style={CommonStyles.modalHeaderText}>{languageString["wallet-title"]}</Text>
                        </View>
                        <View style={CommonStyles.modalBody} >
                            <Image style={CommonStyles.logo} source={logo} />
                            <Text style={CommonStyles.Subtitle}>{languageString["wallet-subtitle-editcard"]}</Text>
                            <Text style={CommonStyles.textBig}>{languageString["wallet-label-card-nick"]}</Text>
                            <TextInput
                                onChangeText={this.handleChangePin}
                                value={card.nickname}
                            />
                            <Text style={[CommonStyles.textBig,{marginTop:20,marginBottom:5}]}>{languageString['wallet-txt-reflex']}</Text>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick(1)}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio===1}/>
                                <Text style={CommonStyles.btnText}>{languageString["wallet-txt-on"]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.handleRadioClick(0)}} style={CommonStyles.Graybtn} >
                                <RadioButton clicked={this.state.radio===0}/>
                                <Text style={CommonStyles.btnText}>{languageString["wallet-txt-off"]}</Text>
                            </TouchableOpacity>
                            <Text style={[CommonStyles.textSmall,{marginTop:20}]}>{languageString['wallet-txt-reflex-desc']}</Text>
                            <TouchableOpacity onPress={this.handleSave} style={CommonStyles.btn} >
                                <Text style={CommonStyles.btnText}>{languageString["wallet-btn-save"]}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        )
    }
}

