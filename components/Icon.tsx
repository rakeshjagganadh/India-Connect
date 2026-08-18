import React from 'react';
import {
  Fingerprint,
  BookOpen,
  CreditCard,
  UserCheck,
  Wallet,
  FileText,
  Info,
  Landmark,
  Percent,
  Briefcase,
  ShieldCheck,
  RefreshCw,
  Sprout,
  Sun,
  Layers,
  ShoppingCart,
  Smartphone,
  Users,
  HeartPulse,
  Syringe,
  Video,
  Pill,
  Activity,
  Map,
  GraduationCap,
  Library,
  ClipboardList,
  HardHat,
  Building,
  Building2,
  Car,
  Train,
  Tag,
  Receipt,
  ShieldAlert,
  PhoneOff,
  Zap,
  Flame,
  LayoutGrid,
  Search,
  Star,
  ExternalLink,
  Share2,
  Bookmark,
  Copy,
  Check,
  Grid,
  List,
  Sparkles,
  Menu,
  X,
  SlidersHorizontal,
  PhoneCall,
  Compass,
  HelpCircle,
  ArrowRight,
  Clock,
  ChevronRight,
  ChevronDown,
  Globe,
  CircleAlert,
  CheckCircle2,
  Lock,
  Eye,
  Sliders,
  Filter,
  MonitorPlay,
  FileCheck
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = "w-5 h-5", size }) => {
  const iconProps = { className, ...(size ? { size } : {}) };

  switch (name) {
    // Brand & UI
    case 'menu':
      return <Menu {...iconProps} />;
    case 'x':
    case 'close':
      return <X {...iconProps} />;
    case 'layout-grid':
    case 'grid':
      return <Grid {...iconProps} />;
    case 'list':
      return <List {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'filter':
      return <Filter {...iconProps} />;
    case 'sliders':
      return <SlidersHorizontal {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'external-link':
      return <ExternalLink {...iconProps} />;
    case 'copy':
      return <Copy {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'check-circle':
      return <CheckCircle2 {...iconProps} />;
    case 'arrow-right':
      return <ArrowRight {...iconProps} />;
    case 'chevron-right':
      return <ChevronRight {...iconProps} />;
    case 'chevron-down':
      return <ChevronDown {...iconProps} />;
    case 'phone-call':
      return <PhoneCall {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
    case 'help-circle':
      return <HelpCircle {...iconProps} />;
    case 'clock':
      return <Clock {...iconProps} />;
    case 'lock':
      return <Lock {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;

    // Identity
    case 'fingerprint':
      return <Fingerprint {...iconProps} />;
    case 'book':
    case 'book-open':
      return <BookOpen {...iconProps} />;
    case 'id-card':
      return <CreditCard {...iconProps} />;
    case 'user-check':
      return <UserCheck {...iconProps} />;
    case 'wallet':
      return <Wallet {...iconProps} />;
    case 'file-text':
      return <FileText {...iconProps} />;
    case 'file-check':
      return <FileCheck {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;

    // Finance
    case 'rupee':
    case 'landmark':
      return <Landmark {...iconProps} />;
    case 'percent':
      return <Percent {...iconProps} />;
    case 'briefcase':
      return <Briefcase {...iconProps} />;
    case 'credit-card':
      return <CreditCard {...iconProps} />;
    case 'shield-check':
      return <ShieldCheck {...iconProps} />;
    case 'refresh-cw':
    case 'refresh-ccw':
      return <RefreshCw {...iconProps} />;

    // Agriculture
    case 'sprout':
      return <Sprout {...iconProps} />;
    case 'sun':
      return <Sun {...iconProps} />;
    case 'layers':
      return <Layers {...iconProps} />;
    case 'shopping-cart':
      return <ShoppingCart {...iconProps} />;
    case 'smartphone-agri':
    case 'smartphone':
      return <Smartphone {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;

    // Health
    case 'heart-pulse':
      return <HeartPulse {...iconProps} />;
    case 'syringe':
      return <Syringe {...iconProps} />;
    case 'video':
      return <Video {...iconProps} />;
    case 'pill':
      return <Pill {...iconProps} />;
    case 'activity':
      return <Activity {...iconProps} />;

    // Land
    case 'map':
      return <Map {...iconProps} />;

    // Education
    case 'monitor-play':
      return <MonitorPlay {...iconProps} />;
    case 'graduation-cap':
      return <GraduationCap {...iconProps} />;
    case 'library':
      return <Library {...iconProps} />;
    case 'clipboard-list':
      return <ClipboardList {...iconProps} />;
    case 'briefcase-search':
      return <Briefcase {...iconProps} />;
    case 'hard-hat':
      return <HardHat {...iconProps} />;
    case 'building':
      return <Building {...iconProps} />;
    case 'building-2':
      return <Building2 {...iconProps} />;

    // Transport
    case 'car':
      return <Car {...iconProps} />;
    case 'train':
      return <Train {...iconProps} />;
    case 'tag':
      return <Tag {...iconProps} />;
    case 'receipt':
      return <Receipt {...iconProps} />;

    // Utilities & Helplines
    case 'shield-alert':
      return <ShieldAlert {...iconProps} />;
    case 'phone-off':
    case 'smartphone-off':
      return <PhoneOff {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'flame':
      return <Flame {...iconProps} />;

    default:
      return <Globe {...iconProps} />;
  }
};

export default Icon;
