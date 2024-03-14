"use client";

import Login from "@/components/login";
import Signup from "@/components/singup";

import { useState } from "react";

export default function User() {
  const [loggedin, setloggedin] = useState(true);

  return <div>{loggedin ? <Login /> : <Signup />}</div>;
}
