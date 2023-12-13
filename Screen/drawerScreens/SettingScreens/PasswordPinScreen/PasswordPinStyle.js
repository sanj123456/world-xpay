import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  logo: {
    backgroundColor:"rgb(229,229,229)",
    position:"absolute",
    marginTop: 25
  },
  Subtitle: {
    fontSize: 30,
    marginBottom: 20
  },
  textSmall: {
    fontSize:15,
    alignSelf:"flex-start",
    marginLeft: 18,
    color: "rgb(128,128,128)"
  },
  textMargin: {
    fontSize:15,
    alignSelf:"flex-start",
    marginHorizontal: "5%",
    marginTop:10,
    color: "rgb(128,128,128)"
  },
  textInputContainer: {
    borderColor: 'gray', 
    borderWidth: 1,
    width:"90%",
    marginHorizontal: 20,
    height: 40, 
    flexDirection:"row",
    alignItems:"center",
    marginTop: 10
  },
  textInput: {
    height: 40, 
    marginLeft: 5,
    flexGrow: 1
  },
  HideShowIcon: {
    height: 30,
    width: 50,
    marginRight: 10
  }
});