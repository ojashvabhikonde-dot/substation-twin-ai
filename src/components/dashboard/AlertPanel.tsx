import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  asset: string;
  time: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    message: "Temperature threshold exceeded",
    asset: "Transformer T1",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "warning",
    message: "Oil level below optimal",
    asset: "Reactor R2",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "info",
    message: "Scheduled maintenance due",
    asset: "Breaker CB3",
    time: "1 hour ago",
  },
];

export const AlertPanel = () => {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "info":
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getAlertBadge = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {alert.message}
                    </span>
                    {getAlertBadge(alert.type)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{alert.asset}</span>
                    <span>•</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
