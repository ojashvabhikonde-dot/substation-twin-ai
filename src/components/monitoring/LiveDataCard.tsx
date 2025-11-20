import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface LiveDataCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend: "up" | "down" | "stable";
  status: "normal" | "warning" | "critical";
}

export const LiveDataCard = ({ title, value, unit, icon: Icon, trend, status }: LiveDataCardProps) => {
  const [data, setData] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      value: 50 + Math.random() * 20,
      time: i,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1), {
          value: prev[prev.length - 1].value + (Math.random() - 0.5) * 5,
          time: prev[prev.length - 1].time + 1,
        }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case "normal": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "normal": return <Badge className="bg-success/20 text-success border-success/40">Normal</Badge>;
      case "warning": return <Badge className="bg-warning/20 text-warning border-warning/40">Warning</Badge>;
      case "critical": return <Badge className="bg-destructive/20 text-destructive border-destructive/40">Critical</Badge>;
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${getStatusColor()}`}>
            {value}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        
        <div className="h-12 -mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(195, 100%, 50%)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
