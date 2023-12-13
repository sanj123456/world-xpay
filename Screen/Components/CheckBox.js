import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class CheckBox extends Component {
    render()
    {
        const {clicked} = this.props
        let styles={};
        if(clicked)
        {
            styles={
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor:"rgb(34,170,221)",
                marginRight: 10,
                justifyContent:"center",
                alignItems:"center",
            }
        }
        else
        {
            styles={
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor:"rgb(46,46,46)",
                marginRight: 10,
                justifyContent:"center",
                alignItems:"center",
            }
        }

        return (
            <View style={styles}>
                {clicked?<Text style={{color:"white",fontWeight:"bold",fontSize:20}}>✓</Text>:null}
            </View>
        )
    }
}