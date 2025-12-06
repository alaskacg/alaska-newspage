import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Shield, FileText, Scale, Eye, Lock } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Alaska News Page ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect personal information that you voluntarily provide when you register for an account, 
                  subscribe to newsletters, or contact us. This may include your name, email address, and preferences.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-foreground">Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you access our website, we may automatically collect certain information including your IP address, 
                  browser type, operating system, referring URLs, and pages viewed.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To send you newsletters and updates (with your consent)</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share information with 
              service providers who assist in operating our website, conducting our business, or serving our users, 
              so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to access, update, or delete your personal information. You may also opt out of 
              receiving marketing communications from us at any time by following the unsubscribe instructions 
              included in our emails or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:{" "}
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

export default PrivacyPage;
