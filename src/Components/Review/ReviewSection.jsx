import { useState } from "react";
import styles from "./ReviewSection.module.scss";
import ReviewCard from "./ReviewCard";
import profileImage0 from "../../../images/Profill0.png";
import profileImage1 from "../../../images/Profill1.png";
import profileImage2 from "../../../images/Profill2.jpg";
import profileImage3 from "../../../images/Profill3.jpg";
import profileImage4 from "../../../images/Profill4.jpg";
import profileImage5 from "../../../images/Profill5.jpg";
import profileImage6 from "../../../images/Profill6.jpg";
import profileImage7 from "../../../images/Profill7.jpg";
import profileImage8 from "../../../images/Profill8.jpg";
import profileImage9 from "../../../images/Profill9.jpg";

const reviews = [
  {
    name: "Alex Stanton",
    title: "CEO at Bukalapak",
    date: "21 July 2022",
    rating: 4,
    comment:
      "We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    profileImage: profileImage0,
  },
  {
    name: "Skylar Dias",
    title: "CEO at Amazon",
    date: "20 July 2022",
    rating: 4,
    comment:
      "We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
    profileImage: profileImage1,
  },
  {
    name: "Jordan Lee",
    title: "COO at Google",
    date: "19 July 2022",
    rating: 5,
    comment:
      "Morent offers an exceptional service with affordable prices. The variety of cars is impressive and the customer service is top-notch.",
    profileImage: profileImage2,
  },
  {
    name: "Taylor Smith",
    title: "CFO at Microsoft",
    date: "18 July 2022",
    rating: 5,
    comment:
      "I am highly satisfied with Morent. The pricing is very competitive, and the selection of cars is excellent. The staff is also very courteous.",
    profileImage: profileImage3,
  },
  {
    name: "Morgan Brown",
    title: "CTO at Apple",
    date: "17 July 2022",
    rating: 4,
    comment:
      "Morent provides a wide range of cars with great facilities. The service is very good and the prices are low.",
    profileImage: profileImage4,
  },
  {
    name: "Reese Johnson",
    title: "CMO at Netflix",
    date: "16 July 2022",
    rating: 5,
    comment:
      "We are impressed with the variety of cars and the competitive pricing offered by Morent. The staff is very friendly and helpful.",
    profileImage: profileImage5,
  },
  {
    name: "Casey Green",
    title: "CEO at Airbnb",
    date: "15 July 2022",
    rating: 5,
    comment:
      "The service from Morent is outstanding. They offer a large selection of cars at affordable prices. The customer service is also excellent.",
    profileImage: profileImage6,
  },
  {
    name: "Sydney Blake",
    title: "Director at Meta",
    date: "14 July 2022",
    rating: 4,
    comment:
      "Morent provides an excellent service with a wide selection of cars. The prices are reasonable, and the staff is very friendly.",
    profileImage: profileImage7,
  },
  {
    name: "Dylan Harper",
    title: "VP at Spotify",
    date: "13 July 2022",
    rating: 5,
    comment:
      "We are very satisfied with Morent. The variety of cars and the customer service are top-notch. Prices are also very affordable.",
    profileImage: profileImage8,
  },
  {
    name: "Jordan Patton",
    title: "Manager at Uber",
    date: "12 July 2022",
    rating: 5,
    comment:
      "Morent's service is exceptional. They have a large variety of cars at competitive prices. The staff is also very courteous and helpful.",
    profileImage: profileImage9,
  },
];

function ReviewSection() {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className={styles.reviewSection}>
      <h2 className={styles.reviewsHeader}>
        Reviews <p>{reviews.length}</p>
      </h2>
      {reviews
        .slice(0, showAllReviews ? reviews.length : 2)
        .map((review, index) => (
          <ReviewCard
            key={index}
            name={review.name}
            title={review.title}
            date={review.date}
            rating={review.rating}
            comment={review.comment}
            profileImage={review.profileImage}
          />
        ))}
      <div
        className={styles.showAll}
        onClick={() => setShowAllReviews(!showAllReviews)}
      >
        <p>{showAllReviews ? "Show Less" : "Show All"}</p>
        <img src="../images/arrowhead.png" alt="arrowhead" />
      </div>
    </div>
  );
}

export default ReviewSection;
