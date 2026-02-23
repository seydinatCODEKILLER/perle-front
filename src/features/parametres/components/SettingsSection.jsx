import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const SettingsSection = ({ 
  icon: Icon, 
  title, 
  description, 
  children 
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          )}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};