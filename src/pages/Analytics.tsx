import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, AlertTriangle, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Prediction {
  asset: string;
  type: string;
  probability: number;
  timeframe: string;
  severity: "low" | "medium" | "high";
}

const predictions: Prediction[] = [
  { asset: "Transformer T1", type: "Insulation degradation", probability: 76, timeframe: "60 days", severity: "medium" },
  { asset: "Reactor R1", type: "Oil contamination", probability: 82, timeframe: "30 days", severity: "high" },
  { asset: "Breaker CB3", type: "Contact wear", probability: 45, timeframe: "90 days", severity: "low" },
  { asset: "CT Unit 2", type: "Calibration drift", probability: 68, timeframe: "45 days", severity: "medium" },
];

const Analytics = () => {
  const [selectedModel, setSelectedModel] = useState("anomaly");

  const getSeverityColor = (severity: Prediction["severity"]) => {
    switch (severity) {
      case "low": return "bg-success text-success-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "high": return "bg-destructive text-destructive-foreground";
    }
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 75) return "bg-destructive";
    if (probability >= 50) return "bg-warning";
    return "bg-success";
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI/ML Analytics</h1>
        <p className="text-muted-foreground">
          Predictive maintenance and intelligent insights powered by machine learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-primary/50 shadow-glow">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Model Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">94.7%</div>
            <p className="text-xs text-muted-foreground">Validated on 10K+ data points</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Predictions Made
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">1,247</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="w-5 h-5 text-warning" />
              Prevented Failures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">23</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedModel} onValueChange={setSelectedModel} className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-muted">
          <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="predictive">Predictive Maintenance</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="anomaly" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Real-time Anomaly Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-warning/50 bg-warning/10">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">Unusual Current Pattern</h4>
                      <p className="text-sm text-muted-foreground">Transformer T1 - Phase B</p>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">Detected</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Current fluctuation pattern deviates from historical norm by 23%
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                      Investigate
                    </button>
                    <button className="px-3 py-1.5 rounded-md bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border bg-card">
                  <h4 className="font-medium text-foreground mb-3">Detection Statistics (Last 24h)</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">12</div>
                      <p className="text-xs text-muted-foreground">Anomalies</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-warning">3</div>
                      <p className="text-xs text-muted-foreground">Warnings</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">9</div>
                      <p className="text-xs text-muted-foreground">Resolved</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Maintenance Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{prediction.asset}</h4>
                        <p className="text-sm text-muted-foreground">{prediction.type}</p>
                      </div>
                      <Badge className={getSeverityColor(prediction.severity)}>
                        {prediction.severity}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Failure Probability</span>
                        <span className="font-medium text-foreground">{prediction.probability}%</span>
                      </div>
                      <Progress
                        value={prediction.probability}
                        className="h-2"
                        indicatorClassName={getProgressColor(prediction.probability)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Estimated timeframe: {prediction.timeframe}</span>
                        <button className="text-primary hover:underline">Schedule maintenance →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Energy Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-success/50 bg-success/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Load Balancing Opportunity</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Redistribute load between T1 and T2 to improve efficiency by 3.2%
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">Est. savings: 2.4 MW/day</Badge>
                        <Badge variant="secondary" className="text-xs">ROI: 94%</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <h4 className="text-sm font-medium text-foreground mb-2">Reactive Power Management</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Adjust reactor settings to optimize power factor
                    </p>
                    <Badge className="bg-primary/20 text-primary">Potential: 1.8%</Badge>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <h4 className="text-sm font-medium text-foreground mb-2">Thermal Optimization</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Reduce cooling load during off-peak hours
                    </p>
                    <Badge className="bg-primary/20 text-primary">Potential: 1.2%</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
