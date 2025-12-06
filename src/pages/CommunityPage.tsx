import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Plane, Phone, Mail, Globe, Building, History, Newspaper, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CommunityWeather from "@/components/CommunityWeather";
import TypewriterTitle from "@/components/TypewriterTitle";

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
  },
  wasilla: {
    name: "Wasilla",
    type: 'city',
    population: 10529,
    region: "Southcentral",
    coordinates: { lat: 61.5814, lng: -149.4394 },
    history: `Wasilla began as a stop along the Alaska Railroad in 1917. The town was named after Chief Wasilla, a Dena'ina Athabascan leader. The area grew slowly until the construction of the Parks Highway in the 1970s connected it to Anchorage.

The Iditarod Trail Sled Dog Race headquarters is located in Wasilla, and the city hosts the race's ceremonial restart each March. The area has experienced rapid growth since the 1990s as a bedroom community for Anchorage.

Wasilla gained national attention when former Mayor Sarah Palin became the Republican Vice Presidential nominee in 2008.`,
    description: "Fast-growing Mat-Su Valley city, home to the Iditarod Trail Sled Dog Race headquarters.",
    established: "1917",
    elevation: "350 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 373-9020",
      website: "https://www.cityofwasilla.com",
      address: "290 E Herning Avenue, Wasilla, AK 99654"
    },
    industries: ["Retail", "Healthcare", "Tourism", "Agriculture"],
    attractions: ["Iditarod Trail Headquarters", "Museum of Alaska Transportation", "Wasilla Lake", "Hatcher Pass"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  palmer: {
    name: "Palmer",
    type: 'city',
    population: 7306,
    region: "Southcentral",
    coordinates: { lat: 61.5994, lng: -149.1128 },
    history: `Palmer was established in 1935 as part of the Matanuska Colony Project, a New Deal program that relocated families from the Midwest to farm Alaska's fertile Matanuska Valley.

The colonists faced tremendous hardships but succeeded in establishing a thriving agricultural community. The annual Alaska State Fair, held in Palmer since 1936, celebrates this farming heritage.

The valley is famous for producing giant vegetables, including world-record cabbages weighing over 100 pounds, thanks to the long summer daylight hours.`,
    description: "Heart of the Matanuska Valley, famous for farming and record-breaking giant vegetables.",
    established: "1935",
    elevation: "229 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 745-3271",
      website: "https://www.cityofpalmer.org",
      address: "231 W Evergreen Avenue, Palmer, AK 99645"
    },
    industries: ["Agriculture", "Tourism", "Government", "Retail"],
    attractions: ["Alaska State Fair", "Musk Ox Farm", "Matanuska Glacier", "Hatcher Pass"],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
  },
  ketchikan: {
    name: "Ketchikan",
    type: 'city',
    population: 8263,
    region: "Southeast",
    coordinates: { lat: 55.3422, lng: -131.6461 },
    airport: {
      code: "KTN",
      name: "Ketchikan International Airport",
      type: "Commercial",
      runways: "1 runway, 7,500 ft"
    },
    history: `Ketchikan is known as Alaska's "First City" because it's the first major Alaskan community that northbound travelers encounter. Tlingit people have lived in the area for thousands of years before European contact.

The city developed in the late 1800s around salmon canneries and the timber industry. At its peak, Ketchikan had 14 salmon canneries operating simultaneously.

Today, Ketchikan is famous for its totem poles, with the world's largest collection of standing totem poles at the Totem Heritage Center and Saxman Totem Park.`,
    description: "Alaska's 'First City' with the world's largest collection of standing totem poles.",
    established: "1900",
    elevation: "0 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 225-3111",
      website: "https://www.ktn-ak.us",
      address: "334 Front Street, Ketchikan, AK 99901"
    },
    industries: ["Tourism", "Fishing", "Healthcare", "Government"],
    attractions: ["Saxman Totem Park", "Creek Street", "Misty Fjords", "Great Alaskan Lumberjack Show"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200"
  },
  bethel: {
    name: "Bethel",
    type: 'city',
    population: 6325,
    region: "Southwest",
    coordinates: { lat: 60.7922, lng: -161.7558 },
    airport: {
      code: "BET",
      name: "Bethel Airport",
      type: "Commercial",
      runways: "2 runways, largest 6,398 ft"
    },
    history: `Bethel is the largest community in the Yukon-Kuskokwim Delta and serves as the regional hub for 56 Yup'ik villages. The Yup'ik people have inhabited this region for thousands of years.

Moravian missionaries established Bethel in 1885, naming it after the biblical location. The city grew as a trading center and later as a hub for government services.

Today, Bethel is only accessible by air or river—there are no roads connecting it to the rest of Alaska. The community maintains strong Yup'ik cultural traditions.`,
    description: "Regional hub of the Yukon-Kuskokwim Delta, center of Yup'ik culture.",
    established: "1885",
    elevation: "125 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 543-2047",
      website: "https://www.cityofbethel.net",
      address: "350 Chief Eddie Hoffman Highway, Bethel, AK 99559"
    },
    industries: ["Government Services", "Healthcare", "Transportation", "Subsistence"],
    attractions: ["Yupiit Piciryarait Cultural Center", "Kuskokwim River", "Traditional Dance Festivals"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  kenai: {
    name: "Kenai",
    type: 'city',
    population: 7424,
    region: "Southcentral",
    coordinates: { lat: 60.5544, lng: -151.2583 },
    airport: {
      code: "ENA",
      name: "Kenai Municipal Airport",
      type: "Commercial",
      runways: "2 runways, largest 7,855 ft"
    },
    history: `Kenai is one of Alaska's oldest permanent settlements, established by Russian fur traders in 1791. Fort St. Nicholas, the first Russian Orthodox Church in mainland Alaska, was built here.

The discovery of oil on the Kenai Peninsula in 1957 transformed the region's economy. The city became a hub for oil and gas operations while maintaining its commercial fishing heritage.

The Kenai River is world-famous for its king salmon fishing, attracting anglers from around the globe.`,
    description: "Historic oil and fishing hub on the Kenai Peninsula with world-class salmon fishing.",
    established: "1791",
    elevation: "93 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 283-7535",
      website: "https://www.kenai.city",
      address: "210 Fidalgo Avenue, Kenai, AK 99611"
    },
    industries: ["Oil & Gas", "Commercial Fishing", "Tourism", "Retail"],
    attractions: ["Kenai River", "Old Town Kenai", "Kenai Visitors Center", "Holy Assumption Orthodox Church"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  homer: {
    name: "Homer",
    type: 'city',
    population: 5515,
    region: "Southcentral",
    coordinates: { lat: 59.6425, lng: -151.5483 },
    airport: {
      code: "HOM",
      name: "Homer Airport",
      type: "Commercial",
      runways: "1 runway, 6,701 ft"
    },
    history: `Homer was named after Homer Pennock, a New York con man who arrived in 1896 to mine gold. Though the gold venture failed, the town grew as a fishing and supply center.

The Homer Spit, a 4.5-mile sand bar extending into Kachemak Bay, defines the city's character. The Spit hosts the small boat harbor and numerous tourist attractions.

Homer is known as the "Halibut Fishing Capital of the World" and has become a destination for artists and outdoor enthusiasts.`,
    description: "The 'Halibut Fishing Capital of the World' at the end of the Sterling Highway.",
    established: "1896",
    elevation: "72 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 235-8121",
      website: "https://www.cityofhomer-ak.gov",
      address: "491 E Pioneer Avenue, Homer, AK 99603"
    },
    industries: ["Tourism", "Commercial Fishing", "Arts", "Retail"],
    attractions: ["Homer Spit", "Kachemak Bay State Park", "Alaska Islands & Ocean Visitor Center", "Pratt Museum"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  seward: {
    name: "Seward",
    type: 'city',
    population: 2717,
    region: "Southcentral",
    coordinates: { lat: 60.1042, lng: -149.4422 },
    airport: {
      code: "SWD",
      name: "Seward Airport",
      type: "General Aviation",
      runways: "1 runway, 3,700 ft"
    },
    history: `Seward was founded in 1903 as the ocean terminus of the Alaska Railroad. Named after William H. Seward, the Secretary of State who negotiated the Alaska Purchase, the city became a vital transportation hub.

The 1964 Good Friday Earthquake and subsequent tsunami devastated Seward, destroying the waterfront and killing 13 residents. The city rebuilt and continues to serve as a major cruise port.

Seward is the gateway to Kenai Fjords National Park and home to the Alaska SeaLife Center.`,
    description: "Gateway to Kenai Fjords National Park and historic Alaska Railroad terminus.",
    established: "1903",
    elevation: "30 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 224-4050",
      website: "https://www.cityofseward.us",
      address: "410 Adams Street, Seward, AK 99664"
    },
    industries: ["Tourism", "Fishing", "Cruise Ships", "Railroad"],
    attractions: ["Kenai Fjords National Park", "Alaska SeaLife Center", "Exit Glacier", "Mount Marathon Race"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  cordova: {
    name: "Cordova",
    type: 'city',
    population: 2609,
    region: "Southcentral",
    coordinates: { lat: 60.5428, lng: -145.7575 },
    airport: {
      code: "CDV",
      name: "Merle K. 'Mudhole' Smith Airport",
      type: "Commercial",
      runways: "1 runway, 7,500 ft"
    },
    history: `Cordova was built in 1906 as the terminus of the Copper River and Northwestern Railway, which transported copper ore from the Kennecott mines. The railroad operated until 1938 when the mines closed.

The city transitioned to commercial fishing and remains one of Alaska's most important fishing ports. The annual Copper River salmon run draws attention from chefs and seafood lovers worldwide.

Cordova is only accessible by air or sea, giving it a remote, tight-knit community character.`,
    description: "Remote fishing community famous for Copper River salmon.",
    established: "1906",
    elevation: "42 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 424-6200",
      website: "https://www.cityofcordova.net",
      address: "601 First Street, Cordova, AK 99574"
    },
    industries: ["Commercial Fishing", "Tourism", "Transportation"],
    attractions: ["Copper River", "Child's Glacier", "Cordova Museum", "Million Dollar Bridge"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  kotzebue: {
    name: "Kotzebue",
    type: 'city',
    population: 3201,
    region: "Northern",
    coordinates: { lat: 66.8983, lng: -162.5967 },
    airport: {
      code: "OTZ",
      name: "Ralph Wien Memorial Airport",
      type: "Commercial",
      runways: "2 runways, largest 6,412 ft"
    },
    history: `Kotzebue is named after Otto von Kotzebue, a Russian explorer who visited the area in 1818. The Iñupiat people have lived here for thousands of years, and the community maintains strong cultural traditions.

Located 26 miles above the Arctic Circle, Kotzebue serves as the regional hub for the Northwest Arctic Borough. The city is built on a gravel spit extending into Kotzebue Sound.

The community is famous for its traditional Iñupiat culture, including blanket toss, native games, and traditional arts.`,
    description: "Iñupiat community above the Arctic Circle, gateway to Northwest Alaska.",
    established: "Traditional village",
    elevation: "11 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 442-3401",
      website: "https://www.cityofkotzebue.com",
      address: "258 Third Avenue, Kotzebue, AK 99752"
    },
    industries: ["Government Services", "Subsistence", "Transportation", "Tourism"],
    attractions: ["NANA Museum of the Arctic", "Kobuk Valley National Park", "Traditional Cultural Programs"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  haines: {
    name: "Haines",
    type: 'community',
    population: 2080,
    region: "Southeast",
    coordinates: { lat: 59.2358, lng: -135.4456 },
    airport: {
      code: "HNS",
      name: "Haines Airport",
      type: "Commercial",
      runways: "1 runway, 4,000 ft"
    },
    history: `Haines was named after Francina Electa Haines, who raised money for the first Presbyterian mission here in 1879. Before European contact, the Chilkat Tlingit people inhabited the area for centuries.

Fort William H. Seward, established in 1904, was Alaska's first permanent Army post. After the military left in 1946, the fort became an arts community that continues today.

Haines is unique in Southeast Alaska as one of only three communities connected to the Alaska Highway by road.`,
    description: "Southeast Alaska's gateway to the Interior, famous for eagles and arts.",
    established: "1879",
    elevation: "0 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 766-6400",
      website: "https://www.hainesalaska.gov",
      address: "103 Third Avenue, Haines, AK 99827"
    },
    industries: ["Tourism", "Fishing", "Arts", "Government"],
    attractions: ["Alaska Bald Eagle Festival", "Fort Seward", "Chilkat State Park", "Hammer Museum"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  skagway: {
    name: "Skagway",
    type: 'community',
    population: 1183,
    region: "Southeast",
    coordinates: { lat: 59.4583, lng: -135.3139 },
    airport: {
      code: "SGY",
      name: "Skagway Airport",
      type: "General Aviation",
      runways: "1 runway, 3,550 ft"
    },
    history: `Skagway exploded from a single homestead to a city of 10,000 during the Klondike Gold Rush of 1897-98. Prospectors climbed the Chilkoot and White Pass trails en route to the Yukon gold fields.

The notorious gangster "Soapy" Smith ran the town's criminal enterprises until he was killed in a shootout in 1898. The White Pass & Yukon Route railroad, completed in 1900, made the dangerous trail climbs obsolete.

Today, Skagway is a National Historic Landmark, preserving its gold rush heritage for the hundreds of thousands of cruise visitors it receives annually.`,
    description: "Preserved Gold Rush town and National Historic Landmark at the head of Lynn Canal.",
    established: "1897",
    elevation: "30 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 983-2297",
      website: "https://www.skagway.org",
      address: "700 Spring Street, Skagway, AK 99840"
    },
    industries: ["Tourism", "Cruise Ships", "Railroad"],
    attractions: ["White Pass & Yukon Route Railroad", "Klondike Gold Rush NHP", "Chilkoot Trail", "Red Onion Saloon"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  "delta-junction": {
    name: "Delta Junction",
    type: 'community',
    population: 1055,
    region: "Interior",
    coordinates: { lat: 64.0400, lng: -145.7306 },
    history: `Delta Junction marks the official end of the Alaska Highway at mile 1422. The highway, built during World War II, connected Alaska to the contiguous states for the first time.

The area has been home to agricultural development, including the Delta Barley Project in the 1980s, one of the largest grain farms in Alaska's history.

The community serves as a gateway to the Interior and hosts Fort Greely, a U.S. Army installation.`,
    description: "Official end of the Alaska Highway and agricultural center of the Interior.",
    established: "1919",
    elevation: "1,180 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 895-4656",
      website: "https://www.deltajunction.com"
    },
    industries: ["Agriculture", "Military", "Tourism", "Transportation"],
    attractions: ["End of Alaska Highway Monument", "Big Delta State Historical Park", "Delta Junction Bison Range"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  tok: {
    name: "Tok",
    type: 'community',
    population: 1258,
    region: "Interior",
    coordinates: { lat: 63.3367, lng: -142.9856 },
    airport: {
      code: "TKJ",
      name: "Tok Junction Airport",
      type: "General Aviation",
      runways: "1 runway, 2,510 ft"
    },
    history: `Tok (pronounced "Toke") developed as a construction camp during the building of the Alaska Highway in 1942. The name may derive from a Tokyo Camp established during highway construction.

Located at the junction of the Alaska Highway and Tok Cutoff to Valdez, the community became a natural stopping point for travelers. The town serves as a gateway between the Interior and Canada.

Tok experiences some of Alaska's most extreme temperature swings, from -80°F in winter to 90°F in summer.`,
    description: "Crossroads community at the junction of Alaska Highway and Tok Cutoff.",
    established: "1942",
    elevation: "1,635 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 883-5775",
      website: "https://www.tokalaskainfo.com"
    },
    industries: ["Tourism", "Transportation", "Government Services"],
    attractions: ["Mukluk Land", "Tok Alaska Mainstreet Visitors Center", "Tetlin National Wildlife Refuge"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  "north-pole": {
    name: "North Pole",
    type: 'community',
    population: 2243,
    region: "Interior",
    coordinates: { lat: 64.7511, lng: -147.3494 },
    history: `North Pole was established in 1952 by Bon Davis, who hoped the name would attract a toy manufacturer. While that never happened, the town embraced its Christmas theme fully.

Street names include Snowman Lane and Santa Claus Lane. The Santa Claus House, opened in 1952, receives thousands of letters addressed to Santa each year and has become a major tourist attraction.

Despite temperatures that can drop to -50°F, the Christmas lights and decorations stay up year-round.`,
    description: "Christmas-themed community where holiday spirit lasts all year.",
    established: "1952",
    elevation: "480 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 488-2281",
      website: "https://www.northpolealaska.com",
      address: "125 Snowman Lane, North Pole, AK 99705"
    },
    industries: ["Retail", "Oil Refining", "Tourism", "Military Support"],
    attractions: ["Santa Claus House", "Antler Academy", "Christmas-themed streets"],
    imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=1200"
  },
  girdwood: {
    name: "Girdwood",
    type: 'community',
    population: 2072,
    region: "Southcentral",
    coordinates: { lat: 60.9419, lng: -149.1664 },
    history: `Girdwood was founded in 1896 by prospector James Girdwood. Gold mining sustained the community until the 1930s when the mines closed.

The original townsite was destroyed in the 1964 Good Friday Earthquake when the ground dropped 8-10 feet and flooded with seawater. The community rebuilt at its current location.

Alyeska Resort transformed Girdwood into Alaska's premier ski destination, attracting winter sports enthusiasts from around the world.`,
    description: "Alaska's premier ski resort community in the Chugach Mountains.",
    established: "1896",
    elevation: "250 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 783-2651",
      website: "https://www.alyeskaresort.com"
    },
    industries: ["Tourism", "Skiing", "Hospitality"],
    attractions: ["Alyeska Resort", "Crow Creek Mine", "Alaska Wildlife Conservation Center", "Portage Glacier"],
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200"
  },
  talkeetna: {
    name: "Talkeetna",
    type: 'community',
    population: 876,
    region: "Southcentral",
    coordinates: { lat: 62.3236, lng: -150.1064 },
    history: `Talkeetna, meaning "river of plenty" in Dena'ina, developed as a mining and trading center in the early 1900s. The Alaska Railroad established a station here in 1916.

The town became the base camp for climbers attempting Denali (Mount McKinley) and remains the primary staging area for expeditions today. The National Park Service maintains a ranger station in town.

Talkeetna famously elected a cat named Stubbs as honorary mayor in 1997, who served until his death in 2017.`,
    description: "Historic town at the base of Denali, gateway for mountaineering expeditions.",
    established: "1916",
    elevation: "358 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 733-2330",
      website: "https://www.talkeetnachamber.org"
    },
    industries: ["Tourism", "Aviation", "Mountaineering Support"],
    attractions: ["Denali Flightseeing", "Talkeetna Historical Society Museum", "Mahay's Riverboat Tours", "Downtown Historic District"],
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
  },
  unalaska: {
    name: "Unalaska/Dutch Harbor",
    type: 'city',
    population: 4758,
    region: "Southwest",
    coordinates: { lat: 53.8739, lng: -166.5322 },
    airport: {
      code: "DUT",
      name: "Unalaska Airport",
      type: "Commercial",
      runways: "1 runway, 4,500 ft"
    },
    history: `Unalaska has been home to the Unangan (Aleut) people for over 9,000 years. Russian fur traders established a post here in 1759, making it one of Alaska's oldest European settlements.

Dutch Harbor, on Amaknak Island, served as a major U.S. Navy base during World War II and was bombed by the Japanese in 1942. The attack killed 43 people and was the second enemy attack on American soil.

Today, Dutch Harbor is consistently America's top commercial fishing port by volume, primarily for pollock and crab.`,
    description: "America's top commercial fishing port in the heart of the Aleutian Islands.",
    established: "Traditional Unangan village",
    elevation: "20 ft",
    timezone: "Alaska-Hawaii Time (HAST)",
    contact: {
      phone: "(907) 581-1251",
      website: "https://www.ci.unalaska.ak.us",
      address: "43 Raven Way, Unalaska, AK 99685"
    },
    industries: ["Commercial Fishing", "Seafood Processing", "Transportation"],
    attractions: ["WWII National Historical Area", "Holy Ascension Cathedral", "Museum of the Aleutians", "Eagle Viewing"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  "eagle-river": {
    name: "Eagle River",
    type: 'community',
    population: 25275,
    region: "Southcentral",
    coordinates: { lat: 61.3214, lng: -149.5683 },
    history: `Eagle River began as a stop along the Iditarod Trail and later the Alaska Railroad. The community grew rapidly after World War II as Anchorage expanded northward.

The area is named after the Eagle River, where bald eagles congregate to feed on salmon runs. Joint Base Elmendorf-Richardson (JBER) borders the community, influencing its development.

Today, Eagle River is a major suburb of Anchorage, offering a more rural lifestyle while maintaining easy access to urban amenities.`,
    description: "Scenic Anchorage suburb nestled in the Chugach Mountains.",
    established: "1940s",
    elevation: "225 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 343-7100",
      website: "https://www.muni.org"
    },
    industries: ["Military", "Retail", "Healthcare", "Recreation"],
    attractions: ["Eagle River Nature Center", "Chugach State Park", "Eagle River Campground", "Alaska State Fair Access"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  wrangell: {
    name: "Wrangell",
    type: 'city',
    population: 2127,
    region: "Southeast",
    coordinates: { lat: 56.4711, lng: -132.3797 },
    airport: {
      code: "WRG",
      name: "Wrangell Airport",
      type: "Commercial",
      runways: "1 runway, 6,000 ft"
    },
    history: `Wrangell is one of Alaska's oldest non-Native settlements, having been governed by four nations: Tlingit, Russia, Britain, and the United States. The town has experienced three major gold rushes.

Petroglyphs found near the town date back over 8,000 years, making the area one of the oldest continuously inhabited sites in Alaska. The Petroglyph Beach State Historic Park preserves these ancient carvings.

The Anan Wildlife Observatory, accessible from Wrangell, offers some of Alaska's best black bear viewing opportunities.`,
    description: "Historic town ruled by four nations, gateway to ancient petroglyphs and bear viewing.",
    established: "1834 (Russian fort)",
    elevation: "44 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 874-2381",
      website: "https://www.wrangell.com",
      address: "205 Brueger Street, Wrangell, AK 99929"
    },
    industries: ["Fishing", "Tourism", "Timber", "Government"],
    attractions: ["Petroglyph Beach", "Anan Wildlife Observatory", "Chief Shakes Tribal House", "Stikine River"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  petersburg: {
    name: "Petersburg",
    type: 'city',
    population: 3043,
    region: "Southeast",
    coordinates: { lat: 56.8128, lng: -132.9556 },
    airport: {
      code: "PSG",
      name: "Petersburg James A. Johnson Airport",
      type: "Commercial",
      runways: "1 runway, 6,000 ft"
    },
    history: `Petersburg was founded in 1897 by Norwegian immigrant Peter Buschmann, who built a cannery and sawmill. The town retains strong Norwegian heritage and is known as "Little Norway."

The community celebrates its Norwegian roots with the annual Little Norway Festival during May, featuring traditional dancing, costumes, and food. Many buildings feature Norwegian rosemaling (decorative painting).

Petersburg's fishing fleet is one of the most productive in Alaska, with shrimp and halibut being major catches.`,
    description: "Little Norway of Alaska, a fishing village with strong Norwegian heritage.",
    established: "1897",
    elevation: "0 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 772-4636",
      website: "https://www.ci.petersburg.ak.us",
      address: "12 S Nordic Drive, Petersburg, AK 99833"
    },
    industries: ["Commercial Fishing", "Seafood Processing", "Tourism"],
    attractions: ["LeConte Glacier", "Sons of Norway Hall", "Clausen Memorial Museum", "Little Norway Festival"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  craig: {
    name: "Craig",
    type: 'city',
    population: 1036,
    region: "Southeast",
    coordinates: { lat: 55.4764, lng: -133.1483 },
    airport: {
      code: "CGA",
      name: "Craig Seaplane Base",
      type: "Seaplane",
      runways: "Water landing"
    },
    history: `Craig is located on Prince of Wales Island, the fourth-largest island in the United States. The Tlingit and Haida people have inhabited the area for thousands of years.

The town was established in 1907 around a fish saltery and cannery. Timber and fishing have been the economic mainstays, though tourism has grown as visitors come to experience the island's wilderness.

Prince of Wales Island has more than 1,500 miles of logging roads, making it unique among Southeast Alaska communities for road access to remote areas.`,
    description: "Largest town on Prince of Wales Island with excellent fishing and outdoor recreation.",
    established: "1907",
    elevation: "0 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 826-3275",
      website: "https://www.craigak.com",
      address: "500 Third Street, Craig, AK 99921"
    },
    industries: ["Fishing", "Timber", "Tourism"],
    attractions: ["El Capitan Cave", "Sport Fishing", "Trocadero Bay", "Native Cultural Sites"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  dillingham: {
    name: "Dillingham",
    type: 'city',
    population: 2316,
    region: "Southwest",
    coordinates: { lat: 59.0397, lng: -158.4575 },
    airport: {
      code: "DLG",
      name: "Dillingham Airport",
      type: "Commercial",
      runways: "2 runways, largest 6,404 ft"
    },
    history: `Dillingham serves as the economic and transportation hub for the Bristol Bay region, home to the world's largest wild sockeye salmon run. The Yup'ik people have inhabited this area for thousands of years.

The town was established in the late 1800s as a trading post and cannery center. The Bristol Bay salmon fishery became one of the most valuable in the world, with millions of fish harvested each summer.

Dillingham remains the center of operations for the Bristol Bay fishery, with seasonal populations swelling dramatically during the salmon runs.`,
    description: "Hub of Bristol Bay, gateway to the world's greatest sockeye salmon fishery.",
    established: "1884",
    elevation: "86 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 842-5211",
      website: "https://www.dillinghamak.us",
      address: "173 Main Street, Dillingham, AK 99576"
    },
    industries: ["Commercial Fishing", "Government Services", "Transportation", "Tourism"],
    attractions: ["Bristol Bay", "Wood-Tikchik State Park", "Togiak National Wildlife Refuge", "Salmon Fishing"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  mcgrath: {
    name: "McGrath",
    type: 'community',
    population: 346,
    region: "Interior",
    coordinates: { lat: 62.9533, lng: -155.5961 },
    airport: {
      code: "MCG",
      name: "McGrath Airport",
      type: "Commercial",
      runways: "1 runway, 5,435 ft"
    },
    history: `McGrath was established as a supply point for the Iditarod gold mining district in the early 1900s. Located at the confluence of the Kuskokwim and Takotna rivers, it became an important transportation hub.

The town is a checkpoint on the Iditarod Trail Sled Dog Race and often hosts the race's first mandatory rest stop. Many mushers consider it a crucial point in the race.

McGrath serves as a regional center for surrounding villages, providing healthcare, education, and government services.`,
    description: "Interior hub and key Iditarod checkpoint on the Kuskokwim River.",
    established: "1907",
    elevation: "341 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 524-3024"
    },
    industries: ["Government Services", "Transportation", "Subsistence", "Tourism"],
    attractions: ["Iditarod Checkpoint", "Kuskokwim River", "Dog Mushing", "Northern Lights Viewing"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  galena: {
    name: "Galena",
    type: 'community',
    population: 479,
    region: "Interior",
    coordinates: { lat: 64.7361, lng: -156.9278 },
    airport: {
      code: "GAL",
      name: "Edward G. Pitka Sr. Airport",
      type: "Commercial",
      runways: "2 runways, largest 7,254 ft"
    },
    history: `Galena was established in 1918 as a supply center for the surrounding mining camps. The town is named after the galena (lead sulfide) ore found in the area.

During the Cold War, Galena Air Force Station was a major military installation for defending Alaska against Soviet attack. The base closed in 1993, and the community has since transitioned to civilian life.

In 2013, the Yukon River flooded Galena, destroying much of the town. The resilient community rebuilt, though at a reduced population.`,
    description: "Historic Interior community on the Yukon River, former Air Force base site.",
    established: "1918",
    elevation: "152 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 656-1301"
    },
    industries: ["Government Services", "Education", "Subsistence", "Transportation"],
    attractions: ["Yukon River", "Northern Lights", "Subsistence Culture", "Historic Military Sites"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  nenana: {
    name: "Nenana",
    type: 'community',
    population: 376,
    region: "Interior",
    coordinates: { lat: 64.5639, lng: -149.0931 },
    airport: {
      code: "ENN",
      name: "Nenana Municipal Airport",
      type: "General Aviation",
      runways: "1 runway, 4,610 ft"
    },
    history: `Nenana is located at the confluence of the Nenana and Tanana rivers. The Tanana Athabascan people have lived here for centuries. The Alaska Railroad reached Nenana in 1923.

President Warren G. Harding drove the "golden spike" completing the Alaska Railroad in Nenana on July 15, 1923. The town hosts the famous Nenana Ice Classic, an annual lottery predicting when the ice on the Tanana River will break up.

The Ice Classic has been running since 1917 and is a beloved Alaska tradition, with millions of dollars in prize money.`,
    description: "Railroad town famous for the Nenana Ice Classic lottery tradition.",
    established: "1902",
    elevation: "356 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 832-5441",
      website: "https://www.nenana.org"
    },
    industries: ["Transportation", "Tourism", "Government Services"],
    attractions: ["Nenana Ice Classic", "Alaska Railroad Museum", "Taku Chief Stern-wheeler", "St. Mark's Mission Church"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  healy: {
    name: "Healy",
    type: 'community',
    population: 1021,
    region: "Interior",
    coordinates: { lat: 63.8694, lng: -148.9686 },
    history: `Healy is located at the entrance to Denali National Park and serves as the commercial and residential center for the Denali area. The town developed around coal mining operations that began in the early 1900s.

The Usibelli Coal Mine, Alaska's only operating coal mine, has been in operation since 1943. The mine supplies coal for power generation and export.

Healy is famous as the location featured in "Into the Wild," the story of Christopher McCandless who died nearby in 1992.`,
    description: "Gateway community to Denali National Park, center of Alaska's coal mining.",
    established: "1905",
    elevation: "1,294 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 683-1279"
    },
    industries: ["Coal Mining", "Tourism", "Hospitality"],
    attractions: ["Denali National Park", "49th State Brewing", "Stampede Trail", "Usibelli Coal Mine Tours"],
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
  },
  glennallen: {
    name: "Glennallen",
    type: 'community',
    population: 483,
    region: "Southcentral",
    coordinates: { lat: 62.1089, lng: -145.5467 },
    history: `Glennallen is named after two Army explorers, Captain Edwin Glenn and Lieutenant Henry Allen, who explored the Copper River region in the late 1800s.

The community developed at the junction of the Glenn and Richardson Highways, making it a natural crossroads. It serves as a supply and service center for the Copper River Basin.

The area offers spectacular views of the Wrangell Mountains and serves as a gateway to Wrangell-St. Elias National Park, America's largest national park.`,
    description: "Crossroads of the Copper River Basin, gateway to Wrangell-St. Elias.",
    established: "1942",
    elevation: "1,460 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 822-3555"
    },
    industries: ["Tourism", "Services", "Government"],
    attractions: ["Wrangell-St. Elias National Park", "Copper River", "Trans-Alaska Pipeline Viewpoint", "Worthington Glacier"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  yakutat: {
    name: "Yakutat",
    type: 'city',
    population: 657,
    region: "Southeast",
    coordinates: { lat: 59.5469, lng: -139.7272 },
    airport: {
      code: "YAK",
      name: "Yakutat Airport",
      type: "Commercial",
      runways: "2 runways, largest 7,813 ft"
    },
    history: `Yakutat is located on Yakutat Bay, surrounded by the St. Elias Mountains and the Malaspina Glacier, the world's largest piedmont glacier. Tlingit people have inhabited the area for thousands of years.

The town became a military installation during World War II. The airport, one of the longest in Alaska, was built for military operations.

Yakutat is famous for its world-class surfing—one of the few places in Alaska where surfing is popular, thanks to consistent swells from the Gulf of Alaska.`,
    description: "Remote coastal town famous for world-class surfing and massive glaciers.",
    established: "Traditional Tlingit village",
    elevation: "33 ft",
    timezone: "Alaska Time (AKST/AKDT)",
    contact: {
      phone: "(907) 784-3323",
      website: "https://www.yakutat.net"
    },
    industries: ["Fishing", "Tourism", "Government Services"],
    attractions: ["Surfing", "Malaspina Glacier", "Hubbard Glacier", "Russell Fjord Wilderness"],
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
      
      {/* Hero Section with improved title visibility */}
      <div className="relative h-[450px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ 
            backgroundImage: community.imageUrl 
              ? `url(${community.imageUrl})` 
              : 'linear-gradient(135deg, #1e3a5f 0%, #0c1929 100%)'
          }}
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        {/* Additional overlay for title area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Link 
              to="/" 
              className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 mb-6 transition-all border border-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Map
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge 
                variant={community.type === 'city' ? 'default' : 'secondary'} 
                className="text-sm px-4 py-1 bg-primary/80 backdrop-blur"
              >
                {community.type === 'city' ? '🏛️ City' : '🏘️ Community'}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-sm px-4 py-1 bg-white/10 backdrop-blur border-white/30 text-white"
              >
                {community.region} Alaska
              </Badge>
            </div>
            {/* Typewriter animated title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <TypewriterTitle 
                text={community.name}
                className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_20px_rgb(0_0_0_/_80%),_0_0_40px_rgb(0_0_0_/_60%)]"
                speed={100}
                delay={500}
              />
            </h1>
            <p className="text-xl text-white/90 max-w-2xl drop-shadow-lg [text-shadow:_1px_1px_10px_rgb(0_0_0_/_70%)]">
              {community.description}
            </p>
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
        {/* Weather Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Weather in {community.name}</h2>
          </div>
          <CommunityWeather 
            communityName={community.name} 
            coordinates={community.coordinates} 
          />
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="services">Local Services</TabsTrigger>
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

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Essential Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Emergency Services</p>
                    <p className="text-sm text-muted-foreground">911 for emergencies</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Alaska State Troopers</p>
                    <p className="text-sm text-muted-foreground">(907) 451-5100 (Dispatch)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Alaska DMV</p>
                    <p className="text-sm text-muted-foreground">dmv.alaska.gov</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Post Office</p>
                    <p className="text-sm text-muted-foreground">USPS locations available in most communities</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Local Library</p>
                    <p className="text-sm text-muted-foreground">Public access computers, books, and programs</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Food Bank</p>
                    <p className="text-sm text-muted-foreground">Food assistance programs available</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Healthcare Access</p>
                    <p className="text-sm text-muted-foreground">Local clinics and telehealth services</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Alaska 211</p>
                    <p className="text-sm text-muted-foreground">Dial 211 for community services info</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-primary" />
                    Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {community.airport && (
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="font-medium text-foreground">{community.airport.name}</p>
                      <p className="text-sm text-muted-foreground">Code: {community.airport.code} | {community.airport.type}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Alaska Airlines</p>
                    <p className="text-sm text-muted-foreground">Major carrier serving Alaska</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Ravn Alaska</p>
                    <p className="text-sm text-muted-foreground">Regional bush plane service</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium text-foreground">Alaska Marine Highway</p>
                    <p className="text-sm text-muted-foreground">Ferry system (where applicable)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Useful Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a 
                    href="https://alaska.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium text-foreground">State of Alaska</p>
                    <p className="text-sm text-muted-foreground">Official state government portal</p>
                  </a>
                  <a 
                    href="https://www.adfg.alaska.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium text-foreground">ADF&G</p>
                    <p className="text-sm text-muted-foreground">Fishing & hunting regulations</p>
                  </a>
                  <a 
                    href="https://dot.alaska.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium text-foreground">Road Conditions</p>
                    <p className="text-sm text-muted-foreground">511 Alaska road information</p>
                  </a>
                  <a 
                    href="https://www.weather.gov/afg/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <p className="font-medium text-foreground">NWS Alaska</p>
                    <p className="text-sm text-muted-foreground">Official weather forecasts</p>
                  </a>
                </CardContent>
              </Card>
            </div>
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
