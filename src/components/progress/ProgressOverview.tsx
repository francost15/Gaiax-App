'use client'
import { STATS_DATA } from '@/data'
import { StatCard, UserProfile } from '@/interface'
import { DailyProgress } from './Daily_Progress/DailyProgress'
import { LearningSummary } from './LearningSummary/LearningSummary'


interface ProgressOverviewProps {
  user: UserProfile
  stats?: StatCard[]
}

export function ProgressOverview({ user, stats = STATS_DATA }: ProgressOverviewProps) {
  return (
    <div className="grid gap-8 mb-8 md:grid-cols-2">
      <DailyProgress user={user} />
      <LearningSummary stats={stats} />
    </div>
  )
}