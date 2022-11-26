import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor(private AllSleepDataStorage: Storage,
		private AllOvernightDataStorage: Storage,
		private AllSleepinessDataStorage: Storage) {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
	}
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		// push to local storage overnight
		this.AllOvernightDataStorage.set(sleepData.id, sleepData);
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		// push to local storage sleepiness
		this.AllSleepinessDataStorage.set(sleepData.id, sleepData);
	}

	public getOvernightDatafromStorage() {
		SleepService.AllOvernightData.forEach( (element) => {
			this.AllSleepinessDataStorage.get(element.id).then ( (val) => {
				console.log(val);
			});
		});
	}

	public getSleepinessDatafromStorage() {
		SleepService.AllSleepinessData.forEach( (element) => {
			this.AllOvernightDataStorage.get(element.id).then((val) => {
				console.log(val);
			});
		});
	}
}
