// Array of students
const students = [
  { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
  { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
  { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' }
];

// Function to render the students' table
function renderStudentsTable() {
  const studentsBody = document.getElementById('students-body');
  studentsBody.innerHTML = '';

  for (const student of students) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.ID}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.degree}</td>
      <td>${student.email}</td>
      <td>
        <button class="edit" onclick="editStudent(${student.ID})">&#9998;</button>
        <button class="delete" onclick="deleteStudent(${student.ID})">&#128465;</button>
      </td>
    `;
    studentsBody.appendChild(row);
  }
}

// Function to add/edit a student
function addEditStudent(event) {
  event.preventDefault();

  const studentID = document.getElementById('student-id').value;
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const grade = document.getElementById('grade').value;
  const degree = document.getElementById('degree').value;
  const email = document.getElementById('email').value;

  if (studentID) {
    // Edit existing student
    const existingStudent = students.find(student => student.ID === parseInt(studentID));
    if (existingStudent) {
      existingStudent.name = name;
      existingStudent.age = parseInt(age);
      existingStudent.grade = grade;
      existingStudent.degree = degree;
      existingStudent.email = email;
    }
  } else {
    // Add new student
    const newStudent = {
      ID: students.length + 1,
      name: name,
      age: parseInt(age),
      grade: grade,
      degree: degree,
      email: email
    };
    students.push(newStudent);
  }

  // Reset the form
  document.getElementById('student-id').value = '';
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
  document.getElementById('grade').value = '';
  document.getElementById('degree').value = '';
  document.getElementById('email').value = '';

  // Render the updated students table
  renderStudentsTable();
}

// Function to edit a student
function editStudent(studentID) {
  const student = students.find(student => student.ID === studentID);
  if (student) {
    // Fill the form inputs with the student data
    document.getElementById('student-id').value = student.ID;
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;

    // Change the submit button text to "Edit Student"
    document.getElementById('submit-btn').innerText = 'Edit Student';
  }
}

// Function to delete a student
function deleteStudent(studentID) {
  const index = students.findIndex(student => student.ID === studentID);
  if (index !== -1) {
    students.splice(index, 1);
    renderStudentsTable();
  }
}

// Function to search students by name, email, or degree
function searchStudents() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchInput) ||
    student.email.toLowerCase().includes(searchInput) ||
    student.degree.toLowerCase().includes(searchInput)
  );
  renderStudentsTable(filteredStudents);
}

// Render the initial students table
renderStudentsTable();

// Event listeners
document.getElementById('student-form').addEventListener('submit', addEditStudent);
document.getElementById('search-btn').addEventListener('click', searchStudents);
