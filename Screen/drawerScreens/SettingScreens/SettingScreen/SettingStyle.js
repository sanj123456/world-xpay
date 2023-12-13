import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
  },
  screenHeader: {
    fontSize: 33,
    color: "white",
    margin: 25,
    marginBottom: 30,
    alignSelf: "center"
  },
  listView: {
    alignItems: "center",
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(35,106,250)"
  },
  listText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 13
  },
});