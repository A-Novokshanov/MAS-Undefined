import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../Style/Styles.styles'

const ListItem = ({ name, abbr, currentPrice, percentage7day, logoUrl }) => {

    const priceChangeColor = percentage7day > 0 ? 'green' : 'red';

    return (
        <TouchableOpacity>
            <View style={styles.itemWrapper}>
                {/*Left-side*/}
                <View style={styles.leftWrapper}>
                    <Image source={{ uri: logoUrl}} style={styles.image} />
                    <View style={styles.coinTitleWrapper}>
                        <Text style={styles.cryptoName}>{name}</Text>
                        <Text style={styles.cryptoDetail}>{abbr.toUpperCase()}</Text>
                    </View>
                </View>

                {/*Right-side*/}
                <View style={styles.rightWrapper}>
                    <Text style={styles.cryptoTitle}>${currentPrice.toLocaleString('en-US', { currency: 'USD'})}</Text>
                    <Text style={[styles.cryptoDetail, {color: priceChangeColor}]}>{percentage7day.toFixed(2)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem
