import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 30
    },
    errorIcon: {
        height: 80,
        width: 60,
        marginTop: 20
    },
    title: {
        color: "white",
        fontSize: 33,
        marginHorizontal: 20,
        fontWeight: "bold"
    },
    error: {
        color:"rgb(224,178,182)",
        marginHorizontal:"10%",
        marginVertical: 10
    },
    textInput: {
        height: 45, 
        borderColor: 'gray', 
        borderWidth: 1,
        width:"75%",
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        backgroundColor:"white",
        borderRadius: 10,
        fontSize: 17
    },
    btn:{
        backgroundColor:"yellow",
        opacity: 0.9,
        width:"75%",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 10
    },
    btnText:{
        color:"white",
        fontSize:21,
        fontWeight: "bold",
        padding: 10,
    },
    whiteSmall: {
        color:"white",
        fontSize: 17
    },
});