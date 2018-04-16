import React from 'react';
import {Text, View, Image, TouchableOpacity, Linking, Button} from 'react-native'

export default class Details extends React.Component {

    constructor(props) {
        super(props);


    }

    render() {
        var {params} = this.props.navigation.state;
        return (
            <View>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Tytuł: </Text>
                    {params.article.title}
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Autor: </Text>
                    {params.article.author}
                </Text>

                <Text>
                    <Text style={{fontWeight: "bold"}}>Opis: </Text>
                    {params.article.description}
                </Text>

                <Image
                    style={{width: null, height: 300, marginBottom: 15}}
                    source={{uri: params.article.urlToImage}}
                />

                <Button
                    title="Przejdź do artykułu"
                    style={{marginTop: 15}}
                    onPress={ ()=>{Linking.openURL(params.article.url)}}/>
            </View>
        );
    }
}
