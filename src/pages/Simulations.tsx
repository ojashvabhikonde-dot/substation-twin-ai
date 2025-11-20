import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Beaker, Zap, TrendingDown, AlertTriangle, Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Simulations = () => {
  const handleRunSimulation = (scenario: string) => {
    toast({
      title: "Simulation Started",
      description: `Running ${scenario} simulation...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Simulation Complete",
        description: `${scenario} simulation has completed successfully.`,
      });
    }, 3000);
  };

  const scenarios = [
    {
      title: "Transformer Overload",
      description: "Simulate T1 overload conditions",
      icon: Zap,
      severity: "warning",
      details: "Test transformer behavior under 120% load conditions",
    },
    {
      title: "Line Fault",
      description: "Test protection relay response",
      icon: AlertTriangle,
      severity: "critical",
      details: "Simulate three-phase fault and analyze protection system response",
    },
    {
      title: "Voltage Drop",
      description: "Analyze system stability",
      icon: TrendingDown,
      severity: "info",
      details: "Test system response to 10% voltage deviation",
    },
    {
      title: "Breaker Failure",
      description: "Test backup protection",
      icon: AlertTriangle,
      severity: "critical",
      details: "Simulate CB1 failure and verify backup protection activation",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Beaker className="w-8 h-8 text-primary" />
          Simulation Scenarios
        </h1>
        <p className="text-muted-foreground">
          Run digital twin simulations to test system responses and protection schemes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon;
          return (
            <Card 
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      scenario.severity === "critical" 
                        ? "bg-destructive/10" 
                        : scenario.severity === "warning"
                        ? "bg-warning/10"
                        : "bg-primary/10"
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        scenario.severity === "critical" 
                          ? "text-destructive" 
                          : scenario.severity === "warning"
                          ? "text-warning"
                          : "text-primary"
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{scenario.title}</CardTitle>
                      <CardDescription className="mt-1">{scenario.description}</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      scenario.severity === "critical" 
                        ? "destructive" 
                        : scenario.severity === "warning"
                        ? "default"
                        : "secondary"
                    }
                    className={scenario.severity === "warning" ? "bg-warning text-warning-foreground" : ""}
                  >
                    {scenario.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {scenario.details}
                </p>
                <Button 
                  className="w-full"
                  onClick={() => handleRunSimulation(scenario.title)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Simulation Results</CardTitle>
          <CardDescription>History of completed simulations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Transformer Overload", date: "2025-10-09 14:30", status: "Passed", duration: "2.3s" },
              { name: "Line Fault", date: "2025-10-08 11:15", status: "Passed", duration: "3.1s" },
              { name: "Voltage Drop", date: "2025-10-07 16:45", status: "Passed", duration: "1.8s" },
            ].map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Play className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{result.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {result.date} • Duration: {result.duration}
                    </p>
                  </div>
                </div>
                <Badge variant="default" className="bg-success">
                  {result.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulations;
