import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    Button,
    Image,
    ScrollView,
    TextInput
} from 'react-native';
import SearchResultView from "./SearchResultView";

var SQLite = require('react-native-sqlite-storage');

function insert(brand, model, power, color, photo) {
    var sql = "INSERT INTO Car(brand,model,power,color,photos) VALUES("
        + "'" + brand + "',"
        + "'" + model + "',"
        + power + ","
        + "'" + color + "',"
        + "'" + photo + "');"

    return sql;
}

var db = SQLite.openDatabase({name: "sqliteexample.db", createFromLocation: 1});
SQLite.enablePromise(true);

export default class MainList extends Component<Props> {

    prepareDb() {
        db.transaction((tx) => {
            tx.executeSql("DROP TABLE IF EXISTS `Car`;");
            tx.executeSql('CREATE TABLE IF NOT EXISTS `Car` (`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,`brand` TEXT NOT NULL,`model` TEXT NOT NULL,`power` INTEGER,`color` TEXT,`photos` TEXT);');
            tx.executeSql(insert("Mazda", "6", 120, "Niebieska", "https://img01-olxpl.akamaized.net/img-olxpl/659092883_1_644x461_mazda-6-23-02-07-hatchback-niebieska-wszystkie-czesci-trzebnica.jpg1"));
            tx.executeSql(insert("Mazda", "5", 110, "Srebrna", "https://www.wyborkierowcow.pl/wp-content/uploads/2017/07/Mazda-5-bok-2.jpg"));
            tx.executeSql(insert("Mazda", "5", 110, "Srebrna", "https://www.wyborkierowcow.pl/wp-content/uploads/2017/07/Mazda-5-bok-2.jpg"));
            tx.executeSql(insert("Mazda", "5", 110, "Srebrna", "https://www.wyborkierowcow.pl/wp-content/uploads/2017/07/Mazda-5-bok-2.jpg"));
            tx.executeSql(insert("Mazda", "5", 110, "Srebrna", "https://www.wyborkierowcow.pl/wp-content/uploads/2017/07/Mazda-5-bok-2.jpg"));
            tx.executeSql(insert("Mazda", "5", 110, "Srebrna", "https://www.wyborkierowcow.pl/wp-content/uploads/2017/07/Mazda-5-bok-2.jpg"));


        });
    }


    constructor(props) {
        super(props);
        this.prepareDb();
        this.state = {
            data: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            brandSearch: '',
            modelSearch: '',
            searchData: '',
        };

        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Car", [], (tx, results) => {
                var temp = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    temp.push(results.rows.item(i));
                }

                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    data: ds.cloneWithRows(temp),
                });
            })
        });
    }

    searchCars() {
        var p = new Promise(function (resolve, reject) {
            db.transaction((tx) => {
                tx.executeSql("SELECT * FROM Car;", [], (tx, results) => {
                    var temp = [];
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        temp.push(results.rows.item(i));
                    }

                    resolve(temp);
                });
            });
        });

        return p.then((result) => {
             return result;
        });

    };


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
    }

    render() {
        const {navigate} = this.props.navigation;
        return (


            <ScrollView>

                <TextInput placeholder="Marka" onChangeText={(text) => this.setState({brandSearch: text})}/>
                <TextInput placeholder="Model" onChangeText={(text) => this.setState({modelSearch: text})}/>
                <Button title="Wyszukaj"
                        color="#841584"
                    onPress={() =>
                        navigate('SearchResultView', {data: this.searchCars})
                    }
                            /* onPress={this.searchCars}*/
                />

                <ListView
                    enableEmptySections
                    dataSource={this.state.data}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) =>
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: "bold"
                            }}>{rowData.brand} {rowData.model} {rowData.power}km {rowData.color}</Text>

                            <Image
                                style={{width: null, height: 200}}
                                source={{uri: rowData.photos}}
                            />
                        </View>
                    }
                />

            </ScrollView>
        );
    }

}


