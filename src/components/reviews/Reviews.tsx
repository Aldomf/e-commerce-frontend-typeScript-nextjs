import React, { useEffect, useState } from "react";
import { useReviews } from "@/context/ReviewsContext";

function Reviews({ productId }: { productId: number }) {
  const {
    fetchProductComments,
    comments,
    setComments,
    averageRating,
    setAverageRating,
  } = useReviews();

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchProductComments(productId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [productId]);

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-400"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Calculate average rating
  useEffect(() => {
    if (comments.length > 0) {
      const totalRating = comments.reduce(
        (sum, comment) => sum + comment.rating,
        0
      );
      const avgRating = totalRating / comments.length;
      setAverageRating(avgRating);
    }
  }, [comments]);

  return (
    <div className="w-full px-4 ml:px-8">
      <h2 className="font-bold text-2xl text-center mb-2 md:text-4xl">Customer Reviews</h2>
      {comments.length === 0 ? (
        <p className="py-4 text-xl">No reviews available for this product.</p>
      ) : (
        <div>
          <div className="bg-[#F7F8FA] p-2 md:text-xl xl:text-2xl xl:p-4">
            Average Rating
            <br />{" "}
            <div className="flex items-center">
              <span className="font-bold text-4xl mr-2 xl:text-6xl">
                {averageRating != null
                  ? `${averageRating.toFixed(2)} `
                  : "Calculating..."}
              </span>
              <span className="text-3xl xl:text-5xl">
                {averageRating != null
                  ? renderStars(Math.round(averageRating))
                  : ""}
              </span>
              <span className="text-xs mm:text-base mm:ml-2 xl:text-xl">({comments.length} Reviews)</span>
            </div>
          </div>
          <ul className="">
            {comments.map((comment) => (
              <li key={comment.id} className="border-b pb-4 mt-4">
                <div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="font-semibold mr-2 xl:text-xl">
                        {comment.user.username}
                      </p>
                      <p className="xl:text-xl">{renderStars(comment.rating)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#767676] xl:text-base">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>{comment.comment}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Reviews;
