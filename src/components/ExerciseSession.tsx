import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ExerciseSessionProps {
  exercise: {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'easy' | 'medium' | 'hard';
    icon: string;
    gradient: string;
  };
  onComplete: () => void;
  onBack: () => void;
}

export default function ExerciseSession({ exercise, onComplete, onBack }: ExerciseSessionProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [totalTime] = useState(600);
  const [exerciseStep, setExerciseStep] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const exerciseSteps = [
    {
      title: 'Подготовка',
      instruction: 'Сядьте удобно, расслабьте плечи и шею. Сделайте несколько глубоких вдохов.',
      icon: 'User',
    },
    {
      title: 'Разминка',
      instruction: 'Разогрейте голосовые связки: произнесите звуки "м-м-м", "а-а-а", "о-о-о" на разной высоте.',
      icon: 'Music',
    },
    {
      title: 'Основное упражнение',
      instruction: 'Произнесите следующие скороговорки чётко и выразительно: "На дворе трава, на траве дрова"',
      icon: 'Mic',
    },
    {
      title: 'Завершение',
      instruction: 'Отдохните 30 секунд, сделайте несколько глубоких вдохов. Отличная работа!',
      icon: 'CheckCircle',
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
      alert('Не удалось получить доступ к микрофону. Проверьте разрешения.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleNextStep = () => {
    if (exerciseStep < exerciseSteps.length - 1) {
      setExerciseStep(exerciseStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (exerciseStep > 0) {
      setExerciseStep(exerciseStep - 1);
    }
  };

  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
  const currentStep = exerciseSteps[exerciseStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-white/50"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-2xl mb-6 animate-scale-in">
          <div className={`h-3 bg-gradient-to-r ${exercise.gradient}`} />
          <CardHeader>
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${exercise.gradient} flex items-center justify-center`}
              >
                <Icon name={exercise.icon as any} className="text-white" size={32} />
              </div>
              <div>
                <CardTitle className="text-3xl mb-2">{exercise.title}</CardTitle>
                <p className="text-muted-foreground">{exercise.description}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-fade-in">
            <CardContent className="p-6 text-center">
              <Icon name="Clock" className="mx-auto mb-3 text-purple-600" size={32} />
              <p className="text-3xl font-bold text-purple-600 mb-1">{formatTime(timeLeft)}</p>
              <p className="text-sm text-muted-foreground">Осталось времени</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-fade-in">
            <CardContent className="p-6 text-center">
              <Icon name="Target" className="mx-auto mb-3 text-pink-600" size={32} />
              <p className="text-3xl font-bold text-pink-600 mb-1">{exerciseStep + 1}/{exerciseSteps.length}</p>
              <p className="text-sm text-muted-foreground">Шаг упражнения</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg animate-fade-in">
            <CardContent className="p-6 text-center">
              <Icon name={isRecording ? "Mic" : "MicOff"} className={`mx-auto mb-3 ${isRecording ? 'text-red-600 animate-pulse' : 'text-gray-400'}`} size={32} />
              <p className="text-3xl font-bold text-gray-700 mb-1">{isRecording ? 'Запись' : 'Готов'}</p>
              <p className="text-sm text-muted-foreground">Статус микрофона</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-lg mb-6 animate-scale-in">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow`}>
                <Icon name={currentStep.icon as any} className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{currentStep.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {currentStep.instruction}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Прогресс</span>
                <span className="text-sm font-semibold text-purple-600">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            <div className="flex justify-center gap-4 mb-6">
              {!isRecording ? (
                <Button
                  size="lg"
                  onClick={handleStartRecording}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-6 text-lg"
                >
                  <Icon name="Mic" size={24} className="mr-2" />
                  Начать запись
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={handlePauseResume}
                    variant="outline"
                    className="border-2 border-purple-400 hover:bg-purple-50 px-8 py-6"
                  >
                    <Icon name={isPaused ? "Play" : "Pause"} size={24} className="mr-2" />
                    {isPaused ? 'Продолжить' : 'Пауза'}
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleStopRecording}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg"
                  >
                    <Icon name="Square" size={24} className="mr-2" />
                    Остановить
                  </Button>
                </>
              )}
            </div>

            {audioBlob && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon name="CheckCircle" className="text-green-600" size={24} />
                    <div className="flex-1">
                      <p className="font-semibold text-green-800">Запись сохранена!</p>
                      <audio controls className="w-full mt-2" src={URL.createObjectURL(audioBlob)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={handlePreviousStep}
                disabled={exerciseStep === 0}
                className="flex-1 border-2 border-purple-300 hover:bg-purple-50"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Предыдущий шаг
              </Button>
              <Button
                size="lg"
                onClick={handleNextStep}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              >
                {exerciseStep < exerciseSteps.length - 1 ? (
                  <>
                    Следующий шаг
                    <Icon name="ChevronRight" size={20} className="ml-2" />
                  </>
                ) : (
                  <>
                    Завершить
                    <Icon name="CheckCircle" size={20} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Icon name="Info" className="text-blue-600 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Советы для эффективной тренировки:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Найдите тихое место без посторонних шумов</li>
                  <li>• Держите микрофон на расстоянии 15-20 см от рта</li>
                  <li>• Говорите естественно и уверенно</li>
                  <li>• При необходимости делайте паузы между повторениями</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
