import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { DesignHelper } from '../form/add-edit-form/Helpers/design-helper';
import { Form } from '../form/form.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() isUserView: boolean = false;
  forms:Form[];
  constructor(private localstorageService: LocalStorageService){
    // console.log(window.location.href)
    this.forms = this.localstorageService.getItem('forms');
    if(!this.forms){
      const { v4: uuidv4 } = require('uuid');
      this.forms = [
        {
          id : uuidv4(),
          fields : DesignHelper.sampleFields
        }
      ];
      this.localstorageService.setItem('forms',this.forms);
    }
  }
  ngOnInit(): void {
    
  }
}
