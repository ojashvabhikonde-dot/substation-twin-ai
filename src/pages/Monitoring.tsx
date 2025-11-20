import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Zap, Thermometer, Gauge } from "lucide-react";
import { LiveDataCard } from "@/components/monitoring/LiveDataCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventLog } from "@/components/monitoring/EventLog";
import { SubstationSchematic } from "@/components/monitoring/SubstationSchematic";

const Monitoring = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Real-Time Monitoring</h1>
        <p className="text-muted-foreground">
          Live data streams from SCADA systems and IoT sensors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiveDataCard
          title="Voltage (Bus 1)"
          value="398.2"
          unit="kV"
          icon={Zap}
          trend="stable"
          status="normal"
        />
        <LiveDataCard
          title="Current"
          value="845"
          unit="A"
          icon={Activity}
          trend="up"
          status="normal"
        />
        <LiveDataCard
          title="Temperature"
          value="84"
          unit="°C"
          icon={Thermometer}
          trend="up"
          status="warning"
        />
        <LiveDataCard
          title="Frequency"
          value="50.02"
          unit="Hz"
          icon={Gauge}
          trend="stable"
          status="normal"
        />
      </div>

      <SubstationSchematic />

      <EventLog />

      <Tabs defaultValue="electrical" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 bg-muted">
          <TabsTrigger value="electrical">Electrical</TabsTrigger>
          <TabsTrigger value="thermal">Thermal</TabsTrigger>
          <TabsTrigger value="mechanical">Mechanical</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
        </TabsList>

        <TabsContent value="electrical" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Voltage Profile - Bus 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Phase A</span>
                    <span className="text-sm font-medium text-foreground">398.5 kV</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Phase B</span>
                    <span className="text-sm font-medium text-foreground">398.2 kV</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Phase C</span>
                    <span className="text-sm font-medium text-foreground">398.8 kV</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Current Flow - Feeder 1
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Phase A</span>
                    <span className="text-sm font-medium text-foreground">845 A</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Phase B</span>
                    <span className="text-sm font-medium text-foreground">838 A</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                    <span className="text-sm text-muted-foreground">Phase C</span>
                    <span className="text-sm font-medium text-foreground">852 A</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="thermal" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" />
                Temperature Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-2">Transformer T1</p>
                  <p className="text-2xl font-bold text-warning">84°C</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-2">Transformer T2</p>
                  <p className="text-2xl font-bold text-success">76°C</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground mb-2">Reactor R1</p>
                  <p className="text-2xl font-bold text-warning">88°C</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mechanical" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mechanical Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Vibration and mechanical stress monitoring data</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ambient conditions and environmental factors</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Monitoring;
