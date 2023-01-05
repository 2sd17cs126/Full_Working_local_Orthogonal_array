import { Component } from '@angular/core';
import { ModalService } from './_modal/modal.service';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm,
} from '@angular/forms';
/**
 * @title Basic expansion panel
 *
 */
import { Arr } from './model';


@Component({
  selector: 'expansion-overview-example',

  templateUrl: 'expansion-overview-example.html',
  styleUrls: ['expansion-overview-example.css'],
})
export class ExpansionOverviewExample {
  data: Array<{}> = [];
  id:string=''
  SelectedItem='';
  flag_table:boolean=false;
  onscreen=[]
   radio_list=[]
  fetched_list=[];
  displayedColumns = [];
  rows: FormArray;
  map_col={}
  Fac=0;
  arr: Arr = { Factors: '0', Levels: '0' };
  addForm: FormGroup;
  panelOpenState: boolean = false;
  flag: boolean = false;

  obj: any;
  Gen_flag: boolean = false;
  Number_of_factor: string = '0';

  constructor(private fb: FormBuilder, private http: HttpClient,private modalService: ModalService) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }
  ngOnInit() {
    this.addForm.get('items').valueChanges.subscribe((val) => {
      if (val === true) {
        this.addForm.get('items_value').setValue('yes');

        this.addForm.addControl('rows', this.rows);
      }
      if (val === false) {
        this.addForm.get('items_value').setValue('no');
        this.addForm.removeControl('rows');
      }
    });
  }

  onSave() {
    this.Gen_flag = false;
    if (Number(this.arr.Factors) != 0) {
      this.flag = true;
    } else {
      this.flag = false;
    }
    for (let index = 0; index < Number(this.arr.Factors); index++) {
      this.displayedColumns.push(String(index));
    }
    console.log(this.displayedColumns);
  }
  generate(id:string) {
    this.id=id
    let count = {};
    for (let index = 0; index < this.rows.value.length; index++) {
      let s = this.rows.value[index]['Level_values'].split(',').length;
      if (s in count) {
        let temp = count[s];
        temp = temp + 1;
        count[s] = temp;
      } else {
        count[s] = 1;
      }
    }
    console.log('count dic is :');
    console.log(count);
    let str = '';
    for (let key in count) {
      str += key;
      str = str + '^' + String(count[key]);
      str += ' ';
    }
    str = str.slice(0, str.length - 1);

    for (let index = 0; index < this.rows.value.length; index++) {
     let temp=this.rows.value[index]['Factor_name']
     this.onscreen.push(temp)
     this.map_col[this.displayedColumns[index]]=this.onscreen[index]
    }
    console.log("onscreen:"+this.map_col)
    this.http
      .post('http://127.0.0.1:8000/', {
        pattern: str,
      })
      .subscribe((data) => (this.obj = data));
    console.log(this.obj);
//
   if (this.obj) {
      this.fetched_list=this.obj.result[1]
   
   for (let index=0;index<=2;index++)
	{
	this.radio_list.push(this.fetched_list[index]['id'])
	}
  console.log("radio_list:")
  console.log(this.radio_list)


 	

   this.modalService.open(id);
    }
   

}



//

submit(){
 let s='';
 console.log("selectedItem:")
 console.log(this.SelectedItem)
 for (let index=0;index<this.fetched_list.length;index++)
  {
	
  if (this.fetched_list[index]['id']==this.SelectedItem){
      console.log("fetched_list[index]:")
      console.log(this.fetched_list[index])
	if (this.fetched_list[index]['F_factor']-this.fetched_list[index]['E_index'] == 0){
	
	s=this.fetched_list[index]['tab']
	}
      else{
		this.Fac=this.fetched_list[index]['F_factor'];
    console.log("type")
    console.log(typeof this.fetched_list[index]['E_factor'] )
		let E=this.fetched_list[index]['F_factor']
    let F=this.fetched_list[index]['E_factor'];

    let removing_col=E-F
    console.log("removingcol:")

    console.log(removing_col)
		let new_=this.fetched_list[index]['tab'].split("\n")
    new_.pop()

		console.log("new_")
    console.log(new_)

		for (let i=0;i<new_.length;i++){
			s+=new_[i].slice(0,new_[i].length-removing_col);
			s+="\n";
      console.log("x:")
      console.log(s)

              }

    
          }
   break;
	}

  
  }
  console.log(" s new:")
    console.log(s)
  if(this.obj.result[0]){
         
    }
    else{
      
         
        let new_fac=this.Fac;
        for (let i=0; i<this.rows.value.length;i++)
        {

            if (this.rows.value[i]['Level_values'].split(",").length<new_fac)
            
            {
              for (let j=0; j<new_fac-this.rows.value[i]['Level_values'].split(",").length; j++)
              {
                this.rows.value[i]['Level_values']+=',~'
            
              }
            }
                
        }
      
    }
  console.log("row.value:")
  console.log(this.rows.value)
  console.log("s:")
 	console.log(s);
    let list = s.split('\n');
    console.log(list);
    console.log(this.displayedColumns);
    const runs = list.length;
    console.log(this.rows.value)
    for (let index = 0; index < runs; index++) {
      let d = {};
      for (let j = 0; j < list[index].length; j++) {
        d[String(j)] =
          this.rows.value[j]['Level_values'].split(',')[list[index][j]];
      }
      this.data.push(d);
    }
    console.log(this.data);
   

///

this.flag_table=true;
this.modalService.close(this.id);
}

closeModal(id: string) {
  this.modalService.close(id);
}
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      Factor_name: null,
      Level_values: null,
    });
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
