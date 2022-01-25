import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from '../Style/Styles.styles'

const ListItem = () => {
    return (
        <TouchableOpacity>
            <View style={styles.itemWrapper}>
                {/*Left-side*/}
                <View style={styles.leftWrapper}>
                    <Image source={require('../../assets/ethereum.png')} style={styles.image} />
                    <View style={styles.coinTitleWrapper}>
                        <Text style={styles.cryptoName}>Ethereum</Text>
                        <Text style={styles.cryptocurrency}>ETH</Text>
                    </View>
                </View>

                {/*Right-side*/}
                <View style={styles.rightWrapper}>
                    <Text style={styles.cryptoTitle}>$2200</Text>
                    <Text style={[styles.cryptoDetail, {color:'red'}]}>-3.05%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem
