import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onAddTask : EventEmitter<Task> = new EventEmitter()


  text : string
  day : string
  reminder : boolean = false
  showAddTask : boolean
  subscription : Subscription

  constructor(private uiService : UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.text){  
      alert('Please add a task!')
      return 
    }

    if(!this.day){  
      alert('Please add a day & time')
      return 
    }

    const newTask : Task = {
      text : this.text,
      day : this.day,
      reminder : this.reminder
    }

    this.onAddTask.emit(newTask)

    this.day = ''
    this.text = ''
    this.reminder = false
  }

}
