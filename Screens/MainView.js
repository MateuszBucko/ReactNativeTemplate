import React, {Component} from 'react';
import {
    Text,
    View,
    AsyncStorage,
    Button
} from 'react-native';


export default class MainView extends Component<Props> {

    async setItem(key, value) {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // console.error('AsyncStorage#setItem error: ' + error.message);
        }
    }

    constructor(props) {

        var keys = [];


        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];

                    keys[i] = key;
                });

                this.setState({
                    data: keys
                });
            });
        });

        super(props);

        this.state = {
            data: ""
        };


    }

    componentDidMount(){
        // this.setItem('k','test');
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>{this.state.data}</Text>
                <Button
                    title="Dodaj przepis"
                    style={{marginTop: 15}}
                    onPress={() =>
                        navigate('AddRecipeView')}/>
            </View>
        );
    }

}



