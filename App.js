import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';
var SQLite = require('react-native-sqlite-storage');


var db = SQLite.openDatabase({name : "mydatabase", createFromLocation : 1});
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.state = {
            user: "t",
            len: "t"
        };


        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM User Where Id=?', [1],  (tx, results) => {
                console.warn("test");
            });
        });
    }


    render() {
        return (
            <View>
                <Text>{this.state.len}</Text>
                <Text>{this.state.user}</Text>
            </View>


        );
    }

}


