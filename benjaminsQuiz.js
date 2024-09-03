const numberOfstudents =
  document.querySelectorAll("#DisplayResult_SearchDataList > tbody tr").length /
    2 -
  1;
const iframe = document.querySelector("#infoPage");

let students = [];
for (let i = 0; i < numberOfstudents; i++) {
  const studentId = getStudentId(i);
  const studentName = getStudentName(i);
  students.push({ id: studentId, name: studentName });
}

function getStudentId(studentNumberInRow) {
  const spanWithStudentId = document.querySelector(
    `#DisplayResult_SearchDataList_lblLoginName_${studentNumberInRow}`
  );
  const studentId = spanWithStudentId.innerText;
  return studentId;
}

function getStudentName(studentNumberInRow) {
  const spanWithStudentName = document.querySelector(
    `#DisplayResult_SearchDataList_lblObjectName_${studentNumberInRow}`
  );
  const studentName = spanWithStudentName.innerText;
  return studentName;
}

let currentStudentname;
function showStudent(student, showName) {
  iframe.setAttribute(
    "src",
    `../include/InfoPage.aspx?login=${student.id}&type=S`
  );
  iframe.style.visibility = "visible";
  iframe.style.width = "104px";
  iframe.style.top = "17%";
  iframe.style.left = "50%";
  iframe.style.transform = "translateX(-50%)";
  currentStudentname = student.name;
  if(showName){
    viewStudentName.innerHTML = currentStudentname
  }
}

showStudent(students[randomIntFromInterval(0, numberOfstudents)], false);

console.log(document.querySelector("#infoPage"));

const div = document.body.appendChild(document.createElement("div"));
div.style.width = "100vw";
div.style.height = "100vh";
div.style.backgroundColor = "red";
div.style.position = "fixed";
div.style.top = "0px";
div.style.left = "0px";
div.style.zIndex = 10;
div.style.display = "flex";
div.style.justifyContent = "center";
div.style.alignItems = "center";
div.style.flexDirection = "column";

let dataListConstructorString = `<datalist id="student-name-guess-list">`;
students.forEach((student) => {
  dataListConstructorString += `<option value="${student.name}" >${student.name}</option>`;
});

dataListConstructorString += "</datalist>";

div.innerHTML = `
        <div class="view-student-name" style="font-size: 1.5rem; height: 40px;"> </div>
        <button id="view-student" style="padding: 5px; border: none; margin-bottom: 24px; z-index:1000">Practice</button>
        <div></div>
        <span style="font-size: 2rem; margin-bottom: 12px;">Benjamin's students quiz</span>
        <div>
            <input type="text" name="guess" id="student-name-guess" list="student-name-guess-list" class="student-name-guess" style="padding: 24px; border: none; margin-bottom: 12px; width: 200px;" placeholder="What is the students name?">
            <button class="guess-student" style="padding: 24px; border: none; margin-bottom: 12px;">Guess name</button>
        </div>
        <button class="next-guess" style="padding: 24px; border: none; margin-bottom: 12px;">Next student</button>
        <div class="result" style="font-size: 2rem; height: 40px;"> </div>
        ${dataListConstructorString}
        `;

const result = document.querySelector(".result");
const viewStudentName = document.querySelector(".view-student-name");
const studentNameInput = document.querySelector(".student-name-guess");
document.querySelector("button.guess-student").addEventListener("click", () => {
  showResult();
});

document.querySelector("button.next-guess").addEventListener("click", () => {
  showNewStudent();
});

document.querySelector("#view-student").addEventListener("click", () => {
  practice();
});

function showResult() {
  if (studentNameInput.value === currentStudentname) {
    result.innerHTML = "You are correct 🎉";
  } else {
    result.innerHTML = "You are wrong 😭 The name is " + currentStudentname;
  }
}

function practice(){
  const randomStudent = getRandomStudentId();
  showStudent(randomStudent, true);
  studentNameInput.value = "";
  result.innerHTML = " ";
}

function showNewStudent(){
  const randomStudent = getRandomStudentId();
  showStudent(randomStudent, false);
  studentNameInput.value = "";
  result.innerHTML = " ";
  viewStudentName.innerHTML = ''
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomStudentId() {
  return students[randomIntFromInterval(0, numberOfstudents)];
}
