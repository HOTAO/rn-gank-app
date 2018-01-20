import React, {Component} from 'react';
import {View, Text, Image, ScrollView, RefreshControl} from 'react-native';
import PropTypes from 'prop-types'
import api from '../api/api'
import theme from '../utils/theme';
import px2dp from '../utils/px2dp';
import * as Info from '../utils/handleHomeDataSource';
import HomeList from '../components/HomeList'
import settingState from '../utils/settingState'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <ScrollView
          onScroll={this._onScroll.bind(this)}
          refreshControl={
            <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this._onPress.bind(this, 0)}
                tintColor={'#fff'}
                colors={['#fff']}
                title="拼命加载中..."
            />}>
          <View>
            {Info.getFuLiUrl(this.state.homeData) ? <ImageView imgUrl={Info.getFuLiUrl(this.state.homeData)} labelTime={this.state.headerTime}></ImageView> : null}
          </View>
          <View style={styles.scrollContents}>
            {this.state.displayOrder.map((item, i) => {
              {item}
              if (item !== '福利' && Info.getTargetList(this.state.homeData, item) != null)
                return (
                  <HomeList
                    key={i}
                    navigation={this.props.navigation}
                    dataSource={Info.getTargetList(this.state.homeData, item)}
                    headerTitle={item}/>
                );
              }
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
  state = {
    displayOrder: settingState.displayOrder,
    homeData: {},
    headerTime: '2018/01/04',
    loading: false
  }
  componentDidMount() {
    this._getHomeData()
  }
  _onScroll(event){
    console.log(this.state.opacity)
    var offsetY = event.nativeEvent.contentOffset.y;
    if(offsetY <= this.imageHeight - theme.toolbar.height){
        var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
        this.setState({opacity: opacity});
    }else{
        this.setState({opacity: 1});
    }
  }
  _onPress(id) {
    if (id === 0)
        this._getHomeData();
    else if (id === 1)
        ;
  }
  _getHomeData() {
    this.setState({loading: true})
    api.HomePageData(this.state.headerTime)
      .then(data => {
        console.log(data)
        this.setState({homeData: data, loading: false})
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}
class ImageView extends Component {
  static propTypes = {
    imgUrl: PropTypes.string,
    labelTime: PropTypes.string
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
          uri: this.props.imgUrl
        }}
          style={styles.img}/>
        <View style={styles.dateLabel}>
          <Text style={styles.label}>{this.props.labelTime}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    width: theme.screenWidth,
    zIndex: 1
  },
  img: {
    width: theme.screenWidth,
    height: px2dp(400),
    resizeMode: 'cover'
  },
  dateLabel: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative',
    width: theme.screenWidth,
    height: px2dp(50),
    bottom: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  label: {
    color: '#fff',
    fontSize: px2dp(20),
    marginRight: px2dp(20),
    fontWeight: 'bold'
  }
}
