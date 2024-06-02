// "use client";
// import axios from "axios";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Skeleton from "./Skeleton";

// const Reviews = async ({ productId }: { productId: string }) => {
//   const [review, setReview] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//         try {
//           const response = await axios.get("/api/reviews");
//           setReview(response.data);
//           console.log("Fetched categories:", response.data);
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//         } finally {
//           setLoading(false);
//         }
//     };
//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <Skeleton />;
//   }

//   if (review.length === 0) {
//     return <div>No review found</div>;
//   }

//   return  (
//     <div className="flex flex-col gap-4" key={review.id}>
//       {/* USER */}
//       <div className="flex items-center gap-4 font-medium">
//         <Image
//           src={review.customer.avatar_url}
//           alt=""
//           width={32}
//           height={32}
//           className="rounded-full"
//         />
//         <span>{review.customer.display_name}</span>
//       </div>
//       {/* STARS */}
//       <div className="flex gap-2">
//         {Array.from({ length: review.rating }).map((_, index) => (
//           <Image src="/star.png" alt="" key={index} width={16} height={16} />
//         ))}
//       </div>
//       {/* DESC */}
//       {review.heading && <p>{review.heading}</p>}
//       {review.body && <p>{review.body}</p>}
//       <div className="">
//         {review.media.map((media: any) => (
//           <Image
//             src={media.url}
//             key={media.id}
//             alt=""
//             width={100}
//             height={50}
//             className="object-cover"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reviews;
