import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Zap, ZoomIn, ZoomOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const SubstationSchematic = () => {
  const [showPowerFlow, setShowPowerFlow] = useState(true);
  const [zoom, setZoom] = useState(100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Substation Schematic
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={showPowerFlow ? "default" : "outline"}
              size="sm"
              onClick={() => setShowPowerFlow(!showPowerFlow)}
            >
              <Zap className="w-4 h-4 mr-2" />
              {showPowerFlow ? "Hide Power Flow" : "Show Power Flow"}
            </Button>
            <div className="flex items-center gap-2 border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-2">{zoom}%</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => setZoom(Math.min(200, zoom + 10))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <Badge variant="default" className="bg-success">
              <div className="w-2 h-2 rounded-full bg-white mr-2" />
              NORMAL OPERATION
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="relative bg-muted/30 rounded-lg p-8 min-h-[500px] overflow-auto"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
        >
          {/* Busbar */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4">
            <div className="relative">
              {showPowerFlow && (
                <div className="absolute inset-0 border-t-4 border-dashed border-primary animate-pulse" />
              )}
              <div className="text-center">
                <Badge variant="outline" className="bg-background border-primary text-primary font-semibold">
                  BUS1
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">busbar</p>
              </div>
            </div>
          </div>

          {/* Circuit Breakers and Equipment */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-full flex justify-around items-start px-12">
            {/* Left Side - CB1, T1 */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-primary mb-1">A</span>
                <div className="w-24 h-32 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                  <span className="text-sm font-semibold text-success">CB1</span>
                  <span className="text-xs text-muted-foreground">breaker</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>
                {showPowerFlow && (
                  <div className="w-1 h-12 bg-primary" />
                )}
              </div>
              
              <div className="flex gap-4">
                <div className="w-24 h-32 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                  <span className="text-sm font-semibold text-success">T1</span>
                  <span className="text-xs text-muted-foreground">transformer</span>
                  <span className="text-xs text-primary font-semibold mt-1">246 MW</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>
                
                <div className="w-20 h-28 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative mt-2">
                  <span className="text-sm font-semibold text-success">CT1</span>
                  <span className="text-xs text-muted-foreground">ct</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>
              </div>

              <div className="w-24 h-28 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                <span className="text-sm font-semibold text-success">CVT1</span>
                <span className="text-xs text-muted-foreground">cvt</span>
                <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
              </div>
            </div>

            {/* Center - CB2 */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-primary mb-1">A</span>
                <div className="w-24 h-32 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                  <span className="text-sm font-semibold text-success">CB2</span>
                  <span className="text-xs text-muted-foreground">breaker</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Side - CB3, T2 */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-primary mb-1">A</span>
                <div className="w-24 h-32 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                  <span className="text-sm font-semibold text-success">CB3</span>
                  <span className="text-xs text-muted-foreground">breaker</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>
                {showPowerFlow && (
                  <div className="w-1 h-12 bg-primary" />
                )}
              </div>

              <div className="flex gap-4">
                <div className="w-20 h-28 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative mt-2">
                  <span className="text-sm font-semibold text-success">CT2</span>
                  <span className="text-xs text-muted-foreground">ct</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>

                <div className="w-24 h-32 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                  <span className="text-sm font-semibold text-success">T2</span>
                  <span className="text-xs text-muted-foreground">transformer</span>
                  <span className="text-xs text-primary font-semibold mt-1">218 MW</span>
                  <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
                </div>
              </div>

              <div className="w-24 h-28 border-4 border-success rounded-lg bg-success/10 flex flex-col items-center justify-center relative">
                <span className="text-sm font-semibold text-success">CVT2</span>
                <span className="text-xs text-muted-foreground">cvt</span>
                <div className="w-3 h-3 rounded-full bg-success absolute bottom-3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
