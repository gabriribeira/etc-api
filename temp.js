// app.post("/fetchData", async (req, res) => {
//     try {
//       const { song, artist } = req.body;
  
//       // Make an external request using axios
//       const response = await axios.get(
//         `https://app.save-cook.com/crawler/aldi.php`
//       );
  
//       // Send the response back to the client
//       res.json(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });




// Uncomment and configure socket.io if necessary
// io.use((socket, next) => {
//   sessionMiddleware(socket.request, {}, next);
// });

// io.on("connection", async (socket) => {
//   console.log("A client connected");

//   const userId = socket.request.session.passport?.user;
//   if (!userId) {
//     socket.emit("authentication_error", "User is not authenticated");
//     return;
//   }

//   try {
//     const user = await db.User.findByPk(userId, { include: [db.Household] });

//     if (!user) throw new Error("User not found");

//     const userHouseholds = user.Households.map((household) => household.id);

//     userHouseholds.forEach((householdId) => {
//       socket.join(`household-${householdId}`);
//     });

//     console.log(
//       `User ${userId} authenticated with households ${userHouseholds}`
//     );
//   } catch (error) {
//     console.error("Authentication error:", error.message);
//     socket.emit("authentication_error", error.message);
//   }

//   socket.on("disconnect", () => {
//     console.log("A client disconnected");
//   });
// });

// function emitNotificationToHousehold(householdId, notification) {
//   io.to(`household-${householdId}`).emit("notification", notification);
// }

// module.exports = { io, emitNotificationToHousehold };