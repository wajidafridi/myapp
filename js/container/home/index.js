import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
// @import styles
import styles from './index.module.scss'

const URL="https://mygoapp-backend.herokuapp.com/";
// const URL="http://localhost:8000/";

export default function Home() {
    const [feedbackList, setFeedbackList] = useState([])
    const [feedbackValue, setFeedbackValue] = useState('')

    useEffect(() => {
        getAllFeedbackData();
    }, [])

    function getAllFeedbackData() {
        axios.get(`${URL}getallfeedback`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                console.log("get res", res);
                const feedback = res.data;
                setFeedbackList(feedback)
            }).catch(err => {
                console.log("err", err, err.name, err.msg);
            })
    }

    function submitFeedback() {
        if (feedbackValue && feedbackValue !== "") {
            axios.post(`${URL}createfeedback`, { description: feedbackValue }, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                }
            })
                .then(res => {
                    console.log("res of post", res);
                    // getAllFeedbackData();
                }).catch(err => {
                    console.log("err", err, err.name, err.msg);
                })
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>My App</title>
                <meta name="description" content="My first app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <h1 className={styles.title}>
                    My App
                </h1>
            </header>
            <main className={styles.main}>

                <div className={styles.inputContainer}>
                    <h5 className={styles.title}>Enter Feedback</h5>
                    <textarea className={styles.inputbox} value={feedbackValue} onChange={e => { setFeedbackValue(e.target.value) }} />
                    <button className={styles.submitBtn} onClick={submitFeedback}>Submit</button>
                </div>
                <div className={styles.feedbackList}>
                    <h5 className={styles.title}>Feedback:</h5>
                    {feedbackList && feedbackList.length > 0 ? feedbackList.map((item, index) =>
                        <div key={index} className={styles.feedbackItem}>{item.description}</div>
                    ) : "No Record Found"}
                </div>

            </main>

            <footer className={styles.footer}>
                © 2022 My App. All rights reserved.
            </footer>
        </div>
    )
}
