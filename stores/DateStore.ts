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
           const events = [[{ label: '10 days', value: 10 }, { label: '50 days', value: 50 }, { label: '100 days', value: 100 }, { label: '150 days', value: 150 }], [{ label: '10 weeks', value: 10 }, { label: '20 weeks', value: 20 }, { label: '30 weeks', value: 30 }], [{ label: '1 year', value: 1 }, { label: '2 years', value: 2 }, { label: '3 years', value: 3 }, { label: '5 years', value: 5 }, { label: '10 years', value: 10 }, { label: '20 years', value: 20 }, { label: '25 years', value: 25 }, { label: '50 years', value: 50 }]]
          //  use dayjs and convert if data of format array of date db DateDB to calculate upcoming events based on the preference
         
          this.timecards = Data.map((data) => {
             let upcomingDates = []
            if (data.preference === 1) {
              let condition = (date)=>dayjs(date.value).isAfter(dayjs())
              events[0].forEach((event) => {
                let date = dayjs(data.date).add(event.value, 'day')
                upcomingDates.push({ label: event.label, value: date.toDate() })
              })
              
              upcomingDates = upcomingDates.filter(condition)
              
              let mostRecentDate = upcomingDates.reduce((a, b, index) => {
                let one = dayjs(a.value)
                let two = dayjs(b.value)
                return one.isBefore(two) ? a : b
              })
              
              return {...data,upcomingText:`${mostRecentDate.label} in ${dayjs(mostRecentDate.value).fromNow()}`}
             }
            else if (data.preference === 2) {
                let condition = (date)=>dayjs(date.value).isAfter(dayjs())
              events[1].forEach((event) => {
                let date = dayjs(data.date).add(event.value, 'week')
                upcomingDates.push({ label: event.label, value: date.toDate() })
              })
              
              upcomingDates = upcomingDates.filter(condition)
              
              let mostRecentDate = upcomingDates.reduce((a, b, index) => {
                let one = dayjs(a.value)
                let two = dayjs(b.value)
                return one.isBefore(two) ? a : b
              })
              
              return {...data,upcomingText:`${mostRecentDate.label} in ${dayjs(mostRecentDate.value).fromNow()}`}
             }
            else if (data.preference === 3) {
                let condition = (date)=>dayjs(date.value).isAfter(dayjs())
              events[2].forEach((event) => {
                let date = dayjs(data.date).add(event.value, 'year')
                upcomingDates.push({ label: event.label, value: date.toDate() })
              })
              
              upcomingDates = upcomingDates.filter(condition)
              
              let mostRecentDate = upcomingDates.reduce((a, b, index) => {
                let one = dayjs(a.value)
                let two = dayjs(b.value)
                return one.isBefore(two) ? a : b
              })
              
              return {...data,upcomingText:`${mostRecentDate.label} in ${dayjs(mostRecentDate.value).fromNow()}`}
            }

          })
          // this.timecards = Data.map((data) => {
        
          //   if (data.preference === 1) {
          //     let currentDate = data.date
          //     let condition = (date)=>dayjs(date).isAfter(dayjs())
          //     let upcomingDates = [dayjs(data.date).add(10, 'day').toDate(), dayjs(data.date).add(50, 'day').toDate(), dayjs(data.date).add(100, 'day').toDate(), dayjs(data.date).add(150, 'day').toDate()].filter(condition)
          //     console.log(upcomingDates,'Preference Day')
          //     let mostRecentDate = upcomingDates.reduce((a, b, index) => {
          //       let one = dayjs(a)
          //       let two = dayjs(b)
          //       return one.isBefore(two) ? a : b
          //     })
   
          //     let curIndex = upcomingDates.indexOf(mostRecentDate)
          //     let upcomingText = events[0][curIndex] + ' in '+ dayjs(mostRecentDate).fromNow(true)
          //     return { ...data, upcomingText:upcomingText }
          //   } else if (data.preference === 2) {
              
          //     let currentDate = data.date
          //     let condition = (date)=>dayjs(date).isAfter(dayjs())
          //     let upcomingDates = [dayjs(data.date).add(10, 'week').toDate(), dayjs(data.date).add(20, 'week').toDate(), dayjs(data.date).add(30, 'week').toDate()].filter(condition)
          //     console.log(upcomingDates,'Preference Week')
          //      let mostRecentDate = upcomingDates.reduce((a, b, index) => {
          //       let one = dayjs(a)
          //       let two = dayjs(b)
          //       return one.isBefore(two) ? a : b
          //     })
    
          //     let curIndex = upcomingDates.indexOf(mostRecentDate)
          //     let upcomingText = events[1][curIndex] + ' in '+ dayjs(mostRecentDate).fromNow(true)
          //     return { ...data, upcomingText:upcomingText }
             
          //   } else if (data.preference === 3) {

          //     let currentDate = data.date
          //     let condition = (date)=>dayjs(date).isAfter(dayjs())
          //     let upcomingDates = [dayjs(data.date).add(1, 'year').toDate(), dayjs(data.date).add(2, 'year').toString(), dayjs(data.date).add(3, 'year').toString(), dayjs(data.date).add(5, 'year').toString(), dayjs(data.date).add(10, 'year').toString(), dayjs(data.date).add(20, 'year').toString(), dayjs(data.date).add(25, 'year').toString(), dayjs(data.date).add(50, 'year').toString()].filter(condition)
          //     console.log(upcomingDates,'Preference Year')
             
             
          //     let mostRecentDate = upcomingDates.reduce((a, b, index) => {
          //       let one = dayjs(a)
          //       let two = dayjs(b)
          //       return one.isBefore(two) ? a : b
          //     })
            
          //     let curIndex = upcomingDates.indexOf(mostRecentDate)
          //     let upcomingText = events[2][curIndex] + ' in '+ dayjs(mostRecentDate).fromNow(true)
          //     return { ...data, upcomingText:upcomingText }
          //   }
          // })
      
          return true
        } catch (e) {
          console.log(e)
          return false
        }
      },
  async fetchTimeCard(id: number) {
    try {
      let data = await db.DateData.get(id)
      const dayjs = useDayjs()
      const events = [[{ label: '10 days', value: 10 }, { label: '50 days', value: 50 }, { label: '100 days', value: 100 }, { label: '150 days', value: 150 }], [{ label: '10 weeks', value: 10 }, { label: '20 weeks', value: 20 }, { label: '30 weeks', value: 30 }], [{ label: '1 year', value: 1 }, { label: '2 years', value: 2 }, { label: '3 years', value: 3 }, { label: '5 years', value: 5 }, { label: '10 years', value: 10 }, { label: '20 years', value: 20 }, { label: '25 years', value: 25 }, { label: '50 years', value: 50 }]]
      
      let upcomingDates = []
      let comingDays = []
      let comingWeeks = []
      let comingYears = []
      // let condition = (date)=>dayjs(date.value).isAfter(dayjs())
      events[0].forEach((event) => {
        
        
        
        let date = dayjs(data.date).add(event.value, 'day')
        upcomingDates.push({ label: event.label, value: date.toDate() })
        comingDays.push({ label: event.label, value: date.toDate() })
   
        })
      events[1].forEach((event) => {
       
        
          let date = dayjs(data.date).add(event.value, 'week')
        upcomingDates.push({ label: event.label, value: date.toDate() })
        comingWeeks.push({ label: event.label, value: date.toDate() })
        
        })
      events[2].forEach((event) => {
       
      
          let date = dayjs(data.date).add(event.value, 'year')
          upcomingDates.push({ label: event.label, value: date.toDate() })
       comingYears.push({ label: event.label, value: date.toDate() })
        
        })
       
      // Filter upcoming array and find any dates that are the same as today
      const today = dayjs().startOf('day');
      const condition = (date)=>dayjs(date.value).startOf('day').isSame(today)
      const sameDates = upcomingDates.filter(condition);
    
      this.timecard = {...data, upcomingDates:{comingDays,comingWeeks,comingYears},today: sameDates}
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