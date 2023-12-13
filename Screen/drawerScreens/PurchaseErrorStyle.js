import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center"
    },
    errorIcon: {
        height: 73,
        width: 82,
        margin: 20
    },
    title: {
        color: "white",
        fontSize: 33,
        marginHorizontal: 20,
        marginBottom: 30
    },
    error: {
        color: "white",
        fontSize: 16,
        marginHorizontal: 40,
    },
    errorInfo: {
        color: "rgb(93,155,247)",
        fontSize: 16,
        marginHorizontal: 40
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
    bottomBtn: {
        backgroundColor:"rgb(0,34,86)",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    bottomBtnText:{
        color:"rgb(32,119,254)",
        fontSize:24,
        fontWeight: "bold",
        padding: 10
    },
    resolution: {
        fontSize: 30,
        color: "rgb(93,155,247)",
        margin: 30
    }
});