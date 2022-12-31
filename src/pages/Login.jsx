import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FirebaseAuth } from "../utils/Firebase";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";


function Login() {
  let navigate = useNavigate(); //For navigation to home page
  // const isloggedin = useSelector((state) => state.netflix.isloggedin);
  // console.log(isloggedin);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  }); //For storing form values

  const handleLogin = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(FirebaseAuth, email, password);
      // unsubscribe();
    } catch (error) {
      console.log(error.code);
    }
  };

  // var unsubscribe = FirebaseAuth.onAuthStateChanged((currentUser) => {
  //   if (currentUser) {
  //     dispatch(setisloggedin(true))
  //   } else {
  //     dispatch(setisloggedin(false))
  //   }
  // });

  // useEffect(() => {
  // unsub();
  // }, []);

  //   const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const auth = getAuth();

  //   const listener = onAuthStateChanged(auth, async (user) => {
  //     setIsAuthenticated(!!user);
  //   });

  //   return () => {
  //     listener();
  //   };
  // }, []);

  // var unsub = onAuthStateChanged(FirebaseAuth, (currentUser) => {
  //   if (currentUser) navigate("/");
  // }); //current user is false then logout user to login screen

  // FirebaseAuth.onAuthStateChanged((currentUser) => {
  //   if (currentUser) dispatch(setisloggedin(true))
  //   //navigate("/");
  // });

  // useEffect(() => {
  //   navigate("/");
  // }, [FirebaseAuth.auth().currentUser]);

  // useEffect(() =>
  // {
  //   console.log(isAuthenticated);

  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated])

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
        if (user) {
            navigate("/");
        }
    });
    
    // unsubscribing from the listener when the component is unmounting.
    return unsubscribe;
}, [])

  // onAuthStateChanged(FirebaseAuth, (currentUser) => {
  //   if (currentUser) 
  // });

  return (
    <Container>
      <BackgroundImage />

      <div className="content">
        <Header />

        <div className="form-container flex column a-center j-center">
          <div className="form flex column  a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>

            <div className="container flex column">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={() => handleLogin()}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;

        .container {
          gap: 2rem;

          input {
            padding: 1rem 1rem;
            width: 15rem;
            /* border-radius: 2rem; */
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;
