import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import DiscoveryList from '../components/DiscoveryList'

class Discovery extends Component {
  render() {
    return (
      <View>
        <DiscoveryList navigation={this.props.navigation}></DiscoveryList>
      </View>
    );
  }
}

export default Discovery;
