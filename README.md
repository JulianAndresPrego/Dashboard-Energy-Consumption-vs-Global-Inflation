# Dashboard-Energy-Consumption-vs-Global-Inflation
The goal of this project was to create a dashboard to visualize how energy consumption affects inflation and vice versa, both globally and for each country individually.

# Structure of the "Energy" Database
The energy dataset is a collection of parameters managed by Our World in Data, which includes data on energy consumption (primary and per capita), energy mix, electricity mix, and other parameters. It is composed of various sources, including the Energy Institute, the US Energy Information Administration, The Shift Dataportal, Ember, and Our World in Data. Data from the World Bank is also used to create regional aggregates and per capita variables.

# Structure of the "Inflation" Database
The World Bank's Prospects Group has built a global inflation database. The database covers up to 209 countries for the period 1970-2022 and includes six measures of inflation in three frequencies (annual, quarterly, and monthly):

- Headline Consumer Price Index (CPI) inflation
- Food CPI inflation
- Energy CPI inflation
- Other values

The database also provides aggregate inflation for the global economy, advanced economies, and emerging and developing market economies, as well as global commodity price measures. In my case, I have only used the data on Energy CPI inflation.

# Development of the work

All this work was developed by connecting Grafana with MongoDB. The presentation demonstrates how this entire connection is set up and visualized.



















