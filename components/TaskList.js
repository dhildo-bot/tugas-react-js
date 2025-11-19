// src/components/TaskList.js

import React from 'react'; 
// Impor ikon yang sudah kita instal
import { FiEdit, FiTrash2 } from 'react-icons/fi';

// Fungsi bantuan untuk mendapatkan nama kelas CSS berdasarkan prioritas
const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High': return 'priority-High';
    case 'Medium': return 'priority-Medium';
    case 'Low': return 'priority-Low';
    default: return '';
  }
};

// Menerima prop baru 'toggleTaskStatus'
const TaskList = ({ tasks, deleteTask, showEditForm, toggleTaskStatus }) => { 
  return ( 
    <div className="task-list-wrapper"> 
      {tasks.length === 0 && (
        <p className="text-center text-muted">No tasks yet. Add one!</p>
      )}

      {tasks.map((task) => ( 
        // Ini adalah item tugas kustom kita
        <div className="task-item" key={task.id}>
          
          {/* Kolom 1: Lingkaran Toggle */}
          <div 
            className={`task-toggle ${task.status === 'Done' ? 'completed' : ''}`}
            onClick={() => toggleTaskStatus(task.id, task.status)}
          >
          </div>

          {/* Kolom 2: Judul Tugas */}
          <div className={`task-title ${task.status === 'Done' ? 'completed' : ''}`}>
            {task.name}
          </div>
          
          {/* Kolom 3: Prioritas */}
          <div className="task-priority">
            <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          {/* Kolom 4: Status */}
          <div className="task-status">
            <span className="status-badge">
              {task.status}
            </span>
          </div>

          {/* Kolom 5: Aksi (Edit & Hapus) */}
          <div className="task-actions">
            <button className="icon-btn edit" onClick={() => showEditForm(task)}>
              <FiEdit />
            </button>
            <button className="icon-btn delete" onClick={() => deleteTask(task.id)}>
              <FiTrash2 />
            </button>
          </div>

        </div> 
      ))}
    </div> 
  );
};

export default TaskList;