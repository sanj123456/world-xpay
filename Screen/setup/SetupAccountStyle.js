import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  centerAlign:{
    justifyContent: 'center',
  },
  centerAlignFlex:{
    justifyContent: 'center',
    flexDirection: "row"
  },
  icon:
  {
    resizeMode: 'contain',
    height: '48%',
    width: '48%',
    alignSelf: 'flex-end',
  },
  pagetitle: {
    fontSize:30,
    marginLeft:85,
    marginRight: 10,
    marginTop:-75,
    marginBottom:0,
    color: 'white',
    fontWeight:"bold",
    fontFamily:"Lato, sans-serif"
  },
  moreitemLabel: {
    fontSize:22,
    textAlign: 'center',
    color: '#5D9BF7',
    fontWeight:"bold",
    marginLeft:20,
    marginRight:20,
  },
  setUpAccountRed:
  {
    resizeMode: 'contain',
    height: '70%',
    width: '70%',
    marginLeft:10,
    marginRight: 10,
    marginTop:10,
    marginBottom:0,
    alignSelf:"center",
    flexDirection: 'row',
    height:100,
    position:"relative",
  },
  setUpAccountLable:
  {
    color:"#aaaaaa",
    position:"absolute",
    marginLeft:80,
    lineHeight:22,
    fontSize:20,
    top:15,
    left:30,
    fontWeight:"bold",
    padding:20
  },
});