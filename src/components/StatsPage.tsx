import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface StatsPageProps {
  onBack: () => void;
}

export default function StatsPage({ onBack }: StatsPageProps) {
  const weeklyData = [
    { day: 'Пн', minutes: 25, exercises: 3 },
    { day: 'Вт', minutes: 30, exercises: 4 },
    { day: 'Ср', minutes: 20, exercises: 2 },
    { day: 'Чт', minutes: 35, exercises: 4 },
    { day: 'Пт', minutes: 40, exercises: 5 },
    { day: 'Сб', minutes: 15, exercises: 2 },
    { day: 'Вс', minutes: 28, exercises: 3 },
  ];

  const totalMinutes = weeklyData.reduce((sum, day) => sum + day.minutes, 0);
  const totalExercises = weeklyData.reduce((sum, day) => sum + day.exercises, 0);
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes));
  const avgMinutes = Math.round(totalMinutes / weeklyData.length);

  const skills = [
    { name: 'Дыхание', level: 85, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Артикуляция', level: 72, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Скороговорки', level: 68, gradient: 'from-orange-500 to-red-500' },
    { name: 'Интонация', level: 55, gradient: 'from-green-500 to-emerald-500' },
  ];

  const milestones = [
    { title: '7 дней подряд', date: 'Сегодня', icon: 'Flame', color: 'orange' },
    { title: '50 упражнений', date: '2 дня назад', icon: 'Trophy', color: 'yellow' },
    { title: '100 минут', date: '5 дней назад', icon: 'Clock', color: 'purple' },
    { title: 'Первое занятие', date: '14 дней назад', icon: 'Award', color: 'blue' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Твой прогресс
            </h1>
            <p className="text-muted-foreground text-lg">
              Статистика за последние 7 дней
            </p>
          </div>
          <div
            onClick={onBack}
            className="cursor-pointer w-12 h-12 rounded-full bg-white border-2 border-purple-300 flex items-center justify-center hover:bg-purple-50 transition-all hover:scale-110"
          >
            <Icon name="X" size={24} className="text-purple-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
                <Icon name="Clock" className="text-white" size={32} />
              </div>
              <p className="text-4xl font-bold text-purple-600 mb-1">{totalMinutes}</p>
              <p className="text-sm text-muted-foreground mb-2">Минут занятий</p>
              <Badge className="bg-green-500 text-white">+15% к прошлой неделе</Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center animate-pulse-glow">
                <Icon name="Dumbbell" className="text-white" size={32} />
              </div>
              <p className="text-4xl font-bold text-orange-600 mb-1">{totalExercises}</p>
              <p className="text-sm text-muted-foreground mb-2">Упражнений</p>
              <Badge className="bg-blue-500 text-white">~{Math.round(totalExercises / 7)} в день</Badge>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-scale-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-pulse-glow">
                <Icon name="TrendingUp" className="text-white" size={32} />
              </div>
              <p className="text-4xl font-bold text-green-600 mb-1">{avgMinutes}</p>
              <p className="text-sm text-muted-foreground mb-2">Средняя длительность</p>
              <Badge className="bg-purple-500 text-white">Отлично!</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon name="BarChart3" className="text-purple-600" size={28} />
              <CardTitle className="text-2xl">Активность по дням</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-end justify-between gap-4 h-64">
              {weeklyData.map((day, index) => {
                const heightPercentage = (day.minutes / maxMinutes) * 100;
                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col items-center justify-end flex-1">
                      <div className="text-center mb-2">
                        <p className="text-sm font-semibold text-purple-600">{day.minutes}м</p>
                        <p className="text-xs text-muted-foreground">{day.exercises} упр</p>
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-xl transition-all duration-500 hover:scale-105 cursor-pointer shadow-lg animate-scale-in"
                        style={{
                          height: `${heightPercentage}%`,
                          animationDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{day.day}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Target" className="text-purple-600" size={28} />
                <CardTitle className="text-2xl">Уровень навыков</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.gradient} flex items-center justify-center`}>
                        <Icon name="CheckCircle" className="text-white" size={20} />
                      </div>
                      <span className="font-semibold text-lg">{skill.name}</span>
                    </div>
                    <Badge className={`bg-gradient-to-r ${skill.gradient} text-white font-bold px-3 py-1`}>
                      {skill.level}%
                    </Badge>
                  </div>
                  <Progress value={skill.level} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Medal" className="text-purple-600" size={28} />
                <CardTitle className="text-2xl">Важные моменты</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.title}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 animate-scale-in hover:scale-105 transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      milestone.color === 'orange'
                        ? 'bg-gradient-to-br from-orange-400 to-pink-500'
                        : milestone.color === 'yellow'
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                        : milestone.color === 'purple'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    }`}
                  >
                    <Icon name={milestone.icon as any} className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{milestone.title}</p>
                    <p className="text-sm text-muted-foreground">{milestone.date}</p>
                  </div>
                  <Icon name="ChevronRight" className="text-purple-400" size={24} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl animate-fade-in">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Icon name="Sparkles" size={64} className="animate-pulse" />
                <div>
                  <h3 className="text-3xl font-bold mb-2">Отличная работа на этой неделе!</h3>
                  <p className="text-purple-100 text-lg">
                    Ты занимался {totalExercises} раз и потратил {totalMinutes} минут на развитие речи. Продолжай в том же духе!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold mb-2">🎯</div>
                <p className="text-sm text-purple-100">Цель: 200 минут/неделю</p>
                <Progress value={(totalMinutes / 200) * 100} className="h-2 mt-2 bg-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
