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
		this.init();
		this.getSleepDatafromStorage();
		this.getOvernightDatafromStorage();
		this.getSleepinessDatafromStorage();

		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
	}

	async init() {
		await this.storage.create();
	}

	private addDefaultData() {
		const defaultData1 = new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00'));
		defaultData1.date = defaultData1.dateString();
		defaultData1.summary = defaultData1.summaryString();

		const defaultData2 = new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00'));
		defaultData2.date = defaultData2.dateString();

		const defaultData3 = new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00'));
		defaultData3.date = defaultData3.dateString();
		defaultData3.summary = defaultData3.summaryString();
		
		const defaultOvernightData = [];
		defaultOvernightData.push(defaultData1);
		defaultOvernightData.push(defaultData3);
		this.storage.set("AllOvernightData", defaultOvernightData);

		const defaultSleepinessData = [];
		defaultSleepinessData.push(defaultData2);
		this.storage.set("AllSleepinessData", defaultSleepinessData);
	}

	async addData(storageKey, item) {
		const storedData = await this.storage.get(storageKey) || [];
		storedData.push(item);
		return this.storage.set(storageKey, storedData);
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		// push to local storage overnight
		this.addData("AllSleepData", sleepData);
		this.addData("AllOvernightData", sleepData);
		this.getOvernightDatafromStorage();
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		// push to local storage sleepiness
		this.addData("AllSleepData", sleepData);
		this.addData("AllSleepinessData", sleepData);
		this.getSleepinessDatafromStorage();
	}

	public async getSleepDatafromStorage() {
		await this.storage.get("AllSleepData").then(res => {
			const data = res || [];
			SleepService.AllSleepData = data;
		})
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
