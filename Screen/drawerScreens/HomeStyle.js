import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex:1,
    alignItems:"center",
  },
  imgContainer: {
    height: 160,
    width: 140,
    margin: 10,
    marginBottom: 30
  },
  img: {
    flex:1 ,
    width: undefined, 
    height: undefined,
    resizeMode:"contain"
  },
  buttons: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginTop: -5,
    marginBottom: 20
  },
  buttonIcon: {
    width: 267, 
    height: 80,
    resizeMode:"contain",
  },
  buttonText: {
    fontSize: 25,
    color: "rgb(170,170,170)",
    fontWeight:"bold",
    position: "absolute",
  },
  badge: {
    backgroundColor:"red",
    width: 25,
    height: 25,
    borderRadius: 50,
    position: "absolute",
    right: 0,
    top:0,
    zIndex: 1,
    justifyContent:"center",
    alignItems:"center",
  },
  badgeText: {
    color:"white"
  },
});