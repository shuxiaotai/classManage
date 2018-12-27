const student_img = [
    require('../../public/img/student1.jpg'),
    require('../../public/img/student2.jpg'),
    require('../../public/img/student3.jpg'),
    require('../../public/img/student4.jpg'),
    require('../../public/img/student5.jpg'),
    require('../../public/img/student6.jpg'),
    require('../../public/img/student7.jpg'),
    require('../../public/img/student8.jpg'),
    require('../../public/img/student9.jpg'),
    require('../../public/img/student10.jpg'),
    require('../../public/img/student11.jpg'),
    require('../../public/img/student12.jpg'),
    require('../../public/img/student13.jpg'),
    require('../../public/img/student14.jpg'),
];
const group_img = [
    require('../../public/img/group1.jpg'),
    require('../../public/img/group2.jpg'),
    require('../../public/img/group3.jpg'),
    require('../../public/img/group4.jpg'),
    require('../../public/img/group5.jpg'),
    require('../../public/img/group6.jpg'),
    require('../../public/img/group7.jpg'),
    require('../../public/img/group8.jpg'),
    require('../../public/img/group9.jpg'),
];
const class_img = [
    require('../../public/img/class1.jpg'),
    require('../../public/img/class2.jpg'),
    require('../../public/img/class3.jpg'),
    require('../../public/img/class4.jpg'),
    require('../../public/img/class5.jpg'),
    require('../../public/img/class6.jpg'),
    require('../../public/img/class7.jpg'),
    require('../../public/img/class8.jpg'),
];
const parent_img = [
    require('../../public/img/parent1.jpg'),
    require('../../public/img/parent2.jpg'),
    require('../../public/img/parent3.jpg'),
    require('../../public/img/parent4.jpg'),
    require('../../public/img/parent5.jpg'),
    require('../../public/img/parent6.jpg'),
    require('../../public/img/parent7.jpg'),
    require('../../public/img/parent8.jpg'),
];
const teacher_img = [
    require('../../public/img/teacher1.jpg'),
    require('../../public/img/teacher2.jpg'),
    require('../../public/img/teacher3.jpg'),
    require('../../public/img/teacher4.jpg'),
    require('../../public/img/teacher5.jpg'),
    require('../../public/img/teacher6.jpg'),
    require('../../public/img/teacher7.jpg'),
];
export const getLocalImgIndex = (matchName, avatar_url) => {
    if (matchName === 'student') {
        let index = avatar_url.match(/img\/student(\S*).jpg/)[1];
        return student_img[parseInt(index) - 1];
    }
    if (matchName === 'group') {
        let index = avatar_url.match(/img\/group(\S*).jpg/)[1];
        return group_img[parseInt(index) - 1];
    }
    if (matchName === 'class') {
        let index = avatar_url.match(/img\/class(\S*).jpg/)[1];
        return class_img[parseInt(index) - 1];
    }
    if (matchName === 'parent') {
        let index = avatar_url.match(/img\/parent(\S*).jpg/)[1];
        return parent_img[parseInt(index) - 1];
    }
    if (matchName === 'teacher') {
        let index = avatar_url.match(/img\/teacher(\S*).jpg/)[1];
        return teacher_img[parseInt(index) - 1];
    }
};
