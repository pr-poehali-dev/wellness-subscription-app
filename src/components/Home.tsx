import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface HomeProps {
  userData: any;
  onNavigate: (screen: 'home' | 'catalog') => void;
}

export default function Home({ userData, onNavigate }: HomeProps) {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentExercise, setCurrentExercise] = useState(0);

  const todayWorkout = {
    name: 'Утренняя разминка',
    duration: 5,
    exercises: [
      { name: 'Разминка шеи', duration: 60 },
      { name: 'Вращения плечами', duration: 60 },
      { name: 'Наклоны в стороны', duration: 60 },
      { name: 'Приседания', duration: 60 },
      { name: 'Растяжка', duration: 60 },
    ],
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isWorkoutActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsWorkoutActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWorkoutActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const motivationalQuote = [
    '💪 Даже 5 минут — это прогресс!',
    '🔥 Ты сильнее, чем думаешь!',
    '⚡ Каждый день — новая победа!',
    '🎯 Маленькие шаги ведут к большим результатам!',
  ][Math.floor(Math.random() * 4)];

  return (
    <div className="min-h-screen bg-[#1A1F2C] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <header className="bg-[#1A1F2C]/80 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FitLazy
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-6 animate-fade-in">
          <h2 className="text-3xl font-display font-bold mb-2 text-white">
            Привет! 👋
          </h2>
          <p className="text-gray-300">{motivationalQuote}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 animate-scale-in bg-card/40 backdrop-blur-xl border-primary/20 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">{todayWorkout.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      {todayWorkout.duration} минут
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Flame" size={16} />
                      {todayWorkout.exercises.length} упражнений
                    </span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="Zap" size={28} className="text-white" />
                </div>
              </div>

              {isWorkoutActive && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      Упражнение {currentExercise + 1} из {todayWorkout.exercises.length}
                    </span>
                    <span className="text-2xl font-display font-bold text-primary">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <Progress value={((300 - timeLeft) / 300) * 100} className="h-2 mb-2" />
                  <p className="text-lg font-medium">{todayWorkout.exercises[currentExercise].name}</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                {todayWorkout.exercises.map((exercise, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      isWorkoutActive && idx === currentExercise
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isWorkoutActive && idx < currentExercise
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isWorkoutActive && idx < currentExercise ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{exercise.name}</p>
                      <p className="text-xs text-muted-foreground">{exercise.duration} сек</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {!isWorkoutActive ? (
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg font-semibold"
                    onClick={() => {
                      setIsWorkoutActive(true);
                      setTimeLeft(300);
                      setCurrentExercise(0);
                    }}
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать тренировку
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsWorkoutActive(false)}
                    >
                      <Icon name="Pause" size={20} className="mr-2" />
                      Пауза
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        if (currentExercise < todayWorkout.exercises.length - 1) {
                          setCurrentExercise(currentExercise + 1);
                        }
                      }}
                    >
                      Следующее
                      <Icon name="ChevronRight" size={20} className="ml-2" />
                    </Button>
                  </>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-card/40 backdrop-blur-xl border-primary/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold">Другие тренировки</h3>
                <Button variant="link" onClick={() => onNavigate('catalog')} className="text-primary">
                  Все тренировки
                  <Icon name="ArrowRight" size={16} className="ml-1" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Растяжка за 7 минут', icon: 'Waves', time: 7 },
                  { name: 'Энергичная зарядка', icon: 'Zap', time: 10 },
                ].map((workout, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border-2 border-border hover:border-primary transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon name={workout.icon as any} size={24} className="text-primary" />
                    </div>
                    <h4 className="font-semibold mb-1">{workout.name}</h4>
                    <p className="text-sm text-muted-foreground">{workout.time} минут</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 animate-fade-in bg-card/40 backdrop-blur-xl border-primary/20 shadow-xl" style={{ animationDelay: '100ms' }}>
              <h3 className="text-xl font-display font-bold mb-4">Прогресс недели</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Выполнено тренировок</span>
                    <span className="font-bold">3 из 5</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => (
                    <div
                      key={day}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${
                        idx < 3
                          ? 'bg-primary text-white'
                          : idx === 3
                          ? 'bg-primary/20 text-primary border-2 border-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <span className="font-bold">{day}</span>
                      {idx < 3 && <Icon name="Check" size={12} className="mt-1" />}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 backdrop-blur-xl shadow-xl">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Sparkles" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-1">AI-Помощник</h3>
                  <p className="text-sm text-muted-foreground">
                    Задавайте вопросы о тренировках
                  </p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Открыть чат
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/20 to-primary/20 border-secondary/30 backdrop-blur-xl shadow-xl">
              <div className="flex items-start gap-3 mb-3">
                <Icon name="Crown" size={24} className="text-secondary" />
                <div>
                  <h3 className="font-display font-bold mb-1">Premium доступ</h3>
                  <p className="text-sm text-muted-foreground">
                    Все тренировки, челленджи и AI-советы
                  </p>
                </div>
              </div>
              <Button className="w-full bg-secondary hover:bg-secondary/90">
                Оформить подписку
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}