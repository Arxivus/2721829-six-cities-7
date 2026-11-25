import { ChangeEvent, useState, Fragment, FormEvent } from "react"
import { useParams } from "react-router-dom"
import { apiAxios } from "../../store"
import { AxiosError } from "axios"

type ReviewFormProps = {
    onSuccess: () => void
}

const ReviewForm = ({ onSuccess }: ReviewFormProps) => {

    const { offerId } = useParams<{ offerId: string }>()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        rating: null,
        review: ''
    })

    const reviewLength = formData.review.trim().length
    const isValid = formData.rating !== null && reviewLength >= 50 && reviewLength <= 300


    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: name === 'rating' ? Number(value) : value }))
        setSuccess(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!isValid || !offerId || isSubmitting) return

        setIsSubmitting(true)
        setSuccess(false)

        try {
            await apiAxios.post(`/comments/${offerId}`, {
                rating: formData.rating,
                comment: formData.review.trim()
            })

            setFormData({ rating: null, review: '' })
            setSuccess(true)
            onSuccess?.()

        } catch (e) {
            const error = e as AxiosError;
            console.log(error, 'Не удалось отправить отзыв. Попробуйте позже')

        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            className="reviews__form form"
            method="post"
            onSubmit={handleSubmit}
        >
            <label className="reviews__label form__label" htmlFor="review">Your review</label>
            <div className="reviews__rating-form form__rating">
                {[5, 4, 3, 2, 1].map((value) => (
                    <Fragment key={value}>
                        <input
                            onChange={handleFieldChange}
                            className="form__rating-input visually-hidden"
                            name="rating"
                            value={value}
                            id={`${value}-stars`}
                            type="radio"
                            checked={formData.rating === value}
                            disabled={isSubmitting}
                        />
                        <label
                            htmlFor={`${value}-stars`}
                            className="reviews__rating-label form__rating-label"
                            title="perfect"
                        >
                            <svg className="form__star-image" width="37" height="33">
                                <use xlinkHref="#icon-star"></use>
                            </svg>
                        </label>
                    </Fragment>
                ))}
            </div>
            <textarea
                className="reviews__textarea form__textarea"
                id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and what can be improved"
                onChange={handleFieldChange}
                value={formData.review}
                disabled={isSubmitting}
                minLength={50}
                maxLength={300}
            ></textarea>
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

export default ReviewForm