import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems:"center"
    },
    title: {
        color: "white",
        fontSize: 33,
        margin: 30
    },
    offerContainer: {
        backgroundColor:"rgb(221,221,221)",
        width:"82%",
        borderRadius: 10,
        marginBottom: 10,
    },
    offerText: {
        fontSize: 16,
        padding: 10,
        marginBottom: 30
    },
    pickerContainer: {
        backgroundColor: "rgb(55,55,55)",
        width: "90%",
        borderRadius: 5,
        marginVertical: 5
    },
    pickerStyle:{
        width: "90%",
        color: 'white',  
        justifyContent: 'center',
        margin: 4,
        borderRadius: 5,
    },
    btnContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    btn: {
        width:"90%",
        marginBottom: 30,
        marginRight: 10,
        backgroundColor: "rgb(0,34,86)",
        justifyContent:"center",
        alignItems:"center",
        padding: 15,
        borderRadius: 5,
        flex: 1
    },
    Graybtn: {
        width:"90%",
        marginBottom: 30,
        backgroundColor: "rgb(51,51,51)",
        justifyContent:"center",
        alignItems:"center",
        padding: 15,
        borderRadius: 5,
        flex: 1
    },
});