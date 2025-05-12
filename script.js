// מערך של מילות עידוד
const encouragements = [
    "כל הכבוד! המשך כך!",
    "אתה עושה עבודה מצוינת!",
    "התקדמות יפה!",
    "אתה בדרך הנכונה!",
    "כל יום זה צעד קדימה!",
    "מעולה! המשך כך!",
    "אתה מדהים!",
    "כל הרגל קטן מוביל לשינוי גדול!",
    "התמדה היא המפתח להצלחה!",
    "אתה בונה את העתיד שלך!"
];

// שמות הימים בעברית
const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

// טעינת הרגלים מהאחסון המקומי
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// פונקציה להוספת הרגל חדש
function addHabit() {
    const input = document.getElementById('newHabit');
    const habitText = input.value.trim();
    
    if (habitText) {
        const today = new Date().toLocaleDateString('he-IL');
        const habit = {
            id: Date.now(),
            text: habitText,
            completedDays: {
                [today]: {}
            },
            date: today,
            selected: false
        };
        
        habits.push(habit);
        saveHabits();
        renderHabits();
        input.value = '';
    }
}

// פונקציה לשמירת הרגלים
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// פונקציה לעדכון סטטוס הרגל ליום ספציפי
function toggleHabitDay(habitId, dayIndex) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        const today = new Date().toLocaleDateString('he-IL');
        if (!habit.completedDays[today]) {
            habit.completedDays[today] = {};
        }
        habit.completedDays[today][dayIndex] = !habit.completedDays[today][dayIndex];
        saveHabits();
        renderHabits();
    }
}

// פונקציה לבחירת הרגל להסרה
function toggleHabitSelection(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        habit.selected = !habit.selected;
        saveHabits();
        renderHabits();
    }
}

// פונקציה להסרת הרגלים נבחרים
function removeSelectedHabits() {
    if (confirm('האם אתה בטוח שברצונך להסיר את ההרגלים הנבחרים?')) {
        habits = habits.filter(habit => !habit.selected);
        saveHabits();
        renderHabits();
    }
}

// פונקציה להצגת הרגלים
function renderHabits() {
    const habitsList = document.getElementById('habitsList');
    habitsList.innerHTML = '';
    
    habits.forEach(habit => {
        const habitElement = document.createElement('div');
        habitElement.className = 'habit-item';
        
        const habitHeader = document.createElement('div');
        habitHeader.className = 'habit-header';
        
        const selectCheckbox = document.createElement('input');
        selectCheckbox.type = 'checkbox';
        selectCheckbox.className = 'habit-select';
        selectCheckbox.checked = habit.selected || false;
        selectCheckbox.onclick = () => toggleHabitSelection(habit.id);
        
        const text = document.createElement('span');
        text.className = 'habit-text';
        text.textContent = habit.text;
        
        habitHeader.appendChild(selectCheckbox);
        habitHeader.appendChild(text);
        habitElement.appendChild(habitHeader);
        
        const weekGrid = document.createElement('div');
        weekGrid.className = 'week-grid';
        
        const today = new Date().toLocaleDateString('he-IL');
        const completedDays = habit.completedDays[today] || {};
        
        weekDays.forEach((day, index) => {
            const dayCell = document.createElement('div');
            dayCell.className = `day-cell ${completedDays[index] ? 'completed-day' : ''}`;
            
            const dayLabel = document.createElement('div');
            dayLabel.className = 'day-label';
            dayLabel.textContent = day;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'day-checkbox';
            checkbox.checked = completedDays[index] || false;
            checkbox.onclick = () => toggleHabitDay(habit.id, index);
            
            dayCell.appendChild(dayLabel);
            dayCell.appendChild(checkbox);
            weekGrid.appendChild(dayCell);
        });
        
        habitElement.appendChild(weekGrid);
        
        // הוספת מילת עידוד אם יש לפחות הרגל אחד שבוצע היום
        const completedToday = Object.values(completedDays).some(completed => completed);
        if (completedToday) {
            const encouragement = document.createElement('div');
            encouragement.className = 'encouragement';
            encouragement.textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
            habitElement.appendChild(encouragement);
        }
        
        habitsList.appendChild(habitElement);
    });
}

// טעינת הרגלים בטעינת הדף
document.addEventListener('DOMContentLoaded', renderHabits); 