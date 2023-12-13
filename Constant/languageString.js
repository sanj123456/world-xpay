// I have follow this example for multi language : https://aboutreact.com/localization-in-react-native/
import React from 'react';
import LocalizedStrings from 'react-native-localization';
const strings = new LocalizedStrings({
  "en": {
    "closed-title": "Account Closed",
    "closed-subtitle": "Account Closed",
    "closed-txt-1": "Your account has been closed at your request on",
    "closed-txt-2": "All your personal data including personal financial information has been perminently deleted from this device and XPay servers. If you choose to open a new account, you can do so without any connection to previous accounts.",
    "closed-btn-create": "New Account",
    "common-error-missing": "Please ensure all fields are completed.",
    "common-error-network": "Unable to reach the network target. Please check your WiFi or data connection and try again.",
    "common-error-token": "We could not properly identify this device. Please see Help under Device Identity Failure to resolve this issue.",
    "common-success-write": "Your changes have been saved!",
    "home-nav-about": "About",
    "home-nav-dbtest": "DB Test",
    "home-nav-help": "Help",
    "home-nav-unlock": "Lock",
    "home-nav-purchase": "Purchase",
    "home-nav-settings": "Settings",
    "home-nav-timeline": "Timeline",
    "home-nav-messages": "Offers",
    "home-nav-wallet": "Wallet",
    "home-title-world": "World",
    "home-title-xpay": "XPay",
    "purchase-title": "Purchase",
    "purchase-approve-title": "Payment Request",
    "purchase-btn-cancel": "Cancel",
    "purchase-btn-ok": "OK",
    "purchase-btn-tryagain": "Try Again",
    "purchase-approve-txt-onyour": "On Your",
    "purchase-approve-txt-xgiftsource": "Approve by selecting a source to fund your XGift Card.",
    "purchase-approve-txt-noxgift": "Approve by selecting a card.",
    "purchase-error-title": "Purchase Error",
    "purchase-error-issue-title": "Something's not right!",
    "purchase-error-resolution-title": "Try this",
    "purchase-error-resolution": "Resolution",
    "purchase-error-issue-301": "We could not find valid information for this merchant. Either the Purchase Code you scanned is not a valid XPay Code or this merchant is not in good standing. Though unlikely, this might be a fraud attempt.",
    "purchase-error-resolution-301": "Ensure you did not accidentally scan the wrong code. If you continue to get this error, tell the merchant to contact us. Your security has NOT been compromised.",
    "purchase-error-issue-302": "Your device was unable to get a clear scan of the Purchase Code.",
    "purchase-error-resolution-302": "Make sure the Purchase Code is completely visible in the viewer when scanning. Try getting closer or further away from the Purchase Code kiosk.",
    "purchase-error-issue-303": "The Purchase Code you scanned is not in a useable status, it",
    "purchase-error-resolution-303": "Ensure you did not accidentally scan the wrong code. If you continue to get this error, ask the merchant to regenerate the Purchase Code.",
    "purchase-error-issue-304": "The Purchase Code you just scanned is not a valid XPay Code. This might be a fraud attempt.",
    "purchase-error-resolution-304": "Ensure you did not accidentally scan the wrong code. If you continue to get this error, walk away. Your security has NOT been compromised.",
    "purchase-error-issue-305": "Your account is in a '<i>Do Not Process</i>' status. This usually means the account has been closed or temporarily suspended.",
    "purchase-error-resolution-305": "Due to XPay's strong security policies and for your protection, this issue can only be resolved by contacting us or creating a new account.",
    "purchase-error-issue-306": "Who are you? We do not recognize this phone. This is potentially a serious issue. For your protection, we have terminated this purchase attempt.",
    "purchase-error-resolution-306": "Did you reinstall the App, reset or get a new phone? We suggest you completely uninstall the App immediately and try reinstalling it, then navigate to the login screen and sign in.",
    "purchase-error-issue-307": "Scan cancelled. If this was unintentional, try scanning the Purchase Code again.",
    "purchase-error-resolution-307": "If you continue to get this error, your device may be having difficulty scanning Purchase Codes. Close any apps that scan QR or barcodes, or restart your device and try again.",
    "purchase-error-title-401": "Network Failure",
    "purchase-error-issue-401": "A response was not received from the banking networks.",
    "purchase-error-resolution-401": "There is really nothing we can do here except try the transaction again. The merchant has also been notified of this error.",
    "purchase-error-title-403": "Card Declined",
    "purchase-error-issue-403": "Dang!<br>The card you selected has been declined.",
    "purchase-error-resolution-403": "Hey, it happens, no worries. Try again and select a different card or just hit cancel. The merchant has not and will not be notified. Your finances are your own business!",
    "purchase-error-title-404": "No Security Handshake",
    "purchase-error-issue-404": "Unable to verify a secure connection was made between your device and ours.",
    "purchase-error-resolution-404": "No harm, no foul as they say. Lets try this again and see if we can't get our devices to be friends again.",
    "purchase-error-title-406": "Unknown Card Presented",
    "purchase-error-issue-406": "We couldn't validate the card you selected.",
    "purchase-error-resolution-406": "This is not a fancy way to say your card was declined. We really were unable to match the card with your security data. Check the card's expiration date and ensure it is able to be used. If this is a shared card, your privledges might have expired.",
    "purchase-error-title-408": "Unknown Error",
    "purchase-error-issue-408": "What the...<br>Unexpected response while communicating with the banking networks.",
    "purchase-error-resolution-408": "Your card was not declined. We simply got a response back from your bank that didn't make any sense. This is usually an error on their end. The only thing we can do is try again. If you contnue to get this error, maybe try if different card.",
    "purchase-suberror-303-2": " has been canceled by the merchant.",
    "purchase-suberror-303-3": " has already been scanned once.",
    "purchase-suberror-303-4": " has already been redeemed.",
    "purchase-suberror-303-5": " encountered problems during creation and for your protection has been marked invalid.",
    "purchase-success-title": "Payment Successful!",
    "purchase-success-subtitle": "You have successfully made<br>a payment to",
    "purchase-txt-using-xgift": "Using your XGift card.",
    "timeline-title": "Timeline",
    "timeline-subtitle": "Timeline",
    "timeline-txt-select": "Select a card",
    "timeline-txt-no-history": "There are no transactions for this account yet.",
    "messages-title": "Purchase Offers",
    "messages-subtitle": "Purchase Offers",
    "purchase-approve-btn": "Approve",
    "purchase-decline-btn": "Decline",
    "messages-txt-no-message": "There are no offers for this account yet.",
    "tip": "Tip",
    "wallet-btn-save": "Save",
    "wallet-btn-yesdelete": "Yes, delete card",
    "wallet-btn-add-card": "Add Card",
    "wallet-label-card-code": "Card Code",
    "wallet-label-card-exp": "Card Expiration Date",
    "wallet-label-card-name": "Name on Card",
    "wallet-label-card-nick": "Card Nickname",
    "wallet-label-card-number": "Card Number",
    "wallet-label-card-zip": "Card Postal Code",
    "wallet-ph-card-exp": "MMYY",
    "wallet-subtitle-card-wallet": "Card Wallet",
    "wallet-subtitle-addcard": "Add Card",
    "wallet-subtitle-editcard": "Edit Card",
    "wallet-subtitle-safety": "For your safety, card data cannot be reterieved on this device. Therefore, be sure to use descriptive nicknames.",
    "wallet-subtitle-verifydelete": "Verify Delete",
    "wallet-subtitle-card-types": "Credit - Debit - Pre-paid",
    "wallet-subtitle-before-purchase": "Before you make a purchase you must",
    "wallet-symbol-plus": "+",
    "wallet-title": "Wallet",
    "wallet-title-deletecard": "Delete Card",
    "wallet-title-editcard": "Edit Card",
    "wallet-txt-cant-undo": "This process cannot be undone.",
    "wallet-txt-card-only": "Card information only",
    "wallet-txt-card-history": "Card information and history",
    "wallet-txt-how-delete": "Select how you would like to delete this card.",
    "wallet-txt-off": "off",
    "wallet-txt-on": "on",
    "wallet-txt-reflex": "RefleX is",
    "wallet-txt-reflex-desc": "When RefleX is turned on, the top card in your wallet will be used by default. If this card fails, RefleX will automatically try the next card. You can arrange cards by touching the arrows and dragging to the desired position.",
    "wallet-txt-tm": "TM",
    "wallet-txt-warning": "Warning!",
    "wallet-error-203": "Banking networks could not be reached. Please check your network connection.",
    "wallet-error-204": "This account is already in your Wallet.",
    "wallet-error-206": "Card could not be authorized. Carefully check your information.",
    "wallet-error-210": "We are not able to add this card. Please try again.",
    "settings-btn-authorize": "Authorize",
    "settings-btn-back": "Back",
    "settings-btn-closeaccount": "Close Account",
    "settings-btn-next": "Next",
    "settings-btn-save": "Save",
    "settings-error-authorization": "Incorrect PIN. Please try again.",
    "settings-error-close": "We ecountered an error while trying to close your account. Please try again. Your account is still active.",
    "settings-error-close-password": "Incorrect password!",
    "settings-error-close-agree": "You must agree to the Account Closure Terms.",
    "settings-error-contact-phone": "The phone number you entered is invalid. Please try again.",
    "settings-error-contact-email": "The email address you entered is invalid. Please try again.",
    "settings-error-contact-duplicate": "Update failed! One or more of the values entered is invalid. Phone must be the number for this device and email must be unique.",
    "settings-error-notifications": "We encountered an error while trying to save your notification settings. Please try again.",
    "settings-error-privacy": "We encountered an error while trying to save your privacy settings. Please try again.",
    "settings-error-purchase": "We encountered an error while trying to save your purchase settings. Please try again.",
    "settings-error-rescue": "",
    "settings-error-security-password-format": "Password must contain a number and a capital letter.",
    "settings-error-security-password-length": "Password must be between 8 and 20 characters long.",
    "settings-error-security-password-mismatch": "Passwords do not match.",
    "settings-error-security-pin-format": "PIN can only contain numbers.",
    "settings-error-security-pin-length": "PIN must be between 4 and 7 numbers.",
    "settings-error-security-pin-mismatch": "PINs do not match.",
    "settings-label-agree": "I agree",
    "settings-label-announcements": "About XPay announcements",
    "settings-label-email": "Email",
    "settings-label-enter-pin": "Please enter your PIN",
    "settings-label-disuse": "General disuse",
    "settings-label-how-use": "Unsure how to use",
    "settings-label-merchants-frequent": "From the merchants I frequent",
    "settings-label-merchants-all": "All merchants",
    "settings-label-none": "None",
    "settings-label-not-accepted": "Not accepted where I shop",
    "settings-label-other": "Other",
    "settings-label-password": "Password",
    "settings-label-reenter-password": "Re-enter Password",
    "settings-label-pin": "PIN",
    "settings-label-reenter-pin": "Re-enter PIN",
    "settings-label-question-1": "Question 1",
    "settings-label-question-2": "Question 2",
    "settings-label-question-3": "Question 3",
    "settings-label-require-pin": "Require PIN for all purchases",
    "settings-label-save-history": "Save my purchase history",
    "settings-label-securityconcerns": "Security concerns",
    "settings-label-share-name": "Share my name, phone and email when purchasing",
    "settings-label-telephone": "Telephone",
    "settings-label-thirdparty": "Third-party offers that match my purchase history",
    "settings-nav-closeaccount": "Close Account",
    "settings-nav-contactmethods": "Contact Methods",
    "settings-nav-notificationsettings": "Notification Settings",
    "settings-nav-passwordpin": "Password and PIN",
    "settings-nav-privacyterms": "Privacy and Terms",
    "settings-nav-purchasesettings": "Purchase Settings",
    "settings-nav-resetrescue": "Reset and Rescue",
    "settings-option-alwaysrequire": "Always require",
    "settings-option-alwaysshare": "Always share",
    "settings-option-choose-eachtime": "Let me choose each time",
    "settings-option-cloud": "In the cloud",
    "settings-option-device": "On this device",
    "settings-option-device-cloud": "Both device and cloud",
    "settings-option-neverrequire": "Never require",
    "settings-option-nevershare": "Never share",
    "settings-option-neversave": "Never save",
    "settings-subtitle": "App Settings",
    "settings-subtitle-authorization": "Secure area. Please enter your PIN to continue",
    "settings-subtitle-closeaccount": "Close Account",
    "settings-subtitle-contactmethods": "Contact Methods",
    "settings-subtitle-notifications": "Notification Settings",
    "settings-subtitle-privacyterms": "Privacy and Terms",
    "settings-subtitle-privacysecurity": "Security",
    "settings-subtitle-purchasesettings": "Purchase Settings",
    "settings-subtitle-resetrescue": "Reset and Account Rescue",
    "settings-subtitle-warning": "Warning!",
    "settings-ph-answer": "Your answer",
    "settings-ph-q1": "e.g. Mom's middle name",
    "settings-ph-q2": "e.g. My kindergarten teacher",
    "settings-ph-q3": "e.g. My first phone",
    "settings-success-close": "Your account has been closed.",
    "settings-title": "Settings",
    "settings-title-authorization": "Authorization",
    "settings-title-closeaccount": "Close Account",
    "settings-title-contactmethods": "Contact Methods",
    "settings-title-notifications": "Notifications",
    "settings-title-privacysecurity": "Security",
    "settings-title-privacyterms": "Privacy and Terms",
    "settings-title-purchasesettings": "Purchase Settings",
    "settings-title-resetrescue": "Reset and Rescue",
    "settings-txt-close-reason": "Reason for closing account.",
    "settings-txt-close-warning": "Account Closure Terms - When you close your XPay Account, you understand that this is an irreversible action. All of your data and App settings will be deleted from both your device and remote storage. If you decide to leave the XPay App on your device, it will become unusable. Please see additional agreements in the Terms & Conditions.",
    "settings-txt-enter-answers": "Now enter your answers.",
    "settings-txt-important": "IMPORTANT!",
    "settings-txt-intheevent": "In the event you forget your password and get locked out, you can only recover your account by answering security questions.",
    "settings-txt-push-notifications": "Send me push notification offers",
    "settings-txt-reason": "Reason for closing account",
    "settings-txt-send-email": "Send me email",
    "settings-txt-threequestions": "Enter 3 questions to ask yourself that only you or very few people will know.",
    "help-title": "Help",
    "help-subtitle": "Help",
    "about-title": "About",
    "about-subtitle": "About XPay",
    "about-txt-world-xpay": "World XPay",
    "about-txt-division-of": "is a division of",
    "about-txt-address": "PO Box 7492",
    "about-txt-loveland-co-usa": "Loveland, Colorado 80537 USA",
    "about-txt-general-inquiry": "General: ",
    "about-txt-email-general": "hello@world-xchange.com",
    "about-txt-customer-inquiry": "Customers: ",
    "about-txt-email-customer": "service@world-xchange.com",
    "about-txt-merchant-inquiry": "Merchants: ",
    "about-txt-email-merchant": "merchants@world-xchange.com",
    "about-txt-press-inquiry": "Press: ",
    "about-txt-email-press": "press@world-xchange.com",
    "about-txt-acquirer-inquiry": "Acquirers: ",
    "about-txt-email-acquirer": "acquirers@world-xchange.com",
    "about-txt-press": "Press information and media kits visit:",
    "about-txt-media-link": "https://world-xchange.com/media",
    "about-txt-version": "Version:",
    "about-txt-copyright": "World XChange Inc. All rights reserved.",
    "about-txt-patent-notice": "U.S. and International patents pending.",
    "unlock-title": "Unlock",
    "unlock-subtitle": "Account Locked",
    "unlock-label-pin": "Enter PIN",
    "unlock-btn-unlock": "Unlock",
    "unlock-error": "Incorrect PIN",
    "join-title": "World XPay",
    "join-subtitle-create": "Create",
    "join-subtitle-account": "Your Free Account",
    "join-lable-firstname": "First Name",
    "join-lable-lastname": "Last Name",
    "join-lable-email": "Email",
    "join-lable-telephone": "Telephone",
    "join-lable-postalcode": "Postal Code",
    "join-country": "Country",
    "join-lable-agree": "Agree to the",
    "join-btn-terms": "Terms",
    "join-btn-next": "Next",
    "join-btn-create-account": "Create Account",
    "join-btn-login": "Login",
    "join-txt-have-account": "Already have an account?",
    "join-security-title": "Security",
    "join-security-subtitle-so-far": "So far, so good!",
    "join-security-subtitle": "Account Security",
    "join-security-subtitle-create-password": "Create a Password and PIN",
    "join-security-lable-password": "Password",
    "join-security-password-instructions": "Up to 20 characters,",
    "join-security-password-instructions1": "1 or more number, 1 or more capital.",
    "join-security-lable-password2": "Re-enter Password",
    "join-security-lable-pin": "PIN",
    "join-security-pin-instructions": "Up to 8 numbers, no letters.",
    "join-security-lable-pin2": "Re-enter PIN",
    "join-security-btn-start-over": "Start Over",
    "join-error-no-deviceids": "XPay cannot be loaded on a virtual device. Otherwise, ensure you have granted all permissions.",
    "join-error-telephone": "A valid telephone is required",
    "join-error-email": "A valid email is required",
    "join-error-account-exists": "An account already exists containing some of the information you entered. Check your entries or try to login.",
    "join-security-error-pin-length": "PIN must be between 4 and 8 numbers.",
    "join-security-error-pin-notmatch": "PINs entered do not match.",
    "join-security-error-pass-content": "Password must contain upper and lowercase letters and at least 1 number.",
    "join-security-error-pass-length": "Password must be between 8 and 20 characters",
    "join-security-error-pass-notmatch": "Passwords entered do not match.",
    "setup-title": "Setup",
    "setup-subtitle": "Welcome",
    "setup-btn-security": "Set up account \n rescue",
    "setup-btn-add-card": "Add a credit\nor debit card",
    "setup-txt-incomplete": "Just a couple more items before we're ready to go.",
    "setup-txt-complete": "All done!<br>You can now make fraud-proof purchases.",
    "security-title": "Security Check",
    "security-subtitle": "Determining device capability",
    "security-txt-please-wait": "Please wait",
    "login-title": "Login",
    "login-subtitle": "Account Login",
    "login-lable-email": "Email",
    "login-lable-password": "Password",
    "login-btn-login": "Login",
    "login-txt-no-account": "No account?",
    "login-btn-get-one": "Get a free one here",
    "login-error-mismatch": "Incorrect Email or Password",
    "prepfail-title": "Device Failure",
    "prepfail-title-permissions": "Missing Permissions",
    "prepfail-title-db": "Unsafe Device",
    "prepfail-txt-permissions": "XPay cannot be safely installed on this device. This can be fixed by closing the app and going to your device settings and allow all permissions requested by the XPay App.",
    "prepfail-txt-db": "We are very sorry, but XPay connot be installed on this device due to inadequate technical and security specifications.",
    "safety-title": "Safety Stop",
    "safety-title-spooky": "Who are you?",
    "safety-title-suspend": "Suspended Account",
    "safety-title-cancelled": "Account Cancelled",
    "safety-title-legal": "Disabled Account",
    "safety-txt-suspended": "Your account is currently suspended, pending further investigation by XPay or other authorities. Please feel free to contact XPay if you have questions.",
    "safety-txt-cancelled": "Your account has been cancelled and cannot be revived or reclaimed. You may however try creating a new account.",
    "safety-txt-legal": "Your acount is currently disabled, either by your request or legal and/or banking authorities. No other information is available at this time. Please feel free to contact XPay if you have questions.",
    "safety-txt-login": "Account could not be created. It appears you may already have an account. Please go back and check your input or reclaim your account by completing the form below.",
    "safety-txt-rescue": "Incorrect username or password. Please try again or choose to answer the security questions.",
    "safety-txt-enter-answers": "Answer the following questions.",
    "safety-lable-phone-email": "Phone or Email",
    "safety-lable-username": "Username",
    "safety-lable-password": "Password",
    "safety-lable-pin": "PIN",
    "safety-btn-login": "Reclaim Account",
    "safety-btn-back": "Go Back",
    "safety-btn-rescue": "Answer Security Questions Instead",
    "safety-error-title-mismatch": "That didn't work!",
    "safety-error-mismatch": "Some of the information you entered is incorrect. Carefully check your entries and try again or go back and start over.",
    "rescued-title": "Safety Check",
    "rescued-title-hooray": "Hooray!",
    "rescued-txt-hooray": "Good job! Just one more step to help ensure this is really your account.",
    "rescued-title-incorrect": "Oh!",
    "rescued-txt-incorrect": "One or more of your answers didn't match. Please try again.",
    "rescued-btn-submit": "Submit",
    "rescued-btn-start-over": "Start Over",
    "rescued-title-abort": "Reclaim Failed!",
    "rescued-txt-abort": "The account you are attempting to access was not setup properly and therefore cannot be reclaimed. If this account contained any sensative data, it has been wiped clean. You may now start over without any issues.",
    "rescued-btn-abort-start-over": "Start Over",
    "tour-title": "XPay Tour",
    "tour-btn-skip": "SKIP",
    "tour-0-subtitle": "The most powerful pay app in the world!",
    "tour-0-txt-1": "<i>You have just downloaded</i>",
    "tour-0-txt-2": "<i>And setting up your account is both free and easy.<i>",
    "tour-1-subtitle": "Fraud stops here!",
    "tour-1-txt-1": "Despite all the new technology, card fraud continues to rise. Most fraud happens at the local level during the transaction or through a breach of your stored data. XPay changes how cards work.",
    "tour-1-txt-2": "In the USA 447 million records were exposed through data breaches in 2018. Since US population is only 330 million, your chances of exposure is a certainty.",
    "tour-1-footer": "This is the only app<br>that protects you!",
    "tour-2-subtitle": "Are mobile wallets safe?",
    "tour-2-txt-1": "Actually, no. All mobile wallets process payments the same ol' vulnerable way, only they encrypt your data; encryption is broken all the time.",
    "tour-2-txt-2": "There is no reason to believe Apple Pay is making you any more or less vulnerable than usual.<br><i>(Thrillist - Joe McGauley)</i>",
    "note-source": "Thrillist - Joe McGauley 12/11/2015 (Why Apple Pay May Not Be as Secure as You Think) https://www.thrillist.com/tech/nation/is-apple-pay-safe-and-secure-risks-of-using-apple-pay",
    "tour-2-footer": "XPay is different,<br>it's fraud-proof!",
    "tour-3-subtitle": "Stop giving access to your accounts!",
    "tour-3-txt-1": "When you give someone your card, you are granting them access to your hard-earned cash and credit. Banks can't tell the difference between real and fraudulent payment requests.",
    "tour-3-txt-2": "61% of credit card fraud is committed by those you willingly give your card to; trusting they will only charge what you authorized.",
    "tour-3-footer": "Never again<br>give anyone access!",
    "tour-4-subtitle": "Ever lost a card?",
    "tour-4-txt-1": "The cards in your wallet are literally access points to your finances; it's incredible that we carry something so dangerous around with us.",
    "tour-4-txt-2": "Nearly 25% of fraud from lost cards happens before they were noticed missing.",
    "tour-4-footer": "Leave your cards home!",
    "tour-5-subtitle": "The invisible breach",
    "tour-5-txt-1": "What do you really share during a purchase?  Personal data can be more valuable than the purchase, which is usually harvested without your knowledge.",
    "tour-5-txt-2": "Hackers are catching up with EMV technology and are able to skim the valuable information on the chip in your card. Over half of global email in 2019 was Spam.",
    "tour-5-footer": "Never be skimmed again!",
    "tour-6-subtitle": "Make cards work like cash",
    "tour-6-txt-1": "Cash is the only way you can make a safe and private transaction, but carrying cash is very dangerous; one of the reasons cards were invented.",
    "tour-6-txt-2": "Cash will account for less than 12% of purchases this year, coinciding with government abhorance for it, due to the inability to identify the buyer.",
    "tour-6-footer": "Cards can work like cash!",
    "tour-7-subtitle": "It's none of their business",
    "tour-7-txt-1": "Why is a card decline the business of the retailer and everyone within earshot? Who put the retailer in charge? You should be <i>privately</i> informed, especially if you're at the checkout.",
    "tour-7-txt-2": "Consumers have stedily experienced rising false declines due to the ever-increasing complexity of security algorithums; resulting in lower consumer confidence and frustration.",
    "tour-7-footer": "Take back your privacy with XPay!",
    "tour-8-subtitle": "No more checkout forms!",
    "tour-8-txt-1": "You only have 2 choices online, fill-out another long form or allow the retailer to store your information; both are equally abhorant. ",
    "tour-8-txt-2": "No matter where I am, whether online or standing in line, every purchase is the same simple and fraud-proof click!",
    "tour-8-footer": "This what<br>'<i>You being in charge</i>'<br>looks like!",
    "tour-9-subtitle": "Benefits without compromise!",
    "tour-9-txt-1": "Enter all your cards into the app. XPay doesn't make you change your cards, it changes how your cards work; making them private, easier to use, and completely fraud-proof!",
    "tour-9-txt-2": "I get all of the peerks, points and rewards from my cards just as before, but with XPay they are now all fraud-proof!",
    "tour-btn-create": "Create Account",
    "tips-number-validation": "Tip % should be less than 100",
    "btn-close": "Close",
    "register": "Register",
    "register-validation-first-name": "Please enter first name",
    "register-validation-last-name": "Please enter last name",
    "register-validation-telephone": "Please enter telephone",
    "register-validation-email": "Please enter email",
    "register-validation-postalcode": "Please enter postal code",
    "register-validation-terms": "You must agree to terms",
    "register-validation-password": "Please enter password",
    "register-validation-confirm-password": "Please enter confirm password",
    "register-validation-pin": "Please enter pin",
    "register-validation-account-suspend": "Your account has been suspend",
    "reset-rescue-validation-question-1": "Please enter Question 1",
    "reset-rescue-validation-question-2": "Please enter Question 2",
    "reset-rescue-validation-question-3": "Please enter Question 3",
    "reset-rescue-validation-answer": "Please enter Answer of ",
    "wallet-validation-card_number": "Please enter card number",
    "wallet-validation-card_exp": "Please enter card expiration date",
    "wallet-validation-card_code": "Please enter card code",
    "wallet-validation-card_name": "Please enter card name",
    "wallet-validation-card_zip": "Please enter card postal code",
    "wallet-validation-card_nick": "Please enter card nick name"
    
  },
  "fr": {
    "join-subtitle-create": "Create fr"
  }
});
export default strings;
