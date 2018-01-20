import React from 'react';
import {Text, Button, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import TabNavigator from './TabNavigator'
import DrawerNavigator from './DrawerNavigator'
import WebViewPage from './components/WebViewPage';
import TextListPage from './components/TextList'

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'ProfileScreen'
  };
  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <Text>ProfileScreen</Text>
        <Button
          onPress={() => navigate('Chat', {user: 'HT...'})}
          title="Chat with HT......"/>
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { state, setParams } = navigation;
    const isInfo = state.params.mode === 'info';
    const { user } = state.params;
    return {
      title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
      headerRight: (
        <Button
          title={isInfo ? 'Done' : `${user}'s info`}
          onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
        />
      ),
    }
  };
  render() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
        <Text>This is the home screen of the app</Text>
        <Button
          onPress={() => navigate('Profile', {name: 'Brent'})}
          title="Go to Brent's profile"
        />
      </View>
    );
  }
}

export default SimpleApp = StackNavigator({
  TabNavigator: {
    screen: TabNavigator
  },
  Profile: {
    screen: ProfileScreen,
  },
  Chat: {
    screen: ChatScreen
  },
  WebView: {
    screen: WebViewPage,
    navigationOptions: {
      title: '详细内容'
    }
  },
  TextListPage: {
    screen: TextListPage
  }
},
{
  mode: 'card',
  headerMode: 'screen'
}
);