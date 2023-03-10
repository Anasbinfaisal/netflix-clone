import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FirebaseAuth } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); //For condiitonal rendering of passoword field

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  }; //Callback function for signup button implementation

  // onAuthStateChanged(FirebaseAuth, (currentUser) => {
  //   if (currentUser) navigate("/");
  // });

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });

    // unsubscribing from the listener when the component is unmounting.
    return unsubscribe;
  }, []);

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column j-center a-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV Shows and more </h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>

          <div className="form">
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
            {showPassword && (
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
            )}
            {
              //Conditional Rendering
            }
            {!showPassword && (
              <button onClick={() => setShowPassword(!showPassword)}>
                Get Started
              </button>
            )}
          </div>
          <button onClick={handleSignup}>Sign Up</button>
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
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;

          &:focus {
            //on clickig input field
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 1rem 1rem;
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
`;

export default Signup;
