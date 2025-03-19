// Calendar JavaScript
const calendarGrid = document.querySelector('.calendar-grid');
const currentMonth = document.getElementById('current-month');
const prevMonthBtn = document.querySelector('.prev-month');
const nextMonthBtn = document.querySelector('.next-month');

// Get today's date
const today = new Date();
let currentDate = new Date();

// Sample appointments data
const appointments = {
    '2024-09-11': ['Dentist Appointment'],
    '2024-09-21': ['Eye Check-up']
};

// Function to generate the calendar
function generateCalendar(date) {
    calendarGrid.innerHTML = ''; // Clear previous grid
    currentMonth.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Get first day of the month and number of days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Add day names
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayNames.forEach((day) => {
        const dayNameElem = document.createElement('div');
        dayNameElem.classList.add('day-name');
        dayNameElem.textContent = day;
        calendarGrid.appendChild(dayNameElem);
    });

    // Add empty slots before the first day
    for (let i = 1; i < firstDay; i++) {
        const emptySlot = document.createElement('div');
        calendarGrid.appendChild(emptySlot);
    }

    // Populate days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElem = document.createElement('div');
        dateElem.classList.add('date');
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dateElem.textContent = day;

        // Highlight today
        if (day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            dateElem.classList.add('active');
        }

        // Highlight days with appointments
        if (appointments[dateString]) {
            dateElem.classList.add('has-appointment');
        }

        calendarGrid.appendChild(dateElem);
    }
}

// Change month handlers
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

// Initialize the calendar
generateCalendar(currentDate);



// This Script is responsible for the clicks on Search Page.
document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements
    const optionsContainer = document.querySelector(".options-container");
    const buttons = document.querySelectorAll(".option-btn");
    const forms = document.querySelectorAll(".main-search-container");
    
    // Initialize first form as active
    if (forms.length > 0) {
        forms[0].classList.add("active");
    }

    // Add click event to each button
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            button.classList.add("active");
            
            // Get target form id
            const targetId = button.getAttribute("data-target");
            
            // Hide all forms first
            forms.forEach(form => {
                form.classList.remove("active");
                form.style.display = "none";
            });
            
            // Show target form
            const targetForm = document.getElementById(targetId);
            if (targetForm) {
                targetForm.classList.add("active");
                targetForm.style.display = "flex";
            }
        });
    });
});


// Health Tool Dashboard Script
// Add event listeners for calculator buttons
document.querySelectorAll('.calculate-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add calculation logic here
        console.log('Calculating...');
    });
});

// Add event listeners for resource items
document.querySelectorAll('.resource-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add navigation logic here
        console.log('Opening resource...');
    });
});

// Add event listener for edit button
document.querySelector('.edit-btn').addEventListener('click', function() {
    // Add edit logic here
    console.log('Editing user details...');
});

// Add event listener for meal search
document.querySelector('.search-meal input').addEventListener('input', function(e) {
    // Add search logic here
    console.log('Searching meals:', e.target.value);
});


//----------------- BMR CALCULATOR 
// DOM Elements
const genderButtons = document.querySelectorAll('.gender-btn');
const heightSlider = document.getElementById('height-slider');
const weightSlider = document.getElementById('weight-slider');
const feetInput = document.getElementById('feet');
const inchesInput = document.getElementById('inches');
const weightInput = document.getElementById('weight');
const calculateButton = document.getElementById('calculate-bmr');

// State
let state = {
    gender: 'male',
    height: 71, // in inches
    weight: 70.53, // in pounds
    units: {
        height: 'imperial',
        weight: 'imperial'
    }
};

// Event Listeners
genderButtons.forEach(button => {
    button.addEventListener('click', () => {
        genderButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        state.gender = button.dataset.gender;
    });
});

// Height Slider
heightSlider.addEventListener('input', (e) => {
    const inches = parseInt(e.target.value);
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    
    feetInput.value = feet;
    inchesInput.value = remainingInches;
    state.height = inches;
});

// Weight Slider
weightSlider.addEventListener('input', (e) => {
    weightInput.value = parseFloat(e.target.value).toFixed(2);
    state.weight = parseFloat(e.target.value);
});

// Calculate BMR
function calculateBMR() {
    // Mifflin-St Jeor Equation
    let bmr;
    const heightCm = state.height * 2.54;
    const weightKg = state.weight * 0.453592;
    
    if (state.gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * 25) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * 25) - 161;
    }
    
    return Math.round(bmr);
}

// Update Results
function updateResults() {
    const bmr = calculateBMR();
    const resultValue = document.querySelector('.result-value');
    resultValue.textContent = `${bmr.toLocaleString()} calories/day`;
    
    // Update date
    const resultDate = document.querySelector('.result-date');
    const now = new Date();
    resultDate.textContent = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

calculateButton.addEventListener('click', updateResults);

// Initialize with default values
updateResults();



// ======= DATE AND TIME

document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar-days');
    const currentMonthElement = document.querySelector('.current-month');
    const prevMonthBtn = document.querySelector('.month-nav.prev');
    const nextMonthBtn = document.querySelector('.month-nav.next');
    
    let currentDate = new Date();
    let selectedDate = null;

    // Function to check if a date is today
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    // Function to check if a date is selected
    function isSelected(date) {
        return selectedDate &&
               date.getDate() === selectedDate.getDate() &&
               date.getMonth() === selectedDate.getMonth() &&
               date.getFullYear() === selectedDate.getFullYear();
    }

    function generateCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
        
        // Clear previous calendar
        calendar.innerHTML = '';
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();

        // Create weekday headers
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekdaysRow = document.createElement('div');
        weekdaysRow.className = 'weekdays';
        weekdays.forEach(day => {
            const dayElement = document.createElement('span');
            dayElement.textContent = day;
            weekdaysRow.appendChild(dayElement);
        });
        calendar.appendChild(weekdaysRow);

        // Create calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Add empty cells for days before first of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            const currentDay = new Date(year, month, day);
            
            // Add appropriate classes
            if (isToday(currentDay)) {
                dayElement.classList.add('today');
            }
            if (isSelected(currentDay)) {
                dayElement.classList.add('selected');
            }
            if (currentDay < today) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(dayElement, year, month, day));
            }
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add empty cells for days after last of month
        const totalCells = firstDay + daysInMonth;
        const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;
        for (let i = 0; i < remainingCells; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        calendar.appendChild(calendarGrid);
    }

    function selectDate(element, year, month, day) {
        // Remove previous selection
        const previousSelected = document.querySelector('.calendar-day.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        
        // Add new selection
        element.classList.add('selected');
        selectedDate = new Date(year, month, day);
        
        // Update any date display or hidden inputs if needed
        // You can add code here to update other parts of your form
    }

    // Event listeners for navigation
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    // Time input validation
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');

    function validateTimeInput(input, min, max) {
        input.addEventListener('input', function() {
            let value = parseInt(this.value) || min;
            if (value < min) value = min;
            if (value > max) value = max;
            this.value = value.toString().padStart(2, '0');
        });

        // Add leading zero when focusing out
        input.addEventListener('blur', function() {
            if (this.value) {
                let value = parseInt(this.value);
                this.value = value.toString().padStart(2, '0');
            }
        });
    }

    validateTimeInput(hoursInput, 1, 12);
    validateTimeInput(minutesInput, 0, 59);
    validateTimeInput(secondsInput, 0, 59);

    // Add some CSS classes to help with styling
    document.querySelectorAll('.time-input input').forEach(input => {
        input.classList.add('time-input-field');
    });

    // Initialize calendar
    generateCalendar(currentDate);
});