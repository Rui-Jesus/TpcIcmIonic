import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, NavParams } from 'ionic-angular';
import { CantinesServiceProvider } from '../../providers/cantines-service/cantines-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CantineMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cantine-main',
  templateUrl: 'cantine-main.html',
  providers: [CantinesServiceProvider]
})

export class CantineMainPage {

  //to help in the parsing of the json file 
  types: Array<String> = [
    "Sopa", 
    "Prato normal carne", 
    "Prato normal peixe", 
    "Prato dieta", 
    "Prato vegetariano", 
    "Prato opção", 
    "Salada", 
    "Pão", 
    "Sobremesa", 
    "Bebida"
  ];

  //Map with day translations
  configs = new Map<string, string>();
 
  c_items: Array<any> = [];
  d_items: Array<any> = [];
  canteen : string; 
  weekday : string; 
  todayDate : string; 
  title : string; 
  cache : any; 

  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public nav: NavController,
    public navParams : NavParams, 
    public platform: Platform,
    public cantines: CantinesServiceProvider, 
    private storage: Storage
  ){
    this.title = navParams.get("cantine"); 
    
    this.configs.set("Monday", "Segunda Feira");
    this.configs.set("Tuesday", "Terça Feira");
    this.configs.set("Wednesday", "Quarta Feira");
    this.configs.set("Thursday", "Quinta Feira");
    this.configs.set("Friday", "Sexta Feira");
    this.configs.set("Saturday", "Sábado");
    this.configs.set("Sunday", "Domingo");  
  }

  ionViewDidLoad() {
    //Once the main view loads
    //and after the platform is ready...
    this.platform.ready().then(() => {
      //Setup a resume event listener
      document.addEventListener('resume', () => {
        //When the app resumes, we need to reload the data
        this.checkCache();
      });
      //We need to populate the data when the app launches
      this.checkCache();
    });
  }
  
  refreshPage() {
    this.checkCache();
  }

  checkCache(){
    //clear out the previous array contents
    this.c_items = [];
    this.d_items = [];
    
    //Get today's date
    let myDate = new Date();
    let aux = myDate.toString().split(" "); 
    this.todayDate = aux[1] + " " + aux[2] + " " + aux[3]; 
    console.log(this.todayDate); 
    //If there is a cache already and it has the same date, we don't need to request the api 
    this.storage.get('canteens').then((jsonObj) => {
      if (jsonObj != null ) {
        console.log("There is a cache");
        let attributes = (jsonObj[0].menus.menu[0])[Object.keys(jsonObj[0].menus.menu[0])[0]].date.split(" ");
        //We will only use the cache if the cache is updated
        if(aux[1] === attributes[2] && aux[2] === attributes[1] && aux[3] === attributes[3]){
          console.log("Using the cache"); 
          this.formatData(jsonObj[0]);
        }
        else{
          console.log("Cache is outdate .. trying to fetch from api"); 
          this.showCurrent();  
        }
      }
      
      else {
        console.log("There is no cache .. trying to fetch from api");
        this.showCurrent(); 
      }
    });
  }

  saveJson(data): any{
    this.storage.get('canteens').then((jsonObj) => {
      if (jsonObj == null ) {
        console.log("Cache is empty , initializing ...");
        this.storage.set('canteens', [data]);
      }
      else {
        console.log("Updating cache ...");
        this.storage.set('canteens', data);
      }
    });
  }
  
  showCurrent() {
    
    //Create the loading indicator
    let loader = this.loadingCtrl.create({
      content: "Retrieving data..."
    });
    //Show the loading indicator
    loader.present();

    this.cantines.getCurrent().then(
      data => {
        //Hide the loading indicator
        loader.dismiss();
        //Now, populate the array with data from the api
        if (data) {
          //We have data, so lets do something with it
          this.formatData(data);
          console.log("Saving cache..."); 
          //There was no cache, we need to save it
          this.saveJson(data); 
        } else {
          //This really should never happen
          //If it does, not our fault. It's api problems
          console.error('Error retrieving canteens data: Data object is empty');
        }
      },
      error => {
        //Hide the loading indicator
        loader.dismiss();
        console.error('Error retrieving canteens data. Check internet connection');
        console.dir(error);
        this.showAlert(error);
      }
    );
  }
  
  private formatData(data): any {
    //create a blank array to hold our results
    let tmpArray = [];
    var aux; 

    //To filter the json object, acording to what the user chose in the previous page 
    if(this.title === "Santiago")
      aux = "Refeitório de Santiago"; 
    else if(this.title === "Crasto")
      aux = "Refeitório do Crasto"; 
    else
      aux = "Snack-Bar/Self"
    this.canteen = aux; 
    
    //It contains the canteen name and the date and stuff like that
    var attributes = (data.menus.menu[0])[Object.keys(data.menus.menu[0])[0]]
    console.log("MY ATTRIBUTES"); 
    console.log(attributes); 
    //The weekday in PT
    this.weekday = this.configs.get(attributes.weekday); 

    var menus = data.menus.menu;     
    for(var m in menus){
      var help = (menus[m])[Object.keys(menus[m])[0]] 
      var disabled = help.disabled; 

      //The canteen the user selected
      if(help.canteen === aux){
        //The canteen can be closed
        if(disabled !== "0"){
          if(help.meal === "Almoço")
          this.c_items.push({ 'name': 'Fechado', 'value': help.disabled })  
          else if(help.meal === "Jantar")
            this.d_items.push({ 'name': 'Fechado', 'value': help.disabled });      
        }

        else{
          var mealItems = menus[m].items.item + "";
          console.log(mealItems); 
          var lst = mealItems.split(","); 
          var c = 0; 
          for(var s in lst){
            if(lst[s] !== "[object Object]"){
              if(help.meal === "Almoço")
                this.c_items.push({ 'name': this.types[c], 'value': lst[s] });    
              else if(help.meal === "Jantar")
                this.d_items.push({ 'name': this.types[c], 'value': lst[s] });      
            } 
            c++; 
          }

        }
      }

    }
    return tmpArray;
  }
  
  showAlert(message: string) {
    let alert = this.alertController.create({
      title: 'Error',
      subTitle: 'Source: Cantines Service',
      message: message,
      buttons: [{ text: 'Sorry' }]
    });
    alert.present();
  }

}
