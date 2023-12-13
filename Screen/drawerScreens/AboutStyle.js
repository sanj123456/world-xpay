import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        alignItems:"center",
        marginBottom: 30
    },
    screenHeader: {
        fontSize: 33,
        color: "white",
        margin: 25,
        marginBottom: 30,
    },
    whiteText: {
        color:"white",
        fontSize: 17,
    },
    imgContainer: {
        height: 160,
        width: 140,
        margin: 10,
        marginBottom: 10
    },
    img: {
        flex:1 ,
        width: undefined, 
        height: undefined,
        resizeMode:"contain"
    },
    RowContainer: {
        flexDirection:"row",
        justifyContent:"center"
    },
    SocialIcon: {
        height: 60,
        width: 60,
        marginHorizontal: 10,
        marginVertical: 30
    },
    lightblue: {
        color:"rgb(176,208,255)",
        fontSize: 17,
    },
    blue:{
        color:"rgb(93,155,247)",
        fontSize: 17,
    },
});