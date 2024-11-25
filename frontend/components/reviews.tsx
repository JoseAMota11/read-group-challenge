'use client';

import { Review } from '@/types/review.type';
import { getTokenDecoded } from '@/utils/cookies-handlers';
import { Button, Input, Rate } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ReviewCard from './review-card';
import { getAllReviews, postReview } from '@/services/review.service';
import { useMessage } from '@/context/message.context';

function Reviews({ bookId }: { bookId: string }) {
  const [token] = useState(getTokenDecoded);
  const [username, setUsername] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });
  const messageApi = useMessage();

  const handlePostReview = async () => {
    const data = { ...review, userId, bookId };

    const [error, message] = await postReview(data as Review);

    if (error) {
      messageApi.error(error);
    } else {
      messageApi.success(message);
      getReviews();
      setReview({ rating: 0, comment: '' });
    }
  };

  const getReviews = useCallback(async () => {
    const [error, data] = await getAllReviews(bookId);

    if (error) {
      messageApi.error(error);
    } else {
      setReviews(data!);
    }
  }, [bookId, messageApi]);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  useEffect(() => {
    if (token) {
      const { username, id } = token;
      setUsername(username);
      setUserId(id);
    }
  }, [token]);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-lg">
      <div className="flex flex-col gap-2">
        <Input.TextArea
          className="min-h-16 max-h-24"
          placeholder="¡Me encantó este libro!"
          value={review.comment}
          onChange={(e) =>
            setReview((prevReview) => ({
              ...prevReview,
              comment: e.target.value,
            }))
          }
        />
        <div className="flex justify-between items-center">
          <Rate
            value={review.rating}
            onChange={(value) =>
              setReview((prevReview) => ({ ...prevReview, rating: value }))
            }
          />
          <Button
            type="primary"
            className="self-end"
            disabled={!review.comment || !review.rating}
            onClick={handlePostReview}
          >
            Publicar reseña
          </Button>
        </div>
        <h3 className="font-semibold">{username}</h3>
      </div>
      <div className="py-4">
        {reviews.length === 0 ? (
          <p className="text-neutral-400 text-center">
            No hay reseñas. Expresa lo que piensas de este libro.
          </p>
        ) : (
          <div className="space-y-2 bg-neutral-200 p-2 rounded-lg">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                {...review}
                updateReviews={getReviews}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
