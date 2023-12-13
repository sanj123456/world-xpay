import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    title: {
        fontSize: 30,
        fontWeight:"bold",
        color:"white",
        marginHorizontal: 20,
        marginBottom: 25
    },
    merchant_name: {
        fontSize: 21,
        fontWeight:"bold",
        color:"rgb(255,235,20)",
        marginHorizontal: 20
    },
    location: {
        fontSize: 16,
        color:"rgb(29,147,255)",
        marginHorizontal: 20
    },
    amount: {
        fontSize: 60,
        color:"rgb(83,170,255)",
        marginHorizontal: 20,
        textShadowColor:"black",
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 4,
        fontStyle:"italic"
    },
    smallWhiteText: {
        color:"white",
        fontSize: 15,
        marginHorizontal: 20,
        marginBottom: 20
    },
    selectCardButton: {
        height: 65,
        width:65,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "yellow",
        marginHorizontal:10,
        borderRadius:100,
        opacity: 0.9,
        marginTop: 20
    },
    selectCardIcon: {
        height: 40,
        width:40,
        padding: 10,
    },
    nicknameLabel:{
        color: 'black', 
        marginTop: 10, 
        backgroundColor: "#C1E8FD",
        padding:4,
        paddingLeft:15,
        paddingRight:15,
        borderRadius:50,
        fontWeight:"bold",
        textShadowColor:'#000000',
        opacity: 0.7,
    },
    cardRow:{
        // width: 280, 
        height: 180, 
        resizeMode: "contain", 
        alignItems: "center",
        width: 280
        // marginBottom:0
    },
    cardview:{
        width: "100%",
    },
    cardview1:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    eachCard: {
        marginVertical: 15,
        alignItems:"center"
    },
    cardEditIcon: {
        height: 30,
        width:30,
        padding: 10
    },
    bottomBtn: {
        backgroundColor:"rgb(0,34,86)",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    btnText:{
        color:"rgb(32,119,254)",
        fontSize:24,
        fontWeight: "bold",
        padding: 10
    }
});
