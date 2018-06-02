import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
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
            <ScrollView >
                <Text>{recipe.name}</Text>
            </ScrollView>
        );
    }


}


