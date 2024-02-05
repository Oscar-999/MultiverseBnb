# MultiverseBnb

MultiverseBnb is a fullstack web application. It is a clone/parody of the website airbnb. You can crete a spot add reviews and even manage bookings. Have fun exploring the different universe you can stay at.

Live Site [MultiverseBnb](https://air-bnb-mr42.onrender.com/)

## Index

[MVP Feature List](https://github.com/Oscar-999/AirBnB/wiki/Features-List) |
[Database Scheme](https://github.com/Oscar-999/AirBnB/wiki/Db-Diagram) |
[User Stories](https://github.com/Oscar-999/AirBnB/wiki/User-Stories) |
[Api Docs](https://github.com/Oscar-999/AirBnB/wiki/Api-Documentaion) |

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />


## Landing Page
![landing-page-gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDhuOTZrcjZkd3I1N3pxZ2F2eW83a204bGN6aGVoMWtwNmE4dHg4bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EkE0nQxHmKa89KizuQ/giphy.gif)

## One Spot Page and Reviews
![spot-page-gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzRzdWd1cnF4M2ZoN252ZmgwamJqM3pkaDFvOXpuMTcyODBja2xlNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/r6BiWMN3L8hLPns9N5/giphy.gif)

## Code I'm Proud Of

```javascript
// Get all spots owned by the current user
router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: SpotImage,
        as: "SpotImages",
        where: { preview: true },
        required: false,
      },
      {
        model: Review,
        as: "Reviews",
        attributes: [
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        ],
        required: false,
      },
    ],
    group: ["Spot.id", "SpotImages.id", "Reviews.id"],
  });

  const formattedSpots = spots.map((spot) => {
    let avgRating = 0;

    if (spot.Reviews && spot.Reviews.length > 0) {
      avgRating = parseFloat(
        spot.Reviews[0].getDataValue("avgRating")
      ).toFixed(1);
    }

    const previewImage =
      spot.SpotImages && spot.SpotImages.length > 0
        ? spot.SpotImages[0].url
        : null;

    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: avgRating,
      previewImage: previewImage,
    };
  });

  res.status(200).json({ Spots: formattedSpots });
});
```
Explanation :
Route Setup: The code sets up an Express.js route at "/current" for handling GET requests.

User Authentication: It checks if the user is authenticated (logged in) using the requireAuth middleware.

Database Query: It queries a database table called "Spot" to find spots owned by the current user based on their ID.

Data Retrieval: The code also fetches associated data like spot images and reviews while ensuring that only preview images are included.

Data Formatting: It calculates the average rating of reviews for each spot and formats the data into a more user-friendly structure.

JSON Response: Finally, it sends a JSON response containing the formatted spot data back to the client.

In short, this code handles authenticated requests to retrieve and format spot-related data from a database, making it ready for a response in a well-structured JSON format.

## Getting Started
1. Clone this repository:

   `
   https://github.com/itsmaica/Remotebnb.git
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. Now you can use the Demo User or Create an account


***

# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking


## Contact
Contact Me[LinkedIn](https://www.linkedin.com/in/oscaralcantar/)
