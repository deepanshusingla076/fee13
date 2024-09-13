const container = document.getElementById('container');
const showAdminFormBtn = document.getElementById('show-admin-form');
const showEmployeeFormBtn = document.getElementById('show-employee-form');

showAdminFormBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

showEmployeeFormBtn.addEventListener('click', () => {
    container.classList.add('active');
});

document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('admin-username').value;
    var password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password.');
    }
});

document.getElementById('employee-login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('employee-username').value;
    var password = document.getElementById('employee-password').value;

    if (username === 'employee' && password === 'emp123') {
        window.location.href = 'employee.html';
    } else {
        alert('Invalid username or password.');
    }
});