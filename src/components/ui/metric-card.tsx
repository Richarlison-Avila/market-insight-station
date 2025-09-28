import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  trend?: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "primary";
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  trend,
  className,
  variant = "default",
}: MetricCardProps) {
  const variantClasses = {
    default: "bg-gradient-card border-border",
    success: "bg-gradient-success border-success/20",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20",
    primary: "bg-gradient-primary border-primary/20",
  };

  const iconVariantClasses = {
    default: "text-primary bg-primary/10",
    success: "text-success-foreground bg-success/90",
    warning: "text-warning-foreground bg-warning/90",
    primary: "text-primary-foreground bg-primary/90",
  };

  const changeClasses = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-elevated",
        variantClasses[variant],
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-2xl font-bold text-foreground">{value}</div>
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            iconVariantClasses[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </CardHeader>
      
      {(change || trend) && (
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            {change && (
              <div className={cn("text-sm font-medium", changeClasses[changeType])}>
                {change}
              </div>
            )}
            {trend && <div className="text-right">{trend}</div>}
          </div>
        </CardContent>
      )}
    </Card>
  );
}