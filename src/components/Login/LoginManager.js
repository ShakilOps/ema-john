import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    
  const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
      .signInWithPopup(GoogleProvider)
      .then(res => {
        const {displayName, photoURL, email} = res.user;
        const signedInUser = {
          isSignedIn : true,
          name : displayName,
          email : email,
          photo : photoURL
        }
        return(signedInUser);
        //console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.error(err);
        console.log(err.message);
      })
  }

  export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    return user;
    console.log('fb user after sign in', user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  }
  export const handleSignOut = () =>{
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn : false,
        name : '',
        photo : '',
        email : '',
        error : '',
        success : false
      }
      return(signedOutUser);
      //console.log(res);
    })
    .catch(err => {

    });
  }

//   export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       // Signed in 
//       //var user = userCredential.user;
//       const newUserInfo = {...user};
//       newUserInfo.error = '';
//       newUserInfo.success = true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//       //console.log(user);
//       // ...
//     })
//     .catch((error) => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//       // ..
//     });
//   }

//   export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       // Signed in
//           //var user = userCredential.user;
//           const newUserInfo = {...user};
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           setLoggedInUser(newUserInfo);
//           history.replace(from);
//           console.log('sign in user info', res.user);
//       // ...
//     })
//     .catch((error) => {
//           const newUserInfo = {...user};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//     });
//   }

// const updateUserName = name =>{
//     const user = firebase.auth().currentUser;

//       user.updateProfile({
//         displayName: name
//       })
//       .then(function() {
//         console.log('Update successful')
//       })
//       .catch(function(error) {
//         console.log(error)
//       }); 
//   }