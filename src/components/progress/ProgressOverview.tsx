'use client'
import { STATS_DATA } from '@/data'
import { DailyProgress } from '../home/Daily_Progress/DailyProgress'
import { LearningSummary } from '../home/LearningSummary/LearningSummary'




export function ProgressOverview({ user = STATS_DATA }) {
  return (
    <div className="grid gap-8 mb-8 md:grid-cols-2">
      <DailyProgress user={user} />
      <LearningSummary  />
    </div>
  )
}