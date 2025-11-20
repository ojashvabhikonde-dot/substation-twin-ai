import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetHealth {
  id: string;
  name: string;
  health: number;
  status: "optimal" | "warning" | "critical";
  temperature: number;
  load: number;
}

const assets: AssetHealth[] = [
  { id: "T1", name: "Transformer T1", health: 94, status: "optimal", temperature: 82, load: 78 },
  { id: "T2", name: "Transformer T2", health: 91, status: "optimal", temperature: 79, load: 72 },
  { id: "R1", name: "Reactor R1", health: 76, status: "warning", temperature: 88, load: 85 },
  { id: "CB1", name: "Breaker CB1", health: 88, status: "optimal", temperature: 45, load: 60 },
  { id: "CB2", name: "Breaker CB2", health: 92, status: "optimal", temperature: 43, load: 65 },
  { id: "CT1", name: "CT Unit 1", health: 96, status: "optimal", temperature: 38, load: 55 },
];

export const AssetHealthGrid = () => {
  const getStatusColor = (status: AssetHealth["status"]) => {
    switch (status) {
      case "optimal":
        return "bg-success text-success-foreground";
      case "warning":
        return "bg-warning text-warning-foreground";
      case "critical":
        return "bg-destructive text-destructive-foreground";
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return "bg-success";
    if (health >= 75) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" />
          Asset Health Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Server className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{asset.name}</h4>
                    <p className="text-xs text-muted-foreground">{asset.id}</p>
                  </div>
                </div>
                <Badge className={cn("text-xs", getStatusColor(asset.status))}>
                  {asset.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Health</span>
                    <span className="font-medium text-foreground">{asset.health}%</span>
                  </div>
                  <Progress
                    value={asset.health}
                    className="h-1.5"
                    indicatorClassName={getHealthColor(asset.health)}
                  />
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="font-medium text-foreground">{asset.temperature}°C</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Load</span>
                  <span className="font-medium text-foreground">{asset.load}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
