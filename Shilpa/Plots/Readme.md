In this Clean_Plots folder, we will see the visualization of Global vaccination change over many years (1997-2018) for 13 vaccines using Plotly's interactive bubble chart. 

These vaccines and their protection against their respective diseases are as follows:
BCG: Tuberculosis
DPT1: Diphtheria (first dose)
DPT3: Diphtheria (third dose)
HEPB3: Hepatitis B, 
Hepbb: Hepatitis B, 
Hib3: Influenza, 
IPV: Polio, 
MCV1: Measles (first dose), 
MCV2: Measles (third dose), 
PCV3: Pneumococcal pneumonia(fights against three varieties of Pneumococcus), 
RCV1: Rubella, 
Rotac: Rotavirus,
YFV: Yellow Fever

Data was obtained from UNICEF and population data was obtained from World Bank

Cleaning and plotting was done in Jupyter Notebook using Pandas. 

Population data was merged into UNICEF data to coincide with year, and labelled as 'values'

All null values were converted to '0'. 

For all of these vaccines, graphs were plotted with x-axis : Target,                                   y-axis: % coverage,                                bubble size: population size ie., values  

Bubble plots with file names as z_plots contain colored bubble charts, where the color of bubbles represents their respective UNICEF regions.

However, these z_plots were made only for BCG, DPT1, DPT3, IPV1, MCV1, due to lack of time.

Conclusions:
Global trend towards vaccination seems to be towards 100%. Lack of coverage seems to be mostly in countries of Africa. 

Caveats: 
UNICEF Target is considered as 100%. It would be interesting to see the trend if the total population was considered as 100%.


It would also have been interesting to see the trends :
- when different vaccines against same disease are mergerd, for example: DPT1, and DPT3. Similarly, MCV1, and MCV2. 



