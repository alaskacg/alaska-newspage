import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, ExternalLink, Clock, Users } from "lucide-react";

// Community events data with descriptions and links
const communityEvents: Record<string, {
  title: string;
  date: string;
  location: string;
  description: string;
  fullDescription: string;
  website?: string;
  imageUrl?: string;
  type: string;
  duration?: string;
  expectedAttendance?: string;
}> = {
  "fur-rendezvous": {
    title: "Fur Rendezvous (Rondy)",
    date: "February 26 - March 8, 2026",
    location: "Anchorage, Alaska",
    description: "North America's premier winter festival",
    fullDescription: `Fur Rendezvous, affectionately known as "Rondy," is Alaska's largest winter festival and one of the top winter carnivals in North America. Dating back to 1935, this 10-day celebration brings together Alaskans and visitors from around the world to embrace the winter season.

The festival features over 70 events including the famous Running of the Reindeer down 4th Avenue, the World Championship Sled Dog Race, outhouse races, fur auctions, carnival rides, live music, fireworks, and the legendary Miners and Trappers Ball.

Rondy celebrates Alaska's unique frontier heritage while showcasing the best of Anchorage's vibrant winter culture. The festival transforms downtown Anchorage into a winter wonderland of activities, food vendors, and entertainment for all ages.`,
    website: "https://www.furrondy.net",
    imageUrl: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800",
    type: "festival",
    duration: "10 days",
    expectedAttendance: "250,000+"
  },
  "running-of-the-reindeer": {
    title: "Running of the Reindeer",
    date: "February 27, 2026",
    location: "4th Avenue, Downtown Anchorage",
    description: "Iconic Rondy event featuring reindeer racing down 4th Avenue",
    fullDescription: `The Running of the Reindeer is one of Fur Rendezvous's most beloved and quirky events. Inspired by Spain's Running of the Bulls, this uniquely Alaskan twist features participants running alongside a herd of reindeer down Anchorage's 4th Avenue.

Hundreds of costumed runners attempt to outpace the surprisingly speedy reindeer in a chaotic, hilarious spectacle that draws thousands of spectators. The event has become an iconic symbol of Alaska's fun-loving winter spirit.

Participants often dress in creative costumes, adding to the festive atmosphere. The event is free to watch and has become a must-see tradition for both locals and visitors during the Rondy festival.`,
    website: "https://www.furrondy.net/events/running-of-the-reindeer",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800",
    type: "community",
    duration: "1 hour",
    expectedAttendance: "5,000+"
  },
  "outhouse-races": {
    title: "Rondy Outhouse Races",
    date: "February 28, 2026",
    location: "Downtown Anchorage",
    description: "Teams race decorated outhouses through downtown streets",
    fullDescription: `The Outhouse Races are a hilarious Fur Rendezvous tradition that showcases Alaska's unique sense of humor and community spirit. Teams of five push decorated outhouses on skis through the snowy streets of downtown Anchorage.

Each outhouse is creatively themed and decorated, with teams competing not only for speed but also for the most creative design. Categories include fastest time, best theme, and crowd favorite.

This quirky event perfectly captures the spirit of Rondy - celebrating Alaska's frontier heritage with humor and community participation. The races draw large crowds who cheer on their favorite teams and enjoy the creative outhouse designs.`,
    website: "https://www.furrondy.net/events/outhouse-races",
    imageUrl: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800",
    type: "community",
    duration: "3 hours",
    expectedAttendance: "3,000+"
  },
  "miners-trappers-ball": {
    title: "Miners & Trappers Ball",
    date: "March 1, 2026",
    location: "Anchorage",
    description: "Annual costume ball celebrating Alaska's frontier heritage",
    fullDescription: `The Miners and Trappers Ball is the crown jewel of Fur Rendezvous social events. This legendary costume ball has been a Rondy tradition since 1936, making it one of the oldest continuously running events of the festival.

Attendees dress in elaborate costumes ranging from historical frontier attire to creative interpretations of Alaskan themes. The event features live music, dancing, and competitions for best costumes in various categories.

The ball brings together Alaskans from all walks of life to celebrate their shared heritage and love of winter. It's a night of revelry, community bonding, and unforgettable memories that captures the true spirit of Alaska's frontier tradition.`,
    website: "https://www.furrondy.net/events/miners-trappers-ball",
    imageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800",
    type: "social",
    duration: "6 hours",
    expectedAttendance: "2,000+"
  },
  "iditarod-ceremonial-start": {
    title: "Iditarod Ceremonial Start",
    date: "March 7, 2026",
    location: "4th Avenue, Downtown Anchorage",
    description: "Ceremonial beginning of the Last Great Race",
    fullDescription: `The Iditarod Ceremonial Start is the spectacular kickoff to "The Last Great Race on Earth" - the Iditarod Trail Sled Dog Race. Mushers and their dog teams parade through downtown Anchorage, giving spectators an up-close look at the athletes who will tackle 1,000 miles of Alaska wilderness.

The ceremonial start allows fans to meet the mushers, pet the dogs, and experience the excitement of this legendary race. Each musher runs a short 11-mile course through Anchorage before the race officially restarts in Willow the following day.

The event draws thousands of spectators who line the streets to cheer on their favorite teams. It's a family-friendly celebration of Alaska's sled dog heritage and the incredible human-canine partnerships that make the Iditarod possible.`,
    website: "https://iditarod.com",
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800",
    type: "sporting",
    duration: "5 hours",
    expectedAttendance: "50,000+"
  },
  "iditarod-restart": {
    title: "Iditarod Official Restart",
    date: "March 8, 2026",
    location: "Willow, Alaska",
    description: "The official start of the 1,000-mile race to Nome",
    fullDescription: `The Iditarod Official Restart in Willow marks the true beginning of the 1,000-mile journey to Nome. After the ceremonial start in Anchorage, mushers and their teams are transported to Willow where they begin the actual race.

Teams depart at two-minute intervals, heading into the Alaska wilderness on a route that follows historic trails used during the 1925 serum run to Nome. The race typically takes 8-15 days to complete, with mushers facing extreme weather, challenging terrain, and the test of endurance.

The restart is a festive community event with food vendors, merchandise, and the opportunity to see all the teams before they disappear into the wilderness. It's a must-see for anyone interested in Alaska's sled dog racing heritage.`,
    website: "https://iditarod.com",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=800",
    type: "sporting",
    duration: "4 hours",
    expectedAttendance: "10,000+"
  },
  "world-ice-art-championships": {
    title: "World Ice Art Championships",
    date: "February 16 - March 31, 2026",
    location: "Fairbanks, Alaska",
    description: "World's largest ice sculpting competition",
    fullDescription: `The World Ice Art Championships in Fairbanks is the premier ice sculpting competition on the planet. Artists from around the world gather in Interior Alaska to transform massive blocks of crystal-clear ice into breathtaking works of art.

The competition features two categories: Single Block (using one 7,500-pound block of ice) and Multi-Block (using up to 20 blocks weighing over 75 tons combined). Sculptors work around the clock in frigid temperatures to create intricate masterpieces.

The resulting ice park, known as Ice Alaska, features dozens of illuminated sculptures that visitors can explore day and night. The event also includes ice slides, an ice playground for children, and the opportunity to watch artists at work. It's a truly magical winter experience unique to Fairbanks.`,
    website: "https://www.icealaska.com",
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=800",
    type: "festival",
    duration: "6 weeks",
    expectedAttendance: "50,000+"
  },
  "polar-bear-jump": {
    title: "Polar Bear Jump",
    date: "January 15, 2026",
    location: "Seward, Alaska",
    description: "New Year tradition of jumping into frigid Resurrection Bay",
    fullDescription: `The Polar Bear Jump in Seward is a beloved Alaska tradition where brave participants plunge into the frigid waters of Resurrection Bay. Held in mid-January, the event draws hundreds of jumpers and thousands of spectators to celebrate the new year.

Participants often wear creative costumes as they dash into the icy water, typically around 40°F (4°C). The event raises money for local charities and has become a symbol of Alaska's adventurous spirit.

Hot drinks and warm gathering spots are available for participants after their plunge. The event captures the Alaskan attitude of embracing winter rather than hiding from it, and has inspired similar events throughout the state.`,
    website: "https://www.seward.com",
    imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800",
    type: "community",
    duration: "2 hours",
    expectedAttendance: "1,500+"
  },
  "summer-solstice-celebration": {
    title: "Summer Solstice Celebration",
    date: "June 21, 2026",
    location: "Statewide",
    description: "Celebrating the longest day with midnight sun festivities",
    fullDescription: `The Summer Solstice in Alaska is a magical time when the sun barely sets - or doesn't set at all in northern regions. Communities across Alaska celebrate the longest day of the year with a variety of festivals and events.

Fairbanks hosts the famous Midnight Sun Baseball Game, a tradition since 1906 where a baseball game is played at midnight without artificial lights. Anchorage celebrates with concerts, markets, and outdoor activities that take advantage of the extended daylight.

The solstice represents the peak of Alaska's brief but intense summer season. It's a time of celebration, outdoor adventures, and community gatherings that embrace the unique Alaskan experience of 24-hour daylight.`,
    website: "https://www.travelalaska.com",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    type: "festival",
    duration: "1 day",
    expectedAttendance: "Statewide"
  },
  "alaska-day": {
    title: "Alaska Day Celebration",
    date: "October 18, 2026",
    location: "Sitka & Statewide",
    description: "Commemorating the transfer of Alaska to the United States",
    fullDescription: `Alaska Day commemorates the formal transfer of Alaska from Russia to the United States on October 18, 1867. The main celebration takes place in Sitka, where the transfer ceremony originally occurred.

Sitka hosts a week-long festival featuring historical reenactments, parades, traditional Russian and Tlingit cultural performances, and a formal ceremony at Castle Hill where the original transfer took place.

The celebration honors Alaska's diverse heritage, including its Russian colonial period and the indigenous cultures that have called Alaska home for thousands of years. It's a time for Alaskans to reflect on their unique history and celebrate their state's journey to becoming the 49th state in 1959.`,
    website: "https://www.sitka.org",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    type: "historical",
    duration: "1 week",
    expectedAttendance: "5,000+"
  },
  "sewards-day": {
    title: "Seward's Day",
    date: "March 27, 2026",
    location: "Statewide",
    description: "Celebrating the Alaska Purchase anniversary",
    fullDescription: `Seward's Day is an Alaska state holiday commemorating the signing of the Alaska Purchase treaty on March 30, 1867. Named after Secretary of State William H. Seward, who negotiated the purchase of Alaska from Russia for $7.2 million.

The holiday recognizes the vision of Seward, who was ridiculed at the time for purchasing what critics called "Seward's Folly" or "Seward's Icebox." The discovery of gold and later oil vindicated his decision, making the purchase one of the greatest real estate deals in history.

Various communities hold educational events and celebrations honoring Alaska's unique path to statehood. It's a day for Alaskans to appreciate the foresight that brought Alaska into the United States.`,
    website: "https://alaska.gov",
    imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
    type: "historical",
    duration: "1 day",
    expectedAttendance: "Statewide"
  },
  "anchorage-holiday-market": {
    title: "Anchorage Holiday Market",
    date: "December 13, 2025",
    location: "Downtown Anchorage",
    description: "Annual holiday market featuring local artisans and vendors",
    fullDescription: `The Anchorage Holiday Market brings together local artisans, craftspeople, and vendors for a festive shopping experience. Held in downtown Anchorage, the market features unique Alaska-made gifts, holiday decorations, and seasonal treats.

Visitors can find everything from handcrafted jewelry and artwork to locally produced foods and beverages. Live music, holiday performances, and visits with Santa create a festive atmosphere for the whole family.

The market supports local businesses and artists while providing a wonderful opportunity for holiday shopping. It's a beloved Anchorage tradition that captures the community spirit of the holiday season.`,
    website: "https://www.anchorage.net",
    imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800",
    type: "market",
    duration: "1 day",
    expectedAttendance: "10,000+"
  },
  "winter-solstice-celebration": {
    title: "Winter Solstice Celebration",
    date: "December 21, 2025",
    location: "Statewide",
    description: "Embracing the shortest day with community gatherings",
    fullDescription: `The Winter Solstice marks the shortest day of the year in Alaska, with some northern communities experiencing only a few hours of twilight. Rather than lamenting the darkness, Alaskans embrace the solstice with celebrations of light and community.

Communities hold lantern walks, bonfires, and festivals to mark the return of the sun. Many events incorporate traditional Alaska Native celebrations of the winter season. Aurora viewing events are popular, as the long nights provide excellent opportunities to see the northern lights.

The solstice represents a turning point - from this day forward, daylight increases. It's a time of hope and celebration, reminding Alaskans that the long summer days will eventually return.`,
    website: "https://www.travelalaska.com",
    imageUrl: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800",
    type: "festival",
    duration: "1 day",
    expectedAttendance: "Statewide"
  }
};

const EventPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? communityEvents[slug] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Image */}
        {event.imageUrl && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className="container py-8 -mt-20 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            {/* Event Header */}
            <div className="mb-8">
              <Badge variant="outline" className="mb-4 capitalize">{event.type}</Badge>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-muted-foreground">{event.description}</p>
            </div>

            {/* Event Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium text-sm">{event.date}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-sm">{event.location}</p>
                  </div>
                </CardContent>
              </Card>

              {event.duration && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium text-sm">{event.duration}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {event.expectedAttendance && (
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                      <p className="font-medium text-sm">{event.expectedAttendance}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Full Description */}
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {event.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-muted-foreground mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Website Link */}
            {event.website && (
              <div className="flex justify-center">
                <a href={event.website} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Official Website
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventPage;
