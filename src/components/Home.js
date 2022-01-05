import React from "react"
import View from "./View"
import { getCurrentUser } from "../helpers/auth"

const Profile = () => {
  const { email } = getCurrentUser()

  return (
    <View title="Your Profile">
      <p>Welcome back to your profile, {email}!</p>
      <p>
        This is a client-only route. You could set up a form to save information
        about a user here.
      </p>
    </View>
  )
}

export default Profile
