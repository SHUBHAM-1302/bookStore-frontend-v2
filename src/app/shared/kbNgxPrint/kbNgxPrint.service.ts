import { EnvironmentInjector, Injectable, Optional, TemplateRef, createComponent } from '@angular/core';
import { Content, NgxPrinterComponent, PrintItem, PrintServiceConfig, ngxPrintMarkerPosition } from 'ngx-printer';
import { BehaviorSubject } from 'rxjs';
import { Helpers } from "./helpers";

@Injectable({
    providedIn: 'root'
})
export class KbNgxPrintService {

    private printWindowOpen = new BehaviorSubject<boolean>(false);

    /**
     * @internal
     */
    private _printItems = new BehaviorSubject<PrintItem[]>([]);
    $printItems = this._printItems.asObservable();

    private openNgxPrinter: HTMLElement;

    /**
     * Wait time to render before open print dialog in ms
     * Default is 200
     */
    timeToWaitRender = 200;

    /**
     * Class used in component when printing to current window
     */
    renderClass = "default";

    /**
     * Open new window to print or not
     * Default is true
     */
    printOpenWindow = true;

    /**
     * Name of root component
     * Default is app-root
     */
    appRootName = "app-root";

    /**
     * Do not fire print event - just show preview
     * Default is false
     */
    printPreviewOnly = false;

    appRoot: HTMLElement;
    appRootDislaySetting = "";

    $printWindowOpen = this.printWindowOpen.asObservable();
    eventadded = [];
    markerPosition: ngxPrintMarkerPosition;

    constructor(
        @Optional() config: PrintServiceConfig,
        private envInjector: EnvironmentInjector,

    ) {
        this.setRootConfigOptions(config);
    }



    /**
       * Set global config from forRoot
       * @param config
       */
    private setRootConfigOptions(config: PrintServiceConfig): void {
        if (config) {
            config.timeToWaitRender &&
                (this.timeToWaitRender = config.timeToWaitRender);

            config.renderClass && (this.renderClass = config.renderClass);

            config.appRootName && (this.appRootName = config.appRootName);

            config.markerPosition && (this.markerPosition = config.markerPosition);

            if (config.hasOwnProperty("printPreviewOnly")) {
                this.printPreviewOnly = config.printPreviewOnly;
            }

            if (config.hasOwnProperty("printOpenWindow")) {
                this.printOpenWindow = config.printOpenWindow;
            }
        }
    }

    /***
     * Print a div identified by its id
     * @example
     * this.printerService.printDiv('printDiv');
     */
    public printDiv(divID: string): void {
        const divToPrint = document.getElementById(divID);
        if (divToPrint) {
            this.print(divToPrint, this.printOpenWindow);
        } else {
            /** to check the component div is rendered or not, if it is not rendered then render using setTimeOut */
            setTimeout(()=> {
                const divToPrintTo = document.getElementById(divID);
                this.print(divToPrintTo, this.printOpenWindow);
            },0)

        }
    }

    // /***
    //  * Print an Element identified by its className using getElementsByClassName
    //  * Prints the first one found
    //  */
    // public printByClassName(className: string): void {
    //     const elementToPrint = document.getElementsByClassName(className);

    //     if (elementToPrint && elementToPrint.length > 0) {
    //         this.print(<HTMLScriptElement>elementToPrint[0], this.printOpenWindow);
    //     } else {
    //         console.log("element with id ${className} not found..");
    //     }
    // }

    // /**
    //  * Print Angular TemplateRef or a Component or String
    //  * @param contentToPrint
    //  * @example
    //  * this.printerService.printAngular(this.PrintTemplateTpl);
    //  */
    // public printAngular(contentToPrint: any, context?: any): void {
    //     const nativeEl = this.createComponent(contentToPrint, null, context);

    //     this.print(nativeEl.nativeElement, this.printOpenWindow);
    // }

    // /**
    //  * Print single img
    //  * @example
    //  * this.printerService.printImg('assets/bratwurst.jpg');
    //  */
    // public printImg(imgSrc: string): void {
    //     const compRef = this.createComponent(null, imgSrc);
    //     const openNewWindow = this.printOpenWindow;

    //     compRef.instance.completed.subscribe((val) => {
    //         compRef.hostView.detectChanges();
    //         console.log("completed:", val);
    //         this.print(compRef.location.nativeElement, openNewWindow);
    //     });
    // }

    // /**
    //  * Print an native Element (HTML Element)
    //  * @param nativeElement
    //  * @example
    //  * this.printerService.printHTMLElement(this.PrintComponent.nativeElement);
    //  */
    // public printHTMLElement(nativeElement: HTMLElement): void {
    //     this.print(nativeElement, this.printOpenWindow);
    // }

    /**
     * Create and render component
     * @param contentToRender
     */
    private createComponent(
        contentToRender: any,
        imgSrc?: string,
        context?: any
    ): any {

        let componentRef: any;

        if (contentToRender) {
            if (context === undefined) {
                context = null;
            }
            const ngContent = this.resolveNgContent(contentToRender, context);

            componentRef = createComponent(NgxPrinterComponent, {
                environmentInjector: this.envInjector,
                projectableNodes: ngContent
            });

        } else {
            componentRef = createComponent(NgxPrinterComponent, {
                environmentInjector: this.envInjector,
            });
        }

        componentRef.instance.renderClass = this.renderClass;

        if (imgSrc) {
            componentRef.instance.imgSrc = imgSrc;
            return componentRef;
        }

        componentRef.hostView.detectChanges();
        return componentRef.location; // location is native element
    }

    /**
     * Main print function
     * @param printContent
     */
    private print(printContent: any, printOpenWindow: boolean): void {
        if (printOpenWindow === true) {
            const printContentClone = document.importNode(printContent, true); // printContent.cloneNode(true);

            this.hideBeforePrint(printContentClone);
            this.printInNewWindow(printContentClone);
        }
        if (printOpenWindow === false) {
            const printContentClone = document.importNode(printContent, true); // printContent.cloneNode(true);
            this.hideBeforePrint(printContentClone);
            const nativeEl = this.createComponent(printContentClone).nativeElement;
            this.openNgxPrinter = nativeEl;
            document.body.appendChild(this.openNgxPrinter);

            this.getAppRoot();

            this.appRoot && (this.appRoot.style.display = "none");

            this.printCurrentWindow();
        }
    }

    /**
     * Print using a new window / tab
     * @param divToPrint
     */
    private printInNewWindow(divToPrint: HTMLElement): void {
        const printWindow = window.open("", "PRINT");
        const title = document.title;

        printWindow.document.write(
            "<HTML><HEAD><TITLE>" + title + "</TITLE></HEAD><BODY></BODY></HTML>"
        );
        // printWindow.document.write(document.documentElement.innerHTML);

        const printWindowDoc = printWindow.document;
        Helpers.copyCss(printWindowDoc);

        printWindowDoc.body.style.margin = "0 0";
        printWindowDoc.body.appendChild(divToPrint);
        printWindow.document.close();

        setTimeout(
            () => this.printTabWindow(printWindow, printWindowDoc),
            this.timeToWaitRender
        );
    }

    /**
     * Print window in new tab
     */
    private printTabWindow(printWindow: Window, printWindowDoc: Document): void {
        if (this.printPreviewOnly) {
            return;
        }
        this.registerPrintEvent(printWindow, true);
        this.printWindowOpen.next(true);
        printWindow.focus(); // necessary for IE >= 10*/
        if (printWindowDoc.execCommand("print") === false) {
            printWindow.print();
        }
    }

    /**
     * Print the whole current window
     */
    public printCurrentWindow(): void {
        if (this.printPreviewOnly) {
            return;
        }
        this.registerPrintEvent(window, false);
        setTimeout(() => {
            this.printWindowOpen.next(true);
            if (document.execCommand("print") === false) {
                window.print();
            }
        }, this.timeToWaitRender);
    }

    /**
     * Listen to print event of window
     * @param printWindow
     */
    private registerPrintEvent(
        printWindow: Window,
        printWithOpenInNewWindow: boolean
    ) {
        const that = this;
        printWindow.focus(); // necessary for IE >= 10*/

        if (that.eventadded[printWindow.name]) {
            return;
        }


        printWindow.addEventListener('beforeprint', () => { });

        printWindow.addEventListener('afterprint', () => {
            this.eventadded[printWindow.name] = true;


            if (printWithOpenInNewWindow) {
                that.eventadded[printWindow.name] = false;
            }
            that.cleanUp(printWindow, printWithOpenInNewWindow);
            that.printWindowOpen.next(false);
        });
    }

    /**
     * Close tab or clean up dom
     * @internal
     */
    private cleanUp(printWindow: Window, printOpenWindow: boolean): void {
        if (printOpenWindow === true) {

            printWindow.close();
            setTimeout(() => {
                printWindow.close();
            }, 20);
        }
        if (printOpenWindow === false) {
            if (!this.openNgxPrinter) {
                return;
            }
            if (document.body.getElementsByTagName("ngx-printer").length === 0) {
                return;
            }

            if (this.appRoot) {
                if (this.appRootDislaySetting !== "") {
                    this.appRoot.style.display = this.appRootDislaySetting;
                } else {
                    this.appRoot.style.display = "";
                }
            }

            document.body.removeChild(this.openNgxPrinter);
            this.openNgxPrinter = null;
        }
    }

    /**
     * Hide an element before printing
     * @param parentDiv
     */
    private hideBeforePrint(parentDiv: HTMLElement): void {
        const childrenOfDiv = parentDiv.querySelectorAll(".no_print_indicator");

        for (let i = 0; i < childrenOfDiv.length; i++) {
            const child = childrenOfDiv[i] as HTMLElement;
            child.style.display = "none";
        }
    }

    /**
     * Search for Angular App Root
     * @internal
     */
    private getAppRoot(): void {
        const appRoot = document.body.getElementsByTagName(this.appRootName);
        if (appRoot.length === 0) {
            return null;
        } else {
            this.appRoot = <HTMLElement>appRoot[0];
            this.appRootDislaySetting = this.appRoot.style.display;
        }
    }

    // /**
    //  * Add a new item to print
    //  * Used by directive
    //  * @internal
    //  * @param newPrintItem  HTML id
    //  */
    // public addPrintItem(newPrintItem: PrintItem): void {
    //     const tmpItems = this._printItems.getValue();

    //     tmpItems.push(newPrintItem);
    //     this._printItems.next(tmpItems);
    // }

    // /**
    //  * Delete a print item from service
    //  * Used by directive
    //  * @internal
    //  * @param idOfItemToRemove
    //  */
    // public removePrintItem(idOfItemToRemove: string): void {
    //     const tmpItems = this._printItems.getValue();
    //     const newIitems = tmpItems.filter((item) => item.id !== idOfItemToRemove);

    //     this._printItems.next(newIitems);
    // }

    // /**
    //  * Gets a single print item from service
    //  * Used by directive
    //  * @internal
    //  * @param idOfItemToFind
    //  */
    // public getPrintItem(idOfItemToRemove: string): PrintItem {
    //     const tmpItems = this._printItems.getValue();
    //     const foundItem = tmpItems.find((item) => item.id === idOfItemToRemove);

    //     return foundItem;
    // }

    // /**
    //  * Print a print Item
    //  * @param printItemToPrint
    //  */
    // public printPrintItem(printItemToPrint: PrintItem): void {
    //     this.printHTMLElement(printItemToPrint.nativeElement);
    // }

    // /**
    //  * Print al list of print Items one after the other
    //  * @param printItemToPrint
    //  */
    // public printPrintItems(
    //     printItemsToPrint: PrintItem[],
    //     className?: string
    // ): void {
    //     const newDiv = <HTMLDivElement>document.createElement("div");

    //     if (className) {
    //         newDiv.classList.add(className);
    //     } else {
    //         newDiv.style.display = "flex";
    //         newDiv.style.flexDirection = "column";
    //     }

    //     printItemsToPrint.forEach((element) => {
    //         newDiv.appendChild(element.nativeElement.cloneNode(true));
    //     });

    //     this.printHTMLElement(newDiv);
    // }

    /**
     * Create node or angular component and returns an array of nodes
     * @param content
     * @internal
     */
    private resolveNgContent<T>(content: Content<T>, context: any): any {
        if (typeof content === "string") {
            const element = document.createTextNode(content);

            return [[element]];
        }

        if (content instanceof TemplateRef) {
            const viewRef = content.createEmbeddedView(context);

            viewRef.detectChanges();

            return [viewRef.rootNodes];
        }

        if (content instanceof HTMLElement) {
            return [[content]];
        }

        /** Otherwise it's a component */

        let componentRef = createComponent(content, {
            environmentInjector: this.envInjector,
        });


        componentRef.changeDetectorRef.detectChanges();

        return [[componentRef.location.nativeElement]];
    }
}
