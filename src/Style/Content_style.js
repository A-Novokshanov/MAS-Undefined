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
        marginRight:20,
        marginLeft:20,
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
        marginRight:20,
        marginLeft:20,
      },
      px12: {
        marginLeft:150,
      },
      py12: {
        marginTop:50
      }
})
