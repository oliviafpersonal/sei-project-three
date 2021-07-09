# Pubhub


This project consisted of creating a Full Stack Application using the MERN stack with CRUD capabilities in a 10 day time frame in a pre assigned group. 

## Overview

We chose to create a clone of the Airbnb website for pubs throughout the UK called Pubhub. 
It was required that we use an Express API to serve data from a Mongo database, that we built both the front and back end, the front end was required to be made using React. Finally, it was also required that the API have multiple relationships allowing for the CRUD functionality. 

We deployed the app using Heroku. 
Deployed Project: https://pubhub-new.herokuapp.com/

### Group Members

- Olivia Flynn
- Atilla Arslan
- Jessie Edwards
- Harry Warwick


## Technologies Used

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
- Mapbox
- Google Chrome dev tools
- Google Sheets
- VS Code
- Eslint
- Photoshop


## Approach:

Once we had decided it would be a good idea to make a clone of a website, Airbnb seemed like a good choice as it is an easy to use website that most people know about. To make it a more exciting project, we decided to instead base the app on pubs.

To begin with, I went through the entire Airbnb website, and took a screenshot of each step to show the functionality of the website with a user being both logged in and out in order to gain a better understanding of our aim and also in order to create a more comprehensive plan. Once these were all annotated, we created a Trello board in order to remain organised and have a clear idea of what needed to be done and by when. 


<img width="964" alt="home-screenshot" src="https://lh5.googleusercontent.com/YeMqJI7uMU_K3wZbDkX0PHhv5uv1ovoNPoFW-LElHcHKtFr3dkHdEX4stiYmBo1h19Uun6XQ8EBO_IDsTSnE7gj7T7DlMHLVb0CDdrjf2Y_hxv9dGoxRAfG-hvOtUvMgxjIb-ERD">

<img width="964" alt="mock-up" src="https://lh5.googleusercontent.com/5zaA5WvT1IbnfMZHK6Al6fbRvfR6i0lsExWIOedDtSMZswccoppno7ab8W0B3NLKpTfptIFo6UsRHq4dJqKxNcCWd3PG780haLKAwLMKk1htuAKFLhcvoJ6UHJV1nGfqQEriBjrW">


## Backend 

Across the project, we worked either on our own or in pairs depending on what was being done and merged the code together using branches on Git. However as an initial step we set up much of the boilerplate backend views/controllers and models together. We eventually created models for the User, to enable registration and login, and eventually store other information such as, whether they were a landlord or not, if it was their first time, favourited pubs, and all Reviews they gave of pubs. And also models for the reviews themselves as well as the pubs themselves, each with interdependent relationships such as owner.

```Javascript
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

Once we had created all of our backend models, myself and another team member spent time seeding data for our database and adding them using Javascript Object notation which would then be stored as a JSON document on our MongoDB database.


<img width="964" alt="hamburger-nav" src="https://lh4.googleusercontent.com/JnztbRt2JJrmGnx7-h-t2lUVxhT7tnwTQd4J8oaqtz5vnbvefMdz0ldlPNfZlnp4RvKXJ_qv3jfRix-Fx6AJEndHJfRcuDPVRBexQkanJtjrpQnZuB8ogH3ZAeO7iaMUQ5GEc-J1">



<img width="964" alt="hamburger-nav" src="https://lh5.googleusercontent.com/naxrbk4BA4f9fjWrB9xQ6YLD4NcI1x0oGxGvHvLmc-yHjOIG_kjjHrGSk_6a0ANHjY9DdY3M8TIOlJLZt_zYVShAksm5AX6-aDId4E31VeZO1cqtzOLIW1GM7Vqc91DoCt03yvoP">

##### Search Bar and Hero Section

<img width="964" alt="hamburger-nav" src="https://lh5.googleusercontent.com/h5blgDnaCbQJRsKdiOhb8iiVicx0avXphRTHVxafyoTwg2Abr3LP_Y0G_NeW5GrehO3FyJjcNNuiqZ5J3Np_8_r52gT-6UszbOsKAFJMgSGbbLBud86OKLqEUW0i6JN90clayuLb">



Throughout the project I worked on small tasks on the front end with particular emphasis on writing the authentication post requests in order to allow users to log in and out of their profile, and allowing them to upload a profile photo using the Cloudinary API. 


```Javascript 
export const ImageUploadField = ({ handleImageUrl, value }) => {
  const handleUpload = async (event) => {
    try {
      const data = new FormData()
      data.append('file', event.target.files[0])
      data.append('upload_preset', uploadPreset)
      const res = await axios.post(uploadUrl, data)
      handleImageUrl(res.data.url)
    } catch (err) {
      console.log(err.message)
    }
  }
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

I learned a tremendous amount about authentication, conditional rendering, writing purpose built backends to suit the front end. I also learnt new React concepts such as React Portals, and hooks such as useRef(). I also learned a lot about Git and how to use it effectively as part of a collaborative work flow. Particually the benefits of branches, and how to manage merge conflicts.

The power of good research, planning and organisation were critical to the success of this project and it made working in a team a real pleasure. Especially since we learnt to use Git branches collaboratively for the first time at the start of the project.
