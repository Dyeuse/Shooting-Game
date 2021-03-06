# The Shooting Game

[<img src="./src/media/british-flag.svg" alt="The British flag" style="width: 30px"/>](./README.md)
[<img src="./src/media/french-flag.svg" alt="The French flag" style="width: 30px"/>](./README.fr.md)

Author : <ins>Dyeuse</ins>
<br />Last release : <ins>June 2022</ins>

<img src="./src/media/game-cap.png" alt="Capture of the game" style="width: 600px"/>

**[===> PLAY <===](https://the-shooting-game.netlify.app/)**

## Description

-   This is a skills demonstrating project
-   Developed in Vanilla JS
-   Favorizing the usage of ES6/+
-   Navigator side executed

A shooting game was selected for the multiple technical challenges it brings in the development process.

## Paradigms Used

-   Object oriented programmation
-   Event programmation

    _+ Airbnb style rules_

## Main tools

-   Babel
-   Npm
-   Git
-   Eslint
-   Prettier
-   Jest
-   Parcel

### _Notice_

The use of JSDoc was considered in order to benefit from the “TypeScript check”. But since the tool hasn’t been updated since 2017 its usage was discarded.

## Technical considerations

### _The application part is constructed with 7 classes :_

1. Zone
    > The Zone class is the first to be instantiated. It determines the perimeter of the game based on the user screen size and a container given as an argument. Its instance is transmitted directly or indirectly as an argument to all other class calls.
2. Radar
    > The Radar class monitors the zone using events listeners and reports the activity of the zone. It detects bullets shootings, bombs droppings, zone exits and interceptions; It keeps track of all the active projectiles in the zone.
3. Sky
    > The Sky class allows the creation of an evolutive cloud cover that gives a more realistic aspect to the game. It only has one public method _(displayClouds)_. Furthermore, it has to be called with a list containing the paths to the different cloud images to display.
4. Gun
    > The instance of the Gun class is the only object to be directly manipulated by the user via the mouse _(except resizing)_. It is the only location where the Bullet class instances are created by a click in the zone.
5. Bullet
    > An instance of the Bullet class is created when the user clicks in the zone. Its direction is determined by the positions of the barrel tip and the cursor. This class gives the method _(checkImpact)_ that allows the determination of a collision between a bomb and a bullet.
6. Bomber
    > This class is the only invisible instance to the user. The bomber is considered to evolve above the cloud cover. Its existence allows more coherence in the management of the bombing phases. It is the only location where the Bomb class instances are created.
7. Bomb
    > This class manages predominantly the aspect of the bomb instances and their explosion. The bombs are automatically generated by the Bomber class instance _(During raid method calling)_.

The classes were built to be independent from each other; With the exception of the Bullet class and the Bomb class who are strongly coupled to the Gun class and the Bomber class.

### _Each classes follows the following definition order:_

1. Class fields of data properties
2. Constructor method
3. Class fields of function properties
4. Getter and setter
5. Instance methods
6. Static methods

    _+ The properties or public methods are placed before the private ones._
