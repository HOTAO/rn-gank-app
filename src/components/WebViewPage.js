import React, {Component} from 'react';
import {View, Text, WebView, InteractionManager, ActivityIndicator} from 'react-native';
import settingState from '../utils/settingState'
import theme from '../utils/theme';
import px2dp from '../utils/px2dp';
import {StackNavigator} from 'react-navigation';

class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didMount: false,
      pageBackgroundColor: settingState.colorScheme.pageBackgroundColor,
      webViewToolbarColor: settingState.colorScheme.webViewToolbarColor,
    };
  }
  render() {
    const {rowData} = this.props.navigation.state.params;
    console.log(rowData)
    return (
      <View
        style={[
        styles.container, {
          backgroundColor: this.state.pageBackgroundColor
        }
      ]}>
        <View style={styles.contentContainer}>
          {this.state.didMount
            ? <WebView
                ref={(ref) => {
                this.webView = ref
              }}
                style={[
                styles.webView, {
                  backgroundColor: this.state.pageBackgroundColor
                }
              ]}
                source={{
                uri: rowData.url
              }}
                renderLoading={this
                ._renderLoading
                .bind(this)}
                renderError={this
                ._renderError
                .bind(this)}
                startInLoadingState={true}/>
            : null
          }
        </View>
      </View>
    );
  }
  componentWillMount() {
    console.log(this.props)
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({didMount: true});
    });
  }
  _renderLoading() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={this.props.tabIconColor} size="large"/>
        <Text
          style={{
          marginTop: px2dp(10),
          color: this.props.tabIconColor
        }}>玩命加载中...</Text>
      </View>
    );
  }

  _renderError() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Oooops~, 出错了, 重新刷新下吧～</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  contentContainer: {
    // marginTop: theme.toolbar.height,
    flex: 1,
    paddingTop: theme.toolbar.paddingTop
  },
  toolbar: {
    position: 'absolute',
    width: theme.screenWidth,
    marginTop: theme.toolbar.paddingTop,
    zIndex: 1
  },
  webView: {
    flex: 1
  },
  bottomInfoBar: {
    position: 'absolute',
    height: px2dp(45),
    width: theme.screenWidth,
    borderTopWidth: theme.segment.width,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1
  },
  moreContentContainerBackground: {
    position: 'absolute',
    top: 0,
    width: theme.screenWidth,
    height: theme.screenHeight
  },
  moreContentContainer: {
    position: 'absolute',
    right: px2dp(5),
    top: theme.toolbar.height,
    width: px2dp(150),
    height: px2dp(160),
    borderRadius: 5,
    paddingLeft: px2dp(10),
    paddingRight: px2dp(10),
    paddingTop: px2dp(5),
    paddingBottom: px2dp(5)
  },
  modalItem: {
    width: px2dp(150),
    height: px2dp(30),
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export default WebViewPage
