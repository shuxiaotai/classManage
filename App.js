
import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./components/screen/HomeScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import ClassDetail from "./components/class/ClassDetail";
import AddStudent from "./components/class/AddStudent";

const App = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ClassDetail: {
        screen: ClassDetail
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