import React, {Component} from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default class TextInputComponent extends Component {
    render()
    {
        return (
            <TextInput {...this.props}  style={styles.textInput} />
        )
    }
}


const styles = StyleSheet.create({
    textInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        width:"90%",
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10
    },
});