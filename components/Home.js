import React, { useEffect, useState, useCallback } from "react"
import { Text, View, Button, FlatList, ActivityIndicator, TextInput,Image,TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import styles from "../assets/styles"
import { fetchPokemons } from "../store/action"
import PokemonCard from "./reusable/card"
import { name } from '../node_modules/prettier/parser-espree';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from "./ImagePickerModal"
import ImagePickerAvatar from "./ImagePickerAvavtar"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
export default function Home({ navigation }) {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    const loading = useSelector(state => state.loading)
    const next = useSelector(state => state.next)
    const [isLoading, setIsLoading] = useState(true)
    const [check, setCheck] = useState(false)
    // const [checkSearch, setCheckSearch] = useState(false)
    // const [response, setResponse] = useState();
    const [searchText, setSearchText] = useState('')
    const [listPokemon, setListPokemon] = useState(pokemons)
    const [isFocus, setIsFocus] = useState(false)
const image = require('../assets/type/pokeballIcon.png')
    const [pickerResponse, setPickerResponse] = useState(image)
    const [visible, setVisible] = useState(false)

    // const onImageLibraryPress = useCallback(() => {
    //     const options = {
    //         selectionLimit: 1,
    //         mediaType: 'photo',
    //         includeBase64: false,
    //     };
    //     ImagePicker.launchImageLibrary(options, setPickerResponse);
    // }, []);

    // const onCameraPress = useCallback(() => {
    //     const options = {
    //         saveToPhotos: true,
    //         mediaType: 'photo',
    //         includeBase64: false,
    //     };
    //     ImagePicker.launchCamera(options, setPickreserResponse);
    // }, []);

    // const uri = pickerResponse?.assets && pickerResponse.assets[0]?.uri;

    const onCameraPress = () => {
        const options = {
            storageOptions: {
            mediaType: 'photo',
            path: 'images',

            },
            includeBase64: true,
        }
           launchCamera(options, res => {
                console.log("res" + res);
                if (res.didCancel) {
                    console.log("User cancelled image picker");
                } else if (res.error) {
                    console.log('Error' + res.error);
                } else if (res.customButton) {
                    console.log('User tapped custom button' + res.customButton);
                } else {
                    const source = {uri: 'data:image/jpeg;base64,' + res.assets[0].base64 };
                    setPickerResponse(source);
                }
            }
        )}

        const onLibrary = () => {
            const options = {
               
                mediaType: 'photo',
                path: 'images',
    
            }
               launchImageLibrary(options, res => {
                    console.log("res" + res);
                    if (res.didCancel) {
                        console.log("User cancelled image picker");
                    } else if (res.error) {
                        console.log('Error' + res.error);
                    } else if (res.customButton) {
                        console.log('User tapped custom button' + res.customButton);
                    } else {
                        const source = res.assets[0];
                        setPickerResponse(source);
                    }
                }
            )}


useEffect(() => {
    // setIsLoading(true)
    dispatch(fetchPokemons(next))
    setIsLoading(false)
}, []);

// const getContent = () => {
//     if (loading) {
//         return <ActivityIndicator size="large" color='lightblue' style={styles.activityIndicator} />
//     }
//     return (<View />)
// };

const handleSearch = (query) => {
    if (query && pokemons) {
        const matches = pokemons?.filter(
            ({ id, name }) =>
                id.toString() === query ||
                name.toLowerCase().includes(query.toLowerCase()),
        );

        if (matches) {
            setListPokemon(matches);
        }
    } else {
        setListPokemon(pokemons);
    }
}

return (
    <View style={styles.container}>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.text__title}>Pokedex</Text>
            <ImagePickerAvatar  uri={pickerResponse} onPress={() => setVisible(true)} />
            <ImagePickerModal
                isVisible={visible}
                onClose={() => setVisible(false)}
                onImageLibraryPress={onLibrary}
                onCameraPress={() => onCameraPress()}
            />
            
            {/* <TouchableOpacity style={{width:100,height:100,backgroundColor:'red'}} onPress={(ss) => onCameraPre()}>
            <Image style={{width:100,height:100}} source={{uri: pickerResponse.uri}}/>
            </TouchableOpacity> */}
            
        </View>
        {/* {getContent()} */}
        <TextInput
            placeholder={'Search'}
            style={styles.input}
            onFocus={() => setIsFocus(true)}
            onChangeText={handleSearch}
        />
    
        <FlatList
            data={isFocus ? listPokemon : pokemons}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(pokemon) => String(pokemon.id)}
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
            contentContainerStyle={styles.flatListContentContainer}
            onEndReached={() => dispatch(fetchPokemons(next))}
        />

        {/* <View style={{ padding: 5, marginTop: 10 }}>
                <Button title="Show More" color={"gray"} onPress={() => dispatch(fetchPokemons(next))} />
            </View> */}
    </View>
)
}
