const teamMembers = {
    "Team A": [
        { name: "Alice", attendance: [1, 1, 0, 1, 1, 0, 1] },
        { name: "Bob", attendance: [1, 0, 1, 1, 0, 1, 1] },
    ],
    "Team B": [
        { name: "Charlie", attendance: [1, 1, 1, 0, 1, 1, 0] },
        { name: "David", attendance: [0, 0, 1, 1, 1, 1, 1] },
    ],
    "Team C": [
        { name: "Eva", attendance: [1, 1, 1, 1, 0, 1, 1] },
        { name: "Frank", attendance: [1, 0, 1, 1, 1, 0, 1] },
    ],
};

function showTeam(teamName) {
    document.getElementById("current-team").innerText = teamName;
    document.getElementById("attendance-content").style.display = "block";
    generateCalendar(teamName);
    generateMembersTable(teamName);
    generateCharts(teamName);
}

function generateCalendar(teamName) {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = ""; // Clear previous calendar

    const daysInMonth = 30; // Full month display
    const firstDayOfMonth = new Date(2024, 8, 1).getDay(); // Start from September 2024, adjust as needed

    // Add header row for days of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerRow = document.createElement("div");
    headerRow.className = "calendar-header";
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement("div");
        dayHeader.className = "day-header";
        dayHeader.innerText = day;
        headerRow.appendChild(dayHeader);
    });
    calendarDiv.appendChild(headerRow);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "day";
        calendarDiv.appendChild(emptyDiv);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.innerText = i;

        // Randomly assigning attendance data (green for present, red for absent, blue for holiday)
        const random = Math.random();
        if (random < 0.7) {
            dayDiv.classList.add("green");
        } else if (random < 0.9) {
            dayDiv.classList.add("red");
        } else {
            dayDiv.classList.add("blue");
        }

        calendarDiv.appendChild(dayDiv);
    }

    // Add empty cells for days after the end of the month to complete the week
    const totalDays = firstDayOfMonth + daysInMonth;
    const remainingDays = (7 - (totalDays % 7)) % 7;
    for (let i = 0; i < remainingDays; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "day";
        calendarDiv.appendChild(emptyDiv);
    }
}

function generateMembersTable(teamName) {
    const membersInfoDiv = document.getElementById("members-info");
    membersInfoDiv.innerHTML = ""; // Clear previous members info

    const members = teamMembers[teamName];
    let tableHTML = `<table><tr><th>Member</th><th>Attendance</th><th>Attendance %</th></tr>`;

    members.forEach(member => {
        const attendanceDays = member.attendance.length;
        const presentDays = member.attendance.filter(day => day === 1).length;
        const attendancePercentage = ((presentDays / attendanceDays) * 100).toFixed(2);

        tableHTML += `<tr>
            <td>${member.name}</td>
            <td>${presentDays} / ${attendanceDays}</td>
            <td>${attendancePercentage}%</td>
        </tr>`;
    });

    tableHTML += `</table>`;
    membersInfoDiv.innerHTML = tableHTML;
}

function generateCharts(teamName) {
    const members = teamMembers[teamName];
    const attendanceCounts = {
        present: 0,
        absent: 0,
        holiday: 0,
    };

    members.forEach(member => {
        member.attendance.forEach(day => {
            if (day === 1) attendanceCounts.present++;
            else if (day === 0) attendanceCounts.absent++;
            else attendanceCounts.holiday++;
        });
    });

    const attendancePieChartCtx = document.getElementById('attendancePieChart').getContext('2d');
    const attendancePieChart = new Chart(attendancePieChartCtx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent', 'Holiday'],
            datasets: [{
                data: [attendanceCounts.present, attendanceCounts.absent, attendanceCounts.holiday],
                backgroundColor: ['#28a745', '#dc3545', '#007bff'],
            }]
        }
    });

    const attendanceLineChartCtx = document.getElementById('attendanceLineChart').getContext('2d');
    const labels = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
    const data = members.flatMap(member => member.attendance);

    const attendanceLineChart = new Chart(attendanceLineChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Attendance',
                data: data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Days'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Attendance'
                    },
                    min: 0,
                    max: 1,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}


