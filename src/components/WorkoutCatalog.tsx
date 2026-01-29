import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface WorkoutCatalogProps {
  onNavigate: (screen: 'home' | 'catalog') => void;
}

export default function WorkoutCatalog({ onNavigate }: WorkoutCatalogProps) {
  const [filter, setFilter] = useState('all');

  const workouts = [
    {
      id: 1,
      name: 'Утренняя разминка',
      duration: 5,
      difficulty: 'Лёгкий',
      exercises: 5,
      category: 'morning',
      isPremium: false,
      icon: 'Sunrise',
    },
    {
      id: 2,
      name: 'Растяжка за 7 минут',
      duration: 7,
      difficulty: 'Лёгкий',
      exercises: 6,
      category: 'evening',
      isPremium: false,
      icon: 'Waves',
    },
    {
      id: 3,
      name: 'Энергичная зарядка',
      duration: 10,
      difficulty: 'Средний',
      exercises: 8,
      category: 'morning',
      isPremium: true,
      icon: 'Zap',
    },
    {
      id: 4,
      name: 'Офисная гимнастика',
      duration: 5,
      difficulty: 'Лёгкий',
      exercises: 4,
      category: 'day',
      isPremium: false,
      icon: 'Coffee',
    },
    {
      id: 5,
      name: 'Кардио за 15 минут',
      duration: 15,
      difficulty: 'Средний',
      exercises: 10,
      category: 'day',
      isPremium: true,
      icon: 'Heart',
    },
    {
      id: 6,
      name: 'Расслабление перед сном',
      duration: 10,
      difficulty: 'Лёгкий',
      exercises: 7,
      category: 'evening',
      isPremium: true,
      icon: 'Moon',
    },
  ];

  const filteredWorkouts = workouts.filter((w) => filter === 'all' || w.category === filter);

  return (
    <div className="min-h-screen bg-[#1A1F2C] relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <header className="bg-[#1A1F2C]/80 backdrop-blur-xl border-b border-primary/10 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('home')}>
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Каталог тренировок
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="morning">Утро</TabsTrigger>
              <TabsTrigger value="day">День</TabsTrigger>
              <TabsTrigger value="evening">Вечер</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, idx) => (
            <Card
              key={workout.id}
              className="p-6 cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.02] animate-fade-in relative overflow-hidden group bg-card/40 backdrop-blur-xl border-primary/20"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {workout.isPremium && (
                <Badge className="absolute top-4 right-4 bg-secondary text-white border-0">
                  <Icon name="Crown" size={12} className="mr-1" />
                  Premium
                </Badge>
              )}

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name={workout.icon as any} size={32} className="text-white" />
              </div>

              <h3 className="text-xl font-display font-bold mb-2">{workout.name}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {workout.duration} мин
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Icon name="Activity" size={12} className="mr-1" />
                  {workout.exercises} упражнений
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    workout.difficulty === 'Лёгкий'
                      ? 'border-green-500 text-green-500'
                      : 'border-primary text-primary'
                  }`}
                >
                  {workout.difficulty}
                </Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Target" size={14} />
                  <span>Без оборудования</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={14} />
                  <span>Для начинающих</span>
                </div>
              </div>

              <Button
                className={`w-full ${
                  workout.isPremium
                    ? 'bg-secondary hover:bg-secondary/90'
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {workout.isPremium ? (
                  <>
                    <Icon name="Lock" size={16} className="mr-2" />
                    Разблокировать
                  </>
                ) : (
                  <>
                    <Icon name="Play" size={16} className="mr-2" />
                    Начать
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-8 text-center bg-gradient-to-br from-secondary/20 to-primary/20 border-secondary/30 backdrop-blur-xl shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Icon name="Crown" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">
              Откройте все тренировки
            </h2>
            <p className="text-muted-foreground mb-6">
              Получите доступ ко всем тренировкам, персональным челленджам и неограниченной
              поддержке AI-помощника
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-secondary" />
                <span>50+ тренировок</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-secondary" />
                <span>AI-помощник</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-secondary" />
                <span>Челленджи</span>
              </div>
            </div>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-lg px-8">
              Оформить подписку за 299₽/мес
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}