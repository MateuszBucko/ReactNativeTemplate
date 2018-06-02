import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';

const URL = "http://192.168.1.8:8085/";

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

        try {

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
            });

            Alert.alert(
                'Komunikat',
                'Poprawnie dodano przepis',
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            );

            this.name.clear();
            this.ingredients.clear();
            this.description.clear();


        } catch (e) {
            Alert.alert(
                'Podczas dodawnia przepisu wystąpił błąd wystąpił błąd',
                'Komunikat błędu: ' + e,
                [
                    {text: 'OK'},
                ],
                {cancelable: false}
            )
        }
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.backgroudView}>
                <Text style={styles.headerText}>Dodaj nowy przepis</Text>
                <TextInput style={styles.input}
                           placeholder="Nazwa"
                           ref={element => {
                               this.name = element
                           }}
                           onChangeText={(text) => this.setState({name: text})}/>
                <TextInput style={styles.input}
                           placeholder="Składniki"
                           multiline={true}
                           ref={element => {
                               this.ingredients = element
                           }}
                           numberOfLines={6}
                           onChangeText={(text) => this.setState({ingredients: text})}/>
                <TextInput style={styles.input}
                           placeholder="Opis przygotowania"
                           multiline={true}
                           ref={element => {
                               this.description = element
                           }}
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
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

