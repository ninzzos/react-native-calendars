import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  TouchableOpacity
} from 'react-native';
import {Agenda} from 'wix-react-native-calendar';

export default class AgendaScreen extends Component {
  static navigatorStyle = {
    topBarElevationShadowEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2012-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 45; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strtime = this.timeToString(time);
        if (!this.state.items[strtime]) {
          this.state.items[strtime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strtime].push({
              name: 'Item for ' + strtime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      this.setState({
        items: this.state.items
      });
    }, 1000);
    console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={{backgroundColor: 'white', height: item.height, flex:1}}><Text>{item.name}</Text></View>
    )
  }

  renderEmptyDate(item) {
    return (
      <View style={{backgroundColor: 'white', height: 75, flex:1}}><Text>This is empty date!</Text></View>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
