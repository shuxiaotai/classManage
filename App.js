import { createStackNavigator } from 'react-navigation';
import HomeScreen from "./components/screen/HomeScreen";
import ClassDetailList from "./components/class/ClassDetailList";
import AddStudent from "./components/class/AddStudent";
import StudentHomePage from "./components/class/StudentHomePage";
import StudentDetailInfo from "./components/class/StudentDetailInfo";
import EditOrCreateName from "./components/class/EditOrCreateName";
import SelectGrade from "./components/class/SelectGrade";
import CreateClass from "./components/class/CreateClass";
import EditGroupInfo from "./components/class/EditGroupInfo";
import GroupAddStudent from "./components/class/GroupAddStudent";
import LoginOrRegister from "./components/loginAndRegister/LoginOrRegister";
import ChooseIdentity from "./components/loginAndRegister/ChooseIdentity";

const App = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    ClassDetailList: {
        screen: ClassDetailList
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
    },
    LoginOrRegister: {
        screen: LoginOrRegister
    },
    ChooseIdentity: {
        screen: ChooseIdentity
    },
    CreateClass: {
        screen: CreateClass
    },
    SelectGrade: {
        screen: SelectGrade
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default App;
