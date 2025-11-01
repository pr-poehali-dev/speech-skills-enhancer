import Icon from '@/components/ui/icon';

interface NavigationProps {
  currentPage: 'home' | 'stats';
  onNavigate: (page: 'home' | 'stats') => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as const, label: 'Главная', icon: 'Home' },
    { id: 'stats' as const, label: 'Прогресс', icon: 'BarChart3' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t-2 border-purple-200 shadow-2xl z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-4">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <Icon
                  name={item.icon as any}
                  size={24}
                  className={isActive ? 'animate-pulse' : ''}
                />
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
