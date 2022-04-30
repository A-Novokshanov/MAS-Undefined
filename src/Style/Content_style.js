import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  subtitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: '#0D3D56',
    textAlign: "left",
    marginBottom: 10
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "30%",
    textAlign: "center",
  },
  tab_button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "22%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 21
  },
  list_button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    textAlign: "center",
    height: 200,
    width: 150,
    margin: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  tinyLogo: {
    aspectRatio: 1.1
  },
  trainer_info: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    textAlign: "center",
    height: 250,
    width: 400,
    margin: 5,
    marginRight: 20,
    marginLeft: 20,
  },
  px50: {
    marginLeft: 30,
  },
  px12: {
    marginLeft: 150,
  },
  px_review: {
    marginLeft: 250,
  },
  px6: {
    marginLeft: 10,
  },
  px8: {
    marginLeft: 13,
  },
  py12: {
    marginTop: 50
  },
  py6: {
    marginTop: 10
  },
  item_notes: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title_notes: {
    fontSize: 32,
  },
  send: {
    backgroundColor: "oldlace",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    width: 80,
  },
  upload: {
    borderRadius: 4,
    marginTop: 10,
  },
  pf_button: {
    paddingHorizontal: 7,
    paddingVertical: 11,
    borderRadius: 3,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "90%",
    textAlign: "center",
  },
  review_button: {
    backgroundColor: "oldlace",
    paddingHorizontal: 7,
    paddingVertical: 11,
    borderRadius: 3,
    borderWidth: 1,
    marginHorizontal: "1%",
    marginBottom: 6,
    marginLeft: 50,
    width: 300,
    textAlign: "center",
  },
  message_button: {
    paddingHorizontal: 7,
    paddingVertical: 20,
    borderRadius: 3,
    borderWidth: 1,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    minWidth: "90%",
    textAlign: "center",
  },
  mag_label: {
    fontSize: 24,
    marginLeft: 25,
    marginRight: 120,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content_but: {
    borderWidth: 1,
    width: 180,
    fontSize: 20,
    marginRight: 20
  },
  content_but2: {
    marginTop: 10,
    borderWidth: 1,
    width: 380,
    fontSize: 20,
    marginRight: 20
  },
  content_but3: {
    borderWidth: 1,
    width: 380,
    fontSize: 20,
    marginRight: 20
  },
  filter_text: {
    fontSize: 20,
    color: '#0D3D56',
    textAlign: "left",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  filter_page: {
    height : 350,
    backgroundColor: "oldlace",
},
address_page: {
  marginTop: 10,
  height : 50,
  backgroundColor: "white",
},
})
