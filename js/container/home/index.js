import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios';
// @import modules
import Loader from "../../modules/Loader";
// @import styles
import styles from './index.module.scss'

const URL = "https://mynode-backend.herokuapp.com/";
// const URL = "http://localhost:8000/";

const Home = () => {
    const [feedbackList, setFeedbackList] = useState([])
    const [feedbackValue, setFeedbackValue] = useState('')
    const [feedbackEditValue, setFeedbackEditValue] = useState('')
    const [activeIndex, setActiveIndex] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllFeedbackData();
    }, [])

    function getAllFeedbackData() {
        setIsLoading(true)
        axios.get(`${URL}api/feedbacks`, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res && !res?.data?.error && res?.data?.data) {
                    setFeedbackList(res?.data?.data)
                }
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                console.log("err", err, err.name, err.msg);
            })
    }

    function submitFeedback() {
        if (feedbackValue && feedbackValue !== "") {
            axios.post(`${URL}api/feedbacks`, { description: feedbackValue }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res && !res?.data?.error && res?.data?.data) {
                        getAllFeedbackData();
                        setFeedbackValue('');
                    }
                }).catch(err => {
                    console.log("err", err, err.name, err.msg);
                })
        }
    }

    function deleteFeedback(id) {
        axios.delete(`${URL}api/feedbacks/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res && !res?.data?.error) {
                    getAllFeedbackData();
                }
            }).catch(err => {
                console.log("err", err, err.name, err.msg);
            })
    }

    function editFeedback() {
        if (feedbackEditValue && feedbackEditValue !== "") {
            const id = feedbackList[activeIndex]['_id'];

            axios.put(`${URL}api/feedbacks/${id}`, { description: feedbackEditValue }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res && !res?.data?.error) {
                        getAllFeedbackData();
                        setTimeout(() => {
                            setActiveIndex(null);
                        }, 500);
                    }
                }).catch(err => {
                    console.log("err", err, err.name, err.msg);
                })
        }
    }

    return (
        <div className={styles.container}>
            <Loader isLoading={isLoading} />
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
                        <div key={index} className={styles.feedbackItem}>{index + 1}) {item.description}
                            <button className={styles.editBtn} onClick={() => { setActiveIndex(index) }}>edit</button>
                            <button className={styles.deleteBtn} onClick={() => { deleteFeedback(item._id) }}>delete</button>
                        </div>
                    ) : "No Record Found"}
                </div>
            </main>
            {(activeIndex !== null) &&
                <div className={styles.popupWrapper}>
                    <div className={styles.popupContainer}>
                        <h5 className={styles.title}>Edit</h5>
                        <button className={styles.crossIcon} onClick={() => { setActiveIndex(null) }}>&#10060;</button>
                        <textarea
                            className={styles.inputbox}
                            onChange={e => { setFeedbackEditValue(e.target.value) }}
                            value={feedbackEditValue || feedbackList[activeIndex]?.description || ''}
                        />
                        <button className={styles.submitBtn} onClick={editFeedback}>Save</button>
                    </div>
                </div>
            }
            <footer className={styles.footer}>
                ?? 2022 My App. All rights reserved.
            </footer>
        </div>
    )
}

export default Home;
