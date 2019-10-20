# Project 2: World Immunization Progress

![Muracan](images/rice-cookers-project2.jpg)


## Team members: Shilpa Muralidhar, Lisa Cannon, Brian Labelle, 
## Technical Consultant: Matt Hawley

# Data:
Unicef Immunization percentages by country over the recent 40 years. Data on 15 vaccines. Sanitation, hygiene, and water supply measures.

# Goal:
The goal of this project is to collect, visualize, and analyze the percent to people vaccinated in each country worldwide. 

	We want to answer...
	```
	1. how percent immunized changed over, 
	2. how percent immunized is distributed worldwide, and 
	3. Does there exist a relationship between percent immunized and life expectancy or infant mortality.
	```
	
# Inspiration:
Our inspiration for choosing this topic is Shilpa’s background in immunization research and her ongoing passion for learning more about the influence of immunization to world health. Some visualization inspiration we found include:
https://unicef.shinyapps.io/wuenic_analytics/ and https://data.humdata.org/organization/unicef-data


# Conclusion:
```
* In general, a give vaccination has a positive relationship with life expectancy and a negative relationship with infant mortality.
* When data is complete, linear regression fits look promising but the assumption of equal variance is violated.
* More questions are raised… More analysis is needed.
```

# What’s next for analysis?:
```
* Compare vaccination coverage geographically to see if regional trends exist.
* Regression analysis: Automate the process of determining a variance stabilizing transformation when needed.
* Regression analysis: Automate outlier detection.
* Look at other measures of health and wellbeing.
* Incorporate other factors that influence health and conduct a multiple linear regression analysis.

```

### Prerequisites

```
python-3.6.2
Flask-PyMongo 2.3.0
Flask-SQLAlchemy 2.4.0
gunicorn 19.9.0
Jinja2 2.10.1
psycopg2 2.8.3
SQLAlchemy 1.2.19
gunicorn 19.9.0
```

### Collaborative Coding Environment

Python code was developed mainly utilizing Microsoft Visual Studio with Python Flask.
4 app.py were created to manage a very ambitious 9 different visilisations.

[Muracan](images/chart001.jpg)


	* muracantrend.herokuapp.com | World Immunization Progress Chart
			- Vaccination Coverage 
			- Life Expectancy / Infant Mortality 

	* muracanlife.herokuapp.com | Life Expectancy Regression
			- Life Expectancy Linear Regression Fit
			- Life Expectancy Normal Q-Q Plot
			- Life Expectancy Residual Plot
			
	* http://muracaninfant.herokuapp.com/ | Infant Mortality Regression
			- Infant MortalityLinear Regression Fit
			- Infant Mortality Normal Q-Q Plot
			- Infant Mortality Residual Plot
			
			
[Muracan](images/chart002.jpg)

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Due to the time constrains to get 4 different app.py applications to function on Heroku it was decided to modularize and setup 1 heroku per app.py and inter-connect them utilizing the hub & spoke philosophy. The theory was that at least we could build on the success as each app.py was deployed as compared to having a single 600+ line of code in a single app to mitigate troubleshooting python code on an unknown Heroku platform.


[Muracan](images/heroku-hub-spoke.jpg)







## Tools that were used to built this project:
```
* Visual Studio Code v1.39.2 - code development
* Adobe DreamWeaver v19.2.1 - Management & development of HTML files.
* Postgres pgAdmin v4.9 - SQL Table creation on Heroku
* Adobe Fireworks CS6 - Graphic editing

* Adobe Premiere Rush v1.2.8 - Video editing
* WinMerge v2.16.4 - easy side by side code comparison
* GitHub Desktop v2.2.1 - sharing code

* Heroku - Platform as a Service - hobby basic plan for 10,000,000 rows of data.
* Heroku - PostGres Add-on v11 Data Store
```











* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds


# Heroku - Platform as a Service | Thinking Big.

Ambisoucly 

[Muracan](images/heroku-hub-spoke.jpg)

muracanlife.herokuapp.com - manages the Life Expectancy Regression

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

