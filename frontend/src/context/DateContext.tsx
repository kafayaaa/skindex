import { createContext, useContext, useEffect, useState } from "react"

interface DayData {
  date: Date
  dayName: string
  dateNumber: number
  monthName: string
  isToday: boolean
  hasLog: boolean
  hasAnalysis: boolean
  skinRating?: number // 1-5
  mood?: 'good' | 'neutral' | 'bad'
  notes?: string,
}

interface DateContextType {
    currentWeekStart: Date,
    setCurrentWeekStart: (date: Date) => void,
    selectedDay: Date,
    setSelectedDay: (date: Date) => void
    weekData: DayData[],
    setWeekData: (data: DayData[]) => void,
    generateWeekData: (startDate: Date) => DayData[],
    navigateWeek: (direction: 'prev' | 'next') => void,
    goToCurrentWeek: () => void,
    getRatingColor: (rating?: number) => string,
    getMoodIcon: (mood?: 'good' | 'neutral' | 'bad') => string,
    formatDateRange: () => string,
    selectedDayData: DayData | undefined,
    weeklyStats: { daysWithLog: number, daysWithAnalysis: number, averageRating: number, goodDays: number },
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
      const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
        const today = new Date()
        const dayOfWeek = today.getDay() // 0 = Minggu, 1 = Senin, etc
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Start Monday
        return new Date(today.setDate(diff))
      })
      
      const [selectedDay, setSelectedDay] = useState<Date>(new Date())
      const [weekData, setWeekData] = useState<DayData[]>([])
    
      // Generate week data
      const generateWeekData = (startDate: Date): DayData[] => {
        const days: DayData[] = []
        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
        const today = new Date()
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate)
          date.setDate(startDate.getDate() + i)
          
          const dayOfWeek = date.getDay()
          const isToday = 
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          
          // Mock data - replace with actual API data
          const hasLog = Math.random() > 0.4
          const hasAnalysis = Math.random() > 0.6
          const skinRating = Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : undefined
          const mood = hasLog ? (Math.random() > 0.5 ? 'good' : Math.random() > 0.5 ? 'neutral' : 'bad') : undefined
          
          days.push({
            date,
            dayName: dayNames[dayOfWeek],
            dateNumber: date.getDate(),
            monthName: monthNames[date.getMonth()],
            isToday,
            hasLog,
            hasAnalysis,
            skinRating,
            mood,
            notes: hasLog ? (Math.random() > 0.7 ? 'Kulit terasa lebih lembap hari ini' : undefined) : undefined
          })
        }
        
        return days
      }
    
      useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWeekData(generateWeekData(currentWeekStart))
      }, [currentWeekStart])
    
      const navigateWeek = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentWeekStart)
        if (direction === 'prev') {
          newDate.setDate(newDate.getDate() - 7)
        } else {
          newDate.setDate(newDate.getDate() + 7)
        }
        setCurrentWeekStart(newDate)
      }
    
      const goToCurrentWeek = () => {
        const today = new Date()
        const dayOfWeek = today.getDay()
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
        setCurrentWeekStart(new Date(today.setDate(diff)))
        setSelectedDay(today)
      }
    
      const getRatingColor = (rating?: number) => {
        if (!rating) return 'bg-zinc-200 dark:bg-zinc-700'
        if (rating <= 2) return 'bg-red-500'
        if (rating <= 3) return 'bg-yellow-500'
        return 'bg-green-500'
      }
    
      const getMoodIcon = (mood?: 'good' | 'neutral' | 'bad') => {
        switch (mood) {
          case 'good': return '😊'
          case 'neutral': return '😐'
          case 'bad': return '😔'
          default: return '📝'
        }
      }
    
      const formatDateRange = () => {
        const start = currentWeekStart
        const end = new Date(start)
        end.setDate(start.getDate() + 6)
        
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
        return `${start.toLocaleDateString('id-ID', options)} - ${end.toLocaleDateString('id-ID', options)} ${end.getFullYear()}`
      }
    
      const selectedDayData = weekData.find(day => 
        day.date.getDate() === selectedDay.getDate() &&
        day.date.getMonth() === selectedDay.getMonth() &&
        day.date.getFullYear() === selectedDay.getFullYear()
    )
    
      // Calculate weekly stats
      const weeklyStats = {
        daysWithLog: weekData.filter(d => d.hasLog).length,
        daysWithAnalysis: weekData.filter(d => d.hasAnalysis).length,
        averageRating: weekData
            .filter(d => d.skinRating)
            .reduce((acc, d) => acc + (d.skinRating || 0), 0) / 
            weekData.filter(d => d.skinRating).length || 0,
        goodDays: weekData.filter(d => d.skinRating && d.skinRating >= 4).length
    }

      return (
        <DateContext.Provider value={{
            currentWeekStart,
            setCurrentWeekStart,
            selectedDay,
            setSelectedDay,
            weekData,
            setWeekData,
            generateWeekData,
            navigateWeek,
            goToCurrentWeek,
            getRatingColor,
            getMoodIcon,
            formatDateRange,
            selectedDayData,
            weeklyStats,
        }}>
          {children}
        </DateContext.Provider>
      )
}

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};