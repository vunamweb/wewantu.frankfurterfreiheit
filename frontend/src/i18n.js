import i18next from "i18next";
import HttpBackend from 'i18next-http-backend';
import { initReactI18next  } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';

//import cors from "cors";
import config from "./config";


i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    //.use(cors())
    .use(initReactI18next )
    .use(Fetch)
    .init({
    lng: 'de',
    fallbackLng: 'en',
    preload: ['en', 'de'],
    ns: ['translation'],
    defaultNS: 'translation',
    
    backend: {
      //loadPath: '/locales/{{lng}}/translation.json',
      loadPath: 'https://api.topazvn.vn/tmp/lang.php?lng={{lng}}',
      //parse: function (data) { console.log("DATA", data) },
     // crossDomain: true,
	    /*customHeaders: () => {
                            return {
                                'Authorization': 'Basic d2V3YW50dTp3ZXdhbnR1',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
                            };
                        },*/
    }
  }, (err, t) => {
    if (err) return console.error(err)
    //console.log(t('home'))
    //console.log(t('home', { lng: 'de' }))
  })

export default i18next;