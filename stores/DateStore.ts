import { defineStore, acceptHMRUpdate } from "pinia"
import Dexie, { Table } from 'dexie';
export interface DateDB{
    id?: number;
    date: string;
    title: string;
    description?: string;
    preference: number;
}
export class MySubClassedDexie extends Dexie {
    DateData:  Table<DateDB>; 
     constructor() {
    super('DateDB');
    this.version(1).stores({
      DateData: '++id,date, time,description,preference' // Primary key and indexed props
    });
  }
}
const db = new MySubClassedDexie();
export const useDateStore = defineStore('date', {
    state: () => ({
    data: [],
    timecards: [],
    timecard: {
        id:null,
        date: '',
        title: '',
        description: '',
      preference: 0,
    }
    }),
    getters: {
      getTimecards: (state) => state.timecards,
      getTimecard: (state) => state.timecard
    },
    actions: {
      async addTimeCard(timecard: DateDB) {
        try {
          await db.DateData.add({ date: timecard.date, title: timecard.title, description: timecard.description, preference: Number(timecard.preference) });
          return true
        } catch (e) {
          console.log(e)
          return false
        }
            
      },
      async fetchTimeCards() {
        try {
          let Data = await db.DateData.toArray();
          const dayjs = useDayjs()
          const events = [['10 days','50 days','100 days','150 days'],['10 weeks','20 weeks','30 weeks'],['1 year','2 years','3 years','5 Years','10 years','20 years','25 years','50 years']]
          //  use dayjs and convert if data of format array of date db DateDB to calculate upcoming events based on the preference
          
          this.timecards = Data.map((data) => {
             console.log(data)
            if (data.preference === 1) {
              let currentDate = data.date
              let upcomingDates = [dayjs(data.date).add(10, 'day').toDate(), dayjs(data.date).add(50, 'day').toDate(), dayjs(data.date).add(100, 'day').toDate(), dayjs(data.date).add(150, 'day').toDate()]
              let mostRecentDate = upcomingDates.reduce((a, b, index) => {
                let one = dayjs(a)
                let two = dayjs(b)
                return one.isBefore(two) ? a : b
              })
   
              let curIndex = upcomingDates.indexOf(mostRecentDate)
              let upcomingText = events[0][curIndex] + ' in '+ dayjs(mostRecentDate).fromNow(true)
              return { ...data, upcomingText:upcomingText }
            } else if (data.preference === 2) {
              
              let currentDate = data.date
              let upcomingDates = [dayjs(data.date).add(10, 'week').toDate(), dayjs(data.date).add(20, 'week').toDate(), dayjs(data.date).add(30, 'week').toDate()]
               let mostRecentDate = upcomingDates.reduce((a, b, index) => {
                let one = dayjs(a)
                let two = dayjs(b)
                return one.isBefore(two) ? a : b
              })
    
              let curIndex = upcomingDates.indexOf(mostRecentDate)
              let upcomingText = events[1][curIndex] + ' in '+ dayjs(mostRecentDate).fromNow(true)
              return { ...data, upcomingText:upcomingText }
             
            } else if (data.preference === 3) {

              let currentDate = data.date
              let upcomingDates = [dayjs(data.date).add(1, 'year').toDate(), dayjs(data.date).add(2, 'year').toString(), dayjs(data.date).add(3, 'year').toString(), dayjs(data.date).add(5, 'year').toString(), dayjs(data.date).add(10, 'year').toString(), dayjs(data.date).add(20, 'year').toString(), dayjs(data.date).add(25, 'year').toString(), dayjs(data.date).add(50, 'year').toString()]
             
             
              let mostRecentDate = upcomingDates.reduce((a, b, index) => {
                let one = dayjs(a)
                let two = dayjs(b)
                return one.isBefore(two) ? a : b
              })
            
              let curIndex = upcomingDates.indexOf(mostRecentDate)
              let upcomingText = events[2][curIndex] + ' in '+ dayjs(mostRecentDate).fromNow(true)
              return { ...data, upcomingText:upcomingText }
            }
          })
      
          return true
        } catch (e) {
          console.log(e)
          return false
        }
      },
  async fetchTimeCard(id: number) {
    try {
      let data = await db.DateData.get(id)
      this.timecard = data
      return true
    } catch (e) {
      console.log(e)
      return false
    }
      },
      async deleteTimeCard(id: number) {
        try {
          await db.DateData.delete(id)
          return true
        } catch (e) {
          console.log(e)
          return false
        }
      }
    }
}
    )

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateStore, import.meta.hot))
}