import { Activity, Zap, TrendingUp, Shield } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertPanel } from "@/components/dashboard/AlertPanel";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { EnergyFlowChart } from "@/components/dashboard/EnergyFlowChart";
import { AssetHealthGrid } from "@/components/dashboard/AssetHealthGrid";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Digital Twin Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time monitoring and analytics for EHV 400/220 kV Substation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Power"
          value="342 MW"
          change="+2.5% from avg"
          changeType="positive"
          icon={Zap}
          trend={[60, 70, 65, 80, 75, 85, 90]}
        />
        <KPICard
          title="System Load"
          value="78%"
          change="Within normal range"
          changeType="neutral"
          icon={Activity}
          trend={[70, 72, 75, 78, 76, 78, 78]}
        />
        <KPICard
          title="Efficiency"
          value="94.2%"
          change="+0.8% this week"
          changeType="positive"
          icon={TrendingUp}
          trend={[88, 89, 91, 92, 93, 93, 94]}
        />
        <KPICard
          title="Assets Online"
          value="47/50"
          change="3 under maintenance"
          changeType="neutral"
          icon={Shield}
          trend={[94, 96, 94, 98, 96, 94, 94]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnergyFlowChart />
        </div>
        <div>
          <SystemStatus />
        </div>
      </div>

      <AssetHealthGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AlertPanel />
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors text-sm text-foreground">
                Run System Diagnostics
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors text-sm text-foreground">
                Generate Report
              </button>
              <button className="w-full text-left px-3 py-2 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors text-sm text-foreground">
                Schedule Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
