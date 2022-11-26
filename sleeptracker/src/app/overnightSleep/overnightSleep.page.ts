import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-overnightSleep',
  templateUrl: 'overnightSleep.page.html',
  styleUrls: ['overnightSleep.page.scss'],
})
export class OvernightSleepPage {
	startDate:string = format(new Date(), 'yyyy-MM-dd') + 'T00:00';
	endDate:string = format(new Date(), 'yyyy-MM-dd') + 'T00:00';
	formattedStartDate:string = format(parseISO(this.startDate), "hh:mm a, MMM d");
	formattedEndDate:string = format(parseISO(this.endDate), "hh:mm a, MMM d");

	private overnightSleepData:OvernightSleepData;
	overnightSleepSummary:string;

	constructor(public sleepService:SleepService) {

	}

	startDateChanged(value) { this.formattedStartDate = format(parseISO(value), "hh:mm a, MMM d") }
	endDateChanged(value) { this.formattedEndDate = format(new Date(parseISO(value)), "hh:mm a, MMM d") }

	overnightSleepSubmit() {
		this.overnightSleepData = new OvernightSleepData(new Date(parseISO(this.startDate)), new Date(parseISO(this.endDate)));
		this.overnightSleepSummary = this.overnightSleepData.summaryString();
		console.log(this.overnightSleepSummary)
		this.sleepService.logOvernightData(this.overnightSleepData);
	}
}
