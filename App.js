
import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./components/screen/HomeScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import ClassDetailList from "./components/class/ClassDetailList";
import AddStudent from "./components/class/AddStudent";

const App = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ClassDetailList: {
        screen: ClassDetailList
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    AddStudent: {
        screen: AddStudent
    },
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default App;