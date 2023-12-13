import React, {Component} from 'react';
import { View } from 'react-native';

export default class RadioButton extends Component {
    render()
    {
        const {clicked} = this.props
        let styles={};
        if(clicked)
        {
            styles={
                width: 25,
                height: 25,
                backgroundColor:"rgb(189,203,218)",
                borderRadius: 50,
                marginRight: 10,
                borderWidth: 7,
                borderColor: "rgb(34,170,221)"
            }
        }
        else
        {
            styles={
                width: 25,
                height: 25,
                backgroundColor:"rgb(46,46,46)",
                borderRadius: 50,
                marginRight: 10
            }
        }

        return (
            <View style={styles}>
                
            </View>
        )
    }
}