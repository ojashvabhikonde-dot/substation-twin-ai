import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity } from "lucide-react";

interface SystemMetric {
  label: string;
  value: number;
  status: "optimal" | "warning" | "critical";
}

const metrics: SystemMetric[] = [
  { label: "Overall Health", value: 94, status: "optimal" },
  { label: "Energy Efficiency", value: 87, status: "optimal" },
  { label: "Asset Reliability", value: 76, status: "warning" },
  { label: "Grid Stability", value: 92, status: "optimal" },
];

export const SystemStatus = () => {
  const getStatusColor = (status: SystemMetric["status"]) => {
    switch (status) {
      case "optimal":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "critical":
        return "bg-destructive";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-semibold text-foreground">{metric.value}%</span>
            </div>
            <Progress
              value={metric.value}
              className="h-2"
              indicatorClassName={getStatusColor(metric.status)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
