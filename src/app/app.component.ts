import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  assignedTo: string;
  status: string;
  dueDate: string;
  priority: string;
  comments: string;
  selected?: boolean; 
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To-Do List';
  tasks: Task[] = [];
  newTask: Task = {
    name: '',
    assignedTo: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: '',
  };

  isEditMode = false;
  editIndex: number | null = null; 
  searchTerm: string = ''; 
  showDeleteButton = false; 
  addOrUpdateTask() {
    if (this.isEditMode && this.editIndex !== null) {
      this.tasks[this.editIndex] = { ...this.newTask };
      this.isEditMode = false;
      this.editIndex = null;
    } else {
      if (this.newTask.name.trim()) {
        this.tasks.push({ ...this.newTask });
      }
    }
    this.resetForm();
    this.updateDeleteButtonVisibility();
  }
  editTask(index: number) {
    this.isEditMode = true;
    this.editIndex = index;
    this.newTask = { ...this.tasks[index] };
  }
  resetForm() {
    this.newTask = {
      name: '',
      assignedTo: '',
      status: '',
      dueDate: '',
      priority: '',
      comments: ''
    };
  }
  confirmDelete(index: number) {
    const confirmDelete = confirm("Do you want to delete this task?");
    if (confirmDelete) {
      this.tasks.splice(index, 1);
    }
    this.updateDeleteButtonVisibility(); 
  }
  deleteSelectedTasks() {
    this.tasks = this.tasks.filter(task => !task.selected); 
  }
  updateDeleteButtonVisibility() {
    this.showDeleteButton = this.tasks.some(task => task.selected); 
  }
  getFilteredTasks(): Task[] {
    if (!this.searchTerm.trim()) {
      return this.tasks; 
    }
    return this.tasks.filter(task =>
      task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.comments.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
