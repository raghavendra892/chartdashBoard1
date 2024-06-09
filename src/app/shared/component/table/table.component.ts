import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit ,AfterViewInit{

  constructor() { }

  ngOnInit(): void {
  }

  componentStatus = [
    { datetime: "01-Feb-2024 15:24", name: 'Mr Rohan Jadhav', age: 30, number: 9167954327, reason :'Advanced semen Analysis'},
    { datetime: "01-Feb-2024 15:24", name: 'Mrs Divya More', age: 31, number: 8790563424, reason :'Oocytes Retrieval'},
  ]

  dataSource = new MatTableDataSource<any>;

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.componentStatus);
  }

  //displayedColumns: string[] = ['count', 'name', 'status', 'date'];

  displayedColumns: string[] = ['datetime', 'name', 'age', 'number', 'reason'];

}
