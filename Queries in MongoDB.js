


# ATTENZIONE:


Tutti i valori energetici sono trattati in unità
di Terawatt/Ora (TWh) e le inflazioni sono un 
valore senza unità poiché è un valore calcolato
dalla Banca Mondiale.
Per ulteriori informazioni sul calcolo, 
visitare il seguente link: 

https://thedocs.worldbank.org/en/doc/1ad246272dbbc437c74323719506aa0c-0350012021/related/WP-inflation-database.pdf


//Inflazione ed energia per capita

[
  {
    "$match": {
      "country": "${Paese}",
      "year": ${Year}
    }
  },
  {
    "$lookup": {
      "from": "inflation",
      "localField": "country",
      "foreignField": "Country",
      "as": "inflacion_correspondiente"
    }
  },
 {
    "$unwind": "$inflacion_correspondiente"
  },
  {
    "$project": {
      "country": "${Paese}",
      "year": "${Year}",
      "Energia per capita": {
        "$ifNull":["$energy_per_capita","Niente"]
        },
      "Inflazione": {
        "$ifNull":["$inflacion_correspondiente.${Year}","Niente"]
        }
    }
  }
]

//Domanda vs Prodotta

[
  {
    "$match": {
      "country": "${Paese}",
      "electricity_demand": { "$exists": true, "$ne": null, "$ne": "NaN" },"year": 2017
    } 
  },
  {
    "$group": {
      "_id": "2017","Domanda de eletticita": { "$avg": "$electricity_demand" },
      "Eletticita biocarburante": { "$avg": "$biofuel_electricity" },
      "Eletticita carbone": { "$avg": "$coal_electricity" },
      "Eletticita fossile": { "$avg": "$fossil_electricity" },
      "Eletticita gas": { "$avg": "$gas_electricity" },
      "Eletticita idroelettrica": { "$avg": "$hydro_electricity" },
      "Eletticita di basso carbon": { "$avg": "$low_carbon_electricity" },
      "Eletticita nuclear": { "$avg": "$nuclear_electricity" },
      "Eletticita petrolio": { "$avg": "$oil_electricity" },
      "Altre Eletticita renovable": { "$avg": "$other_renewable_electricity" },
      "Altre Eletticita renovable no carburante": { "$avg": "$other_renewable_exc_biofuel_electricity" },
      "Eletticita Solar": { "$avg": "$solar_electricity" },
      "Eletticita Eolica": { "$avg": "$wind_electricity" }
    }
  },
  {
    "$group": {
      "_id": "${Paese}",
      "Domanda_de_elettricita": { "$first": "$Domanda de eletticita" },
      "Total Prodotto": {
        "$sum": { 
          "$add": [
            "$Eletticita biocarburante",
            "$Eletticita carbone",
            "$Eletticita fossile",
            "$Eletticita gas",
            "$Eletticita idroelettrica",
            "$Eletticita di basso carbon",
            "$Eletticita nuclear",
            "$Eletticita petrolio",
            "$Altre Eletticita renovable",
            "$Altre Eletticita renovable no carburante",
            "$Eletticita Solar", 
            "$Eletticita Eolica"
          ] 
        }
      }
    }
  }
]


//Percentuale di energie prodotte nel paese selezionato nell'anno selezionato

[
  {
    "$match": {
      "country": "$Paese",
      "year": $Year
    }
  },
  {
    "$group": {
      "_id": "$country",
      "Eletticita biocarburante": { "$avg": "$biofuel_electricity" },
      "Eletticita carbone": { "$avg": "$coal_electricity" },
      "Eletticita fossile": { "$avg": "$fossil_electricity" },
      "Eletticita gas": { "$avg": "$gas_electricity" },
      "Eletticita idroelettrica": { "$avg": "$hydro_electricity" },
      "Eletticita di basso carbon": { "$avg": "$low_carbon_electricity" },
      "Eletticita nuclear": { "$avg": "$nuclear_electricity" },
      "Eletticita petrolio": { "$avg": "$oil_electricity" },
      "Altre Eletticita renovable": { "$avg": "$other_renewable_electricity" },
      "Altre Eletticita renovable no carburante": { "$avg": "$other_renewable_exc_biofuel_electricity" },
      "Eletticita Solar": { "$avg": "$solar_electricity" },
      "Eletticita Eolica": { "$avg": "$wind_electricity" }
    }
  }
]

//Quali sono le energie dei primi 10 paesi che producono di più?

[
  {
    "$match": {
      "electricity_demand": { "$exists": true, "$ne": null, "$ne": "NaN" },
      "year": { "$eq": ${Year} },
      "country": {
        "$nin": [
          "America","Lower-middle-income countries",
          "Europe","North America","South America",
          "High-income countries","Asia", "Africa", "Oceania",
          "World", "European Union (27)",
          "Upper-middle-income countries"
        ], "$not": { "$regex": "Ember" } 
      }
    }
  },
  {
    "$group": {
      "_id": "$country",
      "Domanda di eletticita": { "$avg": "$electricity_demand" },
      "Carbone": { "$avg": "$coal_electricity" },
      "Fossile": { "$avg": "$fossil_electricity" },
      "Gas": { "$avg": "$gas_electricity" },
      "Idroelettrica": { "$avg": "$hydro_electricity" },
      "Nuclear": { "$avg": "$nuclear_electricity" },
      "Petrolio": { "$avg": "$oil_electricity" },
      "Renovable": { "$avg": "$other_renewable_electricity" },
      "Solar": { "$avg": "$solar_electricity" },
      "Eolica": { "$avg": "$wind_electricity" }
    }
  },
  { "$sort": { "Domanda di eletticita": -1 }  },
  {"$limit": 10 }
]

//Quali sono le energie nel paese scelto nell'anno selezionato?

[
  {
    "$match": {
      "country": "${Paese}",
      "electricity_demand": { "$exists": true, "$ne": null, "$ne": "NaN" },
      "year": ${Year}
    }
  },
  {
    "$group": {
      "_id": "${Paese}",
      "Domanda de elettricita": { "$avg": "$electricity_demand" },
	    "Elettricita biocarburante": { "$avg": "$biofuel_electricity" },
	    "Elettricita carbone": { "$avg": "$coal_electricity" },
      "Elettricita fossile": { "$avg": "$fossil_electricity" },
      "Elettricita gas": { "$avg": "$gas_electricity" },
      "Elettricita idroelettrica": { "$avg": "$hydro_electricity" },
      "Elettricita di basso carbon": { "$avg": "$low_carbon_electricity" },
      "Elettricita nuclear": { "$avg": "$nuclear_electricity" },
      "Elettricita petrolio": { "$avg": "$oil_electricity" },
      "Altre Elettricita renovable": { "$avg": "$other_renewable_electricity" },
      "Altre Elettricita renovable no carburante": { "$avg": "$other_renewable_exc_biofuel_electricity" },
      "Elettricita Solar": { "$avg": "$solar_electricity" },
      "Elettricita Eolica": { "$avg": "$wind_electricity" }
    }
  }
]

//Quali sono le energie nel paese scelto nell'anno selezionato?

[
  {
    "$match": {
      "country": "${Paese}",
      "electricity_demand": { "$exists": true, "$ne": null, "$ne": "NaN" },
      "year": ${Year}
    }
  },
  {
    "$group": {
      "_id": null,
      "Domanda di eletticita": { "$avg": "$electricity_demand" },
      "Elettricita biocarburante": { "$avg": "$biofuel_electricity" },
      "Elettricita carbone": { "$avg": "$coal_electricity" },
      "Elettricita fossile": { "$avg": "$fossil_electricity" },
      "Elettricita gas": { "$avg": "$gas_electricity" },
      "Elettricita idroelettrica": { "$avg": "$hydro_electricity" },
      "Elettricita di basso carbon": { "$avg": "$low_carbon_electricity" },
      "Elettricita nuclear": { "$avg": "$nuclear_electricity" },
      "Elettricita petrolio": { "$avg": "$oil_electricity" },
      "Altre Elettricita renovable": { "$avg": "$other_renewable_electricity" },
      "Altre Elettricita renovable no carburante": { "$avg": "$other_renewable_exc_biofuel_electricity" },
      "Elettricita Solar": { "$avg": "$solar_electricity" },
      "Elettricita Eolica": { "$avg": "$wind_electricity" }
    }
  }
]


//La domanda energetica dal 2000

[
  {
    "$match": {
      "country": "$Paese",
      "electricity_demand": { "$exists": true, "$ne": "NaN" },
      "year": { "$gte": 2000 }
    }
  },
  {
    "$group": {
      "_id": "$year", "avg_demand": { "$avg": "$electricity_demand" }
    }
  },
  {    "$sort": { "_id": 1 }  },
  {    "$limit": 24  }
]

//Domanda di elettricità gli ultimi anni
[
  {
    "$match": {
      "country": "$Paese",
      "year": { "$gte": 2000 }
    }
  },
  {
    "$sort": {
      "year": 1
    }
  },
  {
    "$group": {
      "_id": "$year",
      "electricity_demand": { "$first": "$electricity_demand" }
    }
  },
  {
    "$project": {
      "_id": 0,
      "year": "$_id",
      "electricity_demand": 1
    }
  }
]

//Inflazione nell'anno selezionato

[
  {
    "$match": {"$Year": {"$exists": true, "$ne": null}}
  },
  {
    "$group": {
      "_id": "$Country","avg_inflation": {"$avg": "$$Year"}
    }
  },
  {   "$sort": { "avg_inflation": -1} },
  {    "$limit":  40  }
]

//Inflazione paese scelto negli anni 

[
  {
    "$match": { "Country": "$Paese" }
  },
  {
    "$project": {
      "Country": 1,
      "inflation_data": {
        "$objectToArray": "$$ROOT"
      }
    }
  },
  {"$unwind": "$inflation_data" },
  {
    "$match": {
      "inflation_data.k": { "$regex": "^[0-9]{4}$" },
      "inflation_data.k": { "$gte": "2000" }
    }
  },
  {
    "$group": {
      "_id": "$inflation_data.k",
      "avg_inflation": {
        "$avg": {"$ifNull": ["$inflation_data.v", 0]}
      }
    }
  },
  {
    "$sort": {"_id": 1}
  }
]

//Inflazione nell'anno scelto

[
  {
    "$match": {
      "$Year": {"$exists": true,"$ne": "NaN"}
    }
  },
  {
    "$group": {
      "_id": "$Country",
      "avg_inflation": {"$avg": "$$Year"}
    }
  },
  {
    "$sort": { "avg_inflation": -1}
  },
  {
    "$limit": 10
  }
]

//Massima domanda di energia nell'anno scelto

[
  {
    "$match": {
      "year": 2018,
      "electricity_demand": { "$exists": true, "$ne": null },
      "country": {
        "$nin": [
          "America",
          "Lower-middle-income countries",
          "Europe",
          "North America",
          "South America",
          "High-income countries",
          "Asia",
          "Africa",
          "Oceania",
          "World",
          "European Union (27)",
          "Upper-middle-income countries"
        ],
        "$not": { "$regex": "Ember" } 
      }
    }
  },
  {
    "$group": {
      "_id": "$country", "max_demand": { "$max": "$electricity_demand" }
    }
  },
  {    "$sort": { "max_demand": -1 }  },
  {    "$limit": 10  }
]

//Promedio di domanda di elettricita in tutto il DB

[
  {
    "$match": {
      "country": { "$exists": true, "$ne": null,
              "$nin": [
          "America",
          "Lower-middle-income countries",
          "Europe",
          "North America",
          "South America",
          "High-income countries",
          "Asia",
          "Africa",
          "Oceania",
          "World",
          "European Union (27)",
          "Upper-middle-income countries"
        ],
        "$not": { "$regex": "Ember" } },
      "electricity_demand": { "$exists": true, "$ne": null }
    }
  },
  {
    "$group": {
      "_id": "$country", 
      "avg_demand": { "$avg": "$electricity_demand" } 
    }
  },
  {
    "$sort": { "avg_demand": -1 } 
  },
    {
    "$limit":10
  }
]



