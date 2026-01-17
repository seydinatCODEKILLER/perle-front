/* eslint-disable react-hooks/static-components */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  DollarSign, 
  Clock, 
  AlertTriangle,
  Calendar,
  Building,
  Wallet,
  CreditCard,
  BarChart,
  PieChart,
  Target,
  TrendingUp as Growth,
  TrendingDown as Decline
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Mapping des icônes par type de KPI
const ICON_MAP = {
  // Membres
  "activeMembers": Users,
  "members": Users,
  "👥": Users,
  
  // Argent
  "totalCollected": DollarSign,
  "💰": DollarSign,
  "money": DollarSign,
  "revenue": DollarSign,
  "collected": Wallet,
  
  // En attente
  "pendingContributions": Clock,
  "pending": Clock,
  "⏳": Clock,
  "waiting": Clock,
  
  // Dettes
  "activeDebts": AlertTriangle,
  "debts": AlertTriangle,
  "⚠️": AlertTriangle,
  "debt": CreditCard,
  
  // Retard
  "overdueContributions": Calendar,
  "overdue": Calendar,
  "📅": Calendar,
  "late": Calendar,
  
  // Génériques
  "organization": Building,
  "chart": BarChart,
  "pie": PieChart,
  "target": Target,
  "growth": Growth,
  "decline": Decline,
};

// Couleurs par type de KPI
const COLOR_MAP = {
  "activeMembers": "bg-blue-500",
  "totalCollected": "bg-green-500", 
  "pendingContributions": "bg-amber-500",
  "activeDebts": "bg-red-500",
  "overdueContributions": "bg-orange-500",
};

export const KPICard = ({ kpi, index = 0 }) => {
  const { value, label, icon, trend, currency, details } = kpi;

  // Trouver l'icône appropriée
  const getIcon = () => {
    // Priorité 1: icon string du backend
    if (icon && ICON_MAP[icon]) {
      return ICON_MAP[icon];
    }
    
    // Priorité 2: label du KPI
    const labelKey = Object.keys(ICON_MAP).find(key => 
      label.toLowerCase().includes(key.toLowerCase())
    );
    if (labelKey) return ICON_MAP[labelKey];
    
    // Priorité 3: type de valeur
    if (currency) return DollarSign;
    if (typeof value === 'number' && value > 1000) return DollarSign;
    
    // Défaut
    return BarChart;
  };

  const IconComponent = getIcon();
  const colorClass = COLOR_MAP[Object.keys(COLOR_MAP).find(key => label.toLowerCase().includes(key))] || "bg-primary";

  const renderTrend = () => {
    if (trend === undefined || trend === null) return null;
    
    const isPositive = trend > 0;
    const isNegative = trend < 0;
    const isZero = trend === 0;
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <Badge 
          variant="outline" 
          className={cn(
            "ml-1 xs:ml-2 text-[10px] xs:text-xs transition-all duration-300",
            isPositive && "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
            isNegative && "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
            isZero && "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          )}
        >
          {isPositive ? <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-0.5 xs:mr-1" /> : 
           isNegative ? <TrendingDown className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-0.5 xs:mr-1" /> : 
           <Minus className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-0.5 xs:mr-1" />}
          {Math.abs(trend)}%
        </Badge>
      </motion.div>
    );
  };

  const renderValue = () => {
    if (currency) {
      return formatCurrency(value, currency);
    }
    return value.toLocaleString('fr-FR');
  };

  const shouldShowDetails = details && (
    details.count !== undefined || 
    details.totalAmount !== undefined ||
    details.remaining !== undefined ||
    details.totalRemaining !== undefined
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className="group hover:shadow-lg xs:hover:shadow-xl transition-all duration-300 border hover:border-primary/20 h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 xs:pb-2 px-3 xs:px-4 pt-3 xs:pt-4">
          <CardTitle className="
            text-xs xs:text-sm font-medium 
            line-clamp-2 xs:line-clamp-1
            min-h-8 xs:min-h-0
            wrap-break-word
          ">
            {label}
          </CardTitle>
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            className={cn(
              "p-1.5 xs:p-2 rounded-lg transition-colors duration-300 shrink-0",
              `${colorClass}/10 group-hover:${colorClass}/20`
            )}
          >
            <IconComponent className={cn(
              "w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 transition-colors duration-300",
              `${colorClass.replace('bg-', 'text-')}`
            )} />
          </motion.div>
        </CardHeader>
        
        <CardContent className="px-3 xs:px-4 pb-3 xs:pb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.1 }}
            className="
              text-lg xs:text-xl sm:text-2xl font-bold 
              leading-tight xs:leading-normal
              truncate xs:whitespace-normal
              min-h-7 xs:min-h-0
            "
          >
            {renderValue()}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="flex items-center mt-1.5 xs:mt-2"
          >
            {renderTrend()}
          </motion.div>
          
          {shouldShowDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="
                mt-3 xs:mt-4 pt-3 xs:pt-4 border-t 
                text-[10px] xs:text-xs sm:text-sm 
                text-muted-foreground
                space-y-1 xs:space-y-1.5
              "
            >
              {details.count !== undefined && (
                <div className="flex justify-between items-center group/item hover:bg-muted/30 p-1 xs:p-1.5 rounded transition-colors">
                  <span className="truncate mr-2">Nombre:</span>
                  <span className="font-medium whitespace-nowrap">{details.count}</span>
                </div>
              )}
              {details.totalAmount !== undefined && (
                <div className="flex justify-between items-center group/item hover:bg-muted/30 p-1 xs:p-1.5 rounded transition-colors">
                  <span className="truncate mr-2">Total:</span>
                  <span className="font-medium whitespace-nowrap text-xs xs:text-sm">
                    {formatCurrency(details.totalAmount, currency)}
                  </span>
                </div>
              )}
              {details.remaining !== undefined && (
                <div className="flex justify-between items-center group/item hover:bg-muted/30 p-1 xs:p-1.5 rounded transition-colors">
                  <span className="truncate mr-2">Restant:</span>
                  <span className="font-medium whitespace-nowrap text-xs xs:text-sm text-amber-600">
                    {formatCurrency(details.remaining, currency)}
                  </span>
                </div>
              )}
              {details.totalRemaining !== undefined && (
                <div className="flex justify-between items-center group/item hover:bg-muted/30 p-1 xs:p-1.5 rounded transition-colors">
                  <span className="truncate mr-2">Dettes:</span>
                  <span className="font-medium whitespace-nowrap text-xs xs:text-sm text-red-600">
                    {formatCurrency(details.totalRemaining, currency)}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};