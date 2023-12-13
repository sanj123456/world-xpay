import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center"
    },
    errorIcon: {
        height: 100,
        width: 100,
        margin: 20
    },
    title: {
        color: "white",
        fontSize: 25,
        marginHorizontal: 20,
        marginBottom: 30
    },
    subtitle: {
        color: "rgb(93,155,247)",
        fontSize: 18,
        marginHorizontal: 20,
    },
    merchant_name: {
        fontSize: 30,
        fontWeight:"bold",
        color:"rgb(255,235,20)",
        marginHorizontal: 20,
        marginTop: 20
    },
    location: {
        fontSize: 16,
        color:"rgb(29,147,255)",
        marginHorizontal: 20
    },
    amount: {
        fontSize: 60,
        color:"rgb(83,170,255)",
        margin: 10,
        textShadowColor:"black",
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 4,
        fontStyle:"italic",
    },
    btn:{
        backgroundColor:"yellow",
        opacity: 0.9,
        width:"70%",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 50,
        marginTop: 40
    },
    btnText:{
        color:"white",
        fontSize:26,
        fontWeight: "bold",
        padding: 10
    },
});