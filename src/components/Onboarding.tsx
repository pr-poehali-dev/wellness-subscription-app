import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface OnboardingProps {
  onComplete: (data: any) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    gender: '',
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    workoutTime: '',
    agreedToDisclaimer: false,
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else onComplete(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return formData.goal;
    if (step === 2) return formData.gender && formData.age && formData.height && formData.weight;
    if (step === 3) return formData.activityLevel && formData.workoutTime;
    if (step === 4) return formData.agreedToDisclaimer;
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#1A1F2C] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <Card className="w-full max-w-2xl p-8 animate-scale-in relative z-10 bg-card/90 backdrop-blur-xl border-primary/20 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-display font-bold text-foreground">
              {step === 1 && '🎯 Ваша цель'}
              {step === 2 && '📊 О вас'}
              {step === 3 && '⚡ Активность'}
              {step === 4 && '⚠️ Важно'}
            </h1>
            <span className="text-sm text-muted-foreground font-medium">
              {step}/4
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          {step === 1 && (
            <RadioGroup value={formData.goal} onValueChange={(v) => setFormData({ ...formData, goal: v })}>
              <div className="space-y-3">
                {[
                  { value: 'lose', label: 'Похудеть', icon: 'TrendingDown' },
                  { value: 'maintain', label: 'Поддерживать форму', icon: 'Target' },
                  { value: 'activity', label: 'Больше двигаться', icon: 'Zap' },
                ].map((option) => (
                  <Label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                      formData.goal === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <RadioGroupItem value={option.value} className="sr-only" />
                    <Icon name={option.icon as any} size={28} className="text-primary" />
                    <span className="text-lg font-medium">{option.label}</span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <RadioGroup value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                <div className="flex gap-3">
                  {[
                    { value: 'male', label: 'Мужчина' },
                    { value: 'female', label: 'Женщина' },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.gender === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <span className="text-base font-medium">{option.label}</span>
                    </Label>
                  ))}
                </div>
              </RadioGroup>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age" className="text-sm text-muted-foreground">Возраст</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-sm text-muted-foreground">Рост (см)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="weight" className="text-sm text-muted-foreground">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <Label className="text-base font-medium mb-3 block">Текущий уровень активности</Label>
                <RadioGroup value={formData.activityLevel} onValueChange={(v) => setFormData({ ...formData, activityLevel: v })}>
                  <div className="space-y-2">
                    {[
                      { value: 'low', label: 'Почти не двигаюсь' },
                      { value: 'medium', label: 'Иногда хожу пешком' },
                      { value: 'high', label: 'Регулярно активен' },
                    ].map((option) => (
                      <Label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.activityLevel === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value={option.value} />
                        <span>{option.label}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Сколько времени у вас есть?</Label>
                <RadioGroup value={formData.workoutTime} onValueChange={(v) => setFormData({ ...formData, workoutTime: v })}>
                  <div className="grid grid-cols-3 gap-2">
                    {['5 мин', '10 мин', '15 мин'].map((time) => (
                      <Label
                        key={time}
                        className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.workoutTime === time
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                      >
                        <RadioGroupItem value={time} className="sr-only" />
                        <span className="font-medium">{time}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-destructive/10 border-2 border-destructive/30 rounded-lg p-6">
                <div className="flex gap-3 mb-3">
                  <Icon name="AlertTriangle" size={24} className="text-destructive flex-shrink-0" />
                  <h3 className="text-lg font-display font-bold text-destructive">Медицинский дисклеймер</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Это приложение предназначено только для информационных целей и не заменяет
                  профессиональную медицинскую консультацию. Перед началом любых физических
                  упражнений проконсультируйтесь с врачом. Мы не несём ответственности за
                  возможные травмы или проблемы со здоровьем.
                </p>
              </div>

              <Label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={formData.agreedToDisclaimer}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreedToDisclaimer: checked as boolean })
                  }
                  className="mt-1"
                />
                <span className="text-sm leading-relaxed">
                  Я понимаю и принимаю условия. Я подтверждаю, что у меня нет противопоказаний
                  к физическим нагрузкам, и я беру на себя ответственность за своё здоровье.
                </span>
              </Label>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            {step === 4 ? 'Начать тренировки' : 'Продолжить'}
            {step < 4 && <Icon name="ArrowRight" size={20} className="ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}