
  import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const renderStars = (rating:[]) => {
  let mm = 0;

rating && rating.forEach((review) => {
  mm += review.stars;
});
let averageRating = mm / rating.length;
  const stars = [];
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <View style={{backgroundColor:'red',padding:2}} key={i}>
        <FontAwesome key={"full" + i} name="star" size={18} color="gold" />
      </View>
  
  );
  }

  if (halfStar) {
    stars.push(
      <View style={{backgroundColor:'red',padding:2}}>
    <FontAwesome key={"half"} name="star-half" size={18} color="gold" />
      </View>
    )
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <View style={{backgroundColor:'red',padding:2}} key={i}>
    <FontAwesome key={"empty" + i} name="star-o" size={18} color="white" />
      </View>
  
  );
  }
  return stars;
};

  export default renderStars;