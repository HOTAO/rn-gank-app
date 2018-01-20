import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import api from '../api/api';

class TextList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
  state = {
    dataScource: [],
    title: this.props.navigation.state.params.title,
    pageNumber: 1
  }
  componentDidMount(){
    this._fethchData();
  }
  _fethchData(){
    api.fetchData(this.state.title +'/10/1')
      .then(response => {
        this.setState({
          dataScource: response.results
        })
      })
      .catch(error => {
        console.log(error)
      })

  }
  _fetchMoreData() {
    this.setState({
      pageNumber: this.state.pageNumber++
    })
    api.fetchData(this.state.title +'/10/' + this.state.pageNumber++)
    .then(response => {
      this.setState({
        dataScource: this.state.dataScource.push(...response.results)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export default TextList;
