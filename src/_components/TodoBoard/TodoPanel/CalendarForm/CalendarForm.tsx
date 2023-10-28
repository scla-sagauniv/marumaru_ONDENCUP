import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/_components/ui/button'
import { Calendar } from '@/_components/ui/calendar'
import { cn } from '@/lib/utils'

type CalendarFormProps = {
  date: DateRange | undefined
  setDate: Dispatch<SetStateAction<DateRange | undefined>>
}
export function CalendarForm({ date, setDate }: CalendarFormProps) {
  const [openState, setOpenState] = useState<boolean>(false)

  return (
    <>
      <div className={cn('flex flex-col')}>
        <Button
          id='date'
          type='button'
          onClick={() => setOpenState(!openState)}
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
        {openState ? (
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date: DateRange | undefined) => setDate(date!)}
            numberOfMonths={1}
            className='w-[300px] bg-white z-10 rounded-sm flex justify-center border-stone-300 shadow-lg'
          />
        ) : null}
      </div>
    </>
  )
}
