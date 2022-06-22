import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Dimensions} from "react-native";
import styles from "../../assets/styles";
import { ProgressBar, Colors } from 'react-native-paper';
import { pokemonColors } from "../../store/action";

const height = Dimensions.get("window").height;
export default function Stats(props) {
    const { item } = props

    return (
        <ScrollView style={{height: height + 10}}>
            {
                item.stats.map((stat, idx) => {
                    return (
                        <View key={idx} style={{ flexDirection: "row", marginBottom: 10 }}>
                            <Text style={styles.stats__title}>{stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1)}</Text>
                            <Text style={styles.stats__text}>{stat.base_stat}</Text>
                            <View style={{ width: 130, alignContent: "center", paddingTop: 10, }}>
                                <ProgressBar progress={stat.base_stat / 100} color={pokemonColors[item.type]} />
                            </View>
                        </View>

                    )
                })
            }


        </ScrollView>
    )
}