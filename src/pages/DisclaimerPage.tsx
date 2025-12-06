import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { AlertTriangle, Info, ExternalLink } from "lucide-react";

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Disclaimer</h1>
          </div>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mt-0">
              <Info className="h-5 w-5 text-amber-500" />
              General Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-0">
              The information provided by Alaska News Page ("we," "us," or "our") on our website is for general informational 
              purposes only. All information on the site is provided in good faith; however, we make no representation or warranty 
              of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness 
              of any information on the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">News and Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              News articles, community information, and other content published on Alaska News Page are compiled from various 
              sources and may not reflect the most current developments. We encourage readers to verify important information 
              through official sources before making decisions based on our content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Weather and Environmental Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              Weather information, tide data, and environmental conditions displayed on this website are for general reference 
              only. For critical safety decisions, always consult official sources such as:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>
                <a href="https://www.weather.gov/arh/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  National Weather Service Alaska <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://tidesandcurrents.noaa.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  NOAA Tides and Currents <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="https://511.alaska.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  Alaska 511 Road Conditions <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Community Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Information about Alaska communities, including population data, contact information, and local services, 
              is compiled from public sources and may not be current. We recommend contacting local government offices 
              directly for the most accurate and up-to-date information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              External Links Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This website may contain links to external websites that are not provided or maintained by or in any way 
              affiliated with Alaska News Page. Please note that we do not guarantee the accuracy, relevance, timeliness, 
              or completeness of any information on these external websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The site cannot and does not contain professional advice. The information is provided for general informational 
              and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any 
              actions based upon such information, we encourage you to consult with the appropriate professionals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a 
              result of the use of the site or reliance on any information provided on the site. Your use of the site and 
              your reliance on any information on the site is solely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Disclaimer, please contact us at:{" "}
              <a href="mailto:legal@alaskanewspage.com" className="text-primary hover:underline">
                legal@alaskanewspage.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DisclaimerPage;
