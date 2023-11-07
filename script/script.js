document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Fungsi untuk menambahkan tugas
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" id="taskCheckbox">
                <span class="text-center">${taskText}</span>
                <button class="btn btn-danger btn-sm delete-task">Delete</button>
            `;
            taskList.appendChild(taskItem);
            taskInput.value = '';

            // Simpan tugas ke dalam Local Storage
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Fungsi untuk menghapus tugas
    function deleteTask(e) {
        if (e.target.classList.contains('delete-task')) {
            const taskItem = e.target.parentElement;
            const taskText = taskItem.querySelector('span').textContent;
            taskItem.remove();

            // Hapus tugas dari Local Storage
            tasks.splice(tasks.findIndex(task => task.text === taskText), 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Fungsi untuk menandai tugas sebagai selesai
    function markCompleted(e) {
        if (e.target.classList.contains('task-checkbox')) {
            const taskText = e.target.nextElementSibling;
            if (e.target.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }

            // Perbarui status tugas di Local Storage
            const taskTextValue = taskText.textContent;
            const taskIndex = tasks.findIndex(task => task.text === taskTextValue);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = e.target.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
    }

    // Memuat tugas dari Local Storage saat halaman dimuat
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" id="taskCheckbox">
            <span class="text-center">${task.text}</span>
            <button class="btn btn-danger btn-sm delete-task">Delete</button>
        `;
        taskList.appendChild(taskItem);
        if (task.completed) {
            taskItem.querySelector('.task-checkbox').checked = true;
            taskItem.querySelector('span').style.textDecoration = 'line-through';
        }
    });

    // Event listener untuk menghandle tombol "Add Task" saat Enter ditekan
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Event listener untuk menghapus tugas
    taskList.addEventListener('click', deleteTask);

    // Event listener untuk menandai tugas sebagai selesai
    taskList.addEventListener('change', markCompleted);
});
