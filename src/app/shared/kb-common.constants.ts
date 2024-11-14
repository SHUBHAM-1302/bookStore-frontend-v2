/**
 *
 * This class contains constants used across the mercodesk
 *
 */

export const NAMEMAXLENGTH = 200;
export const NUMBER_MIN_LENGTH = 10;
export const NUMBER_MAX_LENGTH = 12;
export const DESCRIPTIONMAXLENGTH = 1500;
export const NUMONE = 1;
export const NUMTWO = 2;
export const NUMTHREE = 3;
export const NUMFOUR = 4;
export const NUMEIGHT = 8;
export const NUMTWELVE = 12;
export const NUMSIXTEEN = 16;
export const NUMTWENTY = 20;
export const NUMTHIRTYTWO = 32;
export const TOTALPERCENTAGE = 100;
export const THOUSAND = 1000;
export const HUNDRED = 100;
export const MILLIS_IN_SECOND = 1000;
export const SECONDS_IN_HOUR = 3600;
export const HOURS_IN_DAY = 24;
export const INTEGER_MAX = 2147483646;

// environment constants
export const DEVENVIRONMENT = 'dev';
export const STAGEENVIRONMENT = 'stage';
export const TESTENVIRONMENT = 'test';
export const PRODENVIRONMENT = 'prod';

//Freight constants
export const FREIGHT_TYPE_COUNT = 'By Count';
export const FREIGHT_TYPE_WEIGHT = 'By Weight';
export const FREIGHT_TYPE_LUMPSUM = 'Lumpsum';

//Discount and brokerage dropdown constants of salesbill
export const SB_PERCENTAGE = '%';
export const DISCOUNT_AMT_TYPE = 'Amt';

//shopmanager settings
export const CHARGESSETTINGS = 'CHARGES-SETTINGS';
export const PRINTSETTING = 'PRINT-SETTINGS';
export const POSTWEIGHING = 'POSTWEIGHING';
export const INPROGRESS = 'INPROGRESS';
export const OPEN = 'OPEN';
export const ROUNDOFFSETTINGS = 'ROUNDOFF-SETTINGS';
export const SETTING_TITLE_RATES_AND_COMMISSION = 'Rate, Commission & Fees';
export const SETTING_TITLE_WEIGHTS_ROUND_OFF = 'Weights values round off';
export const SETTING_TITLE_AMOUNT_ROUND_OFF = 'Amount values round off';
export const SETTING_TITLE_COOLIE_AMT = 'Coolie charges setting';
export const NUMBER = 'NUMBER';
export const STRING = 'STRING';
export const KG = 'KG';
export const DOUBLE = 'DOUBLE';
export const BOOLEAN = 'BOOLEAN';
export const REPLACE = 'replace';
export const PACKAGE = 'Package';
export const SI_UNIT = 'SI Unit';
export const RATE_PER = 'Rate per';
export const COMMODITY = 'Commodity';
export const USER_FEE = 'User Fee %';
export const COMMISSION = 'Commission %';
export const WEIGHMENTCHARGES = 'Weighment Charges'
export const DEFAULTCOMMODITYPACKAGE = 'Default';
export const USER_COMM = 100;
export const ABOVE_WEIGHT = 'Above Weight Value';
export const ABOVE_WEIGHT_ROUNDOFF = 'Above Weight Round Off Value';
export const BELOW_WEIGHT = 'Below Weight Value';
export const BELOW_WEIGHT_ROUNDOFF = 'Below Weight Round Off Value';
export const BETWEEN_WEIGHT_ROUNDOFF = 'Between Weight Above And Below Round Off Value';
export const MINIMUM_WEIGHT = "Minimum Weight";
export const MAXIMUM_WEIGHT = "Maximum Weight";

export const ABOVE_AMOUNT = 'Above Amount Value';
export const ABOVE_AMOUNT_ROUNDOFF = 'Above Amount Round Off Value';
export const BELOW_AMOUNT = 'Below Amount Value';
export const BELOW_AMOUNT_ROUNDOFF = 'Below Amount Round Off Value';
export const BETWEEN_AMOUNT_ROUNDOFF = 'Between Amount Above And Below Round Off Value';

export const COOLIE_CHARGES = 'Coolie charges';
export const BROKERAGE_CHARGES = 'Brokerage Charges';
export const JOURNAL_BROKERAGE = 'BROKERAGE';

export const POST = "Post";
export const PATCH = "Patch";

export const PRINT_SETTING = 0;
export const ROUNDOFF_SETTING = 1;
export const CUSTOMUNIT = 2;
export const CHARGES_SETTING = 3;

//sm custom unit settings
export const UNITSETTINGS = 'UNIT-SETTINGS';
export const SETTING_TITILE_UNITS = "Custom Unit Definitions";
export const NAME = "Name";
export const TYPE = "Type";
export const MULTIPLIER = "Multiplier";
export const BASE = "Base";
export const SETTING_TITILE_RATE = "Custom Rate Specifications";

//salesbill status
export const All = 'all';
export const SB_OPEN = 'SB_OPEN';
export const SB_PRINTED = 'SB_PRINTED';
export const SB_CLOSED = 'SB_CLOSED';
export const SB_PAYMENT_PENDING = 'SB_PAYMENT_PENDING';
export const SB_CANCELLED = 'SB_CANCELLED';


//button constants
export const CASH_SALE = 'Cash Sale';
export const BUYER_LOCAL = 'Self';
export const SELF = 'SELF';
export const REGISTERED = 'Registered Buyer';
export const CROSS_OVER = 'CROSS-OVER';
export const NONE = 'None';

export const INVALIDMARK = ['-'];


export const BROKER_BUTTON = 'Broker';
export const SELECT_DROPDOWN = 'Select';
export const BTN_SAVED = 'Save';
export const BTN_UPDATE = 'Update';
export const BTN_NORMAL = 'Normal';
export const BTN_DISACRD = 'Discard';
//Navigation bar component constants
export const USER_NAVMODE_GOODS = 'Goods';
export const USER_NAVMODE_SALEORDER = 'Sale Order';
export const USER_NAVMODE_SALESPAD = 'Sales Pad';
export const USER_NAVMODE_WRITERSPAD = 'Writers Pad';
export const USER_NAVMODE_SALE = 'Sale';
export const USER_NAVMODE_BUYERS_BILL = 'Sales Bill';
export const USER_NAVMODE_SALESSUMMARY = 'Sales Summary';
export const USER_NAVMODE_SELLERS_INVOICE = 'Sales Invoice';
export const USER_NAVMODE_ACCOUNTING = 'Accounting';
export const USER_NAVMODE_CASH_JOURNAL = 'Journal';
export const USER_NAVMODE_REPORT = 'Reports';

export const NAV_PLATFORM_PRAHARI = 'Prahari';
export const NAV_PLATFORM_KBCONNECT = 'Connect';
export const MERCODESK = 'mercodesk';
export const ERROR_NOTFOUND = 'notfound';
export const ERROR_ENABLED = 'enabled';
export const ERROR_RELOAD = 'reload';
export const RATE_PERALUE = 50;

export const GROUPED_BID_REMOVED_STATUS = 'REMOVED';

//master constants
export const SEARCHBYNAME = 'name';

// export const LOGGEDINUSER = '55331f7a-5b55-4a1c-8036-37218e014aad';

//error code
export const ERROR_404 = '404';

//voucher constants
export const FREIGHT_CHARGES = 'FREIGHT CHARGES';
export const VOUCHER_OPEN_STATUS = 'VCH_OPEN';
export const BILL_START_NUMBER = 100;
export const VOUCHER_SEARCH_CRITERIA = 'SaleOrder';
export const VOUCHER_SAVED_STATUS = 'VCH_SAVED';
export const VOUCHER_LISTED_STATUS = 'VCH_LISTED';
export const VOUCHER_CANCELLED_STATUS = 'VCH_CANCELLED';
export const RECEIPT_SALES_BILL = 'SALES BILL';
export const JOURNL_RECEIPT = 'RECEIPT';
export const JOURNL_VOUCHER = 'VOUCHER';
export const JOURNL_VOUCHER_COOLIE = 'COOLIE';
export const JOURNAL_PAYMENT_MODE_CONTRA = 'CONTRA';
export const JOURNAL_DISCOUNT = 'DISCOUNT';
export const CATEGORY_GOODS_VALUE = 'GOODS VALUE';


//receipt constants
export const SALES_INVOICE = 'SALES INVOICE'
export const RECEIPT_OPEN_STATUS = 'RCP_OPEN';
export const PAYMENT_MODE = 1;
export const PAYMENT_MODE_CONTRA = 4;
export const CATERGORY_CASH_ADVANCE = 'CASH ADVANCES';
export const CATEGORY_RECEIPT = 'RECEIPT';
export const CATEGORY_SEARCHCRITERIA_SALESBILL = 'SalesBill';
export const RECEIPT_SORT_BY_RECEIPT_NUMBER = 'ReceiptNumber';
export const RCP_CANCELLED = 'RCP_CANCELLED';
export const RCP_SAVED = 'RCP_SAVED';
export const RCP_LISTED = 'RCP_LISTED'
export const DATE = 'Date';

export const SEARCH_CRITERIA_SPID = 'SpId';


export const WEIGHING_CHARGES = 'WEIGHING CHARGES'
export const OTHERS = 'OTHERS'
export const SORT_BY_ASCENDING = 'ascending';
export const SELLER_SUBINVOICE = 'SELLER SUBINVOICE';


// writerpad constants

export const WEIGHT_DEVICE_NAME = 'MANUAL';
export const NORMAL_WEIGHT = 'NORMAL';
export const TRANSFER_EXIST_BUTTON = 'EXIST';
export const TRANSFER_NEW_BUTTON = 'NEW';
export const NORMAL_WEIGHED = 'NORMAL';
export const DISCARDED_WEIGHED = 'DISCARDED';




//saleorder status

export const SALEORDER_LOT_BIDDING_STARTED = "SO_LOT_BIDDING_STARTED"
export const SALEORDER_OPEN_STATUS = "SO_OPEN";
export const SALEORDER_SO_CLOSED_STATUS = "SO_CLOSED"
export const SALEORDER_SO_INIT_STATUS = "SO_INIT"
export const SALEORDER_SO_IN_SP_STATUS = 'SO_IN_SP';
export const SALEORDER_SO_LOT_BID_STARTED_STATUS = "SO_IN_SP_BIDDING_STARTED";
export const SALEORDER_SO_SI_READY_STATUS = "SO_SI_READY";
//lot status
export const LOT_STATUS_OPEN = "SO_LOT_OPEN"
export const LOT_STATUS_BIDDING_STARTED = "SO_LOT_BIDDING_STARTED"
export const LOT_POST_WEIGHING = "SO_LOT_POST_WEIGHING"
//salespad status
export const BID_STATUS_POSTWEIGHING = "POSTWEIGHING";
export const BID_STATUS_LISTED = "LISTED";

//seller status
export const SELLER_STATUS_SO_SELLER_CREATED = "SO_SELLER_CREATED";
export const SELLER_STATUS_SO_SELLER_CLOSED = "SO_SELLER_CLOSED"
export const SALESPAD_SP_INIT_STATUS = "SP_INIT";
export const SELLER_SI_OPEN = 'SELLER_SI_OPEN';
export const PACKS = "Packs"


export const ARRIVALS = 'List of Goods Arrivals showing Vehicle Number, Origin, Gatepass and Total Quantity';
export const VEHICLE_AND_ORIGIN_WITH_CPVQW = 'List of Goods Arrivals grouped by Commodity, Variant, Packaging and Net Quantity and Weight';
export const VEHICLE_AND_ORIGIN_WITH_RENTAL_CHARGES = 'List of Arrivals with Freight Charges ';
export const VEHICLE_AND_ORIGIN_WITH_WEIGHTS = 'List of Arrivals with Unloading and Weighment Charges';
export const SELLER_DETAILS = 'Seller Details';
export const SELLERS_LIST = 'List of Registered Sellers ';
export const SELLERS_WITH_VOUCHERS = 'Cash Advance Payments to Registered Sellers';
export const SELLERS_WITH_CPVQW = 'Sellers associated with Commodity,Package,Quantity,Variant and Net Weight';
export const SELLER_EARNINGS = 'Seller Earnings';
export const CPQVW_WITH_GIVEN_ORIGIN = 'Commodity Availability Insights';
export const CPVQW_WITH_MIN_AND_MAX_RATES = 'Minimum and Maximum Rates Record';
export const SALES_INVOICE_LIST = 'List of Sales Invoice';
export const SALES_INVOICE_DETAILS = 'Sales Invoice details (Vouchers and Receipts)';
export const SALESBILL_WITH_VOUCHERS_RECEIPTS = 'Sales Bill  details (Vouchers and Receipts)';
export const SALESBILL_LIST = 'List of Sales Bill';
export const SALESBILL_WITH_RECEIPT = 'List of Sales Bill with Balance of Payments';
export const BUYER_DETAILS = 'Buyer Details';
export const BUYER_LIST = 'List of Registered Buyers';
export const BROKER_DETAILS = 'Broker Details';
export const BROKER_LIST = 'List of Registered Brokers';
export const BROKER_TYPE_AND_RATES = 'List of Registered Brokers with Brokerage Type and Rates';
export const USERFEE_COLLECTION = 'User Fee Report';
export const DAILY_USERFEE = 'User Fee Report';
export const SALES_BILL_USERFEE = 'Sale Bill User Fee';
export const TOTAL_SALES = 'Sales Report';
export const COMMISSION_ON_SALES = 'Commission Report';
export const RATE_DIFFERENCE_EARNED = 'Rate Difference Earned Report';
export const LOSS_ON_DISCOUNTS = 'Loss on Discounts(Receipts)';
export const CASH_TRANSACTIONS = 'Cash Transactions by reference';
export const BANK_TRANSACTIONS = 'Bank transactions';
export const CAPITIAL_ACCOUNT_TRANSACTIONS = 'Capital Account Transactions';
export const LOAN_ACCOUNT_TRANSACTIONS = 'Loan Account Transactions';
export const BANK_ACCOUNT_TRANSACTIONS = 'Bank Account Transactions';
export const EMPLOYEE_TRANSACTIONS = 'Employee Transactions';
export const PURCHASE_REPORTS = 'Purchase Reports';
export const AGENT_REPORT = "Agent Report"


export const VEHICLE_NUMBER = 'Vehicle Number';
export const SALEORDER_DATE = 'Sale Order Date';
export const STATE = 'State';
export const CITY = 'City';
export const GATEPASS_NUMBER = 'Gatepass Number';
export const SALEORDER_QUANTITY = 'Sale Order Quantity';

export const SO_COOLIE = 'Sale Order Coolie Amount';
export const FREIGHT_TYPE = 'Freight Type';
export const VOUCHER_NUMBER = 'Voucher Number';
export const FREIGHT_RATE = 'Freight Rate';
export const NET_WEIGHT = 'Net Weight';
export const NET_QUANTITY = 'Net Quantity';
export const COMMODITY_NAME = 'Commodity Name';
export const VARIANT = 'Variant';
export const PACKAGE_NAME = 'Package';
export const LOT_QUANTITY = 'Lot Quantity';
export const QUANTITY = 'Quantity';
export const FREIGHT_AMOUNT = 'Freight Amount';
export const WEIGHMENT_AMOUNT = 'Sale Order  Weighment Amount';
export const SELLER_NAME = 'Seller Name';
export const SELLER = 'Seller';
export const VOUCHER_NARRATION = 'Voucher Narration';
export const MAX_RATE = 'Max Rate';
export const MIN_RATE = 'Min Rate';
export const SALESINVOICE_NUMBER = 'Sales Invoice No';
export const SALESINVOICE_AMOUNT = 'Sales Invoice Amount';
export const SALESBILL_NUMBER = 'Sales Bill No';
export const SALEBILL_DATE = 'Sales Bill Date';
export const BUYER_NAME = 'Buyer Name';
export const BROKER_NAME = 'Broker Name';
export const AMOUNT_RECEIVABLE = 'Amount Receivable';
export const SALESBILL_AMOUNT = 'Sales Bill Amount';
export const AMOUNT_PAYABLE = 'Amount Payable';
export const BROKERAGE_TYPE = 'Brokerage Type';
export const SALESBILL_QUANTITY = 'Sales Bill  Quantity';
export const BROKERAGE = 'Brokerage';
export const GOODS = 'Goods Value';
export const USERFEE = 'User Fee'
export const COMMISSIONSB = 'Commission';
export const RECEIPT_NARRATION = 'Receipt Narration';
export const PAYMENT_MODE_SB = 'Payment Mode';
export const VOUCHER_PAID_AMOUNT = 'Voucher Paid Amount';
export const VOUCHER_PAYMENT_MODE = 'Voucher Payment Mode';
export const RECEIPT_TRANSACTOR = 'Receipt Transactor';
export const RECEIPT_PAYMENT_MODE = 'Receipt Payment Mode';
export const VOUCHER_TRANSACTOR = 'Voucher Transactor';
export const RECEIPT_PAID_AMOUNT = 'Receipt Paid Amount';
export const VOUCHER_CATEGORY = 'Voucher Category';
export const VOUCHER_REFERENCE_AMOUNT = 'Voucher Reference Amount';
export const SALESINVOICE_DATE = 'Sales Invoice Date';
export const SELLER_SALESINVOICE_AMOUNT = 'Seller Sales Invoice Amount';
export const SO_GOODS_VALUE = 'Sale Order Goods Value';
export const SO_COMMISSION_FEE = 'Sale Order Commission Fee';
export const SO_USER_FEE = 'Sale Order User Fee';
export const SALESBILL_BROKER = 'Sales Bill Broker';
export const SALESBILL_BUYER = 'Sales Bill Buyer';
export const VEHICLE_COMMISION_FEE = 'Vehicle Commission Fee';
export const SALES_COMMISION_FEE = 'Sales Commission Fee';
export const SALES_GOODS_VALUE = 'Sales Goods Value';
export const SALES_VALUE = 'Sales Value';
export const TOTAL_DISCOUNT = 'Total Discount';
export const FROM_SELLER = 'From Seller';
export const LOSS_ON_DISCOUNT_AMOUNT = 'Loss On Discount Amount';
export const SALES_INVOICE_SELLER = 'Sales Invoice Seller';
export const SELLER_INVOICE_QUANTITY = "Seller Invoice Quantity";
export const BAGS = "Bags";
export const TOTAL_SALES_AMOUNT = "Total Sales Amount";
export const TOTAL_USER_FEE = "Total User Fee"
export const AGENT_NAME = "Agent Name";
export const SELLER_COMMODITY_QUANTITY = "Seller Commodity Quantity";


export const SELLERREGISTEREDTYPE = "REGISTERED"

/** print setting */
export const SALESBILL_PRINT = 'SalesBill-print';
export const SALESINVOICE_PRINT = 'SalesInvoice-print';


/** preset Setting */
export const PRESET_SETTING = 'Preset setting';
