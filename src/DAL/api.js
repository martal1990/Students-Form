const EnrolledStudents = [
    {username: "Ross", gender: "Male", course: "Liberal Arts", average: "93"},
    {username: "Rachel", gender: "Female", course: "Python", average: "84"},
    {username: "Monica", gender: "Female", course: "JavaScript", average: "77"},
    {username: "Joey", gender: "Male", course: "Drama", average: "90"}
]

function addNewStudent(student) {
    EnrolledStudents.push(student);
    localStorage.setItem('studentsList', JSON.stringify(EnrolledStudents));
}

function getEnrolledStudents() {
    if (localStorage.getItem('studentsList')) return JSON.parse(localStorage.getItem('studentsList'));
    else {
        localStorage.setItem('studentsList', JSON.stringify(EnrolledStudents));
        return JSON.parse(localStorage.getItem('studentsList'));
    }
}

function sortByUsername() {
    let students = getEnrolledStudents();
    students.sort((a, b) => {
        if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
        else if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
        return 0;
    });
    return students;
}

export {getEnrolledStudents, addNewStudent, sortByUsername};