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
import CheckChart from "./components/class/CheckChart";
import LoginOrRegister from "./components/loginAndRegister/LoginOrRegister";
import ChooseIdentity from "./components/loginAndRegister/ChooseIdentity";
import CheckStudentDetail from "./components/class/CheckStudentDetail";
import RateDetail from "./components/info/RateDetail";
import SelectVisibleClass from "./components/info/SelectVisibleClass";
import PublishNoticeOrHomeWork from "./components/info/PublishNoticeOrHomeWork";
import MyRemark from "./components/me/MyRemark";
import CheckChartDetail from "./components/class/CheckChartDetail";
import ImportTemplate from "./components/class/ImportTemplate";
import ImportProject from "./components/class/ImportProject";
import ParentJoinClassInfo from "./components/me/ParentJoinClassInfo";
import JoinClass from "./components/class/JoinClass";
import MyInfo from "./components/me/MyInfo";

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
    },
    CheckChart: {
        screen: CheckChart
    },
    CheckStudentDetail: {
        screen: CheckStudentDetail
    },
    RateDetail: {
        screen: RateDetail
    },
    SelectVisibleClass: {
        screen: SelectVisibleClass
    },
    PublishNoticeOrHomeWork: {
        screen: PublishNoticeOrHomeWork
    },
    MyRemark: {
        screen: MyRemark
    },
    CheckChartDetail: {
        screen: CheckChartDetail
    },
    ImportTemplate: {
        screen: ImportTemplate
    },
    ImportProject: {
        screen: ImportProject
    },
    ParentJoinClassInfo: {
        screen: ParentJoinClassInfo
    },
    JoinClass: {
        screen: JoinClass
    },
    MyInfo: {
        screen: MyInfo
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Home'
});

export default App;
