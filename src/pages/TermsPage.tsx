import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />
      
      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Alaska News Page, you agree to be bound by these Terms of Service and all applicable 
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Use License</h2>
            <p className="text-muted-foreground leading-relaxed">
              Permission is granted to temporarily view the materials on Alaska News Page for personal, non-commercial use only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Disclaimer
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on Alaska News Page are provided on an 'as is' basis. We make no warranties, expressed or implied, 
              and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions 
              of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Accuracy of Materials</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials appearing on Alaska News Page may include technical, typographical, or photographic errors. 
              We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the 
              materials at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Alaska News Page has not reviewed all of the sites linked to its website and is not responsible for the contents 
              of any such linked site. The inclusion of any link does not imply endorsement by Alaska News Page. 
              Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you create an account on our website, you are responsible for maintaining the security of your account 
              and for all activities that occur under your account. You must immediately notify us of any unauthorized uses 
              of your account or any other breaches of security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Alaska News Page or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
              use the materials on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the State of Alaska, 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about the Terms of Service should be sent to us at:{" "}
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

export default TermsPage;
