import Mn from "@/components/Mn";
import Signup from "@/pages/LandingPage/Signup";
import React from "react";
import { useSelector } from "react-redux";
import LocationRequest from "./Location";
export default function LandingPage() {
 const {coord} = useSelector((state:any) => state.auth);
 console.log("tjois")
  if (coord.length <=0) {
    return <Mn><LocationRequest /></Mn>;
  }
  if (coord.length >0) return <Mn><Signup /></Mn>
}
