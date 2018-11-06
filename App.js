
import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./components/screen/HomeScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import ClassDetailList from "./components/class/ClassDetailList";
import AddStudent from "./components/class/AddStudent";
import StudentHomePage from "./components/class/StudentHomePage";
import StudentDetailInfo from "./components/class/StudentDetailInfo";
import EditStudentName from "./components/class/EditStudentName";

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
    EditStudentName: {
        screen: EditStudentName
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default App;