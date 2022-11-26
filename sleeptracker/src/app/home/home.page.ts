import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	showOvernightData:boolean = true;
	showSleepinessData:boolean = true;

	constructor(public sleepService:SleepService) {

	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
	get allOvernightData() {
		return SleepService.AllOvernightData;
	}
	get allSleepinessData() {
		return SleepService.AllSleepinessData;
	}

	toggleOvernightData() { this.showOvernightData = !this.showOvernightData }
	toggleSleepinessData() { this.showSleepinessData = !this.showSleepinessData }

}
