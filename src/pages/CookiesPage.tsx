import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Cookie, Settings, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Cookie Policy</h1>
          </div>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground">What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They are widely used to make websites work more efficiently, provide a better user experience, and provide 
              information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Alaska News Page uses cookies for the following purposes:
            </p>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <Settings className="h-4 w-4 text-primary" />
                  Essential Cookies
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  These cookies are necessary for the website to function properly. They enable basic functions like 
                  page navigation, secure areas access, and remembering your preferences such as dark/light mode.
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <ToggleLeft className="h-4 w-4 text-primary" />
                  Preference Cookies
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  These cookies allow our website to remember choices you make (such as your preferred region or 
                  language) and provide enhanced, more personal features.
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium text-foreground">Analytics Cookies</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously. This helps us improve our services.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              In some cases, we use cookies provided by trusted third parties. These include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Analytics services to help us understand how you use our site</li>
              <li>Video providers (like YouTube) when you watch embedded videos</li>
              <li>Social media platforms for sharing functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies 
              may impact your experience of our site. You can manage cookies by:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Adjusting your browser settings to refuse cookies</li>
              <li>Deleting cookies that have already been stored</li>
              <li>Setting your browser to alert you before cookies are placed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Your Consent</h2>
            <p className="text-muted-foreground leading-relaxed">
              By continuing to use our website, you consent to our use of cookies as described in this policy. 
              You can withdraw your consent at any time by clearing cookies from your browser or adjusting your 
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our use of cookies, please contact us at:{" "}
              <a href="mailto:privacy@alaskanewspage.com" className="text-primary hover:underline">
                privacy@alaskanewspage.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPage;
