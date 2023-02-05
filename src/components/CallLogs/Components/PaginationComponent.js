// import { Box } from "@mui/material";
// import React from "react";

// const PaginationComponent = () => {
//   const handleLeft = () => {};
//   const handleRight = () => {};
//   return (
//     <Box style={{ display: "flex", alignItems: "center" }}>
//       <Box
//         style={styles.arrowBox}
//         onClick={handleLeft}
//         sx={{ "&:hover": { cursor: "pointer" } }}
//       >
//         <ArrowLeftIcon fontSize="large" sx={{ color: "white" }} />
//       </Box>
//       <Box
//         style={styles.arrowBox2}
//         onClick={handleRight}
//         sx={{ "&:hover": { cursor: "pointer" } }}
//       >
//         <ArrowRightIcon fontSize="large" sx={{ color: "white" }} />
//       </Box>
//       {[0, 1, 2, 3].map((item, index) => {
//         if (item === post) {
//           return (
//             <Box
//               key={index}
//               style={{
//                 height: "5px",
//                 width: "5px",
//                 backgroundColor: "#6ed3ff",
//                 marginRight: "8px",
//               }}
//             />
//           );
//         } else {
//           return (
//             <Box
//               key={index}
//               style={{
//                 height: "5px",
//                 width: "5px",
//                 backgroundColor: "white",
//                 marginRight: "8px",
//               }}
//             />
//           );
//         }
//       })}
//     </Box>
//   );
// };

// export default PaginationComponent;

// const styles = {
//   arrowBox: {
//     height: "50px",
//     width: "50px",
//     backgroundColor: "#2f81b8",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   arrowBox2: {
//     height: "50px",
//     width: "50px",
//     backgroundColor: "#383b42",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: "20px",
//   },
// };
