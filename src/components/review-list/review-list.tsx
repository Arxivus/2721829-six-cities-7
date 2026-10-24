import { ReviewItem, Review } from "../review/review"

type ReviewListProps = {
    reviews: Review[]
}

const ReviewList = ({ reviews }: ReviewListProps) => {

    return (
        <ul className="reviews__list">
            {
                reviews.map( review => (
                    <ReviewItem key={review.id} {...review} />
                ))
            }
        </ul>
    )
}

export default ReviewList