Local work

Before all check that you have NodeJs and Google Chrome browser installed.

Start working

Open any empty directory

Launch Git Bash here (or cmd or any other console app and cd to the directory you want to download the test in)

Run the commands:

 1. git clone https://github.com/llaskot/try2.git
 2. cd try2 
 3. npm install (it takes some time)
 4. npm run test

If the test starts then everything is OK, if not - text/call me.

In order to use these tests get try2 directory by any console app (cmd bash etc.) and then

	run command:
 
 npm run test - running all the tests in the project
 
 npm run report - opens the html report in the default browser
 
 npm run testAndReports - runs tests and then opens the reports (It does not always work so I'll fix it if needed)

 You can also use .bat files in try2 directory. (only Windows)
 
 Report gets rewritten after each test launching.
 
 If you need to change it or add something to the report or a specific way to start tests - message/call me!
 
 HTML and JSON reports are located in the try2\report\results directory. 
