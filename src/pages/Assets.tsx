import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Server } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: string;
  status: "operational" | "maintenance" | "offline";
  voltage: string;
  lastMaintenance: string;
}

const mockAssets: Asset[] = [
  { id: "T1", name: "Power Transformer T1", type: "Transformer", status: "operational", voltage: "400/220 kV", lastMaintenance: "2024-03-15" },
  { id: "T2", name: "Power Transformer T2", type: "Transformer", status: "operational", voltage: "400/220 kV", lastMaintenance: "2024-03-10" },
  { id: "R1", name: "Shunt Reactor R1", type: "Reactor", status: "maintenance", voltage: "400 kV", lastMaintenance: "2024-04-01" },
  { id: "CB1", name: "Circuit Breaker CB1", type: "Breaker", status: "operational", voltage: "400 kV", lastMaintenance: "2024-02-20" },
  { id: "CB2", name: "Circuit Breaker CB2", type: "Breaker", status: "operational", voltage: "220 kV", lastMaintenance: "2024-02-22" },
  { id: "CT1", name: "Current Transformer CT1", type: "CT", status: "operational", voltage: "400 kV", lastMaintenance: "2024-01-15" },
];

const Assets = () => {
  const getStatusBadge = (status: Asset["status"]) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-success text-success-foreground">Operational</Badge>;
      case "maintenance":
        return <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>;
      case "offline":
        return <Badge variant="destructive">Offline</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Asset Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage substation equipment and components
        </p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAssets.map((asset) => (
          <Card key={asset.id} className="hover:shadow-glow transition-all cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{asset.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{asset.type}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(asset.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Voltage</span>
                <span className="text-sm font-medium text-foreground">{asset.voltage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Maintenance</span>
                <span className="text-sm font-medium text-foreground">{asset.lastMaintenance}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Assets;
