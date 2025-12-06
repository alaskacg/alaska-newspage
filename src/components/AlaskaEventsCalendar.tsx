import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Moon, Fish, Target, Snowflake, Sun, Leaf, TreeDeciduous, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  date: number;
  month: number;
  title: string;
  type: "hunting" | "fishing" | "salmon" | "moon" | "season" | "holiday";
  description?: string;
  slug?: string; // Link slug for community events
}

// Alaska-specific events for 2025-2026
const alaskaEvents: CalendarEvent[] = [
  // === MAJOR ALASKA FESTIVALS & EVENTS ===
  // Fur Rendezvous 2026 - Feb 26 - Mar 8
  { date: 26, month: 1, title: "Fur Rendezvous Opens", type: "holiday", description: "North America's premier winter festival - Anchorage", slug: "fur-rendezvous" },
  { date: 27, month: 1, title: "Rondy Running of the Reindeer", type: "holiday", description: "Downtown Anchorage 4th Avenue", slug: "running-of-the-reindeer" },
  { date: 28, month: 1, title: "Rondy Outhouse Races", type: "holiday", description: "Anchorage - Fur Rondy tradition", slug: "outhouse-races" },
  { date: 1, month: 2, title: "Rondy Miners & Trappers Ball", type: "holiday", description: "Annual costume ball - Anchorage", slug: "miners-trappers-ball" },
  { date: 7, month: 2, title: "Iditarod Ceremonial Start", type: "holiday", description: "Downtown Anchorage - 4th Avenue", slug: "iditarod-ceremonial-start" },
  { date: 8, month: 2, title: "Iditarod Official Restart", type: "holiday", description: "Willow, Alaska - Race begins", slug: "iditarod-restart" },
  { date: 8, month: 2, title: "Fur Rendezvous Closes", type: "holiday", description: "Final day of Rondy festivities", slug: "fur-rendezvous" },
  
  // World Ice Art Championships - Feb 16 - Mar 31, 2026
  { date: 16, month: 1, title: "World Ice Art Championships Opens", type: "holiday", description: "Fairbanks - Ice Alaska competition begins", slug: "world-ice-art-championships" },
  { date: 17, month: 1, title: "WIAC Single Block Competition", type: "holiday", description: "Fairbanks - Artists begin carving", slug: "world-ice-art-championships" },
  { date: 22, month: 1, title: "WIAC Multi-Block Sculpting", type: "holiday", description: "Massive ice sculptures - Fairbanks", slug: "world-ice-art-championships" },
  { date: 4, month: 2, title: "WIAC Competition Ends", type: "holiday", description: "Judging complete - Fairbanks", slug: "world-ice-art-championships" },
  
  // Other Major Events
  { date: 15, month: 0, title: "Polar Bear Jump", type: "holiday", description: "Seward - New Year plunge tradition", slug: "polar-bear-jump" },
  { date: 18, month: 0, title: "MLK Jr. Day Events", type: "holiday", description: "Statewide celebrations" },
  { date: 14, month: 1, title: "Valentines in the Arctic", type: "holiday", description: "Northern lights viewing events" },
  { date: 17, month: 2, title: "St. Patrick's Day Celebrations", type: "holiday", description: "Anchorage & Fairbanks" },
  
  // Seasons
  { date: 20, month: 2, title: "Spring Equinox", type: "season", description: "First day of spring" },
  { date: 21, month: 5, title: "Summer Solstice", type: "season", description: "Longest day - Midnight Sun celebration", slug: "summer-solstice-celebration" },
  { date: 22, month: 8, title: "Fall Equinox", type: "season", description: "First day of fall" },
  { date: 21, month: 11, title: "Winter Solstice", type: "season", description: "Shortest day - Northern darkness", slug: "winter-solstice-celebration" },
  
  // Salmon Runs (approximate peak times)
  { date: 15, month: 4, title: "King Salmon Run Begins", type: "salmon", description: "Kenai Peninsula - World famous fishery" },
  { date: 1, month: 5, title: "Sockeye Salmon Run", type: "salmon", description: "Bristol Bay region - Worlds largest" },
  { date: 15, month: 5, title: "Combat Fishing Opens", type: "salmon", description: "Kenai & Russian Rivers" },
  { date: 15, month: 6, title: "Pink Salmon Run Peak", type: "salmon", description: "Statewide - Humpy season" },
  { date: 1, month: 7, title: "Silver Salmon Season", type: "salmon", description: "Southeast Alaska - Coho run" },
  { date: 15, month: 7, title: "Chum Salmon Run", type: "salmon", description: "Interior rivers - Dog salmon" },
  
  // Hunting Seasons (2026 dates)
  { date: 1, month: 7, title: "Moose Season Opens", type: "hunting", description: "General season - varies by unit" },
  { date: 10, month: 7, title: "Caribou Season Opens", type: "hunting", description: "Northern regions - Porcupine herd" },
  { date: 1, month: 8, title: "Deer Season Opens", type: "hunting", description: "Southeast Alaska - Sitka blacktail" },
  { date: 15, month: 8, title: "Dall Sheep Season", type: "hunting", description: "Alpine regions - Trophy hunts" },
  { date: 1, month: 9, title: "Brown Bear Fall Season", type: "hunting", description: "Select units - Kodiak & Peninsula" },
  { date: 15, month: 3, title: "Ptarmigan Season Ends", type: "hunting", description: "Statewide - Final day" },
  
  // Fishing Seasons
  { date: 1, month: 0, title: "Ice Fishing Season", type: "fishing", description: "Interior lakes - Burbot & pike" },
  { date: 1, month: 3, title: "Ice Fishing Peak", type: "fishing", description: "Interior lakes - Best conditions" },
  { date: 15, month: 4, title: "Halibut Season Opens", type: "fishing", description: "Coastal waters - Charter season" },
  { date: 1, month: 5, title: "Trout Season Opens", type: "fishing", description: "Southcentral streams" },
  { date: 15, month: 5, title: "Lingcod Season Opens", type: "fishing", description: "Southeast waters" },
  
  // Moon Phases 2026
  { date: 29, month: 0, title: "New Moon", type: "moon" },
  { date: 13, month: 0, title: "Full Moon", type: "moon", description: "Wolf Moon" },
  { date: 27, month: 1, title: "New Moon", type: "moon" },
  { date: 12, month: 1, title: "Full Moon", type: "moon", description: "Snow Moon" },
  { date: 29, month: 2, title: "New Moon", type: "moon" },
  { date: 14, month: 2, title: "Full Moon", type: "moon", description: "Worm Moon" },
  { date: 27, month: 3, title: "New Moon", type: "moon" },
  { date: 13, month: 3, title: "Full Moon", type: "moon", description: "Pink Moon" },
  { date: 26, month: 4, title: "New Moon", type: "moon" },
  { date: 12, month: 4, title: "Full Moon", type: "moon", description: "Flower Moon" },
  { date: 25, month: 5, title: "New Moon", type: "moon" },
  { date: 11, month: 5, title: "Full Moon", type: "moon", description: "Strawberry Moon" },
  { date: 24, month: 6, title: "New Moon", type: "moon" },
  { date: 10, month: 6, title: "Full Moon", type: "moon", description: "Buck Moon" },
  { date: 23, month: 7, title: "New Moon", type: "moon" },
  { date: 9, month: 7, title: "Full Moon", type: "moon", description: "Sturgeon Moon" },
  { date: 21, month: 8, title: "New Moon", type: "moon" },
  { date: 7, month: 8, title: "Full Moon", type: "moon", description: "Harvest Moon" },
  { date: 21, month: 9, title: "New Moon", type: "moon" },
  { date: 7, month: 9, title: "Full Moon", type: "moon", description: "Hunters Moon" },
  { date: 20, month: 10, title: "New Moon", type: "moon" },
  { date: 5, month: 10, title: "Full Moon", type: "moon", description: "Beaver Moon" },
  { date: 19, month: 11, title: "New Moon", type: "moon" },
  { date: 4, month: 11, title: "Full Moon", type: "moon", description: "Cold Moon" },
  
  // Alaska Holidays & Events
  { date: 1, month: 0, title: "New Years Day", type: "holiday" },
  { date: 27, month: 2, title: "Sewards Day", type: "holiday", description: "Alaska purchase anniversary 1867", slug: "sewards-day" },
  { date: 18, month: 9, title: "Alaska Day", type: "holiday", description: "Transfer of Alaska to US 1867", slug: "alaska-day" },
  { date: 4, month: 6, title: "Independence Day", type: "holiday", description: "Fireworks at midnight sun" },
  { date: 26, month: 10, title: "Thanksgiving", type: "holiday" },
  { date: 25, month: 11, title: "Christmas Day", type: "holiday" },
  
  // December 2025 Events
  { date: 6, month: 11, title: "Design Alaska Holiday Concert", type: "holiday", description: "Fairbanks - Holiday music" },
  { date: 13, month: 11, title: "Anchorage Holiday Market", type: "holiday", description: "Downtown Anchorage", slug: "anchorage-holiday-market" },
  { date: 21, month: 11, title: "Winter Solstice Celebration", type: "season", description: "Shortest day festivities", slug: "winter-solstice-celebration" },
  { date: 31, month: 11, title: "New Years Eve Celebrations", type: "holiday", description: "Statewide fireworks & events" },
];

const eventTypeConfig = {
  hunting: { icon: Target, color: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "Hunting" },
  fishing: { icon: Fish, color: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Fishing" },
  salmon: { icon: Fish, color: "bg-pink-500/20 text-pink-400 border-pink-500/30", label: "Salmon Run" },
  moon: { icon: Moon, color: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Moon Phase" },
  season: { icon: Sun, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", label: "Season" },
  holiday: { icon: Snowflake, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Holiday" },
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface AlaskaEventsCalendarProps {
  compact?: boolean;
  region?: string;
}

const AlaskaEventsCalendar = ({ compact = false, region }: AlaskaEventsCalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const getEventsForDate = (date: number) => {
    return alaskaEvents.filter(event => event.date === date && event.month === currentMonth);
  };

  const getEventsForMonth = () => {
    return alaskaEvents.filter(event => event.month === currentMonth).sort((a, b) => a.date - b.date);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
  };

  const isToday = (date: number) => {
    return date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  const monthEvents = getEventsForMonth();

  if (compact) {
    return (
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display">Alaska Events</CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[100px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {monthEvents.length > 0 ? (
              monthEvents.slice(0, 5).map((event, idx) => {
                const config = eventTypeConfig[event.type];
                const Icon = config.icon;
                return (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground w-8">{event.date}</span>
                    <Icon className="h-3 w-3 text-muted-foreground" />
                    <span className="truncate">{event.title}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">No events this month</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-display flex items-center gap-2">
            <TreeDeciduous className="h-5 w-5 text-primary" />
            Alaska Events Calendar {currentYear}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-base font-medium min-w-[140px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Object.entries(eventTypeConfig).map(([key, config]) => (
            <Badge key={key} variant="outline" className={cn("text-xs", config.color)}>
              <config.icon className="h-3 w-3 mr-1" />
              {config.label}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDay }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square" />
              ))}
              
              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const date = idx + 1;
                const events = getEventsForDate(date);
                const hasEvents = events.length > 0;
                
                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                    className={cn(
                      "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all duration-200 border",
                      isToday(date) && "bg-primary text-primary-foreground border-primary",
                      !isToday(date) && selectedDate === date && "bg-accent/20 border-accent",
                      !isToday(date) && selectedDate !== date && "hover:bg-muted/50 border-transparent",
                      hasEvents && !isToday(date) && "border-primary/30"
                    )}
                  >
                    <span className={cn("text-sm font-medium", hasEvents && !isToday(date) && "text-primary")}>
                      {date}
                    </span>
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {events.slice(0, 3).map((event, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              event.type === "hunting" && "bg-orange-500",
                              event.type === "fishing" && "bg-blue-500",
                              event.type === "salmon" && "bg-pink-500",
                              event.type === "moon" && "bg-purple-500",
                              event.type === "season" && "bg-yellow-500",
                              event.type === "holiday" && "bg-emerald-500"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Events List */}
          <div className="border-l border-border/50 pl-6">
            <h3 className="font-display font-semibold mb-4">
              {selectedDate 
                ? `Events on ${monthNames[currentMonth]} ${selectedDate}`
                : `${monthNames[currentMonth]} Events`
              }
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {(selectedDate ? selectedEvents : monthEvents).length > 0 ? (
                (selectedDate ? selectedEvents : monthEvents).map((event, idx) => {
                  const config = eventTypeConfig[event.type];
                  const Icon = config.icon;
                  const EventWrapper = event.slug ? Link : 'div';
                  const wrapperProps = event.slug ? { to: `/event/${event.slug}` } : {};
                  
                  return (
                    <EventWrapper
                      key={idx}
                      {...wrapperProps}
                      className={cn(
                        "p-3 rounded-lg border transition-all hover:scale-[1.02] block",
                        config.color,
                        event.slug && "cursor-pointer"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {monthNames[currentMonth].slice(0, 3)} {event.date}
                            </span>
                            {event.slug && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                          </div>
                          <p className="font-medium text-sm">{event.title}</p>
                          {event.description && (
                            <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                          )}
                        </div>
                      </div>
                    </EventWrapper>
                  );
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  {selectedDate ? "No events on this date" : "No events this month"}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlaskaEventsCalendar;
