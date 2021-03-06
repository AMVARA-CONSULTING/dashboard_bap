# Changelog

All notable changes to this project will be documented in this file.

## 2.16.0

- Graphical improvements
- PS > Click on Barchart shows encoded string in Table
- PP > L2 - progress circle \"customer\" blue is missing background color

## 2.15.0

- Report title in header
- AL > Arrow closer to text
- PS > Barchart order is INSIDE, OUTIDE; BODYBUILDER ... as in table
- PS+other > Barcharts always more grouped, text centered, font-size smaller ... see attached screenshot as example
- OI > L1 table ... remove Actual Month + prev. Month
- Swipe > always move between reports
- IE-Desktop > Progress circle missing background under some cicumstance
- IE: TriggerReport does not trigger. Seeing in console: ERROR TypeError: Das Objekt unterstützt die Eigenschaft oder Methode remove nicht
- AL: 280/12=23,33=2333% ... remove thousand separator from percentage numbers + remove -number outside bar + size bar max(100)
- AL: when seeing 0 in barchart on L2+L3 paint grey

## 2.14.0

- Used -webkit-text-size-adjust: 100%; to prevent font size changing on portrait <-> landscape
- Production Program - Show zones instead of plants in L1 table
- Production Program - Correct height of reserve in L1
- Production Program - Show SR

## 2.13.0

- Plant Stock - Set custom sorting
- Plant Stock - not defined goes directly to L3
- Production Program - SR header on L2 & L3

## 2.12.0

- Allocation - Barchart mouseover numbers
- Allocation - Total numbers
- Production Program - Year Filter on Graphics
- Fixed contacts
- Removed hover effect on graphics for mobile
- Plant Stock - Barchart & Table clickable

## 2.11.0

- Negative percents on circular progress bars
- Order Intake - Make actual day 1 line
- Production Program - Correct barchart as in V1
- Production Program - Better barchart positioning in mobile devices
- Production Program - Fixed 3rd percent in L3 (only regions)
- Allocation - Switch Program / Allocation columns order
- Allocation - Readjust selectors to the top in L2+L3
- Allocation - L2+L3 Total numbers
- Allocation - Allocation percent inside of bar (also, not exclusively)
- Allocation - Make program bar ever 100% and allocation % of program
- [Swipe] Only goes to other reports, event still present in About & Help for convenience

## 2.10.0

- DIP is now fully compatible with iOS devices 😎

## 2.9.0

- Implement circular progress bars on Plant Stock
- Fix mouseover on Plant Stock Level 3
- Fix app titles

## 2.8.0

- Adapted for Cognos Analytics

## 2.7.0

- Added Swipe between pages and levels
- Added return button on Plant Stock Levels
- Minor bugfixes

## 2.6.0

- Fixed footer background color

## 2.5.0

- Plant Stock level 2 & 3 done

## 2.3.0

- Now the SW tries to update files (if they are new) on page load
- The App automatically checks for updates and prompts the user to reload
- Changed page title to top left corner, only on mobile devices
- Plant Stock Level 1 done
- Improved performance on templates *ngFor's using container statement

## 2.2.0

- Created module for Plant Stock
- Plant Stock Level 1

## 2.1.0

- Updated Manifest file
- Updated styles
- Updated npm packages
- Updated @angular/cli
- Added popup hints
- Added language selector on About
- Added reload language on About
- Added Translation Service on all modules
- Added translations for English & Deutsch for almost all visible strings
- Added click on levels 3 so you can view the regions for a product and vice versa
- Added little triangle on chartbar hints
- Removed percentage of barchart values (temporarily)
- Automatic rotate barchart descriptions depending on bars width
- Introduced new theme palette (OK from Designer)
- New background image
- Added real-time connection status on footer
- Now the page title can be viewed in the footer
- No more need to reload with Shift + F5 to get the latest version, now just F5

## 2.0.1

- Update colors to match logo
- Allocation Lvl 2
- Improve SASS structures
- Added logo animation on loading data
- Dynamic footer background color changes based on page content
- Added info in About page
- Changed contacts on Help page

## 2.0.0

- Initial App
