import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Plane, Phone, Mail, Globe, Building, History, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Community data with history, contact info, and details
const communityData: Record<string, {
  name: string;
  type: 'city' | 'community';
  population: number;
  region: string;
  coordinates: { lat: number; lng: number };
  airport?: { code: string; name: string; type: string; runways?: string };
  history: string;
  description: string;
  established?: string;
  elevation?: string;
  timezone: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
  industries?: string[];
  attractions?: string[];
  imageUrl?: string;
}> = {
  boundary: {
    name: "Boundary",
    type: 'community',
    population: 15,
    region: "Interior",
    coordinates: { lat: 64.0783, lng: -141.0028 },
    airport: {
      code: "BYA",
      name: "Boundary Airport",
      type: "Public Use",
      runways: "2,500 ft gravel"
    },
    history: `Boundary, Alaska is a small unincorporated community located at mile 1221.8 of the Alaska Highway, directly on the Alaska-Yukon border. The community gets its name from its location at the international boundary between the United States and Canada.

The area was first developed during the Klondike Gold Rush of 1898 when prospectors traveled through on their way to the Yukon gold fields. The community served as a customs station and rest stop for travelers crossing the international border.

During World War II, Boundary gained strategic importance as the Alaska Highway was constructed through the area in 1942. The highway connected Alaska to the contiguous United States via Canada, and Boundary became a key checkpoint along this vital military route.

Today, Boundary remains a small but resilient community that serves travelers along the Alaska Highway. The Boundary Airport (BYA) provides essential air access to this remote location, particularly important during the harsh winter months when road conditions can be challenging.`,
    description: "Remote border community on the Alaska-Yukon boundary along the historic Alaska Highway.",
    established: "1898",
    elevation: "3,800 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 774-2205",
      website: "https://dot.alaska.gov"
    },
    industries: ["Tourism", "Transportation", "Government Services"],
    attractions: ["International Border Crossing", "Alaska Highway Mile Post", "Boundary Airport", "Historic Gold Rush Trail"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  anchorage: {
    name: "Anchorage",
    type: 'city',
    population: 291247,
    region: "Southcentral",
    coordinates: { lat: 61.2181, lng: -149.9003 },
    airport: {
      code: "ANC",
      name: "Ted Stevens Anchorage International Airport",
      type: "International Hub",
      runways: "3 runways, largest 12,400 ft"
    },
    history: `Anchorage was founded in 1914 as a construction port for the Alaska Railroad. Originally a tent city, it quickly grew as the railroad headquarters was established here.

The city survived the devastating 1964 Good Friday Earthquake, the most powerful earthquake in North American history at magnitude 9.2. Much of downtown was rebuilt, and the city emerged stronger.

Today, Anchorage is Alaska's largest city and serves as the state's economic and transportation hub. Nearly half of Alaska's population lives in the Anchorage metropolitan area.`,
    description: "Alaska's largest city and economic center, nestled between the Chugach Mountains and Cook Inlet.",
    established: "1914",
    elevation: "102 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 343-7100",
      email: "info@muni.org",
      website: "https://www.muni.org",
      address: "632 W 6th Avenue, Anchorage, AK 99501"
    },
    industries: ["Oil & Gas", "Fishing", "Tourism", "Military", "Healthcare", "Transportation"],
    attractions: ["Tony Knowles Coastal Trail", "Anchorage Museum", "Alaska Wildlife Conservation Center", "Flattop Mountain"],
    imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200"
  },
  fairbanks: {
    name: "Fairbanks",
    type: 'city',
    population: 32515,
    region: "Interior",
    coordinates: { lat: 64.8378, lng: -147.7164 },
    airport: {
      code: "FAI",
      name: "Fairbanks International Airport",
      type: "International",
      runways: "2 runways, largest 10,300 ft"
    },
    history: `Fairbanks was founded in 1901 by E.T. Barnette, a trader who was stranded on the Chena River when his steamboat couldn't navigate the shallow waters. Gold was discovered nearby in 1902, triggering a gold rush that transformed the settlement into a boomtown.

The city became a strategic military center during World War II and the Cold War. The University of Alaska Fairbanks, established in 1917, is a major research institution specializing in Arctic studies.

Fairbanks is known as the "Golden Heart City" and offers some of the best Northern Lights viewing in North America due to its location under the Auroral Oval.`,
    description: "Alaska's second-largest city and the Interior's commercial hub, famous for Northern Lights viewing.",
    established: "1901",
    elevation: "436 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 459-6715",
      email: "info@fairbanks.us",
      website: "https://www.fairbanks.us",
      address: "800 Cushman Street, Fairbanks, AK 99701"
    },
    industries: ["Mining", "Oil & Gas", "Military", "Education", "Tourism"],
    attractions: ["Chena Hot Springs", "University of Alaska Museum", "Pioneer Park", "Morris Thompson Cultural Center"],
    imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=1200"
  },
  juneau: {
    name: "Juneau",
    type: 'city',
    population: 32255,
    region: "Southeast",
    coordinates: { lat: 58.3019, lng: -134.4197 },
    airport: {
      code: "JNU",
      name: "Juneau International Airport",
      type: "Commercial",
      runways: "1 runway, 8,857 ft"
    },
    history: `Juneau was founded in 1880 by gold prospectors Joe Juneau and Richard Harris, who discovered gold in what is now Gold Creek. It was the first major discovery of gold in Alaska and led to a mining boom.

The city became Alaska's capital in 1906, replacing Sitka. Juneau is unique among U.S. state capitals as it is only accessible by air or sea—no roads connect it to the rest of Alaska or North America.

The Mendenhall Glacier, one of the most accessible glaciers in Alaska, is located just 12 miles from downtown Juneau.`,
    description: "Alaska's capital city, accessible only by air or sea, surrounded by mountains, glaciers, and rainforest.",
    established: "1880",
    elevation: "56 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 586-5240",
      email: "info@juneau.org",
      website: "https://juneau.org",
      address: "155 S Seward Street, Juneau, AK 99801"
    },
    industries: ["Government", "Tourism", "Fishing", "Mining"],
    attractions: ["Mendenhall Glacier", "Mount Roberts Tramway", "Alaska State Capitol", "Glacier Bay Day Trips"],
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200"
  },
  chicken: {
    name: "Chicken",
    type: 'community',
    population: 17,
    region: "Interior",
    coordinates: { lat: 64.0733, lng: -141.9364 },
    history: `Chicken, Alaska was established during the Fortymile Gold Rush of the 1890s. The town was originally going to be named "Ptarmigan" after the state bird, but because the miners couldn't agree on the spelling, they chose "Chicken" instead—a name everyone could spell!

The community has experienced several gold rush booms and maintains its mining heritage to this day. Historic buildings from the early 1900s still stand, including the original schoolhouse and the famous Chicken Creek Saloon.

Despite its tiny population, Chicken attracts thousands of visitors each summer who come to experience authentic gold rush history and try their hand at gold panning.`,
    description: "Historic gold rush town named because miners couldn't spell 'ptarmigan'.",
    established: "1896",
    elevation: "1,640 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      website: "https://chickenalaska.com"
    },
    industries: ["Mining", "Tourism"],
    attractions: ["Gold Panning", "Pedro Dredge", "Historic Downtown", "Chicken Creek Cafe"],
    imageUrl: "https://images.unsplash.com/photo-1508193638397-1c4234db14d9?w=1200"
  },
  nome: {
    name: "Nome",
    type: 'city',
    population: 3699,
    region: "Western",
    coordinates: { lat: 64.5011, lng: -165.4064 },
    airport: {
      code: "OME",
      name: "Nome Airport",
      type: "Commercial",
      runways: "2 runways, largest 6,001 ft"
    },
    history: `Nome was founded in 1898 when gold was discovered on the beaches of the Bering Sea. The "Three Lucky Swedes" struck gold, triggering one of Alaska's most famous gold rushes that brought over 20,000 prospectors to the area.

The city is famous for being the finish line of the Iditarod Trail Sled Dog Race, which commemorates the 1925 Serum Run when sled dog teams relayed diphtheria antitoxin to Nome during an epidemic.

Nome remains a hub for gold mining activities, with recreational gold dredging still permitted on the beaches during summer months.`,
    description: "Historic gold rush city on the Bering Sea, finish line of the famous Iditarod sled dog race.",
    established: "1898",
    elevation: "36 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 443-6663",
      website: "https://www.nomealaska.org",
      address: "102 Division Street, Nome, AK 99762"
    },
    industries: ["Mining", "Tourism", "Fishing", "Government Services"],
    attractions: ["Iditarod Finish Line", "Beach Gold Panning", "Bering Land Bridge", "Carrie M. McLain Museum"],
    imageUrl: "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1200"
  },
  barrow: {
    name: "Utqiaġvik (Barrow)",
    type: 'city',
    population: 4927,
    region: "Northern",
    coordinates: { lat: 71.2906, lng: -156.7886 },
    airport: {
      code: "BRW",
      name: "Wiley Post-Will Rogers Memorial Airport",
      type: "Commercial",
      runways: "2 runways, largest 6,500 ft"
    },
    history: `Utqiaġvik (formerly known as Barrow) is the northernmost city in the United States and has been continuously inhabited by Iñupiat people for over 1,500 years. The area was a traditional whaling center, and subsistence whaling continues to be central to the community's culture.

The city was named Barrow in 1901 after Point Barrow, which was named for Sir John Barrow of the British Admiralty. In 2016, voters chose to restore the traditional Iñupiat name "Utqiaġvik," meaning "a place for gathering wild roots."

The city experiences 65 days of continuous daylight in summer and 65 days of polar night in winter.`,
    description: "The northernmost city in the United States, home to the Iñupiat people and their whaling traditions.",
    established: "Inhabited for 1,500+ years",
    elevation: "44 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 852-5211",
      website: "https://www.utqiagvik.us",
      address: "PO Box 629, Utqiaġvik, AK 99723"
    },
    industries: ["Oil & Gas", "Subsistence Hunting", "Government", "Tourism"],
    attractions: ["Point Barrow", "Iñupiat Heritage Center", "Midnight Sun", "Whale Bone Arch"],
    imageUrl: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=1200"
  },
  kodiak: {
    name: "Kodiak",
    type: 'city',
    population: 5968,
    region: "Southwest",
    coordinates: { lat: 57.7900, lng: -152.4072 },
    airport: {
      code: "ADQ",
      name: "Kodiak Airport",
      type: "Commercial",
      runways: "2 runways, largest 7,548 ft"
    },
    history: `Kodiak was the first capital of Russian America, established in 1792 by Alexander Baranov. The Russian Orthodox Church's influence remains visible in the historic Holy Resurrection Cathedral.

The island is home to the famous Kodiak brown bears, the largest bears in the world. The Kodiak National Wildlife Refuge protects much of the island and its bear population.

The city was devastated by a tsunami following the 1964 Good Friday Earthquake but has rebuilt as Alaska's premier fishing port.`,
    description: "Alaska's oldest city and premier fishing port, home to the world's largest brown bears.",
    established: "1792",
    elevation: "75 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 486-8636",
      website: "https://www.city.kodiak.ak.us",
      address: "710 Mill Bay Road, Kodiak, AK 99615"
    },
    industries: ["Commercial Fishing", "Coast Guard", "Tourism"],
    attractions: ["Kodiak National Wildlife Refuge", "Holy Resurrection Cathedral", "Baranov Museum", "Fort Abercrombie"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200"
  },
  sitka: {
    name: "Sitka",
    type: 'city',
    population: 8458,
    region: "Southeast",
    coordinates: { lat: 57.0531, lng: -135.3300 },
    airport: {
      code: "SIT",
      name: "Sitka Rocky Gutierrez Airport",
      type: "Commercial",
      runways: "1 runway, 6,500 ft"
    },
    history: `Sitka served as the capital of Russian America from 1808 to 1867. The transfer of Alaska from Russia to the United States took place in Sitka on October 18, 1867—a day still celebrated as Alaska Day.

The Tlingit people have inhabited the area for over 10,000 years. The Battle of Sitka in 1804 between Tlingit warriors and Russian forces is considered one of the most significant conflicts in Alaskan history.

St. Michael's Cathedral, built in 1848, is one of the finest examples of Russian Orthodox architecture in North America.`,
    description: "Former capital of Russian America, where the Alaska Purchase was finalized in 1867.",
    established: "1799 (Russian settlement)",
    elevation: "0 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 747-1811",
      website: "https://www.cityofsitka.com",
      address: "100 Lincoln Street, Sitka, AK 99835"
    },
    industries: ["Tourism", "Fishing", "Healthcare", "Government"],
    attractions: ["Sitka National Historical Park", "St. Michael's Cathedral", "Alaska Raptor Center", "Whale Watching"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  valdez: {
    name: "Valdez",
    type: 'city',
    population: 3985,
    region: "Southcentral",
    coordinates: { lat: 61.1308, lng: -146.3483 },
    airport: {
      code: "VDZ",
      name: "Valdez Pioneer Field",
      type: "Commercial",
      runways: "1 runway, 6,500 ft"
    },
    history: `Valdez was founded in 1897 as a port of entry for gold seekers heading to the Klondike. The Valdez Glacier Trail became known as the "All-American Route" to the gold fields.

The original town was destroyed by the 1964 Good Friday Earthquake and tsunami. The entire community was relocated to its present site four miles west.

Today, Valdez is the southern terminus of the Trans-Alaska Pipeline System and home to one of the world's largest marine oil terminals.`,
    description: "Gateway to Prince William Sound and southern terminus of the Trans-Alaska Pipeline.",
    established: "1897",
    elevation: "23 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 835-4313",
      website: "https://www.valdezalaska.gov",
      address: "212 Chenega Avenue, Valdez, AK 99686"
    },
    industries: ["Oil Transportation", "Fishing", "Tourism"],
    attractions: ["Valdez Glacier", "Prince William Sound", "Thompson Pass", "Worthington Glacier"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  }
};

const CommunityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const community = slug ? communityData[slug.toLowerCase()] : null;

  if (!community) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Community Not Found</h1>
            <p className="text-muted-foreground mb-8">The community page you're looking for doesn't exist yet.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
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
      
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: community.imageUrl 
              ? `url(${community.imageUrl})` 
              : 'linear-gradient(135deg, #1e3a5f 0%, #0c1929 100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant={community.type === 'city' ? 'default' : 'secondary'} className="text-sm">
                {community.type === 'city' ? '🏛️ City' : '🏘️ Community'}
              </Badge>
              <Badge variant="outline" className="text-sm bg-background/50 backdrop-blur">
                {community.region} Alaska
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{community.name}</h1>
            <p className="text-xl text-white/80 max-w-2xl">{community.description}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Population</p>
                <p className="text-xl font-bold text-foreground">{community.population.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Elevation</p>
                <p className="text-xl font-bold text-foreground">{community.elevation || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <History className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Established</p>
                <p className="text-xl font-bold text-foreground">{community.established || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
          {community.airport && (
            <Card className="bg-card/80 backdrop-blur border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <Plane className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Airport Code</p>
                  <p className="text-xl font-bold text-foreground">{community.airport.code}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="news">Local News</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  History of {community.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {community.history.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {community.airport && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-primary" />
                      Airport Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium text-foreground">{community.airport.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Code:</span>
                      <span className="font-bold text-primary">{community.airport.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium text-foreground">{community.airport.type}</span>
                    </div>
                    {community.airport.runways && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Runways:</span>
                        <span className="font-medium text-foreground">{community.airport.runways}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {community.industries && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Key Industries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {community.industries.map((industry) => (
                        <Badge key={industry} variant="secondary">{industry}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {community.attractions && (
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Attractions & Points of Interest
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {community.attractions.map((attraction) => (
                        <div key={attraction} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-foreground">{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {community.contact?.phone && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a href={`tel:${community.contact.phone}`} className="text-foreground hover:text-primary transition-colors">
                        {community.contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                {community.contact?.email && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${community.contact.email}`} className="text-foreground hover:text-primary transition-colors">
                        {community.contact.email}
                      </a>
                    </div>
                  </div>
                )}
                {community.contact?.website && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <Globe className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Website</p>
                      <a 
                        href={community.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {community.contact.website}
                      </a>
                    </div>
                  </div>
                )}
                {community.contact?.address && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="text-foreground">{community.contact.address}</p>
                    </div>
                  </div>
                )}
                {!community.contact?.phone && !community.contact?.email && !community.contact?.website && !community.contact?.address && (
                  <p className="text-muted-foreground">Contact information not available for this community.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  Local News from {community.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Local news for {community.name} will be displayed here. Check back for updates on community events, 
                  local government news, and stories from the {community.region} region.
                </p>
                <div className="mt-6">
                  <Link to={`/region/${community.region.toLowerCase()}`}>
                    <Button variant="outline">
                      View {community.region} Region News
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default CommunityPage;
