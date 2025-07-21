import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const LatestReviews = () => {
    const axiosSecure = useAxiosSecure()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
      axiosSecure.get("/reviews/latestReviews?sort=latest&limit=3")
        .then(res => setReviews(res.data))
        .catch(err => console.error(err));
    }, []);
    
    return (
        <div>
            <section className="py-10 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((review) => (
                            <div key={review._id} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <img src={review.reviewerImage} alt="Reviewer" className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h4 className="font-medium">{review.reviewerName}</h4>
                                        <p className="text-sm text-gray-500">{review.propertyTitle}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700">{review.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LatestReviews;