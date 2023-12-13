import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 30
    },
    icon: {
        height: 100,
        width: 83,
        marginTop: 20
    },
    error_icon: {
        height: 90,
        width: 98,
        marginTop: 20
    },
    title: {
        color: "white",
        fontSize: 33,
        marginHorizontal: 20,
        fontWeight: "bold"
    },
    lightblue: {
        color:"rgb(176,208,255)",
        marginHorizontal:"12%",
        marginVertical: 12,
        fontSize: 15
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
        marginBottom: 20
    },
    btnText:{
        color:"white",
        fontSize:21,
        fontWeight: "bold",
        padding: 10,
    },
    white: {
        color:"white",
        fontSize: 15,
        margin: 5
    },
    warningContainer: {
        alignItems:"center",
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    warning: {
        color: "red",
        fontSize: 18,
    },
});