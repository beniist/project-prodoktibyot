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

// טעינת הרגלים מהאחסון המקומי
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// פונקציה להוספת הרגל חדש
function addHabit() {
    const input = document.getElementById('newHabit');
    const habitText = input.value.trim();
    
    if (habitText) {
        const habit = {
            id: Date.now(),
            text: habitText,
            completed: false,
            date: new Date().toLocaleDateString('he-IL')
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

// פונקציה לעדכון סטטוס הרגל
function toggleHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.completed = !habit.completed;
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
        habitElement.className = `habit-item ${habit.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'habit-checkbox';
        checkbox.checked = habit.completed;
        checkbox.onclick = () => toggleHabit(habit.id);
        
        const text = document.createElement('span');
        text.className = 'habit-text';
        text.textContent = habit.text;
        
        habitElement.appendChild(text);
        habitElement.appendChild(checkbox);
        
        if (habit.completed) {
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