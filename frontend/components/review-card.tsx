'use client';

import { useMessage } from '@/context/message.context';
import { deleteReview } from '@/services/review.service';
import { Review } from '@/types/review.type';
import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function ReviewCard({
  id,
  comment,
  rating,
  createdAt,
  updateReviews,
}: Review & { updateReviews: () => Promise<void> }) {
  const messageApi = useMessage();

  const handleDelete = async () => {
    const [error, message] = await deleteReview(id);

    if (error) {
      messageApi.error(error);
    } else {
      messageApi.info(message);
      updateReviews();
    }
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 p-2 flex flex-col rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">{createdAt}</p>
        <Button
          type="text"
          className="text-neutral-400 hover:text-red-500 dark:hover:bg-white/10"
          icon={<DeleteOutlined className="text-sm" />}
          onClick={handleDelete}
        />
      </div>
      <p>{comment}</p>
      <p className="self-end text-sm text-neutral-400">
        Calificación: {`${rating}/5`}
      </p>
    </div>
  );
}

export default ReviewCard;
