import React, { useState } from 'react'

export const Stepper = ({ steps, activeStep = 0 }) => {
    return (
        <>
            <ul className="steps">
                {steps.map((step, index) => {

                    return (
                        <li key={index} className={`step ${(index <= activeStep) ? 'step-primary' : ''}`}>{step.label}</li>
                    );
                })}
            </ul>
        </>
    )
}