import React from 'react';
import {Text, View, Image} from 'react-native'

export default class Details extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        var {params} = this.props.navigation.state;
        return (
            <View>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Tytuł:</Text>
                    {params.article.title}
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Autor:</Text>
                    {params.article.author}
                </Text>

                <Text>
                    <Text style={{fontWeight: "bold"}}>Opis:</Text>
                    {params.article.description}
                </Text>
                <Text>
                    <Text style={{fontWeight: "bold"}}>Adres:</Text>
                    {params.article.url}
                </Text>

                <Text>
                    {params.article.urlToImage}
                </Text>

                <Image
                    style={{width: 300, height: 300}}
                    source={{uri: params.article.urlToImage}}
                />
            </View>
        );
    }
}
