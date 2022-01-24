import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
    app: {
        backgroundColor:'#5549bf',
        flex: 1
    },
    container: {
        marginTop: 10,
        padding: 5,
        fontSize: 20
    },
    title: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: "400",
        color: '#FFD700',
        textAlign: "center"
    },
    subtitle: {
        marginTop: 30,
        fontSize: 20,
        fontWeight: "400",
        color: '#FFD700',
        textAlign: "center"
    },
    generic: {
        marginTop: 25,
        fontSize: 20,
        fontWeight: "400",
        textAlign: "center"
    },
    input: {
        marginTop: 10
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
        backgroundColor: '#8c31ad',
        borderColor: '#8c31ad',
        fontWeight: "400",
        textAlign: "left",
        justifyContent: 'center',
        borderRadius: 50
    },
    error: {
        marginTop: 1,
        fontSize: 17,
        fontWeight: "400",
        textAlign: "center",
        color: 'red'
    }
})