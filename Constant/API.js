const BASE_URL = 'https://world-xchange.com/webservices/';
const API = {
  GET_COUNTRIES: BASE_URL + 'app/countries.php',
  SIGNUP_JOIN: BASE_URL + 'app/join.php',
  SIGNUP_JOIN_SECURITY: BASE_URL + 'app/join-security.php',
  LOGIN: BASE_URL + 'app/login.php',
  GET_SAFETY_QUESTIONS: BASE_URL + 'app/safety-rescued.php',
  SAFETY_QUESTIONS_LOGIN: BASE_URL + 'app/safety-rescued-questions.php',
  SAFETY_WHOAREYOU_LOGIN: BASE_URL + 'app/safety-login.php',
  ENTER_PIN: BASE_URL + 'app/unlock.php',
  SETTING_CONTACT_METHODS: BASE_URL + 'app/settings-contact-methods.php',
  SETTING_PASSWORD_PIN: BASE_URL + 'app/settings-contact-security.php',
  SETTING_RESET_RESCUE: BASE_URL + 'app/settings-reset-rescue.php',
  SETTING_NOTIFICATION: BASE_URL + 'app/settings-notifications.php',
  SETTING_CLOSE_ACCOUNT: BASE_URL + 'app/settings-close-account.php',
  WALLET_ADD_CARD: BASE_URL + 'app/wallet-add-card-new.php',
  WALLET_DELETE_CARD: BASE_URL + 'app/delete_card.php',
  DELETE_CARD: BASE_URL + 'app/delete_card.php',
  GET_OFFERS: BASE_URL + 'app/purchase-code-transactions.php',
  PURCHASE_OFFER: BASE_URL + 'app/get_purchase_code.php',
  PAYMENT_REQUEST: BASE_URL + 'app/purchase-two-new.php',
  BARCODE_REQUEST: BASE_URL + 'app/purchase-one.php',
};
export default API;
