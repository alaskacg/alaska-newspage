import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Eye, Keyboard, Monitor, MessageSquare } from "lucide-react";

const AccessibilityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Accessibility Statement</h1>
          </div>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section className="p-6 bg-primary/10 border border-primary/30 rounded-xl">
            <h2 className="text-xl font-semibold text-foreground mt-0">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed mb-0">
              Alaska News Page is committed to ensuring digital accessibility for people with disabilities. We are 
              continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Accessibility Features</h2>
            <p className="text-muted-foreground leading-relaxed">
              We have implemented the following features to make our website more accessible:
            </p>
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-primary" />
                  Visual Design
                </h3>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• High contrast color schemes</li>
                  <li>• Dark mode support</li>
                  <li>• Scalable text and responsive design</li>
                  <li>• Clear visual hierarchy</li>
                </ul>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Keyboard className="h-4 w-4 text-primary" />
                  Navigation
                </h3>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Keyboard-accessible navigation</li>
                  <li>• Skip to content links</li>
                  <li>• Consistent navigation structure</li>
                  <li>• Focus indicators</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Standards Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Assistive Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Known Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to ensure all content is fully accessible, some areas may have limitations:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Some older PDF documents may not be fully accessible</li>
              <li>Third-party content and embedded media may have varying accessibility levels</li>
              <li>Interactive maps may require alternative text descriptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Feedback and Contact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We welcome your feedback on the accessibility of Alaska News Page. If you encounter accessibility 
              barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">
                <strong>Email:</strong>{" "}
                <a href="mailto:accessibility@alaskanewspage.com" className="text-primary hover:underline">
                  accessibility@alaskanewspage.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                We aim to respond to accessibility feedback within 5 business days.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Continuous Improvement</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to continuously improving the accessibility of our website. We regularly review 
              our site and make updates to ensure compliance with accessibility standards and to incorporate 
              user feedback.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityPage;
