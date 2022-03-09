import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, StatusBar, Image } from 'react-native';
import styles from '../Style/Content_style';

//TODO: DATA
const DATA = [
    {
        item: "Main dishes",
        data: [
            {
                name: "John Doe",
                type: "trainer",
                exp: "4",
                review: "5.0",
                miles: "0.5",
                notes:["John Doe notes1"]
            },
            {
                name: "Cool Boy",
                exp: "4",
                type: "trainer",
                review: "4.8",
                miles: "1.5",
                notes:["Cool Boy notes2"]
            },
            {
                name: "Damn Daniel",
                exp: "9",
                type: "trainer",
                review: "4.9",
                miles: "3.5",
                notes:["Damn Daniel notes3"]
            }
        ]
    }
];


const Item = ({ item, nav }) => (
    <View>
        <TouchableOpacity
            style={styles.list_button}
            onPress={() => nav.navigate('Trainer', {
                name: item.name,
                exp: item.exp,
                review: item.review,
                miles: item.miles,
                notes: item.notes
            })}
        >
            <Image
                style={styles.tinyLogo}
                source={require('../Icon/pic.png')}
            />
            <Text>{item.name}</Text>
            <Text>{item.exp}+ years exp</Text>
            <Text>Rating: {item.review}</Text>
            <Text>{item.miles} miles away</Text>
        </TouchableOpacity>
    </View>
);


const ContentPage = ({ navigation }) => {

    const [direction, setDirection] = useState("My Trainers");

    var page;

    if (direction === "My Trainers") {
        page =
            <View>
                <SectionList
                    contentContainerStyle={styles.listContainer}
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Item item={item} nav={navigation} />}
                />

            </View>
    } else if (direction === "My Schedule") {
        page =
            <View>
                <Text>
                    My Schedule
                </Text>
            </View>
    } else if (direction === "My Profile") {
        page =
            <View>
                <Text>
                    My Profile
                </Text>
            </View>
    }


    return (
        <SafeAreaView style={styles.container}>
            <PreviewLayout
                selectedValue={direction}
                values={["My Trainers", "My Schedule", "Profile"]}
                setSelectedValue={setDirection}>
                {page}
            </PreviewLayout>
        </SafeAreaView>
    )
}

const PreviewLayout = ({
    label,
    children,
    values,
    selectedValue,
    setSelectedValue,
}) => (
    <View style={{ padding: 10, flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.row}>
            {values.map((value) => (
                <TouchableOpacity
                    key={value}
                    onPress={() => setSelectedValue(value)}
                    style={[
                        styles.button,
                        selectedValue === value && styles.selected,
                    ]}
                >
                    <Text
                        style={[
                            styles.buttonLabel,
                            selectedValue === value && styles.selectedLabel,
                        ]}
                    >
                        {value}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={[styles.container, { [label]: selectedValue }]}>
            {children}
        </View>
    </View>
);



export default ContentPage


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, SectionList, StatusBar, Image } from 'react-native';
// import styles from '../Style/Content_style';

// //TODO: DATA
// const DATA = [
//     {
//         item: "Main dishes",
//         data: [
//             {
//                 name: "John Doe",
//                 type: "trainer",
//                 exp: "4",
//                 review: "5.0",
//                 miles: "0.5",
//                 notes:["John Doe notes1"]
//             },
//             {
//                 name: "Cool Boy",
//                 exp: "4",
//                 type: "trainer",
//                 review: "4.8",
//                 miles: "1.5",
//                 notes:["Cool Boy notes2"]
//             },
//             {
//                 name: "Damn Daniel",
//                 exp: "9",
//                 type: "trainer",
//                 review: "4.9",
//                 miles: "3.5",
//                 notes:["Damn Daniel notes3"]
//             }
//         ]
//     }
// ];


// export default class ContentPage extends React.Component {

//     render() {
//         return (
//             <View>
//                 <TouchableOpacity
//                     style={styles.list_button}
//                     onPress={() => this.props.navigation.navigate('Trainer', {
//                         name: item.name,
//                         exp: item.exp,
//                         review: item.review,
//                         miles: item.miles,
//                         notes: item.notes
//                     })}
//                 >
//                     <Image
//                         style={styles.tinyLogo}
//                         source={require('../Icon/pic.png')}
//                     />
//                     <Text>{item.name}</Text>
//                     <Text>{item.exp}+ years exp</Text>
//                     <Text>Rating: {item.review}</Text>
//                     <Text>{item.miles} miles away</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }


// const ContentPage = ({ navigation }) => {

//     const [direction, setDirection] = useState("My Trainers");

//     var page;

//     if (direction === "My Trainers") {
//         page =
//             <View>
//                 <SectionList
//                     contentContainerStyle={styles.listContainer}
//                     sections={DATA}
//                     keyExtractor={(item, index) => item + index}
//                     renderItem={({ item }) => <Item item={item} nav={navigation} />}
//                 />

//             </View>
//     } else if (direction === "My Schedule") {
//         page =
//             <View>
//                 <Text>
//                     My Schedule
//                 </Text>
//             </View>
//     } else if (direction === "My Profile") {
//         page =
//             <View>
//                 <Text>
//                     My Profile
//                 </Text>
//             </View>
//     }


//     return (
//         <SafeAreaView style={styles.container}>
//             <PreviewLayout
//                 selectedValue={direction}
//                 values={["My Trainers", "My Schedule", "Profile"]}
//                 setSelectedValue={setDirection}>
//                 {page}
//             </PreviewLayout>
//         </SafeAreaView>
//     )
// }

// const PreviewLayout = ({
//     label,
//     children,
//     values,
//     selectedValue,
//     setSelectedValue,
// }) => (
//     <View style={{ padding: 10, flex: 1 }}>
//         <Text style={styles.label}>{label}</Text>
//         <View style={styles.row}>
//             {values.map((value) => (
//                 <TouchableOpacity
//                     key={value}
//                     onPress={() => setSelectedValue(value)}
//                     style={[
//                         styles.button,
//                         selectedValue === value && styles.selected,
//                     ]}
//                 >
//                     <Text
//                         style={[
//                             styles.buttonLabel,
//                             selectedValue === value && styles.selectedLabel,
//                         ]}
//                     >
//                         {value}
//                     </Text>
//                 </TouchableOpacity>
//             ))}
//         </View>
//         <View style={[styles.container, { [label]: selectedValue }]}>
//             {children}
//         </View>
//     </View>
// );