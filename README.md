# classManage
升级步骤和问题 （classManageUpdate）
- `react-native init classManageUpdate`
- `yarn add react-navigation-stack` 
  - (https://reactnavigation.org/docs/en/stack-navigator-2.0.html#docsNav) 
  - react navigation 将createStackNavigator抽离出来了
- `yarn add react-navigation-tabs`
  - (https://reactnavigation.org/docs/en/bottom-tab-navigator.html)
  - react navigation 将createBottomTabNavigator抽离出来了
- `yarn add react-native-gesture-handler react-native-reanimated react-native-screens`
  - (https://reactnavigation.org/docs/en/stack-navigator-2.0.html#docsNav) 这些要`pod install`
- `react-native link react-native-vector-icons`
  - 然后 `cd ios && pod install`
  - react-native 0.61以后说不用手动link，但是react-native-vector-icons需要，否则会报unrecognized font family material icons 的错
  - link以后命令行会报错，提示不用手动link，但是项目可以使用icon了
- `yarn add @react-native-community/async-storage`
  - 将代码中的AsyncStorage改成`import AsyncStorage from '@react-native-community/async-storage'`
  - (https://reactnative.cn/docs/next/asyncstorage.html）

以上只适用于ios

- 安卓需要自己启动模拟器，然后在运行 `react-native run-android` 命令
- 安卓请求有问题，不要用localhost，用ip





