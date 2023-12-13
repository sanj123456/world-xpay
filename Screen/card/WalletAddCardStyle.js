import {StyleSheet} from 'react-native';

export default StyleSheet.create({
viewMainStyle:{
    flexDirection: 'row',
    flex:1,
    padding:20
},
pagelabel: {
    fontSize:23,
    marginLeft:0,
    marginRight: 0,
    marginTop: 10,
    marginBottom:0,
    color: 'white',
    fontWeight:"bold"
},
pageSublabel:{
  fontSize:15,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 10,
  marginBottom: 0,
  color: 'white',
  fontWeight: "bold",
  fontStyle:"italic"
},
sectionStyle: {
  // flexDirection: 'row',
  // height: 60,
  // marginTop: 5,
  // marginLeft:0,
  // marginRight:0,
  // margin: 10,
},
inputStyle: {
  flex: 1,
  color: '#000000',
  paddingLeft: 15,
  paddingRight: 15,
  borderWidth: 0,
  borderRadius: 10,
  borderColor: 'white',
  backgroundColor: 'white',
},
buttonStyle: {
  backgroundColor: '#FFEB14',
  borderWidth: 0,
  color: '#FFFFFF',
  borderColor: '#FFEB14',
  height: 50,
  alignItems: 'center',
  borderRadius: 26,
  marginLeft: 35,
  marginRight: 35,
  marginTop: 20,
  marginBottom: 5,
  textShadowRadius: 10, 
},
buttonTextStyle: {
  color: '#FFFFFF',
  paddingVertical: 6,
  fontSize: 25,
  fontWeight:"bold",
  textShadowRadius: 10,
  opacity:1
},
questionLabel:{
  fontSize: 15,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 10,
  marginBottom: 10,
  color: 'white',
  fontWeight: "bold",
},
xpayImage:{
  resizeMode: 'contain',
},
backButtonStyle: {
    backgroundColor: '#333',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#1f1f1f',
    height: 50,
    alignItems: 'center',
    borderRadius: 26,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 5,
    textShadowRadius: 10,
  },
  errorMessage: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: "bold"
  },
});