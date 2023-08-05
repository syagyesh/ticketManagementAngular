import { Component, OnInit } from '@angular/core';
import data from '../../data.json';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  data = [...data];
  dataSource : any[];
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = this.data;
  }
  displayedColumns : string[] = ['id', 'ticket', 'assigned', 'status', 'date', 'action']

  openDialog() {
    let dialogData = this.dialog.open(DialogComponent, {
      data: {editData: this.data,
            indexOfData: -1}
    });

    dialogData.afterClosed().subscribe(result => {
      this.data = [...this.data,result]
      this.dataSource = [...this.data];
    });
  }

  deleteData(id:string) {
    for(let i = 0; i < this.data.length; i++) {
      if(parseInt(this.data[i].id) == parseInt(id)) {
        this.data.splice(i,1);
        this.dataSource = [...this.data];
        break;
      }
    }
  }

  editData(id:string) {
    for(let i = 0; i < this.data.length; i++) {
      if(parseInt(this.data[i].id) == parseInt(id)) {
        const dialogData = this.dialog.open(DialogComponent, {
          data: {editData: this.data,
            indexOfData: i}
          });
        this.deleteData(id)
        dialogData.afterClosed().subscribe(result => {
          this.data = [...this.data,result]
          this.dataSource = [...this.data];
        });
      break;
      }
    }
  }

  filterData(value:string){ 
    const filterValue = this.data.filter((data) => {
      return data.status == value;
    });
    this.dataSource = [...filterValue];
    if(value == "Total") {
      this.dataSource = [...this.data];
    }
  }

}
