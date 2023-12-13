import {StyleSheet} from 'react-native';
import { block } from 'react-native-reanimated';

export default StyleSheet.create({
viewMainStyle:{
    flex:1,
    padding:20
},
pagelabel: {
    fontSize:24,
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
  color: "#9fc9ff",
  fontWeight: "bold",
  textAlign:"center"
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
  wallet: {
    display:"flex",
    position: "relative",
    width: 91
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    minHeight:200,
    padding:20,
    alignContent: 'center',
    // overflow:"hidden",
    borderRadius: 20,
    borderWidth: 1,
  },
  reflex:{
    color:"#9fc9ff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'left',
  },
  plusbutton:{
    fontSize:70,
    color: "#9fc9ff",
    fontWeight:"500",
    textAlign: 'right',
  },
  headerTopView:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    height:50,
    marginBottom:10,
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
  backgroundImageBorder: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    height:350
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
  cardEditIconView: {
    height: 55,
    width:55,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "#C1E8FD",
    marginHorizontal:10,
    borderRadius:100,
    opacity: 0.7,
    marginTop: 20
  },
  // cardTrashIcon: {
  //   height: 30,
  //   width: 30,
  //   backgroundColor: "#C1E8FD",
  //   padding: 10,
  // },
  // cardSortIcon: {
  //   height: 30,
  //   width: 30,
  //   backgroundColor: "#C1E8FD",
  //   padding: 10,
  // },
});