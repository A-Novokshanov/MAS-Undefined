import React from 'react';
import { View} from 'react-native';
import styles from '../Style/Styles.styles';
import {setTestDeviceIDAsync, AdMobBanner} from 'expo-ads-admob';

/**
 * Component responsible for generating banner ads
 */
export default class Ads extends React.Component {

    // Whenever component is loaded, we need to ensure that the AdMob account responsible 
    // for genenerating ads is linked to the current device
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
                {/*AdMobBanner as a component works for both IOS and Android
                @bannerSize is responsible for selecting length of banner
                @adUnitId is the specific advertisement we wish to display. Supplied is a "test" advertisement
                @serPersonalizedAds if set to true, used to override adUnits with an advertisement personalized to user
                @onDidFailToReceiveAdWithError is the error that would be output if ad could not be found*/}
                <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={this.bannerError} />
            </View>
        )
    }
}