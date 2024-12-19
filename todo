-------------------------------------------------------------
 _            _       
| |_ ___   __| | ___  
| __/ _ \ / _` |/ _ \ 
| || (_) | (_| | (_) |
 \__\___/ \__,_|\___/ 

-------------------------------------------------------------


modules to use/learn 

npm install date-fns // for date
npm install sharp // for image manipulation

!!rules for router: the main component files have to be in tabs folder and each one has to have _layout to controll the components!!!
router configuration/direction:
    app -> _layout : [stack] connect the tabs and modal together plus other configuration 

    app -> tabs -> _layout :  [tabs] connect activity page(_layout) and homescreen

    app -> tabs -> activityPAGES -> layout : [stack] connect all the component to run the main activity pages

    read the app folder structure pages for detail


#general 
[x] main page activity component -> [x] main page component wt-out live texts -> [ ] add functionality
[x] pre activity location selection component -> [x] parse actual location
[ ] setting page
[ ] location verification 
[ ] activity scoring page component
[ ] user activity tracking component
[ ] 

#design
[ ] parse the kakao map for bare minimum information(visually) to display !!!reconsider find alternative!!!
[ ] find a sustainable way to size the fonts
[ ]

#router
[ ]

#backend
[ ] setup kakaotalk authentication
[ ] call map from kakao map/openstreetmap 
[ ] setup firebase authentication/kakotalk authentication
[ ] resolve duplicated value issue(key)
[ ] create posting function -> [ ] apply the posting function
[ ] strcture the backend for location adding functioality
[ ] restructure the confirmation page to modal -> [ ] find replacement
[ ]

#other
[ ] decide icon from the stock expo icon family
[ ] decide the font family
[ ]

-------------------------------------------------------------

#done LIST + explanation for log
#general 

#router
[x] set general router structure 
>>> does need more indebth strcture but the core is sucessful, the strcture has to change based on the application's scaling 

[x] find suitable font family
>>> use the font family provided by samsung across all devices

[x] main page activity idea -> [x] fix issue of text being too small via resturcture 
>>> the core strcture of the activity is complete, not fully complete yet

#design
[x] map selection page idea
[x] fix sepeartor not working
[x] bump the font size up

#backend
[x] setup firebase storage
[x] add refresh functionality onto the activityPAGE flatlist
[x] detailed firebase fetching structure
[x] restructure the firebase fields
[x] create an stable firestore structure

#other
[x] decide whats the core functionality
[x] understand how to structure activityPAGE


-------------------------------------------------------------


core components(without refinment):
home component: 
    [x] viewing other's activity -> note: detailed screen modal, edit, show new USER post first, show friend posts
    sub_COMPONENT:
      [ ] comment screen -> 

activity component: 
    [x] mapSelection/adding map
    [ ] activity tracking
    [ ] reviewing activity after the game

stat component: 
    [ ] user stat page

[ ] displaying map in a simple way!!
[ ] login/signup
[ ] universal hub( folder ) for data fetching
[ ] low storing space for image 
[ ]

-------------------------------------------------------------

usersPage core component:
[ ] easy search of loaction and stat
[ ] news including competition
[ ] ability to post news, categorizeing the useage (competition, advertisement, ground play)


PATH(page priority):
mainscreen -> subpages 
    |_ map selection page -> activity page -> review/revise page 
            |_ (continue) -> add location page 

PATH(backend Structure):
signup/login -> fetch/append data from DB
    |_ mainpage -> fetch selected preset(until traction) of DB -> prioritize friends and actual peoples
                    -> load modal with the fetched list
    |_ activity  -> location finder
                    |_ location review location -> temp location text
        |_ finish game -> add stats onto DB 

-------------------------------------------------------------

db structure:
firebase store{
    users: {
        auth,
        userName,
        email,
        password
    }, -> login / signup / matching activity with user -> give the functionality of edit
    activity: {
        id,
        userName,
        title,
        sub-title(optional),
        location,
        date,
        totalTime,
        totalStep,
        totalHits(needs to be specified),
    }, 
}
 

db functions:
note: function should revolve around ui, have an visual of what ur application will be then follow with backend
note: these arent actual functions these are going to be they dont have an clear structure some of them might be in the _layout file


-------------------------------------------------------------

note: 
impliment the image last, it isnt neccesary for the application to be "useful"
remember whats truly necessary


-------------------------------------------------------------
                _          __   _            _       
  ___ _ __   __| |   ___  / _| | |_ ___   __| | ___  
 / _ \ '_ \ / _` |  / _ \| |_  | __/ _ \ / _` |/ _ \ 
|  __/ | | | (_| | | (_) |  _| | || (_) | (_| | (_) |
 \___|_| |_|\__,_|  \___/|_|    \__\___/ \__,_|\___/ 
