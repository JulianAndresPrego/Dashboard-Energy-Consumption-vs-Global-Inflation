#1. Preparazione dei Dati (CSV):

import pandas as pd

# Leggi il file CSV
datainflation = pd.read_csv('C:/Users/Juli/Desktop/Progetto ISFBD/datasets/inflation-data.csv')
print(datainflation)
dataenergy = pd.read_csv('C:/Users/Juli/Desktop/Progetto ISFBD/datasets/world-energy.csv')
print(dataenergy)

# Esegui pulizia e pre-processing dei dati se necessario
# Identifica la colonna contenente i testi per l'analisi del linguaggio

##2. Importazione dei Dati in MongoDB:

from pymongo import MongoClient

# Connetti al database MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['proyecto_prove']

# Carica i dati nel database
collection_inflation = db['inflation']
collection_energy = db['energy']
collection_inflation.insert_many(datainflation.to_dict(orient='records'))
collection_energy.insert_many(dataenergy.to_dict(orient='records'))

# 3. Sviluppo dello Script di Apache Spark:
from pyspark.sql import SparkSession

# Crea una sessione Spark
sparks = SparkSession.builder.appName("Energy Inflation").config("spark.mongodb.input.uri", "mongodb://localhost:27017/proyecto_prove.inflation").config("spark.mongodb.output.uri", "mongodb://localhost:27017/proyecto_prove.energy").config('spark.jars.packages', 'org.mongodb.spark:mongo-spark-connector_2.11:2.3.2').getOrCreate()

# Carica i dati di consumi energetici
consumi_df = sparks.read.csv("world-energy.csv", header=True)
consumi_df.write.format("com.mongodb.spark.sql.DefaultSource").mode("append").save()

# Carica i dati di inflazione
inflazione_df = sparks.read.csv("inflation-data.csv", header=True)
inflazione_df.write.format("com.mongodb.spark.sql.DefaultSource").mode("append").save()

consumi_df = sparks.read.format("com.mongodb.spark.sql.DefaultSource").load()
inflazione_df = sparks.read.format("com.mongodb.spark.sql.DefaultSource").load()

spark_consumi_df=sparks.createDataFrame(consumi_df)
spark_inflazione_df=sparks.createDataFrame(inflazione_df)


# Leggi i dati da MongoDB
consumi_df_spark = sparks.read.format("com.mongodb.spark.sql.DefaultSource").option("spark.mongodb.input.uri", "mongodb://localhost:27017/proyecto_prove.energy").load()
spark_consumi_df.createOrReplaceTempView("energy")
query1 = sparks.sql("SELECT * FROM train")
query1.show(10)

