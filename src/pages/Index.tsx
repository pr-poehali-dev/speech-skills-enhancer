import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ExerciseSession from '@/components/ExerciseSession';
import StatsPage from '@/components/StatsPage';
import ProfilePage from '@/components/ProfilePage';
import Navigation from '@/components/Navigation';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  gradient: string;
}

export default function Index() {
  const [userLevel] = useState(12);
  const [xp] = useState(2450);
  const [xpToNextLevel] = useState(3000);
  const [streak] = useState(7);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showExerciseSession, setShowExerciseSession] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'stats' | 'profile'>('home');

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Первые шаги',
      description: 'Завершите первое упражнение',
      icon: 'Award',
      unlocked: true,
    },
    {
      id: '2',
      title: 'Недельная серия',
      description: 'Занимайтесь 7 дней подряд',
      icon: 'Flame',
      unlocked: true,
    },
    {
      id: '3',
      title: 'Мастер речи',
      description: 'Завершите 50 упражнений',
      icon: 'Trophy',
      unlocked: false,
      progress: 68,
    },
    {
      id: '4',
      title: 'Скороговорщик',
      description: 'Произнесите 100 скороговорок',
      icon: 'Zap',
      unlocked: false,
      progress: 43,
    },
  ];

  const exercises: Exercise[] = [
    {
      id: '1',
      title: 'Дыхательные упражнения',
      description: 'Развитие диафрагмального дыхания',
      duration: '10 мин',
      difficulty: 'easy',
      icon: 'Wind',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: '2',
      title: 'Артикуляция',
      description: 'Чёткость произношения звуков',
      duration: '15 мин',
      difficulty: 'medium',
      icon: 'Mic',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: '3',
      title: 'Скороговорки',
      description: 'Скорость и чёткость речи',
      duration: '12 мин',
      difficulty: 'medium',
      icon: 'MessageSquare',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: '4',
      title: 'Интонация',
      description: 'Выразительность и эмоциональность',
      duration: '20 мин',
      difficulty: 'hard',
      icon: 'Music',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Легко';
      case 'medium':
        return 'Средне';
      case 'hard':
        return 'Сложно';
      default:
        return '';
    }
  };

  const handleExerciseComplete = () => {
    setShowExerciseSession(false);
    setSelectedExercise(null);
  };

  const handleBack = () => {
    setShowExerciseSession(false);
    setSelectedExercise(null);
  };

  if (showExerciseSession && selectedExercise) {
    return (
      <ExerciseSession
        exercise={selectedExercise}
        onComplete={handleExerciseComplete}
        onBack={handleBack}
      />
    );
  }

  if (currentPage === 'stats') {
    return (
      <>
        <StatsPage onBack={() => setCurrentPage('home')} />
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </>
    );
  }

  if (currentPage === 'profile') {
    return (
      <>
        <ProfilePage onBack={() => setCurrentPage('home')} />
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-24">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                SpeakUp
              </h1>
              <p className="text-muted-foreground text-lg">
                Твой личный тренер речи
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center animate-pulse-glow">
                    <Icon name="Flame" className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{streak}</p>
                    <p className="text-xs text-muted-foreground">дней подряд</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Icon name="Star" className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{userLevel}</p>
                    <p className="text-xs text-muted-foreground">уровень</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon name="TrendingUp" className="text-purple-600" size={24} />
                  <div>
                    <p className="font-semibold text-lg">Прогресс до уровня {userLevel + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {xp} / {xpToNextLevel} XP
                    </p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-1">
                  {Math.round((xp / xpToNextLevel) * 100)}%
                </Badge>
              </div>
              <Progress value={(xp / xpToNextLevel) * 100} className="h-3" />
            </CardContent>
          </Card>
        </header>

        <section className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Trophy" className="text-yellow-500" size={32} />
            <h2 className="text-3xl font-bold">Достижения</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.id}
                className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-scale-in border-2 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-white/60 border-gray-200 opacity-75'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 group-hover:animate-pulse-glow'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon
                      name={achievement.icon as any}
                      className={achievement.unlocked ? 'text-white' : 'text-gray-400'}
                      size={32}
                    />
                  </div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  {!achievement.unlocked && achievement.progress && (
                    <div>
                      <Progress value={achievement.progress} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">{achievement.progress}%</p>
                    </div>
                  )}
                  {achievement.unlocked && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Получено!
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Dumbbell" className="text-purple-600" size={32} />
            <h2 className="text-3xl font-bold">Упражнения</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => (
              <Card
                key={exercise.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-scale-in overflow-hidden border-2 border-purple-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${exercise.gradient}`} />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exercise.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon name={exercise.icon as any} className="text-white" size={28} />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{exercise.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {exercise.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="text-muted-foreground" size={18} />
                      <span className="text-sm text-muted-foreground">{exercise.duration}</span>
                    </div>
                    <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                      {getDifficultyText(exercise.difficulty)}
                    </Badge>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                    size="lg"
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setShowExerciseSession(true);
                    }}
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать упражнение
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 animate-fade-in">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <Icon name="Sparkles" size={48} className="mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">Продолжай в том же духе!</h3>
              <p className="text-purple-100 mb-6">
                Ты уже на {userLevel} уровне. Всего несколько упражнений до следующего!
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold"
              >
                <Icon name="Target" size={20} className="mr-2" />
                Продолжить обучение
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}