"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsAndConditionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsAndConditionsDialog({ open, onOpenChange }: TermsAndConditionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read these terms and conditions carefully before using our service.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-base mb-2">1. Acceptance of Terms</h3>
              <p className="text-gray-700">
                By registering as a vendor on Bliss Vendors platform, you agree to be bound by these Terms and
                Conditions. If you do not agree to these terms, please do not register as a vendor.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">2. Vendor Registration</h3>
              <p className="text-gray-700 mb-2">
                To become a vendor on our platform, you must:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Be legally authorized to conduct business in your jurisdiction</li>
                <li>Maintain valid licenses and permits required for your services</li>
                <li>Update your information promptly when changes occur</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">3. Vendor Responsibilities</h3>
              <p className="text-gray-700 mb-2">
                As a vendor, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Providing high-quality services as described in your profile</li>
                <li>Responding to customer inquiries in a timely manner</li>
                <li>Honoring bookings and commitments made through the platform</li>
                <li>Maintaining professional conduct with all customers</li>
                <li>Ensuring all portfolio images and content are original or properly licensed</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">4. Fees and Payments</h3>
              <p className="text-gray-700 mb-2">
                The platform operates on the following payment terms:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Platform commission fees will be deducted from each booking</li>
                <li>Payments will be processed according to the payment schedule</li>
                <li>Vendors are responsible for their own tax obligations</li>
                <li>All fees are subject to change with prior notice</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">5. Content and Intellectual Property</h3>
              <p className="text-gray-700">
                You retain ownership of content you upload but grant Bliss Vendors a license to use, display, and
                promote your content on the platform. You warrant that you have all necessary rights to the content
                you provide and that it does not infringe on any third-party rights.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">6. Cancellation and Refunds</h3>
              <p className="text-gray-700 mb-2">
                Vendors must adhere to the following cancellation policies:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Clearly communicate your cancellation policy to customers</li>
                <li>Honor refund requests according to your stated policy</li>
                <li>Notify the platform and customers immediately of any cancellations</li>
                <li>Excessive cancellations may result in account suspension</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">7. Quality Standards</h3>
              <p className="text-gray-700">
                All vendors are expected to maintain high standards of service quality. We reserve the right to
                monitor service quality through customer reviews and feedback. Consistently poor ratings may result
                in account review or suspension.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">8. Prohibited Activities</h3>
              <p className="text-gray-700 mb-2">
                Vendors are strictly prohibited from:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Attempting to bypass the platform for direct transactions</li>
                <li>Posting false, misleading, or deceptive information</li>
                <li>Engaging in discriminatory practices</li>
                <li>Sharing customer information with third parties</li>
                <li>Using the platform for any illegal activities</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">9. Account Suspension and Termination</h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your vendor account at any time for violations of these
                terms, fraudulent activity, or for any reason we deem necessary to protect our platform and users.
                You may also terminate your account at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">10. Liability and Indemnification</h3>
              <p className="text-gray-700">
                Vendors agree to indemnify and hold harmless Bliss Vendors, its affiliates, and employees from any
                claims, damages, or expenses arising from your use of the platform or provision of services. The
                platform acts as an intermediary and is not responsible for disputes between vendors and customers.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">11. Dispute Resolution</h3>
              <p className="text-gray-700">
                In the event of disputes between vendors and customers, both parties agree to first attempt resolution
                through our platform's dispute resolution process. If resolution cannot be reached, parties may pursue
                other legal remedies as available under applicable law.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">12. Changes to Terms</h3>
              <p className="text-gray-700">
                We reserve the right to modify these Terms and Conditions at any time. Vendors will be notified of
                significant changes via email. Continued use of the platform after changes constitutes acceptance of
                the modified terms.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-base mb-2">13. Contact Information</h3>
              <p className="text-gray-700">
                For questions or concerns regarding these Terms and Conditions, please contact us at:
              </p>
              <p className="text-gray-700 mt-2">
                Email: support@blissvendors.com<br />
                Phone: +91 1800-XXX-XXXX
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
