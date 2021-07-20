# save-the-princes-pddl
A fully working pddl solution to the unfamous game - "save the princes" with full gui

http://github.com - automatic!
[demo](https://save-the-princes.surge.sh/)


[![N|Solid](https://bonditglobal.com/wp-content/uploads/2019/11/cropped-bondit-logo-1.png)](https://nodesource.com/products/nsolid)
# BondIT Webapp

## How do i run ?
### 1. Repo cloning
```sh
git clone git@bitbucket.org:repositories_bondit/bondit_webapp.git
```
### 2. Editing the host file
```sh
The host file location on windows 10 is: C:\Windows\System32\Drivers\etc
please add this line in the end of the file:
127.0.0.1       webapp.bonditplatform.com
```
### 3. Changing the server url path
```sh
Set the BASE_URL variable in the environment.ts file (in our Angular app) :
var BASE_URL = 'http://dev03.bonditplatform.com';
```
### 4. Running the app
```sh
Run the following commands:
npm install
ng serve --host webapp.bonditplatform.com --configuration es5 
```
-----------------------------------

Just for chrome for the cors issue:
Navigate to
chrome://flags/ 
set 'same-site-by-default-cookies' to disabled
