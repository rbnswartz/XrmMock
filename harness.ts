export class XrmHarness{
    Page: XrmPage;
    constructor(config: XrmConfiguration){
        this.Page = new XrmPage(config);
    }
}
class XrmPage{
        context: XrmPageContext;
        data:XrmPageData;
        getAttribute(attribute: string): XrmAttribute{
            return this.data.getAttribute(attribute);
        }
        constructor(config: XrmConfiguration){
            this.context = new XrmPageContext(config);
            this.data = new XrmPageData(config);
        }
}
class XrmPageContext{
    baseUrl: string;
    getClientUrl(): string {
        return this.baseUrl;
    }
    constructor(config: XrmConfiguration){
        if (config.baseUrl == null){
            this.baseUrl = "";
        }
        else{
            this.baseUrl = config.baseUrl
        }
    }
}
class XrmPageData{
    getAttribute(attribute: string): XrmAttribute{
        return this.entity.attributes[attribute];
    }
    entity: XrmPageDataEntity;
    constructor(config: XrmConfiguration){
        this.entity = new XrmPageDataEntity(config);
    }
}
class XrmPageDataEntity{
    public attributes: {[id: string]: XrmAttribute};
    saveHandlers: Array<Function>;
    addOnSave(func: Function){
        this.saveHandlers.push(func);
    }
    save(){
        for (var f of this.saveHandlers){
            f();
        }
    }
    constructor(config: XrmConfiguration){
        this.saveHandlers = new Array<Function>();
        this.attributes =config.data; 
    }
}
class XrmControl{
    Disabled: boolean;
    Label: string;
    ShowTime: boolean;
    getDisabled(): boolean{
        return this.Disabled;
    }
    setDisabled(value: boolean){
        this.Disabled = value;
    }
    getLabel(): string{
        return this.Label
    }
    getShowTime(): boolean{
        return this.ShowTime;
    }
    
}
class XrmPageui{
    controls: Array<XrmControl>;
    constructor(){
        this.controls = new Array<XrmControl>();
    }
}
export class XrmAttribute{
    value;
    onChangeHandlers: Array<Function>;
    getValue(){
        return this.value;
    }
    setValue(value){
        this.value = value;
        for(let f of this.onChangeHandlers){
            f();
        }
    }
    addOnChange(func: Function){
        this.onChangeHandlers.push(func);
    }
    constructor(value){
        this.value = value;
        this.onChangeHandlers = new Array<Function>();
    }
}
export class XrmConfiguration{
    data:{[id: string]: XrmAttribute};
    baseUrl:string;
}