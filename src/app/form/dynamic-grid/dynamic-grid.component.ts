import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { ColumnDefFactory } from 'ag-grid-community/dist/types/core/columns/columnDefFactory';
import { filter } from 'rxjs';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-dynamic-grid',
  standalone: true,
  imports: [
    AgGridModule,
    NgIf
  ],
  templateUrl: './dynamic-grid.component.html',
  styleUrl: './dynamic-grid.component.css'
})
export class DynamicGridComponent {
  columnDefs: ColDef[] = [];
  rowData: any[] = [];
  isBrowser: boolean = false;
  formId:any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
   private route : ActivatedRoute,
   private localstorageService: LocalStorageService
  ) {

    this.route.params.subscribe(params => {
      this.formId = params["id"];
      this.rowData = this.localstorageService
        .getItem('formSubmit')
        ?.filter((e:any) => e.formId == this.formId)
        .map((e:any) => e.value);
    this.isBrowser = isPlatformBrowser(this.platformId);
        
      if (this.isBrowser) {
        this.columnDefs = this.getAllColumns(this.rowData).map(e =>{
          return {
            headerName: e.toUpperCase(),
            field : e,
            sortable: true,
            filter : true
          }
        });
        
      }
    })

    

    
  }

  getAllColumns(listOfData: any[]) : string[] {
    const keys = new Set<string>();

    listOfData.forEach(item => {
      Object.keys(item).forEach(key => keys.add(key));
    });

    return Array.from(keys);
  }


}
