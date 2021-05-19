# General Assembly Project Three - Pubhub

### Timeframe

10 days

### Group Members

- Atilla Arslan
- Jessie Edwards
- Harry Warwick
- Olivia Flynn

## Project Overview

For the third Project on our Software Engineering Immersive Course at General Assembly, we were tasked with building a Full Stack Application using the MERN stack, within 10 days in a group of pre-assigned members.

The Remote nature of the course was a great opportunity to work collaboratively as a group using tools such as Slack, Zoom, Trello and Github.

For our project we built a clone of airbnb but for Pubs, called Pubhub. Our application which closely mimicked the functionality and user interface of airbnb but tailored towards Pubs.

##### Brief

- To build a full-stack application, making our own back end and front end.
- To use an Express API to serve data from a Mongo database.
- To build the frontend using React to consume the API.
- The API should have multiple relationships and CRUD functionality for at least a couple of models.

##### Technologies Used

- HTML5
- CSS3/ SASS
- Bulma
- JavaScript (ES6)
- React
- MongoDB
- Express
- Insomnia
- Heroku
- Trello
- Git
- GitHub
- Cloudinary
- Google Chrome dev tools
- Google Sheets
- VS Code
- Eslint
- Photoshop

##### Deployed Project:

https://pubhub-new.herokuapp.com/

##### Approach:

As we were building a clone of Airbnb, we decided to screenshot all of the flows on the Airbnb website, both logged in and out. We then added each screenshot to a slideshow and annotated each one to figure out all the functionality we needed to cover for our MVP.

With this figured out we created some basic wireframes for each view and made some estimations for our component structure of our React App. We then created a mockup of the home page, helping set the colour scheme and logo for the app also.

<img width="964" alt="home-screenshot" src="https://lh5.googleusercontent.com/YeMqJI7uMU_K3wZbDkX0PHhv5uv1ovoNPoFW-LElHcHKtFr3dkHdEX4stiYmBo1h19Uun6XQ8EBO_IDsTSnE7gj7T7DlMHLVb0CDdrjf2Y_hxv9dGoxRAfG-hvOtUvMgxjIb-ERD">

<img width="964" alt="mock-up" src="https://lh5.googleusercontent.com/5zaA5WvT1IbnfMZHK6Al6fbRvfR6i0lsExWIOedDtSMZswccoppno7ab8W0B3NLKpTfptIFo6UsRHq4dJqKxNcCWd3PG780haLKAwLMKk1htuAKFLhcvoJ6UHJV1nGfqQEriBjrW">

Based on our screenshots and notes, as well as our mockup we transferred all the tasks that needed to be completed to Trello and worked on them each day individually and together on Zoom.

##### Backend Set up

Across the project, we worked either on our own or in pairs depending on what was being done and merged the code together using branches on Git. However as an initial step we set up much of the boilerplate backend views/controllers and models together. We eventually created models for the User, to enable registration and login, and eventually store other information such as, whether they were a landlord or not, if it was their first time, an array of pubs favourited, all Reviews they gave of pubs. And also models for the reviews themselves as well as the pubs themselves, each with interdependent relationships such as owner.

```
Javascript
const userSchema = new mongoose.Schema({
 username: { type: String, required: true, unique: true, maxlength: 40 },
 email: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 profileImage: {
   type: String,
   default:
     'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
 },
 isLandlord: { type: Boolean, default: false },
 isUser: { type: Boolean, default: true },
 isFirstTime: { type: Boolean, default: true },
 favouritePubs: { type: Array },
 allReviews: [reviewSchema]
}, {
 timestamps: true
})
```

##### Seeding the Data

Once all the models were in place, two members of the team were tasked with seeding data for the database and adding them using Javascript Object notation which would then be stored as a JSON document on our MongoDB database.

### Front End

Whilst my teammates were either seeding or building more features to the MVC, I took on the role of building out the Front End functionality and styling.

#### Home Page

I started by building out the home page. The first thing I did was start with the top nav bar. I used a Font Awesome Icon as the logo icon and used the font Stratos for the text, which I got from the Adobe Fonts Library.

Next I created a link to Become a Landlord, which is a holding page I would create later for signing up to become a Landlord.

I then added the general layout of the non functional homepage below where the header would be.

<img width="964" alt="hamburger-nav" src="https://lh4.googleusercontent.com/JnztbRt2JJrmGnx7-h-t2lUVxhT7tnwTQd4J8oaqtz5vnbvefMdz0ldlPNfZlnp4RvKXJ_qv3jfRix-Fx6AJEndHJfRcuDPVRBexQkanJtjrpQnZuB8ogH3ZAeO7iaMUQ5GEc-J1">

##### Hamburger

I then spent some time creating the hamburger navigation menu. This was created with a combination of Bulma classes, custom CSS modification and vanilla javascript to add an event listener. The end result is a dropdown menu that looks very similar to airbnb. I put this in it’s own React component to use in different headers later on.

const clickHandler = (e) => { e.currentTarget.classList.toggle('is-active') }

The contents of the dropdown was made to change depending on whether or not a user was authenticated and conditionally rendered based on this.

```
Javascript
<>
     <div className="dropdown is-right" onClick={clickHandler}>
       <div className="dropdown-trigger">
         <button
           className="hamburger-button-hoc button"
           aria-haspopup="true"
           aria-controls="dropdown-menu4"
         >
           <FontAwesomeIcon icon={faBars} className="fa-1x" />
           <span className="logo-space">
             <FontAwesomeIcon icon={faUserCircle} className="fa-2x" />
           </span>
         </button>
       </div>
       <div className="dropdown-menu" id="dropdown-menu1" role="menu">
         <div className="dropdown-content dropdown-shape">
           {!userIsAuthenticated() && (
             <>
               <Link className="dropdown-item">
                 <div onClick={() => modal.current.open()}>Login</div>
               </Link>
               <Link className="dropdown-item">
                 <div onClick={() => register.current.open()}>Register</div>
               </Link>
             </>
           )}

           {userIsAuthenticated() && (
             <>
               <Link to={`/profile/${userID}`} className="dropdown-item">
                 Profile
               </Link>
               <Link
                 to={`/landlord-profile/${userID}`}
                 className="dropdown-item"
               >
                 Landlord Profile
               </Link>

               <hr className="dropdown-divider" />

               <Link
                 to={`/profile/${userID}/saved-pubs`}
                 className="dropdown-item"
               >
                 Saved Pubs
               </Link>

               <hr className="dropdown-divider" />
               <div className="dropdown-item" onClick={handleLogout}>
                 <a>Logout</a>
               </div>
             </>
           )}
         </div>
       </div>
     </div>
     <Modal ref={modal}>
       <Login />
     </Modal>
     <Modal ref={register}>
       <Register />
     </Modal>
   </>
```

I used a lot of this rendering across the site using this helper function which gets the payload from the JWT token created at Login and then checks the expiry.

```
Javascript
export const userIsAuthenticated = () => {
 const payload = getPayloadFromToken()
 if (!payload) return false
 const now = Math.round(Date.now() / 1000)
 return now < payload.exp
}
```

Later on I added the Login and registration forms as components into a React Modal using React Portals and useRef() hook to reference the modals.

Again trying to mirror the aesthetic and functionality of the real airbnb website.

<img width="964" alt="hamburger-nav" src="https://lh5.googleusercontent.com/naxrbk4BA4f9fjWrB9xQ6YLD4NcI1x0oGxGvHvLmc-yHjOIG_kjjHrGSk_6a0ANHjY9DdY3M8TIOlJLZt_zYVShAksm5AX6-aDId4E31VeZO1cqtzOLIW1GM7Vqc91DoCt03yvoP">

##### Search Bar and Hero Section

<img width="964" alt="hamburger-nav" src="https://lh5.googleusercontent.com/h5blgDnaCbQJRsKdiOhb8iiVicx0avXphRTHVxafyoTwg2Abr3LP_Y0G_NeW5GrehO3FyJjcNNuiqZ5J3Np_8_r52gT-6UszbOsKAFJMgSGbbLBud86OKLqEUW0i6JN90clayuLb">

Next I created the large hero section and the custom search bar to match Airbnb’s. I got it to overlap the hero section using Absolute positioning and Z-Index.

```
Javascript
.search-bar {
 padding: 0.5rem 0.5rem;
 width: 40%;
 background: white;
 border-radius: 60px;
 justify-content: center;
 z-index: 5;
 outline: none;
 border: none;
 position: absolute;
 top: 0;
 left: 32%;
 margin-top: 5rem;
}
```

Once the HTML and CSS was completed. Together with my teammate Jessie, we added the search functionality to the bar.

We did this by using a useEffect() to track state to see if a search was being made and then making a get request using Axios to our api/pubs endpoint based on search parameters entered in either the city search or pub search and then pushed the user to the relevant route.

```
Javascript
 const navigateToFiltered = (city) => {
   history.push(`/pubs/filter-pubs/${city}`)
 }
 const navigateToSearched = (pubID) => {
   history.push(`/pubs/${pubID}`)
 }
 const handleSubmit = (event) => {
   event.preventDefault()
   const pubsResult = eventValues.searchPubs
   const cityResult = eventValues.searchCity
   if (cityResult === '' && pubsResult === '') return null
   if (cityResult !== '' && pubsResult !== '')
     window.alert('please enter a search in one field only')
   if (pubsResult === '') navigateToFiltered(cityResult)
   if (cityResult === '') {
     const lowerCaseName = pubsResult.toLowerCase()
     const namesIndex = namesArray.indexOf(lowerCaseName)
     const pubID = idArray[namesIndex]
     if (!pubID) navigateToFiltered(pubID)
     else return navigateToSearched(pubID)
   }
 }
```

##### Sticky Header

We noticed the Airbnb homepage had a sticky header so we created our own too, we did this by creating a separate sticky header component and then making it show and unshow using css classes and JavaScript and then wrapping this in a useEffect().

```
Javascript
useEffect(() => {
   const header = document.querySelector('.myHeader')
   const sticky = header.offsetTop
   const scrollCallBack = window.addEventListener('scroll', () => {
     if (window.pageYOffset > sticky) {
       header.classList.add('sticky')
       header.classList.remove('hide')
     } else {
       header.classList.add('hide')
     }
   })
   return () => {
     window.removeEventListener('scroll', scrollCallBack)
   }
 }, [])
```

##### Pub Index

<img width="964" alt="hamburger-nav" src="https://lh4.googleusercontent.com/aUXs_413Jy5DGcCEpC9OTYdWWNa8fOm3XPGEMGJ704Oe7QZg5o1qwTunPJeBoAghGRVF32X-MPeqQs5VGKfNqaPoCn4GpMcOk9zESg03m7L-g_i6136liZ56YUxJo1jno0mqfqaf">
Next I created the pub index user interface to match that of Airbnb to close detail. I did this by using the reusable <Header /> component. Followed by two Bulma columns.

I initially left the right column empty, but this was later filled in by using the Mapbox Api to display the pubs that were searched for using Params and making requests to the pubs endpoint.

The left column was used to display searched pubs in card format just like Airbnb. Displaying the pub image, name, description and average rating.

Above this I added the filter controls and text that dynamically updated how many search results were returned by the initial search and filter.

In terms of the flow, once a search was made a user is pushed to the pub index page. The page makes a request for all of the pubs in the database and then filters them based one whichever city is in the url Params. It is then further filtered by using the filter controls and a ternary operator on the mapped pubs.

```
Javascript
 if (!filteredByCity) return null
 const pubs = filteredByCity.filter((pub) => {
   const cityToCompare = city.toLowerCase()
   const pubCity = pub.address.city.toLowerCase()

   return pubCity === cityToCompare
 })

 const isSeating = pubs.filter((pub) => pub.isOutsideSeating === true)
 const isFood = pubs.filter((pub) => pub.isFoodServed === true)
 const isSports = pubs.filter((pub) => pub.isLiveSports === true)
 const isPets = pubs.filter((pub) => pub.isPetFriendly === true)
 const isRating = pubs.sort((a, b) => {
     {
             //prettier-ignore
             (sports ? isSports
               : pets ? isPets
                 : seats ? isSeating
                   : food ? isFood
                     : filterPubs ? isRating
                       : pubs).map(
               (pub) =>
                 <PubCard key={pub._id} {...pub} />
             )
           }
```

##### Pub Detail Page

<img width="964" alt="detail-page" src="https://lh4.googleusercontent.com/HG_TI9fuJSe78BxQeIL7p2uFSdrqSHLI6CU1L8qGKKYwcjkZWu9TrJP9XIVFOc7t-zAqzmiC6pscckyBLw-wnCGmA6oPc_bSNzVeo4yaj0oEdNHUc-WvoxzhyOSXf_Vs0wU3zP9Z">
For the detail page once again I imported the Header component and then created two columns and then another two columns underneath.

To get the data I made an axios get request to the pubs api and got the pub in question using useParams and passed this through into the request. I then set the data to state and accessed the information across the page such as the Title, Address, Rating, Image, Description and the conditionally rendered whether or not it was Dog Friendly, had Outdoor seating, if Food was served or if Sports were shown.

We then also integrated the ability to save a pub and conditionally rendered it to show differently if it was already favorited.

```
Javascript
<div className="share-align">
                 {userIsOwner(pubOwner) ? (
                   <>
                     <span className="icon-space">
                       <FontAwesomeIcon icon={faPencilAlt} />
                     </span>
                     <Link to={`/pubs/${id}/edit`}>
                       <p>Edit</p>
                     </Link>
                     <span className="icon-space">
                       <FontAwesomeIcon icon={faTrash} />
                     </span>
                     <Link to={`/pubs/${id}/delete`}>
                       <p>Delete</p>
                     </Link>
                   </>
                 ) : (
                   <>
                     <span className="icon-space">
                       <FontAwesomeIcon icon={faUpload} />
                     </span>
                     <p>Share</p>
                     {favPubsIDs && !favPubsIDs.includes(id) && (
                       <>
                         <span className="icon-space">
                           <FontAwesomeIcon icon={faHeart} />
                         </span>
                         <p onClick={handleSave}>Save</p>
                       </>
                     )}
                     {favPubsIDs && favPubsIDs.includes(id) && (
                       <>
                         <span className="icon-space">
                           <FontAwesomeIcon icon={faHeart} />
                         </span>
                         <p>Saved</p>
                       </>
                     )}
                   </>
                 )}
               </div>
```

##### Reviews

<img width="964" alt="detail-page" src="https://lh6.googleusercontent.com/IbmOd15wPwhO8a6S1w-zpop0umuKpbFEkpr7ny_fiaKOSyLGCnVzkFX-3eKgrnj4tcwYscjZO-02NEGaUjWKUoRMw9r6vmcM1KIRFpF-vuYUFZOnVq2e2MGe0Bsw7PBida_-M384">
Underneath this section we created the Reviews area again mimicking Airbnb. The average rating is calculated and added to the model using a virtual field allowing us to easily display it on the front end across the different pages. We also included the total number of reviews on each pub.

```
Javascript
reviewSchema
 .virtual('overallRating')
 .get(function() {
   const ratingsArray = Object.values(this.subRating)
   const sum = ratingsArray.reduce((acc, curr) => {
     return acc + curr
   }, 0)
   const average = sum / ratingsArray.length
   return !average ? 'Not Rated' : average
 })
```

Underneath we displayed the average sub ratings given to each pub and displayed it using a progress bar.

```
Javascript
<div className="range">
                     <progress
                       type="range"
                       min="0"
                       max="5"
                       value={
                         typeof averageRatings.averageAvailability === 'string'
                           ? 0
                           : averageRatings.averageAvailability.toFixed(1)
                       }
                       className="slider"
                       id="myRange"
                     ></progress>
                     <p>
                       {' '}
                       {typeof averageRatings.averageAvailability === 'string'
                         ? averageRatings.averageAvailability
                         : averageRatings.averageAvailability.toFixed(1)}
                     </p>
                   </div>
```

To prevent the bars from breaking we first check to see if the number is a string, indicating it has not been rated yet, if so we display the string if not we display the integer fixed to one decimal place.

##### Comments

Next we map through the comments array and display each comment made with the owner name, image and timestamp. To convert the timestamp from the Unix Timestamp to a string we created a helper function that converts it into a readable date format, find which month it is and then selects the corresponding string from the array and then string interpolates the year on the end from newDate.

```
Javascript
    <div className="review-date">{convertTimestamp(createdAt)}</div>

export const convertTimestamp = (timestamp) => {
 const date = Date.parse(timestamp)
 const newDate = new Date(date)
 const months = [
   'Jan',
   'Feb',
   'Mar',
   'April',
   'May',
   'June',
   'July',
   'Aug',
   'Sept',
   'Oct',
   'Nov',
   'Dec'
 ]

 return (months[newDate.getMonth()] + ' ' + newDate.getFullYear())
}
```

##### Submit Review

<img width="964" alt="detail-page" src="https://lh6.googleusercontent.com/e4CAxMxEk8DSw5XdIlPzoZZxEZ6BcZCHtBBn3WgXz8HTDyY_vhtsqWh0VntWie7-yfwmAxK_DnRBD6WnAhI7o3SQiUMajwSQI6TO4daGkUDMJR5xIG6A_s3q_9VDG2qfqtJJ_5qc">
To submit a review we created a separate page which gives you a dropdown list to rate each parameter out of 5 and then leave a comment. Once submitted it takes the user back to the pub detail page. Taking the form data and setting it to state, with some default values in place, and then posts it to the pub's reviews endpoint using a post request. Then on successful submission it uses useHistory to push the user back to the Pub.

```
Javascript

const history = useHistory()
 const [formData, setFormData] = useState({
   price: 0,
   availability: 0,
   comfortability: 0,
   text: 'No comment added',
 })
 const { id } = useParams()
 const handleChange = (event) => {
   const newFormData = { ...formData, [event.target.name]: event.target.value }
   setFormData(newFormData)
 }

 //prettier-ignore
 const handleSubmit = async (event) => {
   event.preventDefault()
   try {
     await axios.post(`/api/pubs/${id}/reviews`, formData, {
       headers: {
         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
       },
     })
     history.push(`/pubs/${id}`)
   } catch (err){
     console.log(err.message)
   }


 }
```

In the backend we added conditions so that if a user is a landlord and also owns the pubs, they can not leave a comment, edit or delete them.

```
Javascript

try {
   const userID = req.currentUser._id
   const userName = req.currentUser.username
   const userImage = req.currentUser.profileImage
   const findUser = await User.findById(userID)
   if (findUser.isLandlord && !findUser.isUser)
     throw new Error('user is a Landlord, Landlords cannot review pubs')
   const { id } = req.params
   const pub = await Pub.findById(id)
   if (!pub) throw new Error('Cannot find pub')
   if (isEqual(pub.pubOwner, userID)) {
     throw new Error('user is pub owner - cannot review your own pubs')
   } else {
```

```
Javascript
export const updatePubReview = async (req, res) => {
 try {
   const userID = req.currentUser._id
   const findUser = await User.findById(userID)
   if (findUser.isLandlord) {
     throw new Error(
       'user is a Landlord, Landlords cannot remove pub reviews'
     )
   }

   const { id } = req.params
   const pubToUpdate = await Pub.findById(id)
   if (!pubToUpdate) {
     throw new Error('no pub with that id exists...')
   }
   Object.assign(pubToUpdate, req.body)
   await pubToUpdate.save()
   return res.status(202).json(pubToUpdate)
 } catch (err) {
   return res.status(404).json({ message: err.message })
 }
}
```

##### More Pubs

<img width="964" alt="more-pubs" src="https://lh6.googleusercontent.com/hqB1rb4qUiibZ8df7B3pJs0gr7s_qkLMZguvmDNK7_byC0cnlVPmKcAjeW5oweCoE_mk1-ZIawgWLePlbRClFdVJjl11r871QU0seoyguX2WG3wmT36gqQKaAYFX7_2Gx54b9Bfs">
At the very bottom of the pub detail page, we added more pubs in the same city, to do this we filter through the mapped pubs array by city and run this through the getRandom algorithm to randomise each element in the array.

```
Javascript
 const cityToCompare = pub.address.city
 const filterPubsByCity = pubs
   .filter((item) => item.address.city === cityToCompare)
   .filter((item) => item.nameOfPub !== pub.nameOfPub)
 function getRandom(arr, n) {
   const result = new Array(n)
   let len = arr.length
   const taken = new Array(len)
   if (n > len)
     throw new RangeError('getRandom: more elements taken than available')
   while (n--) {
     var x = Math.floor(Math.random() * len)
     result[n] = arr[x in taken ? taken[x] : x]
     taken[x] = --len in taken ? taken[len] : len
   }
   return result
 }

    {getRandom(filterPubsByCity, 8).map((pub) => {
             return (
               <div
                 key={pub._id}
                 className="column is-one-quarter-desktop is-one-third-tablet"
               >
```

#### Become a Landlord

<img width="964" alt="become-landlord" src="https://lh5.googleusercontent.com/RFXEftSo1a54HNs7_ztltXo-9dj7d3sT6B8drXxpUeprzNO2xWgYKe1A4pMl_kZN_vipkA_egv5oa3xU_gQUQBCTL2vblOVfDDmmmF8MctxeqT8JLnIB8IMpVQlEI8oseFU-BXZJ">

To mimic airbnb’s user flow of signing up to become a host, we decided to do the same for our user flow of becoming a Pub Landlord. To become a landlord, we required the user to first register as a user of the app.

We created the Become a Landlord holding page to highlight the benefits of becoming a landlord the same way airbnb does for hosts.

I created the entire page and made a conditionally rendered button that checks to see if a user is authenticated. If they are not it loads the login modal and then once they are logged in allows them to access the Landlord sign up form.

```
Javascript
           {userIsAuthenticated() && (
             <Link to={'/landlord/signup'}>
               <button className="landlord-get-started button">
                 Get Started
               </button>
             </Link>
           )}
           {!userIsAuthenticated() && (
             <button
               onClick={() => login.current.open()}
               className="landlord-get-started button"
             >
               Login to Get Started
             </button>
           )}
```

##### Landlords sign up.

<img width="964" alt="become-landlord" src="https://lh5.googleusercontent.com/oSo-YTEGpwf8YOHeDKmHfr_IWIz1Nvr35JWKidgMi1_0teJXJuc-r2HVH8YrIyxZ6UZXdJLOdG6BVU99iHoNa3tT6K0R3TjWcjnihrMn">

As long as the user is now logged in they can access the form to register their pub and become a landlord. We created a form that retrieved the address of the pub and the variables and used the Cloudinary Api to upload an image of the pub.

We also made a request when this is the first pub being registered to enable isLandlord on the user model. Allowing the user to become a Landlord.

```
Javascript
 const handleUserSubmit = async () => {
   await axios.put(
     `/api/users/${userID}`,
     { isLandlord: true },
     {
       headers: {
         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
       },
     }
   )
 }

 //prettier-ignore
 const [formData, setFormData] = useState({
   nameOfPub: '',
   line1: '',
   line2: '',
   town: '',
   city: '',
   postCode: '',
   description: '',
   isOutsideSeating: false,
   isPetFriendly: false,
   isFoodServed: false,
   isLiveSports: false,
   image: '',
 })

 //prettier-ignore
 const [errors, setErrors] = useState({
   nameOfPub: '',
   line1: '',
   line2: '',
   town: '',
   city: '',
   postCode: '',
   description: '',
   isOutsideSeating: false,
   isPetFriendly: false,
   isFoodServed: false,
   isLiveSports: false,
   image: '',
 })

 const handleChange = (event) => {
   const value =
     event.target.type === 'checkbox'
       ? event.target.checked
       : event.target.value

   setFormData({ ...formData, [event.target.name]: value })
 }

 const handleImageUrl = (url) =>
   setFormData({ ...formData, image: url })
 }

 const handleSubmit = async (event) => {
   event.preventDefault()
   await handleUserSubmit()
   try {
     //prettier-ignore
     const response = await axios.post('/api/pubs', formData, {
       headers: {
         Authorization: `Bearer ${getTokenFromLocalStorage()}`,
       },
     })

     history.push('/pubs')
   } catch (err) {
     console.log(err.response)
   }
 }
```

#### Profile

<img width="964" alt="profile" src="https://lh3.googleusercontent.com/DHPaEIeFHByKMRvVH7B9E6nsADtCkrYtgXCnluzqZCas5kw3N2_2sCGHl9qEBEk_DiRt4idmDKyg5vlivv6ij7mFHKt_DHS12bD2sJ6gnudZYl7shNaR6o0rLLj6e6C-BHxZEHV3">
The profile page is relatively simple; the user profile information is displayed on the page making a get request to the user end point, using the user id taken from the JWT token.

Using the same methodology to also display the reviews a user has made in a separate component which is also called on the page.

The user profile also has the ability to change the profile image using the cloudinary API.

I created a form to change the user details using a put request, that is hidden and unhidden using state, setting it to True and False respectively to conditionally render it.

<img width="964" alt="edit-profile" src="https://lh5.googleusercontent.com/Nn7ALhL43QahzqYjQYbV5363-W4W8zjODXvHYlKTdVRXr5Gx6hUiBOkv9aUPBypSxaBxjnW2RnbNfK_y9WhBj3d3lCAIJlAxIYaJS1qS">

```
Javascript
 const [detailShow, setDetailShow] = useState(false)

 const editShow = () => {
   !detailShow ? setDetailShow(true) : setDetailShow(false)
 }


 {detailShow && <EditProfile />}
```

##### Saved Pubs & Landlord Profile

<img width="964" alt="saved-pubs" src="https://lh4.googleusercontent.com/n3iSgUs8XR1zgD-2ZjwwkuWaFKrGLW-hO3P-g683W176r-1m_JIqRU-nuRrVduUlJ-fl5qaATCJlBfAkWq-39B9svgPLB9Lo2ZOq-5F7">

Both the saved pubs and landlord profiles are very similar pages, making a get request to the user endpoint and mapping through the saved pubs array and owned pubs arrays respectively.

```
Javascript
 useEffect(() => {
   const getData = async () => {
     const { data } = await axios.get(`/api/users/${userID}`)
     setUser(data)
   }
   getData()
 }, [])
```

## Wins and Challenges:

##### Challenges:

One of the main challenges with this project was the shear size and complexity. It was the largest project I have ever worked on. With many pages and views that needed to be thought out in terms of user flow and how data was shared across all pages. This complexity often led to unforeseen small bugs when introducing new code whilst working in a team. Meaning sometimes it was hard to identify what was causing the problem without proper communication.

##### Wins:

Despite the complexity we were able to iron out a lot of the small bugs caused by miscommunication and make an app that generally works quite well.

## Key Learnings & Known Bugs

##### Bugs:

Currently, our search bar makes a request for all pubs on page load of the home page, causing a slow initial load of the site. We need to refactor this to only make the request on submit and make the filtering at the same time. The mapbox integration is not currently responsive and would take some figuring out to make it do so. Currently when you resize the page it stays the same size as the initial viewport. The ratings, filter button does not currently work properly and does something unknown.

##### Learnings:

Overall I learned more doing this project than I had ever done before, it was by far the largest and most complicated project I have ever undertaken.

I learned a tremendous amount about authentication, conditional rendering, writing purpose built backends to suit the front end. I also learnt new React concepts such as React Portals, and hooks such as useRef().

The power of good research, planning and organisation were critical to the success of this project and it made working in a team a real pleasure. Especially since we learnt to use Git branches collaboratively for the first time at the start of the project.
