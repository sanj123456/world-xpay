import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    height: 350,
    margin:20,
    borderRadius: 10,
    backgroundColor:"white"
  },
  modalHeader: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0,34,86)",
    alignSelf:"stretch",
  },
  modalHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  modalBody: {
    flex:1,
    alignItems: "center",
 
    paddingTop: 30
  },
  textGrayBig: {
    color:"rgb(128,128,128)",
    fontSize: 25,
    marginHorizontal: 30,
    marginBottom: 5
  },
  textGraySmall: {
    color:"rgb(128,128,128)",
    fontSize: 15,
    alignSelf:"flex-start",
    marginLeft: 20,
    marginTop:20
  },
  btn: {
    height: 40, 
    width:"90%",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgb(0,34,86)",
    justifyContent:"center",
    alignItems:"center",
    padding: 25,
    borderRadius: 5
  },
  btnText: {
    color:"white",
    fontSize:20,
    fontWeight: "bold"
  }
});