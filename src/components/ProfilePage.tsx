import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  onBack: () => void;
}

export default function ProfilePage({ onBack }: ProfilePageProps) {
  const [userName, setUserName] = useState('Александр');
  const [dailyGoal, setDailyGoal] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [reminders, setReminders] = useState(true);

  const userStats = {
    level: 12,
    totalMinutes: 1250,
    totalExercises: 87,
    streak: 7,
    joinDate: 'Октябрь 2024',
  };

  const badges = [
    { id: 1, name: 'Новичок', icon: 'Award', color: 'from-blue-500 to-cyan-500', earned: true },
    { id: 2, name: 'Неделя силы', icon: 'Flame', color: 'from-orange-500 to-red-500', earned: true },
    { id: 3, name: 'Марафонец', icon: 'Trophy', color: 'from-yellow-500 to-orange-500', earned: true },
    { id: 4, name: 'Мастер', icon: 'Crown', color: 'from-purple-500 to-pink-500', earned: false },
    { id: 5, name: 'Легенда', icon: 'Star', color: 'from-pink-500 to-rose-500', earned: false },
    { id: 6, name: 'Гуру речи', icon: 'Sparkles', color: 'from-green-500 to-emerald-500', earned: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Профиль
            </h1>
            <p className="text-muted-foreground text-lg">Персонализация и настройки</p>
          </div>
          <div
            onClick={onBack}
            className="cursor-pointer w-12 h-12 rounded-full bg-white border-2 border-purple-300 flex items-center justify-center hover:bg-purple-50 transition-all hover:scale-110"
          >
            <Icon name="X" size={24} className="text-purple-600" />
          </div>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl mb-8 animate-scale-in overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500" />
          <CardContent className="p-8 -mt-12">
            <div className="flex items-end gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-white shadow-2xl flex items-center justify-center animate-pulse-glow">
                <span className="text-4xl font-bold text-white">{userName[0]}</span>
              </div>
              <div className="flex-1 mb-2">
                <h2 className="text-3xl font-bold mb-1">{userName}</h2>
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-3 py-1">
                    Уровень {userStats.level}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-3 py-1">
                    <Icon name="Flame" size={14} className="mr-1" />
                    {userStats.streak} дней
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                <p className="text-3xl font-bold text-purple-600 mb-1">{userStats.totalMinutes}</p>
                <p className="text-sm text-muted-foreground">минут</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                <p className="text-3xl font-bold text-orange-600 mb-1">{userStats.totalExercises}</p>
                <p className="text-sm text-muted-foreground">упражнений</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <p className="text-3xl font-bold text-blue-600 mb-1">{userStats.joinDate}</p>
                <p className="text-sm text-muted-foreground">с нами</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm font-semibold mb-2 block">
                  Имя пользователя
                </Label>
                <Input
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border-2 border-purple-300 focus:border-purple-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon name="Target" className="text-purple-600" size={28} />
              <div>
                <CardTitle className="text-2xl">Ежедневная цель</CardTitle>
                <CardDescription>Установите свою цель в минутах</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg font-semibold">Цель: {dailyGoal} минут в день</Label>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-4 py-2">
                    {dailyGoal} мин
                  </Badge>
                </div>
                <Slider
                  value={[dailyGoal]}
                  onValueChange={(value) => setDailyGoal(value[0])}
                  min={10}
                  max={120}
                  step={5}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>10 мин</span>
                  <span>60 мин</span>
                  <span>120 мин</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Icon name="Info" className="text-blue-600 mt-1" size={20} />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Рекомендация</p>
                    <p>Для лучших результатов занимайтесь 20-30 минут ежедневно</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon name="Settings" className="text-purple-600" size={28} />
              <CardTitle className="text-2xl">Настройки</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Icon name="Bell" className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Уведомления</p>
                  <p className="text-sm text-muted-foreground">Напоминания о тренировках</p>
                </div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Icon name="Volume2" className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Звуковые эффекты</p>
                  <p className="text-sm text-muted-foreground">Звуки при взаимодействии</p>
                </div>
              </div>
              <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Icon name="Clock" className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Ежедневные напоминания</p>
                  <p className="text-sm text-muted-foreground">Напоминать о занятиях</p>
                </div>
              </div>
              <Switch checked={reminders} onCheckedChange={setReminders} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg mb-8 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Icon name="Award" className="text-purple-600" size={28} />
              <CardTitle className="text-2xl">Значки и достижения</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in ${
                    badge.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      badge.earned
                        ? `bg-gradient-to-br ${badge.color}`
                        : 'bg-gray-300'
                    }`}
                  >
                    <Icon
                      name={badge.icon as any}
                      className={badge.earned ? 'text-white' : 'text-gray-500'}
                      size={32}
                    />
                  </div>
                  <p className={`font-bold text-sm ${badge.earned ? 'text-gray-800' : 'text-gray-400'}`}>
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center">
              <Icon name="Share2" size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Поделиться успехами</h3>
              <p className="text-purple-100 mb-6">
                Расскажи друзьям о своих достижениях в развитии речи!
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold"
              >
                <Icon name="Share2" size={20} className="mr-2" />
                Поделиться
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
