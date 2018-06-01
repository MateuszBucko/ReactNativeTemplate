import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    StyleSheet
} from 'react-native';

const URL = "http://192.168.1.8:8085/"

export default class AddRecipeView extends Component<Props> {


    constructor(props) {

        super(props);

        this.state = {
            name: "",
            ingredients: "",
            description: ""
        }


    }

    addNewRecipe() {

        fetch(URL + 'addRecipe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: null,
                name: this.state.name,
                ingredients: this.state.ingredients,
                description: this.state.description,
            })
        })
    }


    render() {
        return (
            <ScrollView style={styles.backgroudView}>
                <Text style={styles.headerText}>Dodaj nowy przepis</Text>
                <TextInput style={styles.input}
                           placeholder="Nazwa"
                           onChangeText={(text) => this.setState({name: text})}/>
                <TextInput style={styles.input}
                           placeholder="Składniki"
                           multiline={true}
                           numberOfLines={6}
                           onChangeText={(text) => this.setState({ingredients: text})}/>
                <TextInput style={styles.input}
                           placeholder="Opis przygotowania"
                           multiline={true}
                           numberOfLines={12}
                           onChangeText={(text) => this.setState({description: text})}/>
                <Button title="Dodaj przepis"
                        onPress={this.addNewRecipe.bind(this)}/>
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    inputContainer: {
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 4,
        borderBottomWidth: 4,
    },
    input: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 15,
        paddingRight: 15
    },
    backgroudView: {
        backgroundColor: '#FFFFFF',
    },
    headerText: {
        color: '#ef3210',
    }
});

