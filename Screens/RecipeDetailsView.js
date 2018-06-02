import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';


export default class RecipeDetailsView extends Component<Props> {


    constructor(props) {

        super(props);


    }


    render() {
        var {params} = this.props.navigation.state;
        var recipe = params.recipe;


        return (
            <ScrollView>
                <Text style={styles.headerText}>{recipe.name}</Text>


                <View style={styles.separator}/>

                <Text style={styles.middleText}>Składniki:</Text>
                <Text>{recipe.ingredients}</Text>

                <View style={styles.separator}/>

                <Text style={styles.middleText}>Opis przygotowania:</Text>
                <Text>{recipe.description}</Text>

                <View style={styles.separator}/>

                <Image
                    style={styles.image}
                    source={{uri: recipe.imageUrl}}
                />

            </ScrollView>
        );
    }


}


const styles = StyleSheet.create({
    separator: {
        height: 2,
        width: "100%",
        backgroundColor: "#000",
        marginTop: 5,
        marginBottom: 5
    },
    image: {
        width: null,
        height: 300,
        marginBottom: 15
    },
    headerText: {
        color: '#ef3210',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    middleText: {
        color: '#000000',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

