import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 40
    },
    cardContainer: {
        flexDirection:"row",
        marginHorizontal: 20,
        alignSelf:"center"
    },
    cardRow: {
        height: 100, 
        width: 150,
        resizeMode: "contain",
    },
    cardNameContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "rgb(35,106,250)",
        marginHorizontal:"10%",
        alignItems:"center",
        marginBottom: 5,
    },
    cardName: {
        color:"white",
        fontSize: 16,
        marginTop: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    transactionContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        borderBottomWidth: 1,
        borderBottomColor: "rgb(35,106,250)",
        marginHorizontal:"10%",
        paddingVertical: 5,
        flex: 1
    },
    date: {
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:"10%",
    },
    dateText: {
        color:"rgb(159,201,255)",
        fontSize: 16,
        marginBottom: 30
    },
    whiteText: {
        color:"white",
        fontSize: 17
    },
    blueText: {
        color:"rgb(29,147,255)"
    },
    transaction: {
        flexDirection:"row",
        alignItems:"center",
        flex:1
    },

});