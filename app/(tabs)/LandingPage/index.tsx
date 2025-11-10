import Signup from "@/components/Signup";
import React from "react";
import { useSelector } from "react-redux";
import LocationRequest from "./Location";
export default function LandingPage() {
 const {coord} = useSelector((state:any) => state.auth);
 console.log("tjois")
  if (coord.length <=0) {
    return <LocationRequest />;
  }
  if (coord.length >0) return <Signup />
}
