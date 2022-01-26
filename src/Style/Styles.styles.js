import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
    app: {
        backgroundColor:'#bababa',
        flex: 1
    },
    container: {
        marginTop: 10,
        padding: 5,
        fontSize: 20,
        backgroundColor:'#bababa'
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
        fontSize: 30,
        fontWeight: "400",
        color: '#f5c800',
        backgroundColor: '#bababa',
        borderRadius: 10,
        textAlign: "center"
    },
    subtitle: {
        marginTop: 30,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: "bold",
        color: 'darkblue',
        textAlign: "left"
    },
    generic: {
        marginTop: 25,
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center"
    },
    input: {
        marginTop: 10,
        backgroundColor: '#f7f7f7'
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
        backgroundColor: '#5bbffc',
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
    }
})
