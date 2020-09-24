import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Prospect } from '../home/Prospect';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'LeadManagement';

  prospects: Prospect[];

  constructor(private apiService: ApiService){
	this.getProspects();  
  	
  }
  getProspects(){
    this.apiService.getAllProspects()
    .subscribe(data => {
      this.prospects = data;
      console.log(data);
    });
  }
	spresp: any;
	deleteProspects(id:string){
		this.apiService.deleteProspect(id)
		.subscribe(data =>{
			console.log(data);
		});
		
	}  
  ngOnInit(){      
  }
	getFilteredExpenseList(){
		if(this.apiService.searchOption.length > 0){
			this.prospects = this.apiService.filteredListOptions();
		}
		else{
			this.prospects = this.apiService.postData;
		}
	}
	onSelectedFilter(e){
		this.getFilteredExpenseList();
	}
}
