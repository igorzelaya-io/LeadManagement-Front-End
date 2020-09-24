import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Prospect } from '../Prospect';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  prospectForm: FormGroup;
  txtName : FormControl ;
  txtOrganization : FormControl;
  txtPhone:FormControl;
  txtCountry:FormControl;
  txtEmail:FormControl;
  txtComments:FormControl;
  txtStatus:FormControl;
   	

  constructor(private apiService: ApiService,private route: ActivatedRoute) {  
	 this.txtName = new FormControl();
     this.txtOrganization = new FormControl();
     this.txtPhone = new FormControl();
     this.txtCountry = new FormControl();
     this.txtEmail = new FormControl();
     this.txtComments = new FormControl();
     this.txtStatus = new FormControl();  
  }
  prospect:Prospect = new Prospect();
  spresp: any;
	clicked:boolean = false;  	
    updateClick(){
		this.clicked = true;
	}
	save(){
      this.prospect.prospectName = this.txtName.value;
      this.prospect.prospectOrgName = this.txtOrganization.value;
      this.prospect.prospectPhone = this.txtPhone.value;
      this.prospect.prospectCountry = this.txtCountry.value;
      this.prospect.prospectEmail = this.txtEmail.value;
      this.prospect.prospectStatusCode = this.txtStatus.value;
      this.prospect.prospectComments = this.txtComments.value;
      return this.apiService.postProspect(this.prospect).subscribe();
   }
   get diagnostic(){
   		return JSON.stringify(this.prospect);
   }
   ngOnInit(){
    this.route.queryParams.subscribe(params => {
    this.prospect.prospectId  = params['prospectId']; 
    this.txtName.setValue(params['prospectName']);
    this.txtOrganization.setValue(params['prospectOrgName']);
    this.txtPhone.setValue(params['prospectPhone']);
    this.txtCountry.setValue(params['prospectCountry']);
    this.txtEmail.setValue( params['prospectEmail']);
    this.txtStatus.setValue(params['prospectStatusCode']);
    this.txtComments.setValue(params['prospectComments']);
  });	 
  	
  }
	
}
