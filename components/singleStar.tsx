
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const singleStar = (rating:number) => {
    const stars = [];
  let mm = 0;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <View style={{backgroundColor:'red',padding:2}} key={i}>
        <FontAwesome name="star" size={18} color="white" />
      </View>
  );
  }

  if (halfStar) {
    stars.push(
      <View style={{backgroundColor:'red',padding:2}}>
    <FontAwesome  name="star-half" size={18} color="white" />
      </View>
    )
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <View style={{backgroundColor:'red',padding:2}} key={i}>
    <FontAwesome  name="star-o" size={18} color="white" />
      </View>
  );
  }
  return stars;
};

  export default singleStar;