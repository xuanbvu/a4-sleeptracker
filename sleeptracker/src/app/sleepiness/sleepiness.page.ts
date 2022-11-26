import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness',
  templateUrl: 'sleepiness.page.html',
  styleUrls: ['sleepiness.page.scss'],
})
export class SleepinessPage {
	sleepiness:number = 1;

	private stanfordSleepinessData:StanfordSleepinessData;
	sleepinessSummary:string;

	constructor(public sleepService:SleepService) {

	}

	rangeChanged(value) { this.sleepiness = value }
	sleepinessSubmit() {
		this.stanfordSleepinessData = new StanfordSleepinessData(this.sleepiness);
		this.sleepinessSummary = this.stanfordSleepinessData.summaryString();
		this.sleepService.logSleepinessData(this.stanfordSleepinessData);
	}
}
