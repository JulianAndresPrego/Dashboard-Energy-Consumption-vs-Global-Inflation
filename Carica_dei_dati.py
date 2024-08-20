import pandas as pd
from pymongo import MongoClient

# 1. Preparazione dei Dati (CSV):

# Leggi il file CSV per l'inflazione
datainflation = pd.read_csv('C:/Users/Juli/Desktop/Progetto ISFBD/datasets/inflation-data.csv')

# Leggi il file CSV per i consumi energetici
dataenergy = pd.read_csv('C:/Users/Juli/Desktop/Progetto ISFBD/datasets/world-energy.csv')

# Esegui pulizia e pre-processing dei dati se necessario
# Identifica la colonna contenente i testi per l'analisi del linguaggio

# 2. Importazione dei Dati in MongoDB:

# Connetti al database MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['proyect_prove']

# Carica i dati nel database per l'inflazione
collection_inflation = db['inflation']
collection_inflation.insert_many(datainflation.to_dict(orient='records'))

# Carica i dati nel database per i consumi energetici
collection_energy = db['energy']
collection_energy.insert_many(dataenergy.to_dict(orient='records'))

