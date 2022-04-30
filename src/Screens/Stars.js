import React from 'react';
import { View, Text, Image } from 'react-native'

/**
 * Component for stars
 * @route to get the paras from the props
 * @rate rate from 0-5
 * @returns return the img with stars
 */
const Stars = ({ route, rate }) => {

    //add stars img to the page[]
    let page = [];
    for (let i = 0; i < Math.ceil(rate); i++) {
        page.push(
            <Image
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                }}
                source={require('../Icon/star.png')}
            />
        )
    }


    return (

        <View style={{ flexDirection: 'row'}}>
            <Text>
                {page}
            </Text>
            

        </View>
    )

}

export default Stars
