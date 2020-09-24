import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Prospect } from '../home/Prospect';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	myControl = new FormControl();
	filteredOptions:Observable<string[]>;
	allProspects: Prospect[];
	autoCompleteList: any[];
	
	@ViewChild('autoCompleteInput') autoCompleteInput: ElementRef;	
	@Output() onSelectedOption = new EventEmitter();
  	
	
	constructor(private apiService:ApiService) {
		
	 }
	
	ngOnInit(): void {
		this.myControl.valueChanges.subscribe(userInput =>{
			this.autoCompleteProspectList(userInput);
		});
	}
	private autoCompleteProspectList(input){
		let categoryList = this.filterCategoryList(input);
		this.autoCompleteList = categoryList;
		
	}
	filterCategoryList(value){
		var categoryList = [];
		if(typeof value != "string"){
			return [];
		}
		if(value == '' || value == null){
			return [];
		}
		return value ? this.allProspects.filter(s => 
			s.prospectEmail.toLowerCase().indexOf(value.toLowerCase()) != -1): this.allProspects;
	}
	getAllProspects(){
		this.apiService.getAllProspects()
		.subscribe(data =>{
			this.allProspects = data;
			console.log(data);
		});
	}
	displayFn(prospect:Prospect){
		let k = prospect ? prospect.prospectEmail : prospect;
		return k;
	}
	focusOnPlaceInput(){
		this.autoCompleteInput.nativeElement.focus();
		this.autoCompleteInput.nativeElement.value = '';
	}
	filterPostList(event){
		var prospects = event.source.value;
		if(!prospects){
			this.apiService.searchOption			 = [];
		}
		else{
			this.apiService.searchOption.push(prospects);
			this.onSelectedOption.emit(this.apiService.searchOption);			
		}
		this.focusOnPlaceInput();
	}
	removeOption(option){
		let index = this.apiService.searchOption.indexOf(option);
		if(index >= 0 ){
			this.apiService.searchOption.splice(index, 1);
			this.focusOnPlaceInput();
			this.onSelectedOption.emit(this.apiService.searchOption);
		}
	}
}
