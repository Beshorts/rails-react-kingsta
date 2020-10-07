## RAILS + CREATE REACT APP - SOCIAL MEDIA APP -

This app is built on a Rails backend setup to serve as an API end point for CRUD actions and user sessions, with PostgreSQL as Database for Active Record to handle tables relationship. 
React as frontend, using React Hooks to manage state through reusable components and React Router to implement nested routes.

##### Usage
Mobile responsive app that allows users to signup or signin, create a profile, logout, write a post with description and hashtags, search by hashtags, delete.

SVG files designed by [https://www.opendoodles.com/](https://www.opendoodles.com/)

## Live Application URL
Deployed on Heroku :hearts:

[ https://kingsta-social-media.herokuapp.com/](
https://kingsta-social-media.herokuapp.com/)

## Technologies used
See package.json and Gemfile for versions

* **Ruby on Rails v5.2.4**
      - active record
      - pg 
      - rack-cors
      - bcrypt
      - foreman
      - cloudinary

* **React v16.13.1**
      - react-router-dom
      - node-sass
      - axios
      - bootstrap
      - font-Awesome
      - googleFonts
      - react-avatar

* **Database**
      - PostgreSQL

* **Engines**
      - Node v12.18.4
      - npm v6.14.6

## **Installation**
- ``git clone git@github.com:Beshorts/rails-react-kingsta.git`` 
- run ``bundle install``

- Set up PostgreSQL ``rails db:create`` then ``rails db:migrate``

## **Run**
- in one terminal run ``rails s -p 3001`` to start Rails on ``localhost:3001`` 

- in another terminal go to the folder *client* ``cd client`` and run ``npm install`` then ``npm start`` to start React
- visit [https://localhost:3000](https://localhost:3000) in your browser to see the app

- **Have fun!** :tada:



