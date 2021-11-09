import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "How do I purchase a pass?",
            content: `With money.`,
        },
        {
            title: "Where can I find events?",
            content:
                "Try searching for your school's or business' organization to see if they are hosting an event.",
        },
        {
            title: "Where do I find my purchased pass?",
            content: `Check the passes page. Alternatively you can also screen your QR code after purchase or add your pass to your virtual wallet. `,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "blue",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function App {

    return (
        <div>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    );
}