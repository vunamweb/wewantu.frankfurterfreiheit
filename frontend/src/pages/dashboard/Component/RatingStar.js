import React, { useState, useEffect } from 'react';
import { getLoggedInUser } from '../../../helpers/authUtils';
import { APIClient } from '../../../helpers/apiClient';
import { FaRegStar } from 'react-icons/fa';

function RatingStar({ user_id, updateRating }) {
    const userId = user_id;
    const admin = getLoggedInUser()[0];
    const [userRate, setUserRate] = useState(null);
    const [rate, setRate] = useState(0);
    const [modified, setModified] = useState(false);

    const handleRatingClick = (user_id, value) => {
        if (!userRate) {
            const dataPost = {
                user_id: admin.user_id,
                user_reference_id: user_id,
                rate: value
            }
            setModified(true);
            new APIClient().create("/user_rating", dataPost).then(res => {
                dataPost.user_rating_id = res.user_rating_id;
                setRate(value);
                setModified(false)
            });
        }
        else {
            const dataPut = userRate;
            dataPut.rate = value;
            setModified(true)
            new APIClient().put("/user_rating", dataPut).then(res => {
                setRate(value);
                setModified(false)
            });
        }

    }

    useEffect(() => {
        if (modified === false) {
            new APIClient().get('user/' + admin.user_id + '/user_rating').then(res => {
                if (res.length > 0) {
                    const userRating = res.filter(x => (x.user_reference_id === userId));
                    if (userRating.length > 0) {
                        setUserRate(userRating[0]);
                        setRate(userRating[0].rate);
                        if (updateRating) {
                            updateRating(userId, userRating[0].rate);
                        }
                    }
                }
            })
        }

    }, [userId, modified]);

    return (<>
        {[1, 2, 3, 4, 5].map((value) => (
            <FaRegStar
                key={value}
                onClick={() => handleRatingClick(userId, value)}
                style={{ cursor: 'pointer', color: value <= rate ? '#898166' : 'silver' }}
            />
        ))}
    </>);
}

export default RatingStar;