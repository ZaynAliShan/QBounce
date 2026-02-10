import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-4xl">
          {/* Page title */}
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white border-b border-primary-orange/40 pb-4 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: February 2026
            </p>
          </header>

          <div className="space-y-8">
            {/* Section 1 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 1 – What Do We Do With Your Information?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                When You Purchase Something From Our Store, As Part Of The Buying And Selling Process, We Collect The Personal Information You Give Us Such As Your Name, Address And Email Address. When You Browse Our Store, We Also Automatically Receive Your Computer&apos;s Internet Protocol (IP) Address In Order To Provide Us With Information That Helps Us Learn About Your Browser And Operating System.Email Marketing (if Applicable): With Your Permission, We May Send You Emails About Our Store, New Products, And Other Updates.
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 2 – Consent
              </h2>
              <p className="text-gray-300 leading-relaxed">
                When You Provide Us With Personal Information To Complete A Transaction, Verify Your Credit Card, Place An Order, Arrange For A Delivery Or Return A Purchase, We Imply That You Consent To Our Collecting It And Using It For That Specific Reason Only.If We Ask For Your Personal Information For A Secondary Reason, Like Marketing, We Will Either Ask You Directly For Your Expressed Consent Or Provide You With An Opportunity To Say No.If After You Opt-in, You Change Your Mind, You May Withdraw Your Consent For Us To Contact You, For The Continued Collection, Use Or Disclosure Of Your Information, At Any Time, By Contacting Us By Using The Form In The Contact Us Page.
              </p>
            </section>

            {/* Section 3 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 3 – Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We May Disclose Your Personal Information If We Are Required By Law To Do So Or If You Violate Our Terms Of Service.
              </p>
            </section>

            {/* Section 4 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 4 – Third-Party Services
              </h2>
              <p className="text-gray-300 leading-relaxed">
                In General, The Third-party Providers Used By Us Will Only Collect, Use And Disclose Your Information To The Extent Necessary To Allow Them To Perform The Services They Provide To Us. However, Certain Third-party Service Providers, Such As Payment Gateways And Other Payment Transaction Processors, Have Their Own Privacy Policies In Respect To The Information We Are Required To Provide To Them For Your Purchase-related Transactions. For These Providers, We Recommend That You Read Their Privacy Policies So You Can Understand The Manner In Which Your Personal Information Will Be Handled By These Providers. In Particular, Remember That Certain Providers May Be Located In Or Have Facilities That Are Located In A Different Jurisdiction Than Either You Or Us. So If You Elect To Proceed With A Transaction That Involves The Services Of A Third-party Service Provider, Then Your Information May Become Subject To The Laws Of The Jurisdiction(s) In Which That Service Provider Or Its Facilities Are Located. As An Example, If You Are Located In Canada And Your Transaction Is Processed By A Payment Gateway Located In The United States, Then Your Personal Information Used In Completing That Transaction May Be Subject To Disclosure Under United States Legislation, Including The Patriot Act. Once You Leave Our Store&apos;s Website Or Are Redirected To A Third-party Website Or Application, You Are No Longer Governed By This Privacy Policy Or Our Website&apos;s Terms Of Service.
              </p>
            </section>

            {/* Section 5 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 5 – Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                To Protect Your Personal Information, We Take Reasonable Precautions And Follow Industry Best Practices To Make Sure It Is Not Inappropriately Lost, Misused, Accessed, Disclosed, Altered Or Destroyed.If You Provide Us With Your Credit Card Information, The Information Is Encrypted Using Secure Socket Layer Technology (SSL) And Stored With AES - 256 Encryption.Although No Method Of Transmission Over The Internet Or Electronic Storage Is 100% Secure, We Follow All PCI - DSS Requirements And Implement Additional Generally Accepted Industry Standards.
              </p>
            </section>

            {/* Section 6 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 6 – Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Here Is A List Of Cookies That We Use. We&apos;ve Listed Them Here So You That You Can Choose If You Want To Opt-out Of Cookies Or Not._session_id, Unique Token, Sessional, Allows Shopify To Store Information About Your Session(referrer, Landing Page, Etc). _Shopify_visit, No Data Held, Persistent For 30 Minutes From The Last Visit, Used By Our Website Provider&apos;s Internal Stats Tracker To Record The Number Of Visits_Shopify_uniq, No Data Held, Expires Midnight(relative To The Visitor) Of The Next Day, Counts The Number Of Visits To A Store By A Single Customer. Cart, Unique Token, Persistent For 2 Weeks, Stores Information About The Contents Of Your Cart. _secure_session_id, Unique Token, Sessional Storefront_digest, Unique Token, Indefinite If The Shop Has A Password, This Is Used To Determine If The Current Visitor Has Access.
              </p>
            </section>

            {/* Section 7 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 7 – Age of Consent
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By Using This Site, You Represent That You Are At Least The Age Of Majority In Your State Or Province Of Residence, Or That You Are The Age Of Majority In Your State Or Province Of Residence And You Have Given Us Your Consent To Allow Any Of Your Minor Dependents To Use This Site.
              </p>
            </section>

            {/* Section 8 */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Section 8 – Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We Reserve The Right To Modify This Privacy Policy At Any Time, So Please Review It Frequently. Changes And Clarifications Will Take Effect Immediately Upon Their Posting On The Website. If We Make Material Changes To This Policy, We Will Notify You Here That It Has Been Updated, So That You Are Aware Of What Information We Collect, How We Use It, And Under What Circumstances, If Any, We Use And / Or Disclose It. If Our Store Is Acquired Or Merged With Another Company, Your Information May Be Transferred To The New Owners So That We May Continue To Sell Products To You.
              </p>
            </section>

            {/* Questions and Contact Information */}
            <section className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-orange mb-4 uppercase tracking-wide">
                Questions and Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If You Would Like To: Access, Correct, Amend Or Delete Any Personal Information We Have About You, Register A Complaint, Or Simply Want More Information Contact Our Privacy Compliance Officer By Using The Form In The Contact Us Page.
              </p>
            </section>

            {/* Subscription Data – exact order from screenshot 5 */}
            <section className="pt-6 border-t border-gray-800">
              <h2 className="text-xl font-semibold text-primary-orange mb-6">Subscription Data</h2>

              <div className="space-y-6">
                <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-orange mb-3 uppercase tracking-wide">
                    Subscription Data Collection
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    When You Subscribe To QBounce Services, We Collect Additional Information Such As Subscription Type, Purchase Date, Renewal Date, And Billing Information Necessary To Manage Your Subscription.
                  </p>
                </div>

                <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-orange mb-3 uppercase tracking-wide">
                    Auto-Renewal & Billing Information
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Your Subscription Will Auto-renew Unless You Disable Auto-renew At Least 24 Hours Before The End Of The Current Period. Billing Information Is Stored Securely And Used Solely For Processing Subscription Payments.
                  </p>
                </div>

                <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-orange mb-3 uppercase tracking-wide">
                    Managing Subscription Data
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    You Can View And Manage Your Subscription-related Information In Your Account Settings. This Includes Turning Off Auto-renewal Or Updating Billing Information.
                  </p>
                </div>

                <div className="bg-gray-900/60 rounded-lg border border-gray-800 p-6 sm:p-8">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-orange mb-3 uppercase tracking-wide">
                    Sharing Subscription Data
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We Do Not Share Subscription-related Personal Information With Third Parties, Except For Payment Processing, Legal Obligations, Or As Required For Service Delivery.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link
              to="/"
              className="inline-flex items-center text-primary-orange hover:text-primary-orange/90 transition-colors font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPage
