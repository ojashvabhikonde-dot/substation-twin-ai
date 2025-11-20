import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
}

export const GlobalSearch = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const searchResults: SearchResult[] = [
    // Dashboard
    { title: "Dashboard", description: "Main overview and KPIs", path: "/", category: "Pages" },
    
    // Assets
    { title: "Assets", description: "Asset management and health monitoring", path: "/assets", category: "Pages" },
    { title: "Transformer T1", description: "245 MW - Health: 85%", path: "/assets", category: "Assets" },
    { title: "Transformer T2", description: "221 MW - Health: 92%", path: "/assets", category: "Assets" },
    { title: "Circuit Breaker CB1", description: "Health: 88%", path: "/assets", category: "Assets" },
    
    // Monitoring
    { title: "Monitoring", description: "Real-time SCADA data", path: "/monitoring", category: "Pages" },
    { title: "Voltage Bus 1", description: "Current: 398.2 kV", path: "/monitoring", category: "Monitoring" },
    { title: "Temperature Sensors", description: "Thermal monitoring", path: "/monitoring", category: "Monitoring" },
    
    // Analytics
    { title: "Analytics", description: "Performance analytics and insights", path: "/analytics", category: "Pages" },
    
    // Simulations
    { title: "Simulations", description: "Digital twin scenarios", path: "/simulations", category: "Pages" },
    { title: "Transformer Overload", description: "Simulation scenario", path: "/simulations", category: "Simulations" },
    { title: "Line Fault", description: "Simulation scenario", path: "/simulations", category: "Simulations" },
    
    // Reports
    { title: "Reports", description: "Generate system reports", path: "/reports", category: "Pages" },
    { title: "Performance Report", description: "Generate performance analysis", path: "/reports", category: "Reports" },
    { title: "Asset Health Report", description: "Comprehensive asset analysis", path: "/reports", category: "Reports" },
    
    // Settings
    { title: "Settings", description: "System configuration", path: "/settings", category: "Pages" },
    { title: "Notifications", description: "Alert settings", path: "/settings", category: "Settings" },
    { title: "Security", description: "Security settings", path: "/settings", category: "Settings" },
    
    // Alerts
    { title: "Critical Alerts", description: "View critical system alerts", path: "/", category: "Alerts" },
    { title: "Temperature Warning", description: "T1 temperature alert", path: "/monitoring", category: "Alerts" },
  ];

  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(searchResults);

  const handleSearch = (value: string) => {
    const filtered = searchResults.filter(
      (result) =>
        result.title.toLowerCase().includes(value.toLowerCase()) ||
        result.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search assets, alerts, reports..."
          className="pl-9 bg-background cursor-pointer"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search everything..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {["Pages", "Assets", "Monitoring", "Simulations", "Reports", "Settings", "Alerts"].map((category) => {
            const categoryResults = filteredResults.filter((r) => r.category === category);
            if (categoryResults.length === 0) return null;
            
            return (
              <CommandGroup key={category} heading={category}>
                {categoryResults.map((result, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleSelect(result.path)}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{result.title}</span>
                      <span className="text-xs text-muted-foreground">{result.description}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
