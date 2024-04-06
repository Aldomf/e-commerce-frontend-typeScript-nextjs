import React, { useEffect, useState } from "react";
import { useReviews } from "@/context/ReviewsContext";

function Reviews({ productId }: { productId: number }) {
  const { fetchProductComments, comments, setComments } = useReviews();

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchProductComments(productId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [productId]);

  return (
    <div>
      <h2 className="font-bold text-2xl">Customer Reviews</h2>
      {comments.length === 0 ? (
        <p>No reviews available for this product.</p>
      ) : (
        <ul className="border-2">
          {comments.map((comment) => (
            <li key={comment.id} className="border-2 mb-4">
              <div>
                <p>Username: {comment.user.username}</p>
                <p>Date: {comment.createdAt}</p>
              </div>
              <div>
                <p>Rating: {comment.rating}</p>
                <p>{comment.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
