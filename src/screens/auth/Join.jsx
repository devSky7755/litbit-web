import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { PageHeading, Stepper } from '../../components'
import { RegisterEmail, PersonalDetails, StudentsPreRegister } from '.'
import { Strings } from '../../const'
import { firebaseAuth, firebaseUser } from "../../services";
import { PATH_DASHBOARD } from '../../routes';

const steps = [{
  disableClick: true,
  label: Strings.join.steps.register
}, {
  label: Strings.join.steps.personal_details
}, {
  label: Strings.join.steps.students_pre_registering
}, {
  label: Strings.join.steps.completed
}];

export const ScreenJoin = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(2);
  const [message, setMessage] = useState('')
  const [onRegistering, setOnRegistering] = useState(false);
  const [user, loading, error] = useAuthState(firebaseAuth.auth);
  const [userWithDetail, setUserWithDetail] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) setOnRegistering(true);
    // if (user && !onRegistering) navigate(PATH_DASHBOARD);
    if (user && !onRegistering) setActiveStep(2);
  }, [user, loading]);

  const onRegisterSubmit = async (data, e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      await firebaseAuth.registerWithEmailAndPassword(email, password)
      setActiveStep(1);
    } catch (error) {
      setMessage(Strings.firebase.errors?.[error.code] || Strings.api)
    }
  }

  const onUpdatePersonalDetails = async (data, e) => {
    e.preventDefault();
    try {
      const userWithDetail = {
        uid: user.uid,
        email: user.email,
        authProvider: "local",
        ...data
      };
      await firebaseUser.addOrUpdateUser(userWithDetail)
      setUserWithDetail(userWithDetail)
      setActiveStep(2);
    } catch (error) {
      setMessage(Strings.firebase.errors?.[error.code] || Strings.api)
    }
  }

  return (
    <>
      <PageHeading title={Strings.join.subtitle} />
      <div className="flex flex-col justify-center py-12 bg-base sm:px-6 lg:px-8">
        <Stepper steps={steps} activeStep={activeStep} />
        {activeStep === 0 && <RegisterEmail onSubmit={onRegisterSubmit} message={message} />}
        {activeStep === 1 && <PersonalDetails onSubmit={onUpdatePersonalDetails} message={message} />}
        {activeStep === 2 && <StudentsPreRegister user={userWithDetail || user} />}
      </div>
    </>
  )
}
