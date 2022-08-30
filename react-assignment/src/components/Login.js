import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script"; //initialize our clientId using gapi, which is Google’s client library for browser-side JavaScript. It is a package that helps us load gapi scripts and initialize functions
import FileUploadDownload from "./FileUploadDownload";
import './../App.css'

const Login = () => {
    const clientId = '731777965673-krnhalvcl8tjaes5heksi2rto8nkafin.apps.googleusercontent.com';
    const [showUploadOption, setShowUploadOption] = useState(false)
    const profileDetails = React.useRef({ value : {} });
        
    const navigate = useNavigate()


  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
      };
      gapi.load('client:auth2', initClient);
  }); //To initialize our client, we will call the gapi function in our useEffect hook so that it gets called when our page loads or on every render

  const logOut = () => {
    profileDetails.current.value = {}
    setShowUploadOption(false)
    navigate("/")
  };

  const onSuccess = (res) => {
    profileDetails.current.value = res.profileObj
    setShowUploadOption(true)
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };


return (
    <div className="login">
        
        <div>
            {
                !showUploadOption ? (
                <div>
                  <div>
                    <h2>Welcome To Your File Collection!!!</h2>
                    <p>Here you can upload and download unlimited files...</p>
                  </div>
                  <div>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    /> 
                  </div>
                </div>
            ) : '' } 
        </div>
        <div>
            {
                showUploadOption && profileDetails ? <FileUploadDownload profile={profileDetails.current.value} onLogout={logOut} /> : ''
            }
        </div>
    </div>
   
  )
}

export default Login;