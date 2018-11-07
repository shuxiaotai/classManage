
import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./components/screen/HomeScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import ClassDetailList from "./components/class/ClassDetailList";
import AddStudent from "./components/class/AddStudent";
import StudentHomePage from "./components/class/StudentHomePage";
import StudentDetailInfo from "./components/class/StudentDetailInfo";
import EditOrCreateName from "./components/class/EditOrCreateName";
import EditGroupInfo from "./components/class/EditGroupInfo";
import GroupAddStudent from "./components/class/GroupAddStudent";

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
    StudentHomePage: {
        screen: StudentHomePage
    },
    StudentDetailInfo: {
        screen: StudentDetailInfo
    },
    EditOrCreateName: {
        screen: EditOrCreateName
    },
    EditGroupInfo: {
        screen: EditGroupInfo
    },
    GroupAddStudent: {
        screen: GroupAddStudent
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default App;