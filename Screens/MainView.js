import React, {Component} from 'react';
import {
    Text,
    View,
    AsyncStorage,
    Button,
    ScrollView,
    ListView,
    TouchableOpacity,
    ActivityIndicator, StyleSheet
} from 'react-native';

const URL = "http://192.168.1.8:8085/"


export default class MainView extends Component<Props> {

    header = "Przepisy";

    async setItem(key, value) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('AsyncStorage#setItem error: ' + error.message);
        }
    }

    constructor(props) {


        super(props);

        //pobranie kluczy
        var keys = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    keys[i] = store[i][0];
                });

                this.setState({
                    favourites: keys
                });
            });
        });

        this.state = {isLoading: true}


    }


    componentDidMount() {
        fetch(URL + 'allRecipes')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    data: ds.cloneWithRows(responseJson),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: "100%",
                    backgroundColor: "#000",
                    marginTop: 5,
                    marginBottom: 5

                }}
            />
        );
    };

    refresh() {

        fetch(URL + 'allRecipes')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    data: ds.cloneWithRows(responseJson),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderHeader() {
        return (
            <View
                style={{
                    width: "100%",
                    backgroundColor: "#000",
                    marginTop: 5,
                    marginBottom: 5

                }}
            >
                <Text style={styles.headerText}>Przepisy</Text>
            </View>
        )

    }


    render() {


        const {navigate} = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <ScrollView>

                <ListView
                    dataSource={this.state.data}
                    enableEmptySections={true}
                    renderHeader={this.renderHeader}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) =>
                        <View>
                            <TouchableOpacity onPress={() =>
                                navigate('RecipeDetailsView', {recipe: rowData})
                            }>
                                <Text style={{textAlign: 'center', fontWeight: "bold"}}>{rowData.name}</Text>

                            </TouchableOpacity>
                        </View>
                    }
                />
                <Button
                    title="Dodaj przepis"
                    style={{marginTop: 15}}
                    onPress={() =>
                        navigate('AddRecipeView')}/>
                <Button title="Odśwież"
                        style={{marginTop: 15, paddingTop: 15}}
                        onPress={() => this.refresh()}/>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    headerText: {
        color: '#ef3210',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});


