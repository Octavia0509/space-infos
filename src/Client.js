const { rejects } = require('assert');
const { EventEmitter } = require('events');
const fetch = require('node-fetch');

module.exports = class Client extends EventEmitter {

    /**
     * Créer le Client
     * @class
     * @param {Discord.Client} client - Client discord.js
     * @param {string} API_KEY - Clé API Nasa
     */

    constructor(client, API_KEY) {
        super()

        if(!client) console.error("Vous devez présicer un Client (discord.js) !");
        if(!API_KEY) console.error("Vous devez fournir une clé d'API Nasa - Obtenable ici : https://api.nasa.gov/")

        this.client = client;
        this.API_KEY = API_KEY
    };

    /**
     * Permet d'obtenir l'image spaciale du jour
     * @param {boolean} hd - Force l'image à être en haute définition
     * @returns {string} URL de l'image
     */

    async APOD (hd) {
        if(!hd) console.error("Vous devez préciser si l'image doit être renvoyée en HD. \n- true : Force l'image à être en HD \n- false : Ne force pas l'image à être en HD.")
        
        if(typeof hd !== "boolean") console.error("HD doit être de type Boolean");
        
        await fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.API_KEY}&hd=${hd}`);
            .then(res => res.json())
            .then(body => {
                return body["url"];
            });
    };

};
