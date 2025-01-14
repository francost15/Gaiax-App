"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Trophy} from 'lucide-react'
import Link from 'next/link'

// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, name: "Ana García", xp: 1200, avatar: "/avatars/ana.jpg", streak: 15 },
  { id: 2, name: "Carlos Rodríguez", xp: 1150, avatar: "/avatars/carlos.jpg", streak: 12 },
  { id: 3, name: "María López", xp: 1100, avatar: "/avatars/maria.jpg", streak: 10 },
  { id: 4, name: "Juan Martínez", xp: 1050, avatar: "/avatars/juan.jpg", streak: 8 },
  { id: 5, name: "Laura Sánchez", xp: 1000, avatar: "/avatars/laura.jpg", streak: 7 },
  { id: 6, name: "Franco Alessandro", xp: 950, avatar: "/avatars/franco.jpg", streak: 7 }, // Current user
  { id: 7, name: "Pedro Gómez", xp: 900, avatar: "/avatars/pedro.jpg", streak: 5 },
  { id: 8, name: "Sofia Fernández", xp: 850, avatar: "/avatars/sofia.jpg", streak: 4 },
]

const RankingItem = ({ rank, user, isCurrentUser }: { rank: number; user: typeof leaderboardData[0]; isCurrentUser: boolean }) => (
  <div className={`flex items-center p-3 ${rank <= 3 ? 'bg-gray-100 dark:bg-neutral-800' : ''} ${isCurrentUser ? 'bg-primaryper/10 dark:bg-primaryper/20' : ''} rounded-lg mb-2 transition-all duration-300 hover:shadow-md`}>
    <div className="flex-shrink-0 w-8 text-center font-bold text-lg">{rank}</div>
    <Avatar className="w-10 h-10 mx-3">
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-grow">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.xp} XP</p>
    </div>
    <div className="flex items-center">
      <Trophy className="h-4 w-4 text-primaryper mr-1" />
      <span className="text-sm font-medium">{user.streak}</span>
    </div>
  </div>
)

interface RankingSectionProps {
  fullView?: boolean;
}

export function RankingSection({ fullView = false }: RankingSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const currentUserId = 6 // Assuming Franco is the current user

  const topThree = leaderboardData.slice(0, 3)
  const restOfUsers = leaderboardData.slice(3)
  const currentUserRank = leaderboardData.findIndex(user => user.id === currentUserId) + 1

  return (
    <Card className="bg-white dark:bg-neutral-900 overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-6">
        <CardTitle className="text-2xl font-bold flex items-center justify-between text-gray-900 dark:text-white">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8 text-primaryper" />
            <span>Ranking de Aprendizaje</span>
          </div>
          {!fullView && (
            <Link href="/ranking" className="text-sm text-primaryper hover:underline">
              Ver ranking completo
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-center items-end mb-12 space-x-4">
          {topThree.map((user, index) => {
            const order = [1, 0, 2][index]; // Reorder: Silver (1), Gold (0), Bronze (2)
            const scale = order === 0 ? 'scale-110' : 'scale-100';
            const bgColor = order === 0 ? 'bg-yellow-400' : order === 1 ? 'bg-gray-300' : 'bg-amber-600';
            const textColor = order === 0 ? 'text-yellow-800' : order === 1 ? 'text-gray-800' : 'text-amber-900';
            return (
              <div key={user.id} className={`flex flex-col items-center ${scale} transition-all duration-300`}>
                <div className={`relative mb-4 ${order === 0 ? 'mb-8' : ''}`}>
                  <div className={`absolute -top-3 -left-3 -right-3 -bottom-3 rounded-full ${bgColor} opacity-50`}></div>
                  <Avatar className={`w-24 h-24 border-4 border-white dark:border-neutral-800 relative z-10 shadow-lg ${order === 0 ? 'w-28 h-28' : ''}`}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${bgColor} ${textColor}`}>
                    {order + 1}
                  </div>
                </div>
                <h3 className={`font-semibold text-lg mb-1 ${order === 0 ? 'text-xl' : ''}`}>{user.name}</h3>
                <p className={`text-sm font-medium ${textColor}`}>{user.xp} XP</p>
                <div className="mt-2 flex items-center text-sm">
                  <Trophy className={`h-4 w-4 mr-1 ${textColor}`} />
                  <span>{user.streak} días</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          {restOfUsers.slice(0, fullView || showAll ? undefined : 2).map((user, index) => (
            <RankingItem 
              key={user.id} 
              rank={index + 4} 
              user={user} 
              isCurrentUser={user.id === currentUserId} 
            />
          ))}
        </div>

        {!fullView && !showAll && restOfUsers.length > 2 && (
          <button
            className="mt-4 w-full text-center text-primaryper hover:underline"
            onClick={() => setShowAll(true)}
          >
            Ver más rankings
          </button>
        )}

        {(fullView || showAll) && currentUserRank > 6 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <RankingItem 
              rank={currentUserRank} 
              user={leaderboardData[currentUserRank - 1]} 
              isCurrentUser={true} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

