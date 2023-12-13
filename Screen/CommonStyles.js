import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    margin:20,
    borderRadius: 10,
    backgroundColor:"white"
  },
  modalBody: {
    alignItems: "center",
    paddingTop: 30
  },
  modalHeader: {
    height: 60,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0,34,86)",
  },
  closeBtn: {
    color:"white",
    position:"absolute",
    left:0,
    marginLeft:15,
    fontWeight:"bold",
    fontSize: 20,
    padding:5
  },
  modalHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf:"center"
  },
  logo: {
    backgroundColor:"rgb(229,229,229)",
    position:"absolute",
    marginTop: 25
  },
  Subtitle: {
    fontSize: 28,
    marginBottom: 20,
    color: "rgb(115,115,115)",
    fontWeight:"bold"
  },
  textBig: {
    fontSize:18,
    alignSelf:"flex-start",
    marginHorizontal: 18,
    color: "rgb(128,128,128)"
  },
  textSmall: {
    fontSize:15,
    alignSelf:"flex-start",
    marginHorizontal: "5%",
    color: "rgb(128,128,128)"
  },
  btn: {
    width:"90%",
    margin :20,
    marginBottom: 30,
    backgroundColor: "rgb(0,34,86)",
    justifyContent:"center",
    alignItems:"center",
    padding: 15,
    borderRadius: 5,
  },
  Graybtn: {
    width:"90%",
    marginVertical :5,
    backgroundColor: "rgb(51,51,51)",
    alignItems:"center",
    padding: 15,
    borderRadius: 5,
    flexDirection:"row"
  },
  btnText: {
    color:"white",
    fontSize:20,
    fontWeight: "bold",
    marginRight: 10
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
  badge: {
    backgroundColor:"red",
    width: 27,
    height: 27,
    borderRadius: 50,
    zIndex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  badgeText: {
    color:"white"
  },
});