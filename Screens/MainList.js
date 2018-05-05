import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
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

function prepareSelect(model, brand) {
    var sql = "SELECT * FROM Car"
    if ((model != null && model.length > 0) || (brand != null && brand.length > 0)) {
        sql += " WHERE "
    } else {
        return sql + ";"
    }

    if (model != null && model.length > 0) {
        sql += "UPPER(model) = " + "'" + model.toUpperCase() + "' "
    }

    if (brand != null && brand.length > 0 && (model != null && model.length > 0)) {
        sql += "AND UPPER(brand) = " + "'" + brand.toUpperCase() + "' ";
    } else if (brand != null && brand.length > 0) {
        sql += "UPPER(brand) = " + "'" + brand.toUpperCase() + "' "
    }

    return sql;
}

var arr = [];
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
            tx.executeSql(insert("Ford", "Focus", 110, "Srebrmy", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/2017_Ford_Focus_Zetec_Edition_1.0_Front.jpg/1200px-2017_Ford_Focus_Zetec_Edition_1.0_Front.jpg"));


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
            tx.executeSql("SELECT * FROM Car;", [], (tx, results) => {
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


    searchCars = () => {

        var sql = prepareSelect(this.state.modelSearch, this.state.brandSearch);

        var p = new Promise(function (resolve, reject) {
            db.transaction((tx) => {
                tx.executeSql(sql, [], (tx, results) => {
                    var temp = [];
                    var len = results.rows.length;
                    for (let i = 0; i < len; i++) {
                        temp.push(results.rows.item(i));
                    }

                    resolve(temp);
                });
            });
        });
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        p.then((res) => {
            this.setState({
                data: ds.cloneWithRows(res),
            })
        });

        return this.state.searchData;

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
                    /*onPress={() =>
                        navigate('SearchResultView', {data: this.searchCars()})
                    }*/
                        onPress={this.searchCars}
                />

                <ListView
                    enableEmptySections
                    dataSource={this.state.data}
                    renderSeparator={this.ListViewItemSeparator}
                    renderRow={(rowData) =>
                        <View>
                            <TouchableOpacity onPress={() =>
                                navigate('CarDetails', {car: rowData})
                            }>
                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: "bold"
                                }}>{rowData.brand} {rowData.model} {rowData.power}km {rowData.color}</Text>

                                <Image
                                    style={{width: null, height: 200}}
                                    source={{uri: rowData.photos}}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                />

            </ScrollView>
        );
    }

}


