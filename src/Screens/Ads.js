import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import styles from '../Style/Styles.styles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { makeProfile } from '../Services/profileService.js';
import {setTestDeviceIDAsync, AdMobBanner} from 'expo-ads-admob';

/**
 * Screen for the Login page
 */
export default class Ads extends React.Component {

    async componentDidMount() {
        await setTestDeviceIDAsync('device');
    }

    render() {
        return (

            <View
                style={[
                    styles.box,
                    {
                        width: 500,
                        minWidth: 50,
                        height: 65,
                        bottom: 1,
                        position:"absolute"
                    },
                ]}
            >
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={this.bannerError} />
            </View>
        )
    }
}