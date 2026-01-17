import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type TransportType = 'marshrutka' | 'bus' | 'taxi' | 'carpool';
type View = 'map' | 'trips' | 'subscription' | 'profile';

const transportTypes = [
  { id: 'marshrutka' as TransportType, name: 'Маршрутка', icon: 'Bus', color: 'bg-blue-500' },
  { id: 'bus' as TransportType, name: 'Автобус', icon: 'Bus', color: 'bg-green-500' },
  { id: 'taxi' as TransportType, name: 'Такси', icon: 'Car', color: 'bg-yellow-500' },
  { id: 'carpool' as TransportType, name: 'Совместная поездка', icon: 'Users', color: 'bg-purple-500' },
];

const subscriptionPlans = [
  { name: '7 дней', price: 1, period: '7 дней' },
  { name: '28 дней', price: 5, period: 'месяц' },
  { name: 'VIP', price: 100, period: 'год', isVip: true },
];

const mockTrips = [
  { id: 1, from: 'ул. Рудаки', to: 'Площадь Дусти', type: 'marshrutka', time: '10:30', price: 2 },
  { id: 2, from: 'Баракат', to: 'Сари Осиё', type: 'bus', time: '14:15', price: 1.5 },
];

export default function Index() {
  const [currentView, setCurrentView] = useState<View>('map');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<TransportType | null>(null);

  const renderMapView = () => (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MapPin" size={40} className="text-primary" />
          </div>
          <h3 className="text-xl font-medium text-secondary">Карта Душанбе</h3>
          <p className="text-muted-foreground max-w-sm">
            Интеграция с Google Maps добавляется отдельно. 
            Здесь будет отображаться реальная карта с маршрутами транспорта.
          </p>
        </div>
      </div>

      {transportTypes.map((type, idx) => (
        <div
          key={type.id}
          className={`absolute ${type.color} w-10 h-10 rounded-full shadow-lg flex items-center justify-center animate-pulse`}
          style={{
            top: `${20 + idx * 15}%`,
            left: `${30 + idx * 12}%`,
          }}
        >
          <Icon name={type.icon as any} size={20} className="text-white" />
        </div>
      ))}

      <Button
        size="lg"
        className="absolute bottom-24 left-1/2 -translate-x-1/2 shadow-2xl"
        onClick={() => setIsBottomSheetOpen(true)}
      >
        <Icon name="Navigation" size={20} className="mr-2" />
        Выбрать маршрут
      </Button>
    </div>
  );

  const renderTripsView = () => (
    <div className="p-6 space-y-4 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-secondary mb-6">Поездки</h2>
      {mockTrips.map((trip) => (
        <Card key={trip.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="font-medium">{trip.from}</span>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <div className="w-px h-4 bg-border" />
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-destructive" />
                <span className="font-medium">{trip.to}</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <Badge variant="outline">{trip.time}</Badge>
              <p className="text-lg font-bold text-primary">{trip.price} сом.</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSubscriptionView = () => (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-secondary mb-6">Подписка</h2>
      <div className="grid gap-4">
        {subscriptionPlans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-6 hover:shadow-lg transition-all cursor-pointer ${
              plan.isVip ? 'border-2 border-primary bg-primary/5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
              </div>
              {plan.isVip && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">VIP</Badge>}
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-primary">{plan.price} сом.</div>
              <Button variant={plan.isVip ? 'default' : 'outline'}>
                Оформить
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfileView = () => (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
          АК
        </div>
        <div>
          <h2 className="text-2xl font-bold">Алишер Каримов</h2>
          <p className="text-muted-foreground">+992 XX XXX XX XX</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Crown" size={24} className="text-yellow-500" />
            <div>
              <p className="font-medium">Активная подписка</p>
              <p className="text-sm text-muted-foreground">VIP • до 25.02.2026</p>
            </div>
          </div>
          <Badge className="bg-green-500">Активна</Badge>
        </div>
      </Card>

      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start" size="lg">
          <Icon name="History" size={20} className="mr-3" />
          История поездок
        </Button>
        <Button variant="outline" className="w-full justify-start" size="lg">
          <Icon name="Star" size={20} className="mr-3" />
          Избранное
        </Button>
        <Button variant="outline" className="w-full justify-start" size="lg">
          <Icon name="Settings" size={20} className="mr-3" />
          Настройки
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-secondary text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={24} className="text-secondary" />
            </div>
            <h1 className="text-2xl font-bold">Karta-AD</h1>
          </div>
          <Badge variant="outline" className="bg-white text-secondary border-0">
            Душанбе
          </Badge>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {currentView === 'map' && renderMapView()}
        {currentView === 'trips' && renderTripsView()}
        {currentView === 'subscription' && renderSubscriptionView()}
        {currentView === 'profile' && renderProfileView()}
      </main>

      <nav className="bg-card border-t px-2 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { id: 'map' as View, icon: 'Map', label: 'Карта' },
            { id: 'trips' as View, icon: 'Route', label: 'Поездки' },
            { id: 'subscription' as View, icon: 'Wallet', label: 'Подписка' },
            { id: 'profile' as View, icon: 'User', label: 'Профиль' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={24} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <Sheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen}>
        <SheetContent side="bottom" className="h-[70vh]">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">Выберите тип транспорта</SheetTitle>
          </SheetHeader>
          <div className="mt-6 grid gap-4">
            {transportTypes.map((type) => (
              <Card
                key={type.id}
                className="p-5 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
                onClick={() => {
                  setSelectedTransport(type.id);
                  setTimeout(() => setIsBottomSheetOpen(false), 300);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`${type.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
                    <Icon name={type.icon as any} size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {type.id === 'marshrutka' && 'Быстро и доступно'}
                      {type.id === 'bus' && 'Городские маршруты'}
                      {type.id === 'taxi' && 'Комфортная поездка'}
                      {type.id === 'carpool' && 'Экономия на поездках'}
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}