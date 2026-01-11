import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, HelpCircle, Settings, Plus } from "lucide-react"

export const PageHeader = ({
  title,
  description,
  backButton,
  onBack,
  actions,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          {backButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="pl-0 hover:pl-2 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Retour
            </Button>
          )}
          
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      
      {children && (
        <>
          <Separator />
          {children}
        </>
      )}
    </div>
  )
}

export const PageHeaderActionButton = ({ 
  // eslint-disable-next-line no-unused-vars
  icon: Icon = Plus, 
  label, 
  onClick, 
  variant = "default",
  size = "default",
  disabled = false 
}) => {
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={onClick} 
      disabled={disabled}
      className="gap-2"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  )
}

export const PageHeaderHelpButton = ({ onClick }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onClick}
      className="h-9 w-9"
    >
      <HelpCircle className="w-4 h-4" />
      <span className="sr-only">Aide</span>
    </Button>
  )
}

export const PageHeaderSettingsButton = ({ onClick }) => {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onClick}
      className="h-9 w-9"
    >
      <Settings className="w-4 h-4" />
      <span className="sr-only">Paramètres</span>
    </Button>
  )
}

export const PageHeaderStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-1">
                {stat.value}
              </p>
            </div>
            {stat.icon && (
              <div className="p-2 rounded-md bg-primary/10">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            )}
          </div>
          {stat.change && (
            <p className={cn(
              "text-xs mt-2",
              stat.change > 0 ? "text-green-600" : "text-red-600"
            )}>
              {stat.change > 0 ? "↑" : "↓"} {Math.abs(stat.change)}%
              <span className="text-muted-foreground ml-1">depuis le mois dernier</span>
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export const PageHeaderTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-1 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === tab.id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  )
}