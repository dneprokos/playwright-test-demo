import PageData from "@framework/page-base/page-data";

export default class PageDataConstants {
    constructor(private baseUrl: string) {
        this.baseUrl = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    }

    readonly mainPage = new PageData(this.baseUrl + '/', 'Main Page');
    readonly abTestingPage = new PageData(`${this.baseUrl}abtest`, 'A/B Testing');
    readonly addRemoveElementsPage = new PageData(this.baseUrl + 'add_remove_elements/', 'Add/Remove Elements');
    readonly basicAuthPage = new PageData(this.baseUrl + 'basic_auth', 'Basic Auth');
    readonly brokenImagesPage = new PageData(this.baseUrl +'broken_images', 'Broken Images');
    readonly challengingDomPage = new PageData(this.baseUrl +'challenging_dom', 'Challenging DOM');
    readonly checkboxesPage = new PageData(this.baseUrl +'checkboxes', 'Checkboxes');
    readonly contextMenuPage = new PageData(this.baseUrl +'context_menu', 'Context Menu');
    readonly digestAuthPage = new PageData(this.baseUrl +'digest_auth', 'Digest Authentication');
    readonly disappearingElementsPage = new PageData(this.baseUrl +'disappearing_elements', 'Disappearing Elements');
    readonly dragAndDropPage = new PageData(this.baseUrl +'drag_and_drop', 'Drag and Drop');
    readonly dropdownPage = new PageData(this.baseUrl +'dropdown', 'Dropdown');
    readonly dynamicContentPage = new PageData(this.baseUrl +'dynamic_content', 'Dynamic Content');
    readonly dynamicControlsPage = new PageData(this.baseUrl +'dynamic_controls', 'Dynamic Controls');
    readonly dynamicLoadingPage = new PageData(this.baseUrl +'dynamic_loading', 'Dynamic Loading');
    readonly entryAdPage = new PageData(this.baseUrl +'entry_ad', 'Entry Ad');
    readonly exitIntentPage = new PageData(this.baseUrl +'exit_intent', 'Exit Intent');
    readonly fileDownloadPage = new PageData(this.baseUrl +'download', 'File Download');
    readonly fileUploadPage = new PageData(this.baseUrl +'upload', 'File Upload');
    readonly floatingMenuPage = new PageData(this.baseUrl +'floating_menu', 'Floating Menu');
    readonly forgotPasswordPage = new PageData(this.baseUrl +'forgot_password', 'Forgot Password');
    readonly formAuthenticationPage = new PageData(this.baseUrl +'login', 'Form Authentication');
    readonly framesPage = new PageData(this.baseUrl +'frames', 'Frames');
    readonly geolocationPage = new PageData(this.baseUrl +'geolocation', 'Geolocation');
    readonly horizontalSliderPage = new PageData(this.baseUrl +'horizontal_slider', 'Horizontal Slider');
    readonly hoversPage = new PageData(this.baseUrl +'hovers', 'Hovers');
    readonly infiniteScrollPage = new PageData(this.baseUrl +'infinite_scroll', 'Infinite Scroll');
    readonly inputsPage = new PageData(this.baseUrl +'inputs', 'Inputs');
    readonly jqueryUiMenuPage = new PageData(this.baseUrl +'jqueryui/menu', 'JQuery UI Menus');
    readonly javaScriptAlertsPage = new PageData(this.baseUrl +'javascript_alerts', 'JavaScript Alerts');
    readonly javaScriptErrorPage = new PageData(this.baseUrl +'javascript_error', 'JavaScript onload event error');
    readonly keyPressesPage = new PageData(this.baseUrl +'key_presses', 'Key Presses');
    readonly largeAndDeepDomPage = new PageData(this.baseUrl +'large', 'Large & Deep DOM');
    readonly multipleWindowsPage = new PageData(this.baseUrl +'windows', 'Multiple Windows');
    readonly nestedFramesPage = new PageData(this.baseUrl +'nested_frames', 'Nested Frames');
    readonly notificationMessagesPage = new PageData(this.baseUrl +'notification_message', 'Notification Messages');
    readonly redirectLinkPage = new PageData(this.baseUrl +'redirector', 'Redirect Link');
    readonly secureFileDownloadPage = new PageData(this.baseUrl +'download_secure', 'Secure File Download');
    readonly shadowDomPage = new PageData(this.baseUrl +'shadowdom', 'Shadow DOM');
    readonly shiftingContentPage = new PageData(this.baseUrl +'shifting_content', 'Shifting Content');
    readonly slowResourcesPage = new PageData(this.baseUrl +'slow', 'Slow Resources');
    readonly sortableDataTablesPage = new PageData(this.baseUrl +'tables', 'Sortable Data Tables');
    readonly statusCodesPage = new PageData(this.baseUrl +'status_codes', 'Status Codes');
    readonly typosPage = new PageData(this.baseUrl +'typos', 'Typos');
    readonly wysiwygEditorPage = new PageData(this.baseUrl +'tinymce', 'WYSIWYG Editor');
}