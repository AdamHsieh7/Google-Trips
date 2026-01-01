import React, { useState, useRef } from 'react';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle, 
  ShieldCheck, 
  Filter,
  Plane,
  Building2,
  MoreVertical,
  CreditCard,
  ChevronRight,
  Search,
  LifeBuoy,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Trip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  details: string;
  airline: string;
  status: string[];
  amount: string;
  amountLabel: string;
  imageSeed: string;
}

// --- Mock Data ---
const MOCK_TRIPS: Trip[] = [
  {
    id: 'T8010652',
    title: 'P26 GSBT alignment',
    startDate: 'Jan 12',
    endDate: 'Jan 16, 2026',
    details: '1 Roundtrip Flight, 1 Accommodation',
    airline: 'China airlines',
    status: ['UPCOMING', 'NOT EXPENSED'],
    amount: 'NT$57,764',
    amountLabel: 'est. NT$8,864 Earned',
    imageSeed: 'alignment'
  },
  {
    id: 'T7980002',
    title: 'To Hong Kong (Greater Area)',
    startDate: 'Jun 1',
    endDate: 'Jun 6, 2025',
    details: '1 Roundtrip Flight, 1 Accommodation',
    airline: 'Eva Airways',
    status: ['FULLY EXPENSED'],
    amount: 'NT$8,422',
    amountLabel: 'Earned',
    imageSeed: 'hongkong'
  },
  {
    id: 'T7888993',
    title: 'P25 SoC system level aging test',
    startDate: 'Mar 19',
    endDate: 'Mar 28, 2025',
    details: '1 Roundtrip Flight, 1 Accommodation',
    airline: 'Eva Airways',
    status: ['CANCELED', 'NOT EXPENSED', 'INELIGIBLE FOR EARNING TRIPS CREDIT'],
    amount: 'NT$0',
    amountLabel: 'est. NT$0 Earned',
    imageSeed: 'tech'
  }
];

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick?: () => void 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-6 py-3 text-sm font-medium transition-all duration-200",
      active 
        ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    )}
  >
    <Icon size={20} className={active ? "text-blue-600" : "text-gray-400"} />
    <span>{label}</span>
  </button>
);

const StatusBadge = ({ label }: { label: string }) => {
  const isNegative = label.includes('CANCELED') || label.includes('NOT') || label.includes('INELIGIBLE');
  return (
    <span className={cn(
      "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
      isNegative 
        ? "bg-yellow-100 text-gray-700" 
        : "bg-gray-200 text-gray-800"
    )}>
      {label}
    </span>
  );
};

const TripCard = ({ trip }: { trip: Trip }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group flex items-start gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
  >
    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-blue-50 flex items-center justify-center">
      <img 
        src={`https://picsum.photos/seed/${trip.imageSeed}/200/200`} 
        alt={trip.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-10 text-blue-600">
        <Plane size={24} />
      </div>
    </div>
    
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
          {trip.title}
        </h3>
        <div className="text-right flex-shrink-0 ml-4">
          <span className={cn(
            "text-sm font-bold",
            trip.amount === 'NT$0' ? "text-gray-400" : "text-green-600"
          )}>
            {trip.amount}
          </span>
          <p className="text-[10px] text-gray-500 font-medium">{trip.amountLabel}</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-0.5">
        {trip.startDate} - {trip.endDate} <span className="font-bold ml-1">ID:</span> {trip.id}
      </p>
      
      <p className="text-xs text-gray-600 mt-1">
        {trip.details}, {trip.airline}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {trip.status.map((s, i) => (
          <StatusBadge key={i} label={s} />
        ))}
      </div>
    </div>
  </motion.div>
);

const HomeView = () => (
  <div className="w-full max-w-4xl space-y-6 pb-12">
    {/* Get Caps Section */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-2xl font-normal text-gray-800 mb-8">Get caps</h2>
        
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">Origin</label>
            <input 
              type="text" 
              defaultValue="Taipei" 
              className="w-full border-b border-gray-300 py-1 focus:border-blue-500 outline-none text-gray-700"
            />
          </div>
          <div className="text-gray-400 pt-4">
            <ChevronRight size={20} className="rotate-0" />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-400 mb-1">Destination</label>
            <input 
              type="text" 
              placeholder="Destination" 
              className="w-full border-b border-gray-300 py-1 focus:border-blue-500 outline-none text-gray-700"
            />
          </div>
          <div className="flex items-center gap-2 pt-4">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-600">Back to Taipei</span>
          </div>
        </div>

        <button className="text-blue-600 text-xs font-bold tracking-wider uppercase hover:underline">
          ADVANCED SEARCH
        </button>

        {/* Yellow Info Box */}
        <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded p-6 flex gap-4">
          <div className="text-gray-500 flex-shrink-0 mt-1">
            <HelpCircle size={20} fill="currentColor" className="text-gray-400" />
          </div>
          <div className="text-sm text-gray-700 space-y-4 leading-relaxed">
            <p>
              <span className="font-bold">April 2025:</span> Booking Google business travel via <a href="#" className="text-blue-600 underline">Concur</a> or with <a href="#" className="text-blue-600 underline">Amex GBT</a> prioritizes your safety, gives you access to support for disruptions or changes, offers Google preferred rates, identifies you as a company traveler, and allows you to earn loyalty points.
            </p>
            <p>
              Additionally, Concur has recently launched a new interface in the UK, IE, US, and Mexico, with more markets to follow. Manage your Gcard via <a href="#" className="text-blue-600 underline">go/mygcard</a>
            </p>
            <div className="flex justify-between items-center pt-2">
              <p>Create trip entries before departure if you want to earn <span className="font-bold">trips credit</span>.</p>
              <a href="#" className="text-blue-600 font-bold text-xs uppercase tracking-wider hover:underline">MORE INFO</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Safety Section */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-2xl font-normal text-gray-800 mb-6">Safety</h2>
        <p className="text-sm text-gray-500 mb-6">Prepare for a safe trip:</p>
        
        <ol className="space-y-4 text-sm text-gray-600 list-decimal pl-5">
          <li>Watch <a href="#" className="text-blue-600 underline">go/travel-safety-video</a></li>
          <li>Visit <a href="#" className="text-blue-600 underline">go/travel-security</a> for detailed safety/security guidance</li>
          <li>Visit <a href="#" className="text-blue-600 underline">go/international-sos</a> for destination-specific travel requirements</li>
        </ol>
      </div>
    </motion.div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDelegatesModalOpen, setIsDelegatesModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('https://picsum.photos/seed/ghibli-tuxedo-cat/100/100');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MOCK_DELEGATES = [
    { name: 'Zhang Wei', email: 'zhang.w@google.com', role: 'Travel Coordinator' },
    { name: 'Priya Sharma', email: 'priya.s@google.com', role: 'Primary Delegate' },
    { name: 'James Wilson', email: 'james.w@google.com', role: 'Delegate' },
    { name: 'Deepak Nayak', email: 'deepaknayak@google.com', role: 'Expense Approver' },
    { name: 'Li Na', email: 'li.n@google.com', role: 'Delegate' },
    { name: 'Amit Patel', email: 'amit.p@google.com', role: 'Delegate' },
    { name: 'Sarah Miller', email: 'sarah.m@google.com', role: 'Delegate' },
    { name: 'Sanjay Gupta', email: 'sanjay.g@google.com', role: 'Delegate' },
    { name: 'Wei Chen', email: 'wei.c@google.com', role: 'Delegate' },
    { name: 'Vikram Singh', email: 'vikram.s@google.com', role: 'Delegate' },
  ];

  const handleProfilePicClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabClick = (tab: string) => {
    if (tab === 'Create') {
      setIsCreateModalOpen(true);
    } else if (tab === 'Delegates') {
      setIsDelegatesModalOpen(true);
    } else if (tab === 'Help') {
      setIsHelpModalOpen(true);
    } else if (tab === 'Privacy') {
      setIsPrivacyModalOpen(true);
    } else if (tab === 'Settings') {
      setIsSettingsModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Plane className="text-blue-600" />
            Google Trips
          </h1>
        </div>

        <div className="px-6 py-4 flex items-center gap-3 border-b border-gray-100">
          <button 
            onClick={handleProfilePicClick}
            className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md group cursor-pointer"
          >
            <img 
              src={profilePic} 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <PlusCircle size={16} className="text-white" />
            </div>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Hank Hsieh</p>
            <p className="text-xs text-gray-500 truncate">hankhsieh@google.com</p>
            <div className="mt-1 flex items-center justify-between">
               <span className="text-[10px] text-gray-400 uppercase font-bold">Trips credit:</span>
               <span className="text-xs font-bold text-gray-800">NT$9,006</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <SidebarItem 
            icon={Home} 
            label="Home" 
            active={activeTab === 'Home'} 
            onClick={() => handleTabClick('Home')} 
          />
          <SidebarItem 
            icon={PlusCircle} 
            label="Get caps / Create trip" 
            active={activeTab === 'Create'} 
            onClick={() => handleTabClick('Create')} 
          />
          <SidebarItem 
            icon={FileText} 
            label="My Trip entries" 
            active={activeTab === 'My Trip entries'} 
            onClick={() => handleTabClick('My Trip entries')} 
          />
          <SidebarItem 
            icon={Users} 
            label="My delegates" 
            active={activeTab === 'Delegates'} 
            onClick={() => handleTabClick('Delegates')} 
          />
          
          <div className="my-4 border-t border-gray-100 mx-6" />
          
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'Settings'} 
            onClick={() => handleTabClick('Settings')} 
          />
          <SidebarItem 
            icon={HelpCircle} 
            label="Help & Feedback" 
            active={activeTab === 'Help'} 
            onClick={() => handleTabClick('Help')} 
          />
          
          <div className="my-4 border-t border-gray-100 mx-6" />
          
          <SidebarItem 
            icon={ShieldCheck} 
            label="Privacy & Terms" 
            active={activeTab === 'Privacy'} 
            onClick={() => handleTabClick('Privacy')} 
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden bg-[#e8f0fe]">
        {/* ... existing background elements ... */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-100 to-transparent opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white/80 to-transparent" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-center"
          >
            <img 
              src="https://picsum.photos/seed/landscape/1920/1080?blur=5" 
              className="w-full h-full object-cover opacity-10 mix-blend-multiply"
              alt="Background"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ x: -100, y: 100, opacity: 0 }}
            animate={{ x: '110vw', y: -100, opacity: 0.2 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-0 text-blue-400"
          >
            <Plane size={48} className="rotate-12" />
          </motion.div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center pt-12 px-6 overflow-y-auto">
          {activeTab === 'Home' ? (
            <HomeView />
          ) : (
            <>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200"
              >
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                  <h2 className="text-xl font-semibold text-gray-800">My trips</h2>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                    <Filter size={20} />
                  </button>
                </div>

                {/* Trip List */}
                <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                  <AnimatePresence mode="popLayout">
                    {MOCK_TRIPS.map((trip) => (
                      <TripCard key={trip.id} trip={trip} />
                    ))}
                  </AnimatePresence>
                  
                  {/* Empty State / Footer */}
                  <div className="p-8 text-center border-t border-gray-50">
                    <p className="text-sm text-gray-400">No more trips to show</p>
                    <button className="mt-4 text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1 mx-auto">
                      View archived trips <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats / Info below card */}
              <div className="mt-8 flex gap-6 pb-12">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50 text-xs font-medium text-gray-600 flex items-center gap-2">
                  <CreditCard size={14} className="text-blue-500" />
                  Next reimbursement: <span className="text-gray-900">July 15, 2025</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/50 text-xs font-medium text-gray-600 flex items-center gap-2">
                  <Building2 size={14} className="text-blue-500" />
                  Active bookings: <span className="text-gray-900">2</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Create Trip Modal */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Trip</h3>
                <p className="text-gray-500 mb-6">Enter your trip details to get started.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Destination</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Tokyo, Japan" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                  >
                    Create Trip
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Delegates Modal */}
        <AnimatePresence>
          {isDelegatesModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDelegatesModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">My Delegates</h3>
                  <button 
                    onClick={() => setIsDelegatesModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <PlusCircle className="rotate-45" size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                  {MOCK_DELEGATES.map((delegate, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {delegate.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{delegate.name}</p>
                        <p className="text-xs text-gray-500 truncate">{delegate.email}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-full uppercase">
                        {delegate.role}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => setIsDelegatesModalOpen(false)}
                    className="w-full px-4 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Help Modal */}
        <AnimatePresence>
          {isHelpModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsHelpModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h3 className="text-2xl font-normal text-gray-800 w-full text-center">Help</h3>
                  <button 
                    onClick={() => setIsHelpModalOpen(false)}
                    className="absolute right-6 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                  {/* Popular Resources */}
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-4">Popular help resources</h4>
                    <div className="space-y-4">
                      {[
                        "Business-related home internet",
                        "go/travelperks | Perks with Google's Preferred Suppliers",
                        "Expense types & thresholds",
                        "Gcard for business expenses",
                        "2025 Year-end expense deadlines"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                            <FileText size={20} />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors leading-tight">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Search size={20} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search Help" 
                      className="w-full pl-12 pr-4 py-3 bg-gray-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>

                  {/* Need More Help */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-base font-bold text-gray-900 mb-4">Need more help?</h4>
                    <div className="flex items-start gap-4 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <LifeBuoy size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Contact us</p>
                        <p className="text-xs text-gray-500">Tell us more and we'll help you get there</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Privacy Modal */}
        <AnimatePresence>
          {isPrivacyModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPrivacyModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                className="relative w-full h-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-gray-800">
                      <span className="text-blue-500">G</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">o</span>
                      <span className="text-blue-500">g</span>
                      <span className="text-green-500">l</span>
                      <span className="text-red-500">e</span>
                    </span>
                    <span className="text-xl text-gray-600 ml-1">Privacy & Terms</span>
                  </div>
                  <button 
                    onClick={() => setIsPrivacyModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-gray-100 bg-white z-10">
                  <div className="flex gap-8">
                    {['Overview', 'Privacy Policy', 'Terms of Service', 'Technologies', 'FAQ'].map((tab) => (
                      <button 
                        key={tab}
                        className={cn(
                          "py-4 text-sm font-medium border-b-2 transition-all",
                          tab === 'Privacy Policy' 
                            ? "border-blue-600 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-800"
                        )}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex overflow-hidden">
                  {/* Sidebar within modal */}
                  <div className="w-72 border-r border-gray-100 overflow-y-auto p-6 bg-gray-50/30">
                    <div className="space-y-1">
                      {[
                        "Introduction",
                        "Information Google collects",
                        "Why Google collects data",
                        "Your privacy controls",
                        "Sharing your information",
                        "Keeping your information secure",
                        "Exporting & deleting your information",
                        "Retaining your information",
                        "Compliance & cooperation with regulators",
                        "About this policy",
                        "Related privacy practices",
                        "Data transfer frameworks"
                      ].map((item) => (
                        <button 
                          key={item}
                          className={cn(
                            "w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors",
                            item === 'Introduction' 
                              ? "text-blue-600 font-medium bg-blue-50/50" 
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main content within modal */}
                  <div className="flex-1 overflow-y-auto p-12 bg-white">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex justify-center mb-12">
                        <div className="relative w-64 h-64">
                          {/* Simulated Illustration */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                              <div className="w-32 h-40 bg-blue-600 rounded-xl shadow-xl flex items-center justify-center transform -rotate-6">
                                <span className="text-white text-6xl font-bold">G</span>
                              </div>
                              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                <ShieldCheck size={24} className="text-white" />
                              </div>
                              <div className="absolute -bottom-6 -left-8 w-24 h-24 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 transform rotate-12">
                                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                                  <Search size={24} className="text-gray-400" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">GOOGLE PRIVACY POLICY</p>
                          <h2 className="text-4xl font-normal text-gray-900 leading-tight mb-6">
                            When you use our services, you’re trusting us with your information.
                          </h2>
                          <p className="text-xl text-gray-600 leading-relaxed">
                            We understand this is a big responsibility and work hard to protect your information and put you in control.
                          </p>
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            This Privacy Policy is meant to help you understand what information we collect, why we collect it, and how you can update, manage, export, and delete your information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSettingsModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-2xl font-normal text-gray-800">Settings</h3>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-gray-900">Travel data settings</h4>
                    
                    <p className="text-sm text-gray-700 leading-relaxed">
                      In order to meet Google compliance policies, your travel data will be shared with Google's systems and third party systems which have gone through the appropriate legal, privacy and security reviews of Alphabet.
                    </p>

                    {/* Option 1 */}
                    <div className="flex items-start justify-between gap-4 pt-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">Share your trip entries with systems at Google</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          Share locations (e.g. US-NYC or Houston) and travel dates of your trip entries with Google's systems such as Teams and REWS. This will allow other Googlers to adapt to your travel plans and will enable smarter decisions. We will only share trips that you have created, i.e. that show up in <a href="#" className="text-blue-600 underline">My trip entries</a>.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                      />
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      {/* Option 2 */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 mb-1">Save entries in Google Calendar</p>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            Auto-save trip entries in Google Calendar (e.g. Working from San Francisco, CA) to allow other Googlers to adapt to your travel plans.
                          </p>
                        </div>
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-gray-50 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsSettingsModalOpen(false)}
                    className="px-8 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-all active:scale-95 uppercase tracking-wider text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsSettingsModalOpen(false)}
                    className="px-8 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-wider text-xs"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
