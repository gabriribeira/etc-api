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