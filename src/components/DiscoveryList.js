import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import api from '../api/api';
import settingState from '../utils/settingState'
import px2dp from '../utils/px2dp';
import theme from '../utils/theme';
import Avatar from './Avatar';
import getCorrectImageSizeUrl from '../utils/imageFactory';
import Icon from 'react-native-vector-icons/Ionicons';

class DiscoveryList extends Component {
  constructor(props){
    super(props);
    this.tabNames = [['Android','iOS','前端','App'],['休息视频','拓展资源','瞎推荐','福利']];
    this.tabIcon = [['logo-android','logo-apple','logo-chrome','ios-apps'],['ios-film','ios-book','ios-radio','ios-images']];
    this.tabColor = [['rgb(141,192,89)','#000','rgb(51,154,237)','rgb(249,89,58)'],['#9370db','#00ced1','#ffa500','lightpink']];
  }
  render() {
    return (
      <View>
        <FlatList
          onRefresh={this._refresh}
          refreshing={false}
          data={this.state.results}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._renderHeader.bind(this)}
          renderItem={this._renderItem.bind(this)}
          />
      </View>
    );
  }
  state = {
    results: [],
    loading: false,
  }
  componentDidMount() {
    this._getRandomData()
  }
  _keyExtractor = (item, index) => item._id
  _refresh = () => this._getRandomData()
  _renderHeader() {
    return(
      <View>
        <View style={[styles.btnPanel, {backgroundColor: settingState.colorScheme.rowItemBackgroundColor, borderBottomColor: settingState.colorScheme.segmentColor, borderTopColor: settingState.colorScheme.segmentColor}]}>
          {this.tabNames.map((item, index) => {
            return (
              <View style={styles.btnRow} key={index}>
                {item.map((subItem, subIndex) => {
                  return (
                    <View style={styles.btnCell} key={subItem}>
                      <TouchableOpacity
                        onPress={this._itemPressCallback.bind(this, subItem)}
                        activeOpacity={theme.touchableOpacityActiveOpacity}>
                        <View style={{width:px2dp(50), height:px2dp(50), alignItems:'center', justifyContent:'center'}}>
                          <Avatar icon={this.tabIcon[index][subIndex]} width={px2dp(50)} backgroundColor={this.tabColor[index][subIndex]}/>
                        </View>
                      </TouchableOpacity>
                      <Text style={[styles.btnCellLabel, {color: this.props.titleColor}]}>{subItem}</Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
        {this.state.loading ?
          <View style={[styles.fakeListViewHeader, {backgroundColor: settingState.colorScheme.rowItemBackgroundColor, borderBottomColor: settingState.colorScheme.segmentColor, borderTopColor: settingState.colorScheme.segmentColor}]}>
            <Icon name="md-aperture" color={settingState.colorScheme.subTitleColor} size={px2dp(16)}/>
            <Text style={{color: settingState.colorScheme.subTitleColor, marginLeft: px2dp(5)}}>刷新中...</Text>
          </View>
          :
          <View style={[styles.fakeListViewHeader, {backgroundColor: settingState.colorScheme.rowItemBackgroundColor, borderBottomColor: settingState.colorScheme.segmentColor, borderTopColor: settingState.colorScheme.segmentColor}]}>
            <Icon name="md-aperture" color={settingState.colorScheme.subTitleColor} size={px2dp(16)}/>
            <Text style={{color: settingState.colorScheme.subTitleColor, marginLeft: px2dp(5)}}>随机干货</Text>
          </View>
        }
      </View>
    )
  }
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
    return (
        <View style={[styles.itemContainer, {backgroundColor: settingState.colorScheme.rowItemBackgroundColor}]}>
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
            <View style={styles.imgPart}>
              {(rowData.images && settingState.colorScheme.isOpenThumbnail) ?
                <Image style={styles.image} source={{uri: getCorrectImageSizeUrl(rowData.images[0])}} />
                :
                <Image style={[styles.image, {backgroundColor: settingState.colorScheme.thumbnailColor}]} source={require('../assets/user_article_no_data.png')}/>
              }
            </View>
        </View>
    );
  }
  _handleCreateTime(time){
    return time.substring(0, 10);
  }
  _itemOnPress(rowData){
    this.props.navigation.navigate('WebView', {rowData: rowData.item})
  }
  _itemPressCallback(title) {
    // if(title === '福利') {
    //   this._pushScene(GirlsPage, title);
    // }
    // else {
    this.props.navigation.navigate('TextListPage', {title})
    // }
  }
  /**
   * 获取随机数据
   *
   * @memberof DiscoveryList
   */
  _getRandomData() {
    let index = 0
    let results = []
    const randomCategory = ['Android/2','iOS/2','前端/2','休息视频/2','拓展资源/2','App/2','瞎推荐/2'];
    this._getDataByCategory(randomCategory, index, results)
  }
  /**
   * 根据category获取数据
   *
   * @param {any} randomCategory
   * @param {any} index
   * @memberof DiscoveryList
   */
  _getDataByCategory(randomCategory, index, results) {
    this.setState({loading: true})
    api.fetchRandomData(randomCategory[Math.floor(Math.random()*7)])
      .then(json => {
        this.setState({loading: false})
        index+=2
        results.push(...json.results)
        if(index < 10) {
          this._getDataByCategory(randomCategory, index, results)
        } else {
          this.setState({
            results: results
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const styles = {
  container: {
      flex: 1,
  },
  btnPanel: {
      height: px2dp(215),
      width: theme.screenWidth,
      marginTop: px2dp(12),
      marginBottom: px2dp(15),
      borderBottomWidth: theme.segment.width,
      borderTopWidth: theme.segment.width,
      padding: px2dp(17),
  },
  btnRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
  },
  btnCell: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  btnCellLabel: {
      marginTop: px2dp(4),
  },
  itemContainer: {
      flexDirection: 'row',
      width: theme.screenWidth,
      height: px2dp(73)
  },
  imgPart: {
      flex: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: px2dp(5)
  },
  image: {
      width: px2dp(60),
      height: px2dp(60),
      resizeMode: 'cover'
  },
  txtPart: {
      flex: 80,
      paddingTop: px2dp(10),
      paddingLeft: px2dp(12),
      paddingRight: px2dp(5),
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
  },
  fakeListViewHeader: {
      flexDirection: 'row',
      padding: px2dp(8),
      borderBottomWidth:theme.segment.width,
      borderTopWidth: theme.segment.width,
      alignItems: 'center'
  }
}

export default DiscoveryList;
