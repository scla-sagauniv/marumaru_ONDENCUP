import { prisma } from './prisma'
import { reminder } from './routers/reminder'

export const reminderExec = () => {
  setInterval(() => {
    // now is 8:00 AM
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    console.log(hour, minutes)
    if (hour === 9 && minutes === 10) {
      reminder(prisma)
    }
  }, 1000 * 60) // 1分ごとに実行
}
