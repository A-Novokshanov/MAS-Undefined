import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
    app: {
        backgroundColor:'white',
        flex: 1
    },
    container: {
        marginTop: 10,
        padding: 5,
        fontSize: 15,
        borderColor: 'darkblue',
        borderRadius: 50

    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black',
        marginHorizontal: 16,
        marginTop: 16,
    },
    itemWrapper: {
        marginTop:24,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    coinTitleWrapper: {
        marginLeft: 8,
    },
    leftWrapper: {
        flexDirection: "row",
        alignItems: 'center',
    },
    rightWrapper: {
        alignItems: 'flex-end',
    },
    cryptoTitle: {
        fontSize: 16,
    },
    cryptoDetail: {
        marginTop: 4,
        fontSize: 12,
        color: "#A9ABB1",
    },
    titleWrapper: {
        marginTop: 30,
        paddingHorizontal: 10,
    },
    title: {
        marginTop: 30,
        fontSize: 25,
        fontWeight: "400",
        color: '#C02F1D',
        fontWeight: 'bold',
        backgroundColor: 'white',
        textAlign: "center"
    },
    subtitle: {
        marginTop: 30,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: '#0D3D56',
        textAlign: "left"
    },
    generic: {
        marginTop: 25,
        marginBottom: 25,
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        marginTop: 10,
        backgroundColor: '#D3D3D3'
    },
    buttonText: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center"
    },
    button: {
        marginTop: 25,
        fontSize: 17,
        backgroundColor: '#0096FF',
        borderColor: 'darkblue',
        fontWeight: "400",
        textAlign: "left",
        justifyContent: 'center',
        borderRadius: 50
    },
    image: {
        height: 48,
        width: 48,
    },
    error: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: "400",
        textAlign: "center",
        color: 'red'
    },
    nav: {
        fontSize: 17,
        backgroundColor: '#0096FF',
        borderColor: 'darkblue',
        fontWeight: "400",
        textAlign: "left",
        justifyContent: 'center',
        borderRadius: 50
    },
    py12: {
        marginTop:12
    },
})
