import React from 'react';
import {AppRegistry, Text, Button, View} from 'react-native';
import {TabNavigator} from 'react-navigation';
import Home from './pages/Home'
import Discovery from './pages/Discovery'
import Collection from './pages/Collection'
import Icon from 'react-native-vector-icons/Ionicons';

// class RecentChatsScreen extends React.Component {
//   render() {
//     const {navigate} = this.props.navigation
//     return (
//       <View>
//         <Text>List of recent chats</Text>
//         <Button
//           onPress={() => navigate('Chat', {user: 'HT...'})}
//           title="Chat with HT..."/>
//       </View>
//     )
//   }
// }

class AllContactsScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <Text>List of all contacts</Text>
        <Button
          onPress={() => navigate('Chat', {user: 'All'})}
          title="Chat with All"/>
      </View>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '首页',
      header: null,
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Discovery: {
    screen: Discovery,
    navigationOptions: {
      title: '发现',
      tabBarLabel: '发现',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-compass' : 'ios-compass-outline'}
          size={26}
          style={{ color: tintColor }}
        />)
    }
  },
  Collection: {
    screen: Collection,
    navigationOptions: {
      title: '收藏',
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-cube' : 'ios-cube-outline'}
          size={26}
          style={{ color: tintColor }}
        />)
    }
  },
  MySelf: {
    screen: AllContactsScreen,
    navigationOptions: {
      title: '更多',
      tabBarLabel: '更多',
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  }
});

export default MainScreenNavigator