import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import api from '../api/api';
import Avatar from './Avatar';
import theme from '../utils/theme';
import settingState from '../utils/settingState'
import getCorrectImageSizeUrl from '../utils/imageFactory';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';

class TextList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });
  render() {
    return (
      <View>
        <FlatList
          onRefresh={this._refresh}
          refreshing={false}
          data={this.state.dataSource}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    );
  }
  state = {
    dataSource: [],
    title: this.props.navigation.state.params.title,
    pageNumber: 1
  }
  componentDidMount(){
    this._fethchData();
  }
  _keyExtractor = (item, index) => item._id
  _refresh = () => console.log('asd')
  _renderItem(rowData, sectionID, rowID, highlightRow) {
    return (
      <View>
         <TouchableHighlight
            overflow="hidden"
            key={rowID}
            onPress={this._itemOnPress.bind(this, rowData)}
            underlayColor={theme.touchableHighlightUnderlayColor}>
            {this._renderRowContent(rowData.item)}
          </TouchableHighlight>
      </View>
    )
  }
  _renderRowContent(rowData) {
    console.log(rowData)
    return(
      <View style={[styles.itemContainer, {backgroundColor: settingState.colorScheme.rowItemBackgroundColor}]}>
        <View style={styles.imgPart}>
          {(rowData.images && settingState.isOpenThumbnail) ?
            <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}} />
            :
            <Image style={[styles.image, {backgroundColor: settingState.colorScheme.thumbnailColor}]} source={require('../assets/user_article_no_data.png')}/>
          }
          </View>
          <View style={styles.txtPart}>
            <View style={styles.titlePart}>
              <Text style={[styles.title, {color: settingState.colorScheme.titleColor}]} numberOfLines={2}>{rowData.desc}</Text>
            </View>
            <View style={styles.infoPart}>
              <Icon name="ios-pricetag-outline" color={settingState.colorScheme.subTitleColor}/>
              <Text style={[styles.detailsLabel, {color: settingState.colorScheme.subTitleColor}]}>{rowData.type}</Text>
              <Icon name="ios-create-outline" color={settingState.colorScheme.subTitleColor}/>
              <Text style={[styles.detailsLabel, {color: settingState.colorScheme.subTitleColor}]}>{rowData.who ? rowData.who : 'null'}</Text>
              <Icon name="ios-time-outline" color={settingState.colorScheme.subTitleColor}/>
              <Text style={[styles.detailsLabel, {color: settingState.colorScheme.subTitleColor}]}>{this._handleCreateTime(rowData.publishedAt)}</Text>
            </View>
          </View>
      </View>
    )
  }
  _itemOnPress(rowData) {
    console.log(rowData)
  }
  _handleCreateTime(time){
    return time.substring(0, 10);
  }
  _fethchData(){
    api.fetchData(this.state.title +'/10/1')
      .then(response => {
        this.setState({
          dataSource: response.results
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
        dataSource: this.state.dataSource.push(...response.results)
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}
const styles = {
    itemContainer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(75)
    },
    imgPart: {
        flex: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: px2dp(52),
        height: px2dp(52),
        resizeMode: 'cover'
    },
    txtPart: {
        flex: 80,
        paddingTop: px2dp(10),
        paddingRight: px2dp(10),
        paddingBottom: px2dp(10)
    },
    titlePart: {
        flex: 70,
    },
    infoPart: {
        flex: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {

    },
    detailsLabel: {
        marginLeft: px2dp(3),
        marginRight: px2dp(13),
        fontSize: px2dp(10)
    },
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    }
}
export default TextList;
