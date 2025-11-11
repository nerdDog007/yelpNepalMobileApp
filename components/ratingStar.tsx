
  import { FontAwesome } from "@expo/vector-icons";

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesome key={"full" + i} name="star" size={18} color="gold" />);
  }

  if (halfStar) {
    stars.push(<FontAwesome key={"half"} name="star-half" size={18} color="gold" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesome key={"empty" + i} name="star-o" size={18} color="gray" />);
  }
  return stars;
};

  export default renderStars;