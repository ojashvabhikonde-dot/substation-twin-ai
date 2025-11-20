import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type EventType = "critical" | "warning" | "info";

interface Event {
  id: string;
  type: EventType;
  equipment: string;
  message: string;
  time: string;
  acknowledged?: boolean;
}

const mockEvents: Event[] = [
  {
    id: "1",
    type: "critical",
    equipment: "CB1",
    message: "Contact resistance trending upward - monitoring required",
    time: "2m ago",
  },
  {
    id: "2",
    type: "info",
    equipment: "T1",
    message: "Oil temperature within normal operating range (75°C)",
    time: "3m ago",
  },
  {
    id: "3",
    type: "info",
    equipment: "System",
    message: "Digital twin monitoring interfaces updated",
    time: "1m ago",
  },
];

export const EventLog = () => {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [events] = useState<Event[]>(mockEvents);

  const filteredEvents = events.filter((event) => {
    const matchesFilter = filter === "all" || event.type === filter;
    const matchesSearch = 
      event.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExport = () => {
    const csv = [
      ["Time", "Equipment", "Type", "Message"],
      ...filteredEvents.map(e => [e.time, e.equipment, e.type, e.message])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-log-${new Date().toISOString()}.csv`;
    a.click();
    
    toast({
      title: "Export successful",
      description: "Event log has been exported to CSV",
    });
  };

  const criticalCount = events.filter(e => e.type === "critical").length;
  const warningCount = events.filter(e => e.type === "warning").length;
  const infoCount = events.filter(e => e.type === "info").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Event Log
            {criticalCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {criticalCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Ack ALL
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            ALL ({events.length})
          </Button>
          <Button
            variant={filter === "critical" ? "destructive" : "outline"}
            size="sm"
            onClick={() => setFilter("critical")}
          >
            Critical ({criticalCount})
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("warning")}
            className={filter === "warning" ? "bg-warning hover:bg-warning/90" : ""}
          >
            Warning ({warningCount})
          </Button>
          <Button
            variant={filter === "info" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("info")}
          >
            Info ({infoCount})
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-9 bg-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border ${
                event.type === "critical"
                  ? "border-destructive/50 bg-destructive/5"
                  : event.type === "warning"
                  ? "border-warning/50 bg-warning/5"
                  : "border-primary/50 bg-primary/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {event.type === "critical" ? (
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  ) : event.type === "warning" ? (
                    <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  ) : (
                    <Info className="w-5 h-5 text-primary mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{event.equipment}</span>
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                      {event.type === "critical" && (
                        <Button variant="destructive" size="sm" className="h-6 text-xs ml-auto">
                          UNACK
                        </Button>
                      )}
                    </div>
                    <p className={`text-sm ${
                      event.type === "critical" 
                        ? "text-destructive font-medium" 
                        : event.type === "warning"
                        ? "text-warning"
                        : "text-primary"
                    }`}>
                      {event.message}
                    </p>
                    {event.acknowledged && (
                      <Button variant="outline" size="sm" className="h-7 text-xs mt-2">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
