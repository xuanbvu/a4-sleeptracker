import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor(private storage: Storage) {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
		this.init();
		this.getOvernightDatafromStorage();
		this.getSleepinessDatafromStorage();
	}

	async init() {
		await this.storage.create();
	}

	private addDefaultData() {
		this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));
	}

	async addData(storageKey, item) {
		const storedData = await this.storage.get(storageKey) || [];
		storedData.push(item);
		return this.storage.set(storageKey, storedData);
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		// push to local storage overnight
		this.addData("AllOvernightData", sleepData);
		this.getOvernightDatafromStorage();
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		// push to local storage sleepiness
		this.addData("AllSleepinessData", sleepData);
		this.getSleepinessDatafromStorage();
	}

	public async getOvernightDatafromStorage() {
		await this.storage.get("AllOvernightData").then(res => {
			const data = res || [];
			SleepService.AllOvernightData = data;
		})
	}

	public async getSleepinessDatafromStorage() {
		await this.storage.get("AllSleepinessData").then(res => {
			const data = res || [];
			SleepService.AllSleepinessData = data;
		})
	}
}
