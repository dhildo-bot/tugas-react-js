// src/App.js

import React, { useState } from 'react'; 
// HAPUS 'Container' dan 'Button' dari 'react-bootstrap' jika tidak dipakai di sini
// TAPI KITA MASIH PAKAI 'Container' untuk layout
import { Container, Button } from 'react-bootstrap'; 
import TaskList from './components/TaskList'; 
import TaskForm from './components/TaskForm'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; // <-- TAMBAHKAN INI

function App() { 
  // ... (SEMUA LOGIKA STATE [tasks, showForm, taskToEdit] TETAP SAMA) ...
  const [tasks, setTasks] = useState([
    // Contoh data agar terlihat seperti di gambar
    { id: 1, name: 'Go to gym', priority: 'High', status: 'To Do' },
    { id: 2, name: 'Read a book', priority: 'Low', status: 'Done' },
    { id: 3, name: 'Go to market', priority: 'Medium', status: 'In Progress' },
    { id: 4, name: 'Restart Learning Solidworks', priority: 'High', status: 'To Do' },
    { id: 5, name: 'change slider to scroll', priority: 'High', status: 'Done' },
    { id: 6, name: 'To publish the article', priority: 'Medium', status: 'In Progress' },
  ]); 
  const [showForm, setShowForm] = useState(false); 
  const [taskToEdit, setTaskToEdit] = useState(null); 

  const handleShowForm = () => setShowForm(true); 

  const handleCloseForm = () => { 
    setShowForm(false); 
    setTaskToEdit(null); 
  };

  const addTask = (task) => { 
    const newTaskWithId = { ...task, id: Date.now() };
    setTasks([...tasks, newTaskWithId]); 
  };

  const editTask = (updatedTask) => { 
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))); 
  };

  const deleteTask = (id) => { 
    setTasks(tasks.filter(task => task.id !== id)); 
  };

  const showEditForm = (task) => { 
    setTaskToEdit(task); 
    handleShowForm(); 
  };

  // Fungsi baru untuk toggle status (lingkaran)
  const toggleTaskStatus = (taskId, currentStatus) => {
    const newStatus = currentStatus === 'Done' ? 'To Do' : 'Done';
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };


  return ( 
    // Ganti Container dengan class kustom kita
    <Container className="app-container"> 
      
      {/* Header baru yang sesuai gambar */}
      <div className="task-header">
        <h1>Task List</h1>
        {/* Tombol ini akan otomatis mengambil gaya dari App.css */}
        <Button variant="primary" onClick={handleShowForm}>+ Add Task</Button>
      </div>
      
      <div className="mt-4">
        <TaskList 
          tasks={tasks} 
          deleteTask={deleteTask} 
          showEditForm={showEditForm}
          toggleTaskStatus={toggleTaskStatus} // <-- Kirim fungsi baru
        />
        
        {/* TaskForm modal tidak perlu diubah, akan tetap berfungsi */}
        <TaskForm 
          show={showForm} 
          handleClose={handleCloseForm} 
          addTask={addTask} 
          editTask={editTask} 
          taskToEdit={taskToEdit} 
        />
      </div>
    </Container> 
  );
}

export default App;