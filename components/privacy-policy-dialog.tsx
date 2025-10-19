"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PrivacyPolicyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
          <DialogDescription>
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Information We Collect</h3>
              <p className="text-gray-700 mb-2">
                When you register as a vendor on Bliss Vendors, we collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, business address</li>
                <li><strong>Business Information:</strong> Business name, category, description, years of experience</li>
                <li><strong>Financial Information:</strong> Bank account details, GST number, PAN number (if provided)</li>
                <li><strong>Portfolio Content:</strong> Images, documents, and other media you upload</li>
                <li><strong>Usage Data:</strong> Information about how you use our platform, including IP address, browser type, and device information</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. How We Use Your Information</h3>
              <p className="text-gray-700 mb-2">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>To create and manage your vendor account</li>
                <li>To verify your identity and business credentials</li>
                <li>To display your services to potential customers</li>
                <li>To process bookings and payments</li>
                <li>To communicate with you about your account and bookings</li>
                <li>To improve our platform and services</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. Information Sharing and Disclosure</h3>
              <p className="text-gray-700 mb-2">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>With Customers:</strong> Your business information, portfolio, and contact details are visible to customers on the platform</li>
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who assist in operating our platform (payment processors, hosting services, etc.)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
              </ul>
              <p className="text-gray-700 mt-2">
                We will never sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Data Security</h3>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your information from unauthorized access,
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>Encryption of sensitive data during transmission (SSL/TLS)</li>
                <li>Secure storage of financial information</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-gray-700 mt-2">
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Data Retention</h3>
              <p className="text-gray-700">
                We retain your information for as long as your vendor account is active or as needed to provide services.
                Even after account closure, we may retain certain information to comply with legal obligations, resolve
                disputes, and enforce our agreements. You may request deletion of your data by contacting our support team.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Your Rights and Choices</h3>
              <p className="text-gray-700 mb-2">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Access:</strong> Request access to the personal information we hold about you</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information through your account settings</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Cookies and Tracking Technologies</h3>
              <p className="text-gray-700">
                We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mt-2">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our platform</li>
                <li>Improve platform performance and user experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-gray-700 mt-2">
                You can control cookie settings through your browser, but disabling cookies may affect platform functionality.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">8. Third-Party Links</h3>
              <p className="text-gray-700">
                Our platform may contain links to third-party websites or services. We are not responsible for the privacy
                practices of these external sites. We encourage you to review the privacy policies of any third-party sites
                you visit.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">9. Children's Privacy</h3>
              <p className="text-gray-700">
                Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If we become aware that we have collected information from a child, we will
                take steps to delete such information.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">10. International Data Transfers</h3>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your country of residence.
                These countries may have different data protection laws. By using our platform, you consent to such transfers.
                We ensure appropriate safeguards are in place to protect your information.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">11. Changes to This Privacy Policy</h3>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                We will notify you of significant changes via email or through a notice on our platform. The "Last Updated"
                date at the bottom of this policy indicates when it was last revised.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">12. Contact Us</h3>
              <p className="text-gray-700">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <p className="text-gray-700 mt-2">
                Email: privacy@blissvendors.com<br />
                Phone: +91 1800-XXX-XXXX<br />
                Address: [Your Business Address]
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">13. Compliance</h3>
              <p className="text-gray-700">
                We are committed to complying with applicable data protection laws, including but not limited to the
                Information Technology Act, 2000 and the Personal Data Protection Bill (when enacted). We regularly
                review and update our practices to ensure ongoing compliance.
              </p>
            </section>

            <section className="pt-4 border-t">
              <p className="text-gray-600 text-xs">
                Last Updated: October 19, 2025
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
